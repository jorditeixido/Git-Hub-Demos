const ANCHO = 500; //Ancho de la imagen de fondo
const ALTO = 500; //Alto de la imagen de fondo
const MINX = 12;
const MAXX = 462;
const EJESX = [MINX,48,102,156,210,264,318,372,426,MAXX]; //Puntos de intersección
const MINY = 15;
const MAXY = 463;
const EJESY = [MINY,79,127,175,223,271,319,367,415,MAXY]; //Puntos de intersección
//TIPOS DE CRUCES Y SUS ALIAS
const UP = ['U'];
const U = UP;
const DOWN = ['D'];
const D = DOWN;
const LEFT = ['L'];
const L = LEFT;
const RIGHT = ['R'];
const R = RIGHT;
const HORIZONTAL = ['L','R'];//Left & Right
const HRL=HORIZONTAL;
const VERTICAL = ['U','D'];//Up && Down
const VRL=VERTICAL;
const CRUZ = ['L','R','U','D'];
const CRZ=CRUZ;
const ESQUINASUPERIORIZQUIERDA = ['R','D'];
const ESI=ESQUINASUPERIORIZQUIERDA;
const ESQUINASUPERIORDERECHA = ['L','D'];
const ESD=ESQUINASUPERIORDERECHA;
const ESQUINAINFERIORIZQUIERDA = ['R','U'];
const EII=ESQUINAINFERIORIZQUIERDA;
const ESQUINAINFERIORIDERECHA = ['L','U'];
const EID=ESQUINAINFERIORIDERECHA;
const TEHACIAARRIBA = ['L','R','U'];
const TEU=TEHACIAARRIBA;
const TEHACIAABAJO = ['L','R','D'];
const TED=TEHACIAABAJO;
const TEHACIADERECHA = ['R','U','D'];
const TER=TEHACIADERECHA;
const TEHACIAIZQUIERDA = ['L','U','D'];
const TEL=TEHACIAIZQUIERDA;
const NOCRUCE="";
const NCR=NOCRUCE;
//CRUCES EXISTENTES EN LA IMAGEN DE FONDO
const CRUCES = [ESI,HRL,TED,HRL,ESD,ESI,HRL,TED,HRL,ESD,
                TER,HRL,CRZ,TED,TEU,TEU,TED,CRZ,HRL,TEL,
                EII,HRL,TEL,EII,ESD,ESI,EID,TER,HRL,EID,
                NCR,NCR,VRL,ESI,TEU,TEU,ESD,VRL,NCR,NCR,
                HRL,HRL,CRZ,TEL,NCR,NCR,TER,CRZ,HRL,HRL,
                NCR,NCR,VRL,TER,HRL,HRL,TEL,VRL,NCR,NCR,
                ESI,HRL,CRZ,TEU,ESD,ESI,TEU,CRZ,HRL,ESD,
                EII,ESD,TER,TED,TEU,TEU,TED,TEL,ESI,EID,
                ESI,TEU,EID,EII,ESD,ESI,EID,EII,TEU,ESD,
                EII,HRL,HRL,HRL,TEU,TEU,HRL,HRL,HRL,EID];
const RETORNO = ['R','R','D','L','D','D','L','D','L','L',
                'R','R','R','D','L','R','D','L','L','L',
                'R','R','U','R','D','D','L','U','L','L',
                '','','D','R','R','L','L','D','','',
                'R','R','R','U','','','U','L','L','L',
                '','','U','U','L','R','U','U','','',
                'R','R','U','U','L','R','U','U','L','L',
                'U','L','U','L','U','U','R','U','R','U',
                'R','R','U','U','L','R','U','U','L','L',
                'U','L','L','R','U','U','L','L','R','U',]
const CEMENTERIO = [];
CEMENTERIO['x'] = Math.round((EJESX[4]+EJESX[5])/2);
CEMENTERIO['y'] = EJESY[3];
const ANCHOBICHOS = 20; //Ancho de las imágenedes de los bichos
const BORDESUPERIORCEMENTERIO = EJESY[4] - (ANCHOBICHOS/2);
const BUC = BORDESUPERIORCEMENTERIO;
const BORDEINFERIORCEMENTERIO = EJESY[4] + (ANCHOBICHOS/2);
const BDC = BORDEINFERIORCEMENTERIO;
const BORDEIZQUIERDOCEMENTERIO = EJESX[4] -(ANCHOBICHOS/2);
const BLC = BORDEIZQUIERDOCEMENTERIO;
const BORDEDERECHOCEMENTERIO = EJESX[5] + (ANCHOBICHOS/2);
const BRC = BORDEDERECHOCEMENTERIO;
const BORDEIZQUIERDO = MINX; 
const BORDEDERECHO = MAXX; 
const BORDESUPERIOR = MINY; 
const BORDEINFERIOR = MAXY; 
const MATRIZPUNTOS = [1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
                      1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,
                      2,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,2,
                      1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,
                      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                      1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,
                      1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,
                      1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,
                      0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
                      0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
                      0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
                      0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
                      0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
                      0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
                      0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
                      0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
                      0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
                      0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
                      0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,
                      1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,
                      1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,
                      1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,
                      2,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1,2,
                      0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,
                      0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,
                      1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,
                      1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,
                      1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,
                      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
const DEADTIME = 500; //Tiempo que el bicho permanece muerto
var velocidad = 10;

