function fantasma(width, height, color, colorDead, x, y, type) 
{
    //variables
    this.type=type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
        this.imageDead = new Image();
        this.imageDead.src = colorDead;
        this.imageScary = new Image();
        this.imageScary.src = 'img/fantasmaAsustado.jpg';
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.direccion;
    this.direccionX;
    this.direccionY;
    this.color = color;
    this.colorDead = colorDead;
    this.deadTime;
    this.alive = true;
    this.pasos = 0;
    this.cementerio = true;
    
    //funciones
    this.direccionAzar = function (a,b)
    {
        let opciones=[a,b];
        let azar=Math.round(Math.random());
        return opciones[azar];
    }
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
    this.estaEnCruce = function()
    {
        var estaEnCruce = false;
        if (EJESX.includes(this.x) && EJESY.includes(this.y)) {
            estaEnCruce = true;
        }
        return estaEnCruce;
    }
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
    this.invertirDireccion = function()
    {
        this.direccion=this.direccionInversa(this.direccion);
        this.direccionar();
    }
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
    this.pasarCruce = function ()
    {
        this.direccion=this.elegirDireccion();
        this.direccionar();
    }
    this.elegirDireccion = function()
    {
        let indexX=EJESX.indexOf(this.x);
        let indexY=EJESY.indexOf(this.y);
        let direccion="";
        if (this.alive==true) 
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
    this.moverComecocos = function () 
    {
        if (this.estaEnCruce()) 
        {
            //Comprobar que direccion puede tomar y permitir el movimiento
            let indexX=EJESX.indexOf(this.x);
            let indexY=EJESY.indexOf(this.y);
            let opciones=CRUCES[indexX+(10*indexY)];
            if (opciones.includes('U') && this.direccionY==-1)
            {
                this.y=this.y+this.direccionY;
            } else if (opciones.includes('D') && this.direccionY==1)
            {
                this.y=this.y+this.direccionY;
            } else if (opciones.includes('L') && this.direccionX==-1)
            {
                this.x=this.x+this.direccionX;
            } else if (opciones.includes('R') && this.direccionX==1)
            {
                this.x=this.x+this.direccionX;
            }
        } else 
        {
            if (EJESX.includes(this.x)) {
                this.y=this.y+this.direccionY;
                //informar('EJE X');
            } 
            if (EJESY.includes(this.y)) {
                this.x=this.x+this.direccionX;
                this.siHiperEspacio();
                //informar('EJE Y');
            }
        }
    }
    this.mover = function() 
    {
        if (this.alive==false && this.x==CEMENTERIO['x'] && this.y==CEMENTERIO['y'])
        {
            this.cementerio=true;
        }
        if (this.cementerio==true) 
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
    this.siHiperEspacio = function()
    {
        if (this.y==EJESY[4]) //Puede estar en el tunel de Hiperespacio
        {
            if(this.x==-(2*ANCHOBICHOS) && this.direccionX==-1) {this.x=ANCHO+ANCHOBICHOS;}
            if(this.x==(ANCHO+ANCHOBICHOS) && this.direccionX==1) {this.x=-(2*ANCHOBICHOS)}
        }
    }
    this.movimientoCementerio = function()
    {
        if (this.alive==true && this.x==CEMENTERIO['x'] && this.y==CEMENTERIO['y'])
        {
            this.direccion=this.direccionAzar('L','R');
            this.cementerio=false;
            this.direccionar();
        }
        else if (this.alive==false && this.x==CEMENTERIO['x'] && this.y==CEMENTERIO['y'])
        {
            this.direccion="D";
            this.direccionar();
        } else if (this.alive==true && this.x==CEMENTERIO['x'] && this.y==BUC) 
        {
            this.direccion="U";
            this.direccionar();
        } else if (this.alive==false && this.x==CEMENTERIO['x'] && this.y==BUC) 
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
        this.deadTime--;
        if (this.deadTime==0) 
        {
            this.revive();
        }
    }
    this.caminar = function()
    {
        if (this.pasos == 0) {
            this.orientar();
        }
        this.mover();
        this.pasos--;
    }
    this.colorear = function()
    {
        var color;
        if (this.alive)
        {
            color=this.color;
        } else 
        {
            color=this.colorDead;
        }
        return color;
    }
    this.update = function()
    {'img/fantasmaAsustado.jpg';
        let ctx = miZonaJuego.context;
        let image;
        if (type == "image") 
        {
            if (this.alive) {
                if (happyHour==0) {
                    image=this.image;
                }
                else 
                {
                    image=this.imageScary;
                }
            }
            else {
                image=this.imageDead;
            }
            ctx.drawImage(image,
              this.x,
              this.y,
              this.width, this.height);
        }
        else 
        {
            ctx.fillStyle = this.colorear();
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.kill = function()
    {
        this.alive=false;
        this.deadTime=DEADTIME;
    }
    this.revive = function ()
    {
        this.alive=true;
    }
    this.coordenadas = function()
    {
        let texto="";
        texto+="x="+comeCocos.x+"<br>";
        texto+="y="+comeCocos.y+"<br>";
        //informar(texto);
    }
}
