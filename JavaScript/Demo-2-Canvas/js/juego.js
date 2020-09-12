var comeCocos; //Define al comeCocos
var fantasmas = []; //Colecciona los fantasmas existentes
var frutas=[];//Colecciona la fruta
var pantalla;//
var puntos = []; //Colecciona los puntos exisntes
var tiempoCaza = 0; //Define el tiempo en el que se pueden cazar Fantasmas
var carteles = []; //Colecciona los carteles existentes
var vidas = 3;//Contiene el número de vidas del juego
var puntuacion = 0;//Contiene la puntuación de la partida
var puntosXfantasma;//Define la puntuación que aporta cazar a cada fantasma
var tiempoFruta = 0;
var intervaloFrutas = INTERVALOFRUTAS;
var muriendo = false;
var tiempoMuriendo = 0;
var reloj = 0;
var nivel = 1;
var vidasExtras = 0;
var sonidoMusica;
var sonidoMorir;
var sonidoComeFruta;
var sonidoComeFantasma;
var sonidoComePunto;
var sonidoVidaExtra;
var sonidoComePunto;
var sonidoSirena;
var alertas = [];
var finalPartida = false;

function inicializarJuego() 
{
    setInterval(cronometro, 1000);
    //Crear el Comecocos
    comeCocos = new Comecocos(ANCHOBICHOS/2, Math.round((EJESX[4]+EJESX[5])/2), EJESY[7]);
    //Crear los 4 fantasmas
    fantasmas.push(new Fantasma(ANCHOBICHOS, ANCHOBICHOS, "#F01702", BLC, BUC, "UNO",1));
    fantasmas.push(new Fantasma(ANCHOBICHOS, ANCHOBICHOS, "#FF9F00", BRC, BUC, "DOS",1));
    fantasmas.push(new Fantasma(ANCHOBICHOS, ANCHOBICHOS, "#55EDF9", BRC, BDC, "TRES",1));
    fantasmas.push(new Fantasma(ANCHOBICHOS, ANCHOBICHOS, "#FFA39C", BLC, BDC, "CUATRO",1));
    //Crear la fruta
    //frutas.push(new fruta(ANCHOBICHOS, ANCHOBICHOS, Math.round((EJESX[4]+EJESX[5])/2), EJESY[5], CEREZA, 500));
    //Cargar Sonidos
    sonidoMusica = new Sonido("sound/pacman-song.mp3");
    sonidoMorir = new Sonido("sound/pacman-dies.mp3");
    sonidoComeFruta = new Sonido("sound/pacman-eating-cherry.mp3");
    sonidoComeFantasma = new Sonido("sound/pacman-eating-ghost.mp3");
    sonidoComePunto = new Sonido("sound/pacman-waka-waka.mp3",10.0);
    sonidoVidaExtra = new Sonido("sound/pacman-extra-live.mp3");
    sonidoComePunto = new Sonido("sound/pacman-waka-waka.mp3");
    sonidoSirena = new Sonido("sound/pacman-siren.mp3");
    //Crear los puntos
    crearPuntos();
    //Crear el juego e iniciarlo
    pantalla = new Pantalla();
    alertas.push(new Alerta('LEVEL '+nivel));
    pantalla.iniciar();
    sonidoMusica.iniciar();
}
function crearPuntos()
{
    let i=0;
    for (y=0;y<29;y++)
    {
        for (x=0;x<26;x++)
        {
            if (MATRIZPUNTOS[i]!=0) 
            {
                ejex=EJESX[0]+(ANCHOBICHOS/2)+(x*18);
                ejey=EJESY[0]+(ANCHOBICHOS/2)+(y*16);
                puntos.push(new Punto(5*MATRIZPUNTOS[i],5*MATRIZPUNTOS[i],ejex,ejey,MATRIZPUNTOS[i]));
            }
            i++;
        }
    }
}
function actualizarPantalla() 
{
    pantalla.actualizarPantalla();
}
function informar(texto, capa='detalles', longitud  = 100)
{
    informe = document.getElementById(capa)
    if (capa=='detalles')
    {
        informe.innerHTML = texto+"<br>"+informe.innerHTML.substr(0, longitud);
    }
    else 
    {
        informe.innerHTML = texto;
    }
}
function cronometro()
{
    reloj++;
    informar("Reloj="+reloj,"reloj");
}
