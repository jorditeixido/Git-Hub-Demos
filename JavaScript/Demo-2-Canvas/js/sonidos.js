function Sonido(src,velocidad = 1) {
    this.sonido = document.createElement("audio");
    this.sonido.src = src;
    this.playbackRate = velocidad;
    this.sonido.setAttribute("preload", "auto");
    this.sonido.setAttribute("controls", "none");
    this.sonido.style.display = "none";
    this.ultimo = -2*CADENCIASONIDO;
    document.body.appendChild(this.sonido);
    this.iniciar = function()
    {
        if (reloj - this.ultimo > CADENCIASONIDO)
        {
            this.sonido.play();
            this.ultimo = reloj;
        }
    }
    this.parar = function()
    {
        this.sonido.pause();
    }
    this.acelerar = function()
    {
        this.playbackRate = 2;
    }
  }