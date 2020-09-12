function Fruta(ancho, alto, x, y, matriz, puntos) 
{
    this.ancho=ancho;
    this.alto=alto;
    this.x=x;
    this.y=y;
    this.matriz=matriz;
    this.puntos=puntos;

    this.pintar = function ()
    {
        let ctx = pantalla.context;
    
        //Rellenear Matriz
        for (y=0;y<20;y++) 
        {
            for (x=0;x<20;x++)
            {
                if (matriz[x+(20*y)]!=0)
                {
                    ctx.fillStyle = matriz[x+(20*y)];
                    ctx.fillRect(this.x+x, this.y+y, 1, 1);    
                }
            }
        }
    }
}
