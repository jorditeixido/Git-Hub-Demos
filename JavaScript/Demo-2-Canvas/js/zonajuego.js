const TEST=false;
var comeCocos;
var fantasmaAzul;
var fantasmaNaranja;
var fantasmaRojo;
var fantasmaRosa;
var happyHour=0;
var puntos=[];
var fantasmas=[];
var fondo = new Image();
fondo.src = 'img/fondo.jpg';

function startGame() 
{
    comeCocos = new comecocos(ANCHOBICHOS, ANCHOBICHOS, "yellow", "yellow", 3+Math.round((EJESX[4]+EJESX[5])/2),EJESY[7]);
    fantasmas.push(new fantasma(ANCHOBICHOS, ANCHOBICHOS, "img/fantasmaAzul.jpg", "img/fantasmaMuerto.jpg", BLC,BUC,"image"));
    fantasmas.push(new fantasma(ANCHOBICHOS, ANCHOBICHOS, "img/fantasmaVerde.jpg", "img/fantasmaMuerto.jpg", BRC,BUC,"image"));
    fantasmas.push(new fantasma(ANCHOBICHOS, ANCHOBICHOS, "img/fantasmaRojo.jpg", "img/fantasmaMuerto.jpg", BRC,BDC,"image"));
    fantasmas.push(new fantasma(ANCHOBICHOS, ANCHOBICHOS, "img/fantasmaAmarillo.jpg", "img/fantasmaMuerto.jpg", BLC,BDC,"image"));
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
    miZonaJuego.context.drawImage(fondo, 0, 0);

    puntos.forEach(puntosFunction)
    //function puntosFunction(punto, index, arr) {
    function puntosFunction(punto) {
        punto.update();
    }    
    if (happyHour>0) {
        informar("Happy="+happyHour+"<br>");
        happyHour--;
    }
    fantasmas.forEach(fantasmasFunction)
    function fantasmasFunction(fantasma) {
        fantasma.caminar();    
        fantasma.update();

    }
    comeCocos.direccionX = 0;
    comeCocos.direccionY = 0;
    if (miZonaJuego.keys && miZonaJuego.keys[37]) {comeCocos.direccionX = -1; comeCocos.coordenadas();}
    if (miZonaJuego.keys && miZonaJuego.keys[39]) {comeCocos.direccionX = 1; comeCocos.coordenadas();}
    if (miZonaJuego.keys && miZonaJuego.keys[38]) {comeCocos.direccionY = -1; comeCocos.coordenadas();}
    if (miZonaJuego.keys && miZonaJuego.keys[40]) {comeCocos.direccionY = 1; comeCocos.coordenadas();}
    comeCocos.mover();
    comeCocos.update();

    fantasmas.forEach(fantasmasCrash)
    function fantasmasCrash(fantasma) {
        if (comeCocos.crashWith(fantasma))
        {
            if (happyHour>0) {
                fantasma.kill();    
            } else 
            {
                comeCocos.dead();
            }
        }
    }
    for (i=0;i<puntos.length;i++)
    {
        if (comeCocos.crashWith(puntos[i])) {
            if (puntos[i].type==2) {
                happyHour=1000;
            }
            puntos.splice(i,1);
        }
    }
}
function informar(texto)
{
    informe = document.getElementById('informe');
    informe.innerHTML = texto+"<br>"+informe.innerHTML.substr(0,100);
}
