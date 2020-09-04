function punto(width, height, x, y, type) 
{
    //variables
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.type = type;
    this.update = function()
    {
        let ctx = miZonaJuego.context;
        ctx.fillStyle = "#E8E8E8";
        if (type==1)
        {
            ctx.fillRect(this.x, this.y, this.width, this.height);

        } else 
        {
            ctx.fillRect(this.x-3, this.y-3, this.width, this.height);
        }
    }
}