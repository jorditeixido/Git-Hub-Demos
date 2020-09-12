/*
Esta funcion actua como un objeto y controla a los fantasmas del juego
Cada fantasma se mueve libremente por la pantalla respetando siempre el circuito
Si se topan con el ComeCocos lo matan, pero si el ComeCocos se ha comido un superpunto
dispone de cierto tiempo para cazar a los fantasmas (que se mostrarán azules)
Los fantasmas que sean cazados regresaran automáticamente al cementerio (casilla 
central) y deberán permanecer allí hasta revivir al cierto tiempo.
*/
function Fantasma(ancho, alto, color, x, y, nombre,lentitud) 
{
    // VARIABLES
    this.xInicial=x; //Define la posición x de reinicio
    this.yInicial=y; //Define la posición y de reinicio
    this.nombre = nombre; //Define el nombre de Fantasma y su comportamiento
    this.ancho = ancho; //Define el ancho del fantasma
    this.alto = alto; //Define el alto del fantasma
    this.x = x; //Define la posición X actual
    this.y = y; //Define la posición Y actual
    this.lentitud = lentitud; //Define la lentitud del fantasma
    this.direccion; // Define la dirección absoluta U (UP), D (DOWN), L (LEFT) o R (RIGHT)
    this.direccionX; // Define los saltos de X por cada paso
    this.direccionY; // Define los saltos de Y por cada paso
    this.color = color; // Define su color
    this.tiempoMuerto; // Define el tiempo que dura muerto antes de resucitar
    this.intermitenciaColor = true; //Define la intermitencia del color al final de tiempoMuerto
    this.tiempoIntermitencia = 0; //Define la duracción de la intermitencia
    this.vivo = true; // Define si está vivo o muerto 
    this.pasos = 0; // Define los pasos que da antes de cambiar aleatoriamente de rumbo
    this.enCementerio = true; //Define si se encuentra en la zona del cementerio
    this.ondulacionSabana=true; //Define la ondulación de su sábana alternativamente

    //FUNCIONES
    this.reiniciar = function()
    {
        this.x = this.xInicial;
        this.y = this.yInicial;
        this.intermitenciaColor = true; 
        this.tiempoIntermitencia = 0; 
        this.vivo = true; 
        this.pasos = 0; 
        this.enCementerio = true; 
        this.ondulacionSabana=true; 
    }
    //Devuelve una dirección al azar entre las 2 dadas
    this.direccionAzar = function (a,b)
    {
        let opciones=[a,b];
        let azar=Math.round(Math.random());
        return opciones[azar];
    }
    //Define su dirección inicial en relación a su posición actual
    this.orientar = function()
    {
        this.pasos = 1 + Math.round((Math.random() * 1000));
        if (this.estaEnCruce()) 
        {
            this.direccionInicial();
        } 
        else 
        {
            if (EJESY.includes(this.y))
            {
                this.direccion=this.direccionAzar('L','R');
            } else if (EJESX.includes(this.x)) 
            {
                this.direccion=this.direccionAzar('D','U');
            }
        }
    }
    //Devuelve si se encuentra en un cruce entre un ejeX y un ejeY
    this.estaEnCruce = function()
    {
        var estaEnCruce = false;
        if (EJESX.includes(this.x) && EJESY.includes(this.y)) {
            estaEnCruce = true;
        }
        return estaEnCruce;
    }
    //Devuelve la dirección inversa de la actual
    this.direccionInversa = function()
    {
        let direccionInversa="";
        switch(this.direccion)
        {
            case "U":
                direccionInversa="D";
                break;
            case "D":
                direccionInversa="U";
                break;
            case "L":
                direccionInversa="R";
                break;
            case "R":
                direccionInversa="L";
                break;
        }
        return direccionInversa;
    }
    //Invierte la dirección actual
    this.invertirDireccion = function()
    {
        //this.direccion=this.direccionInversa(this.direccion);
        this.direccion=DIRECCIONINVERSA[this.direccion];
        this.direccionar();
    }
    //Define los movimientos en X e Y según la dirección
    this.direccionar = function ()
    {
        switch(this.direccion)
        {
            case "U":
                this.direccionX=0;
                this.direccionY=-1;
                break;
            case "D":
                this.direccionX=0;
                this.direccionY=1;
                break;
            case "L":
                this.direccionX=-1;
                this.direccionY=0;
                break;
            case "R":
                this.direccionX=1;
                this.direccionY=0;
                break;
        }
    }
    //Establece una dirección inicial en relación al cruce en el que está creado
    this.direccionInicial = function ()
    {
        let indexX=EJESX.indexOf(this.x);
        let indexY=EJESY.indexOf(this.y);
        let opciones=CRUCES[indexX+(10*indexY)];    
        let azar=Math.round(Math.random()*(opciones.length-1));
        let direccion=opciones[azar];
        this.direccion=direccion;
        this.invertirDireccion();
    }
    //Define la dirección al llegar a un cruce
    this.pasarCruce = function ()
    {
        this.direccion=this.elegirDireccion();
        this.direccionar();
    }
    //Devuelve la dirección desde el cruce en el que está
    this.elegirDireccion = function()
    {
        let indexX=EJESX.indexOf(this.x);
        let indexY=EJESY.indexOf(this.y);
        let direccion="";
        if (this.vivo==true) 
        {
            do 
            {
                let opciones=CRUCES[indexX+(10*indexY)]; 
                let azar=0;
                azar=Math.round(Math.random()*(opciones.length-1));
                direccion=opciones[azar];
            } while (direccion==this.direccionInversa())
        }
        else //this.alive==false 
        {
            direccion=RETORNO[indexX+(10*indexY)];
        }   
        return direccion;
    }
    //Controla el movimiento del Fantasma según su estado y situación
    this.mover = function() 
    {
        if (reloj%this.lentitud==0) 
        {
            if (this.vivo==false && this.x==CEMENTERIO['x'] && this.y==CEMENTERIO['y'])
            {
                this.enCementerio=true;
            }
            if (this.enCementerio==true) 
            {
                this.movimientoCementerio();
            } else 
            {
                if (this.estaEnCruce()) 
                {
                    this.pasarCruce();
                } 
                if (EJESY.includes(this.y)) 
                {
                    this.x += this.direccionX;
                    this.siHiperEspacio();
                } 
                if (EJESX.includes(this.x)) 
                {
                    this.y += this.direccionY;
                }
            }
        }
        this.actualizar();
    }
    //Controla el paso del tunel de hiperEspacio
    this.siHiperEspacio = function()
    {
        if (this.y==EJESY[4]) //Puede estar en el tunel de Hiperespacio
        {
            if(this.x==-(2*ANCHOBICHOS) && this.direccionX==-1) {this.x=ANCHO+(2*ANCHOBICHOS);}
            if(this.x==(ANCHO+(2*ANCHOBICHOS)) && this.direccionX==1) {this.x=-(2*ANCHOBICHOS)}
        }
    }
    //Controla el movimiento especial para entrar, permanecer y salir del cementerio
    this.movimientoCementerio = function()
    {
        if (this.vivo==true && this.x==CEMENTERIO['x'] && this.y==CEMENTERIO['y'])
        {
            this.direccion=this.direccionAzar('L','R');
            this.enCementerio=false;
            this.direccionar();
        }
        else if (this.vivo==false && this.x==CEMENTERIO['x'] && this.y==CEMENTERIO['y'])
        {
            this.direccion="D";
            this.direccionar();
        } else if (this.vivo==true && this.x==CEMENTERIO['x'] && this.y==BUC) 
        {
            this.direccion="U";
            this.direccionar();
        } else if (this.vivo==false && this.x==CEMENTERIO['x'] && this.y==BUC) 
        {
            this.direccion="R";
            this.direccionar();
        } else if (this.x==BRC && this.y==BUC) 
        {
            this.direccion="D";
            this.direccionar();
        } else if (this.x==BRC && this.y==BDC) 
        {
            this.direccion="L";
            this.direccionar();
        } else if (this.x==BLC && this.y==BDC) 
        {
            this.direccion="U";
            this.direccionar();
        } else if (this.x==BLC && this.y==BUC) 
        {
            this.direccion="R";
            this.direccionar();
        }
        this.x=this.x+this.direccionX;
        this.y=this.y+this.direccionY;
        this.tiempoMuerto--;
        if (this.tiempoMuerto==0) 
        {
            this.revivir();
        }
    }
    //Controla los pasos en una dirección determinada antes de cambiar de sentido
    this.caminar = function()
    {
        if (this.pasos == 0) {
            this.orientar();
        }
        this.mover();
        this.pasos--;
    }
    //Define el color del fantasma en función del momento
    this.colorear = function()
    {
        var color;
        if (tiempoCaza==0)
        {
            color=this.color;
        } else 
        {
            if (tiempoCaza>250)
            {
                color="#0000FF";
            }
            else 
            {
                if (this.intermitenciaColor) {
                    color="#0000FF";
                    this.tiempoIntermitencia++;
                } else 
                {
                    color="#AAAABB";
                    this.tiempoIntermitencia++;
                }
                if (this.tiempoIntermitencia==(INTERMITENCIA/4)) {
                    this.intermitenciaColor=!this.intermitenciaColor;
                    this.tiempoIntermitencia=0;
                }
            }
        }
        return color;
    }
    //Pinta el fantasma en su nueva posición
    this.actualizar = function()
    {
        this.pintar();
    }
    //Elige el color del 
    this.pintar = function () 
    {
        let ctx = pantalla.context;
        let matriz;
        //Solo se dibuja al fantasma cuando está vivo
        if (this.vivo==true) 
        {
            //El color depende del tiempo de caza
            ctx.fillStyle = this.colorear();
            if (this.ondulacionSabana) {matriz = FANTASMA1;} 
                                  else {matriz = FANTASMA2;}
            this.ondulacionSabana=!this.ondulacionSabana;
            //Rellenear Matriz
            for (y=0;y<20;y++) 
            {
                for (x=0;x<20;x++)
                {
                    if (matriz[x+(20*y)]==1)
                    {
                        ctx.fillRect(this.x+x, this.y+y, 1, 1);    
                    }
                }
            }
        } 
        this.pintarOjos();
    }
    //Pinta los ojos del fantasma según su dirección 
    this.pintarOjos = function()
    {
        let ctx = pantalla.context;
        let posicionX=6;
        let variacionX=0;
        let posicionY=6;
        let variacionY=0;
        let separacion=8;

        switch (this.direccion) 
        {
            case 'U':
                variacionY=-2;
                break;
            case 'D':
                variacionY=+2;
                break;
            case 'L':
                variacionX=-2;
                break;
            case 'R':
                variacionX=+2;
                break;
        }
        for (let i=0;i<=1;i++)
        {
            ctx.beginPath();
            ctx.arc(this.x+posicionX+variacionX+(i*separacion), 
                    this.y+posicionY+variacionY, 3, 0, 2*Math.PI);
            ctx.fillStyle = '#FEFFFF';
            ctx.fill();
        }
        this.pintarPupilas(posicionX,variacionX,posicionY,variacionY);
    }
    //Pinta las pupilas del fantasma según su dirección 
    this.pintarPupilas = function(posicionX,variacionX,posicionY,variacionY)
    {
        let ctx = pantalla.context;
        let separacion=8;

        for (let i=0;i<=1;i++)
        {
            ctx.beginPath();
            ctx.arc(this.x+posicionX+(2*variacionX)+(i*separacion), this.y+posicionY+(2*variacionY), 1, 0, 2*Math.PI);
            ctx.fillStyle = '#103196';
            ctx.fill();
        }
    }
    //Mata al fantasma cazado
    this.matar = function()
    {
        sonidoComeFantasma.iniciar();
        this.vivo=false;
        this.tiempoMuerto=TIEMPOMUERTO;
    }
    //Revive al fantasma
    this.revivir = function ()
    {
        this.vivo=true;
    }
}
