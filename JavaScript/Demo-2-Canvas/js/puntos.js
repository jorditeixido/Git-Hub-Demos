function Punto(ancho, alto, x, y, tipo) 
{
    //variables
    this.ancho = ancho;
    this.alto = alto;
    this.x = x;
    this.y = y;
    this.tipo = tipo;
    this.intermitencia = true;
    this.tiempoIntermitencia = 0;

    this.pintar = function()
    {
        let ctx = pantalla.context;
        ctx.beginPath();
        ctx.fillStyle = COLORPUNTOS;
        if (tipo == 1) 
        {
            radio = tipo;
        } else 
        {
            if (this.intermitencia) {
                radio = RADIOPUNTOAUMENTADO;
                this.tiempoIntermitencia++;
            } else 
            {
                radio = RADIOPUNTOREDUCIDO;
                this.tiempoIntermitencia++;
            }
            if (this.tiempoIntermitencia==INTERMITENCIA) {
                this.intermitencia=!this.intermitencia;
                this.tiempoIntermitencia=0;
            }
        }
        ctx.arc(this.x, this.y, radio, 0, 2*Math.PI);
        ctx.fill();
    }
}
