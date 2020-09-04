function comecocos(width, height, color, colorDead, x, y, type) 
{
    //variables
    this.type=type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
        this.imageDead = new Image();
        this.imageDead.src = colorDead;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.direccion;
    this.direccionX;
    this.direccionY;
    this.sentidos=['L','R'];
    this.color = color;
    this.colorDead = colorDead;
    this.deadTime;
    this.alive = true;
    this.pasos = 0;
    this.cementerio = true;
    
    //funciones
    this.estaEnCruce = function()
    {
        var estaEnCruce = false;
        if (EJESX.includes(this.x) && EJESY.includes(this.y)) {
            estaEnCruce = true;
        }
        return estaEnCruce;
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
    this.mover = function () 
    {
        if (this.estaEnCruce()) 
        {
            //Comprobar que direccion puede tomar y permitir el movimiento
            let indexX=EJESX.indexOf(this.x);
            let indexY=EJESY.indexOf(this.y);
            let opciones=CRUCES[indexX+(10*indexY)];
            this.sentidos=opciones;
        } 
        if (this.sentidos.includes('U') && this.direccionY==-1)
            {
                this.sentidos=[];
                this.sentidos[0]='U';
                this.sentidos[1]='D';
                this.y=this.y+this.direccionY;
            } else if (this.sentidos.includes('D') && this.direccionY==1)
            {
                this.sentidos=[];
                this.sentidos[0]='D';
                this.sentidos[1]='U';
                this.y=this.y+this.direccionY;
            } else if (this.sentidos.includes('L') && this.direccionX==-1)
            {
                this.sentidos=[];
                this.sentidos[0]='L';
                this.sentidos[1]='R';
                this.x=this.x+this.direccionX;
            } else if (this.sentidos.includes('R') && this.direccionX==1)
            {
                this.sentidos=[];
                this.sentidos[0]='R';
                this.sentidos[1]='L';
                this.x=this.x+this.direccionX;
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
    this.update = function()
    {
        let ctx = miZonaJuego.context;
        let image;
        if (type == "image") 
        {
            if (this.alive) {
                image=this.image;
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
    this.crashWith = function(otherobj) 
    {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright))
        {
          crash = false;
        }
        return crash;
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
    this.dead = function ()
    {
        //informar('aqui');
        this.x=3+Math.round((EJESX[4]+EJESX[5])/2);
        this.y=EJESY[7];
        this.sentidos=['L','R'];
    }
    this.coordenadas = function()
    {
        let texto="";
        texto+="x="+comeCocos.x+"<br>";
        texto+="y="+comeCocos.y+"<br>";
        informar(texto);
    }
}
