function Comecocos(radio, x, y) 
{
    //variables
    this.radio = radio;
    this.x = x;
    this.y = y; 
    this.ctx;
    this.direccion = "R";
    this.direccionX = 0;
    this.direccionY = 0;
    this.sentidos=['L','R'];
    this.vivo = true;
    this.boca = 0;
    this.tiempoIntermitencia = 0;
    this.matriz = COMECOCOS[0];

    //funciones
    this.datosCruce = function()
    {
        let minimoX = ANCHO;
        let minimoY = ALTO;
        let ejeX;
        let ejeY;
        let i;
        let datosCruce = [];//{true,ejeX,ejeY,diferenciaX,diferenciaY}/{false}

        for ( i = 0 ; i < EJESX.length ; i++ ) 
        {
            if (Math.abs( EJESX[i] - this.x ) < minimoX )
            {
                minimoX = Math.abs( EJESX[i] - this.x );
                ejeX = EJESX[i];
            }
        }
        for (i = 0 ; i < EJESY.length ; i++) 
        {
            if (Math.abs( EJESY[i] - this.y ) < minimoY )
            {
                minimoY = Math.abs( EJESY[i] - this.y );
                ejeY = EJESY[i];
            }
        }
        if ( minimoX < TOLERANCIACRUCES && minimoY < TOLERANCIACRUCES ) 
        {
            //{true,ejeX,ejeY,diferenciaX,diferenciaY}
            datosCruce['esta'] = true;
            datosCruce['ejeX'] = ejeX;
            datosCruce['ejeY'] = ejeY;
            datosCruce['diferenciaX'] = this.x - EJESX[ejeX];
            datosCruce['diferenciaY'] = this.y - EJESY[ejeY];
        }
        else 
        {
            //{false}
            datosCruce['esta'] = false;
        }
        return datosCruce;
    }
    this.direccionar = function (direccion)
    {
        this.direccion = direccion;

        switch(this.direccion)
        {
            case "U":
                this.direccionX = 0;
                this.direccionY = -1;
                break;
            case "D":
                this.direccionX = 0;
                this.direccionY = 1;
                break;
            case "L":
                this.direccionX = -1;
                this.direccionY = 0;
                break;
            case "R":
                this.direccionX = 1;
                this.direccionY = 0;
                break;
        }
    }
    this.caminar = function () 
    {
        let datosCruce = this.datosCruce();
        if (datosCruce['esta']) 
        {
            //Comprobar que direccion puede tomar y permitir el movimiento
            let indexX = EJESX.indexOf( datosCruce['ejeX'] );
            let indexY = EJESY.indexOf( datosCruce['ejeY'] );
            let opciones = CRUCES[indexX + ( 10 * indexY ) ];
            this.sentidos = opciones;
        } 
        if (this.sentidos.includes('U') && this.direccionY == -1)
        {
            this.mover('U','D','y');
        } 
        else if (this.sentidos.includes('D') && this.direccionY == 1)
        {
            this.mover('D','U','y');
        } 
        else if (this.sentidos.includes('L') && this.direccionX == -1)
        {
            this.mover('L','R','x');
        } 
        else if (this.sentidos.includes('R') && this.direccionX == 1)
        {
            this.mover('R','L','x');
        }
        this.siHiperEspacio();
        this.actualizar();
    }
    this.mover = function(sentido0, sentido1, eje)
    {
        this.sentidos = [];
        this.sentidos[0] = sentido0;
        this.sentidos[1] = sentido1;
        switch (eje)
        {
            case 'x':
                this.x = this.x + this.direccionX;
                this.confirmarY();
                break;
            case 'y':
                this.y = this.y + this.direccionY;
                this.confirmarX();
                break;
        }
    }
    this.confirmarX = function ()
    {
        if (!EJESX.includes(this.x))
        {
            this.corregirX();
        }
    }
    this.confirmarY = function ()
    {
        if (!EJESY.includes(this.y))
        {
            this.corregirY();
        }
    }
    this.corregirX = function ()
    {
        let minimoX = ANCHO;
        let ejeX;
        let i;

        for (i = 0 ; i < EJESX.length ; i++) 
        {
            if (Math.abs( EJESX[i] - this.x ) < minimoX)
            {
                minimoX = Math.abs( EJESX[i] - this.x );
                ejeX = EJESX[i];
            }
        }
        this.x = ejeX;
    }
    this.corregirY = function ()
    {
        let minimoY = ALTO;
        let ejeY;
        let i;

        for (i = 0 ; i < EJESY.length ; i++) 
        {
            if (Math.abs(EJESY[i] - this.y) < minimoY)
            {
                minimoY = Math.abs(EJESY[i] - this.y);
                ejeY = EJESY[i];
            }
        }
        this.y = ejeY;
    }
    this.siHiperEspacio = function()
    {
        if (this.y == EJESY[4]) //Puede estar en el tunel de Hiperespacio
        {
            if (this.x == -(2 * ANCHOBICHOS) && this.direccionX == -1) 
                {this.x = ANCHO + (2 * ANCHOBICHOS);}
            if (this.x == (ANCHO + (2 * ANCHOBICHOS) ) && this.direccionX == 1) 
                {this.x = -(2 * ANCHOBICHOS);}
        }
    }
    this.actualizar = function()
    {
        //Solo se dibuja al Comecocos dependiendo de su dirección
        this.boca = Math.floor(this.tiempoIntermitencia / (INTERMITENCIA / 12));
        this.matriz = COMECOCOS[this.boca];
        this.tiempoIntermitencia++;
        if (this.tiempoIntermitencia > (INTERMITENCIA / 4) - 1) 
            {
                this.tiempoIntermitencia = 0;
            }    
        this.pintar();
    }
    this.pintar = function()
    {
        this.ctx = pantalla.context;
        this.ctx.fillStyle = "#FFF322";

        //Rellenear Matriz
        switch (this.direccion)
        {
            case "L":
                this.rellenarMatrizL();
                break;
            case "R":
                this.rellenarMatrizR();
                break;
            case "U":
                this.rellenarMatrizU();
                break;
            case "D":
                this.rellenarMatrizD();
                break;
            default:
                informar('fallo'+this.direccion+"<br>");
                break;
        }
    }
    this.rellenarMatrizR = function () 
    {
        for (y = 0 ; y < 20 ; y++) 
        {
            for (x = 0 ; x < 20 ; x++)
            {
                if (this.matriz[x + (20 * y)] == 1)
                {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);    
                }
            }
        } 
    }
    this.rellenarMatrizL = function () 
    {
        for (y = 0 ; y < 20 ; y++) 
        {
            for (x = 0 ; x < 20 ; x++)
            {
                if (this.matriz[x + (20 * y)] == 1)
                {
                    this.ctx.fillRect(this.x + (19 - x), this.y + y, 1, 1);    
                }
            }
        } 
    }
    this.rellenarMatrizU = function () 
    {
        for (x = 19 ; x >= 0 ; x--) 
        {
            for (y = 0 ; y < 20 ; y++)
            {
                if (this.matriz[x + (20 * y)] == 1)
                {
                    this.ctx.fillRect(this.x + y, this.y + (19 - x), 1, 1);    
                }
            }
        } 
    }
    this.rellenarMatrizD = function () 
    {
        for (x = 19 ; x >= 0 ; x--) 
        {
            for (y = 0 ; y < 20 ; y++)
            {
                if (this.matriz[x + (20 * y)] == 1)
                {
                    this.ctx.fillRect(this.x + y, this.y + x, 1, 1);    
                }
            }
        } 
    }
    this.toparCon = function(otroObjeto) 
    {
        let topar = true;
        
        let miIzquierda = this.x;
        let miDerecha = this.x + (2 * this.radio);
        let miSuperior = this.y;
        let miInferior = this.y + (2 * this.radio);
        let otroIzquierda = otroObjeto.x;
        let otroDerecha = otroObjeto.x + (otroObjeto.ancho);
        let otroSuperior = otroObjeto.y;
        let otroInferior = otroObjeto.y + (otroObjeto.alto);

        if (((miInferior < otroSuperior) ||
             (miSuperior > otroInferior) ||
             (miDerecha < otroIzquierda) ||
             (miIzquierda > otroDerecha))
            ||
            ((otroDerecha-miIzquierda < 4 && otroInferior-miSuperior < 4) ||
             (miDerecha-otroIzquierda < 4 && otroInferior-miSuperior < 4) ||
             (otroDerecha-miIzquierda < 4 && miInferior-otroSuperior < 4) ||
             (miDerecha-otroIzquierda < 4 && miInferior-otroSuperior < 4)))
        {
            topar = false;
        }
        return topar;
    }
    this.morir = function ()
    {
        sonidoMorir.iniciar();
        alertas.push(new Alerta("TRAPPED"));
        muriendo = true;
        tiempoMuriendo = 0;
        vidas--;
    }
    this.reiniciar = function ()
    {
        this.x = 3 + Math.round( (EJESX[4] + EJESX[5]) / 2);
        this.y = EJESY[7];
        this.sentidos = ['L', 'R'];
        this.matriz=COMECOCOS[0];
        this.direccionX = 0;
        this.direccionY = 0;
    }
    this.coordenadas = function()
    {
        let texto = "";
        texto += "x=" + comeCocos.x + "<br>";
        texto += "y=" + comeCocos.y + "<br>";
        texto += "direccionX=" + this.direccionX + "<br>";
        informar(texto);
    }
}
