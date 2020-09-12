var comeCocos; //Define al comeCocos
var tiempoCaza = 0; //Define el tiempo en el que se pueden cazar Fantasmas
var fantasmas = []; //Colecciona los fantasmas existentes
var puntos = []; //Colecciona los puntos exisntes
var carteles = []; //Colecciona los carteles existentes
var vidas = 3;//Contiene el número de vidas del juego
var puntuacion = 0;//Contiene la puntuación de la partida
var puntosXfantasma;//Define la puntuación que aporta cazar a cada fantasma
var fondo = new Image();//Define la imagen de fondo de la pantallas
    fondo.src = 'img/fondo.jpg';
var frutas=[];

function startGame() 
{
    comeCocos = new comecocos(ANCHOBICHOS/2, 3+Math.round((EJESX[4]+EJESX[5])/2), EJESY[7]);
    fantasmas.push(new fantasma(ANCHOBICHOS, ANCHOBICHOS, "#F01702", BLC, BUC, "UNO"));
    fantasmas.push(new fantasma(ANCHOBICHOS, ANCHOBICHOS, "#FF9F00", BRC, BUC, "DOS"));
    fantasmas.push(new fantasma(ANCHOBICHOS, ANCHOBICHOS, "#55EDF9", BRC, BDC, "TRES"));
    fantasmas.push(new fantasma(ANCHOBICHOS, ANCHOBICHOS, "#FFA39C", BLC, BDC, "CUATRO"));
    frutas.push(new fruta(ANCHOBICHOS, ANCHOBICHOS, 3+Math.round((EJESX[4]+EJESX[5])/2), EJESY[5], CEREZA, 500));
    
    let i=0;
    for (y=0;y<29;y++)
    {
        for (x=0;x<26;x++)
        {
            if (MATRIZPUNTOS[i]!=0) 
            {
                ejex=EJESX[0]+(ANCHOBICHOS/2)+(x*18);
                ejey=EJESY[0]+(ANCHOBICHOS/2)+(y*16);
                puntos.push(new punto(5*MATRIZPUNTOS[i],5*MATRIZPUNTOS[i],ejex,ejey,MATRIZPUNTOS[i]));
            }
            i++;
        }
    }
    
    miZonaJuego.start();
}
var miZonaJuego = 
{
    canvas : document.createElement("canvas"),
    start : function() 
    {
        this.canvas.width = ANCHO;
        this.canvas.height = ALTO;
        this.context = this.canvas.getContext("2d");
        this.context.drawImage(fondo, 0, 0);
        document.getElementById('centro').appendChild(this.canvas);
        this.interval  = setInterval(updateZonaJuego, velocidad);
        window.addEventListener('keydown', function (e) 
        {
            miZonaJuego.keys = (miZonaJuego.keys || []);
            miZonaJuego.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) 
        {
            miZonaJuego.keys[e.keyCode] = false;
        })
    },
    clear : function() 
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function updateZonaJuego() 
{
    miZonaJuego.clear();
    miZonaJuego.context.fillStyle = "#000000";
    miZonaJuego.context.fillRect(0, 500, ANCHO, 50);
    miZonaJuego.context.drawImage(fondo, 0, 0);
    miZonaJuego.context.font = "30px Comic Sans MS";
    miZonaJuego.context.fillStyle = "#FEFEFE";
    miZonaJuego.context.fillText("SCORE ",10,535);
    miZonaJuego.context.fillText("LIVES ",270,535);
    miZonaJuego.context.fillStyle = "#FFF42A";
    miZonaJuego.context.fillText(puntuacion,125,535);
    miZonaJuego.context.fillText(vidas,375,535);
    if (frutas.length>0) {
        frutas[0].pintar();
        if (comeCocos.toparCon(frutas[0]))
        {
            puntuacion=puntuacion+frutas[0].puntos;
            carteles.push(new cartel(frutas[0].puntos,frutas[0].x,frutas[0].y)); 
            frutas.splice(0,1);   
        }
    }
    puntos.forEach(puntosFunction)
    function puntosFunction(punto) {
        punto.actualizar();
    }    
    if (tiempoCaza>0) {
        tiempoCaza--;
    }
    fantasmas.forEach(fantasmasFunction)
    function fantasmasFunction(fantasma) {
        fantasma.caminar();    
        fantasma.actualizar();
    }
    comeCocos.direccionX = 0;
    comeCocos.direccionY = 0;
    if (miZonaJuego.keys && miZonaJuego.keys[37]) {comeCocos.direccionar('L');}
    if (miZonaJuego.keys && miZonaJuego.keys[39]) {comeCocos.direccionar('R');}
    if (miZonaJuego.keys && miZonaJuego.keys[38]) {comeCocos.direccionar('U');}
    if (miZonaJuego.keys && miZonaJuego.keys[40]) {comeCocos.direccionar('D');}
    comeCocos.mover();
    comeCocos.actualizar();

    fantasmas.forEach(toparConFantasmas)
    function toparConFantasmas(fantasma) 
    {
        if (comeCocos.toparCon(fantasma))
        {
            if (tiempoCaza>0) {
                if (fantasma.vivo==true) {
                    puntuacion=puntuacion+puntosXfantasma;
                    carteles.push(new cartel(puntosXfantasma,fantasma.x,fantasma.y));
                    puntosXfantasma=puntosXfantasma*2;    
                }
                fantasma.matar();
            } else 
            {
                comeCocos.morir();
                detenerFantasmas();
            }
        }
    }
    carteles.forEach(miFuncion)
    function miFuncion(cartel) 
    {
        let i = 0;
        if (cartel.permanencia<(INTERMITENCIA*2))
        {
            cartel.mostrar();
        }
        else 
        {
            carteles.splice(i,1);
        }
        i++;
    }

    if (puntos.length==0) {
        informar('Final de la pantalla');
    }
    else 
    {
        for (i=0;i<puntos.length;i++)
        {
            if (comeCocos.toparCon(puntos[i])) {
                if (puntos[i].tipo==2) {
                    tiempoCaza=1000;
                    puntosXfantasma=200;
                    puntuacion=puntuacion+50;
                }
                puntos.splice(i,1);
                puntuacion=puntuacion+10;
            }
        }
    }   
}
function detenerFantasmas()
{
    fantasmas.forEach(detenerFantasma)
    function detenerFantasma(fantasma)
    {
        fantasma.stop=true;
    }
}
function reinicarFantasmas()
{
    fantasmas.forEach(reinicarFantasma)
    function reinicarFantasma(fantasma)
    {
        fantasma.reinicar();
    }
}
function informar(texto)
{
    informe = document.getElementById('informe');
    informe.innerHTML = texto+"<br>"+informe.innerHTML.substr(0,100);
}
