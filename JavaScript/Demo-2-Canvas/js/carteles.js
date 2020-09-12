function Cartel(texto, x, y)
{
    this.texto = texto;
    this.x = x;
    this.y = y;
    this.fuente="px Comic Sans MS";
    this.color="#FEFEFE";

    this.ajusteX;
    this.ajusteY;
    this.fuente;
    this.permanencia = 0;

    let sizeMayor=20;
    let sizeMenor=15;
    let limiteFlashMin=50;
    let limiteFlashMax=100;
    
    this.mostrar = function ()
    {
        if (this.permanencia > limiteFlashMin && this.permanencia < limiteFlashMax) 
        {
            this.ajusteX = -10;
            this.ajusteY = 15;
            this.size = sizeMayor;
        }
        else 
        {
            this.ajusteX = -5;
            this.ajusteY = 15;
            this.size = sizeMenor;
        }
        this.escribir();
        this.permanencia++;
    }
    this.escribir = function ()
    {
        pantalla.context.font = this.size + this.fuente;
        pantalla.context.fillStyle = this.color;
        pantalla.context.fillText(this.texto, this.x + this.ajusteX, this.y + this.ajusteY);
    }
}

function Alerta(texto)
{
    let ajusteY = 22;
    
    this.texto = texto;
    let ajusteX = 9 * (10 - this.texto.length);

    this.x = EJESX[3]+ajusteX;
    this.y = EJESY[5]+ajusteY;
    this.reloj = reloj;
    this.size = 30;
    this.fuente = "px Comic Sans MS";
    this.color = "#FEFEFE";
    
    this.mostrar = function()
    {
        pantalla.context.font = this.size + this.fuente;
        pantalla.context.fillStyle = this.color;
        pantalla.context.fillText(this.texto, this.x, this.y);
    }
}
