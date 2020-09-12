function Pantalla() 
{
    this.canvas = document.createElement("canvas");
    this.fondo = new Image();//Define la imagen de fondo de la pantallas
    this.fondo.src = 'img/fondo.jpg';
    this.context;
    this.interval;

    this.iniciar = function() 
    {
        this.canvas.width = ANCHO;
        this.canvas.height = ALTO;
        this.context = this.canvas.getContext("2d");
        this.context.drawImage(this.fondo, 0, 0);
        document.getElementById('centro').appendChild(this.canvas);
        this.interval  = setInterval(actualizarPantalla, velocidad);
        window.addEventListener('keydown', function (e) 
        {
            pantalla.keys = (pantalla.keys || []);
            pantalla.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) 
        {
            pantalla.keys[e.keyCode] = false;
        })
    },
    this.limpiar = function() 
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.pintar = function ()
    {
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 500, ANCHO, 50);
        this.context.drawImage(this.fondo, 0, 0);
        this.context.font = "30px Comic Sans MS";
        this.context.fillStyle = "#FEFEFE";
        this.context.fillText("SCORE ",10,535);
        this.context.fillText("LIVES ",270,535);
        this.context.fillStyle = "#FFF42A";
        this.context.fillText(puntuacion,125,535);
        this.context.fillText(vidas,375,535);
    }
    this.controlarPuntos = function ()
    {
        if (this.finalPuntos()) 
        {
            this.subirNivel();
        } 
        else 
        {
            this.procesarPuntos();
        }
    }
    this.subirNivel = function ()
    {
        if (nivel < 25)
        {
            nivel++;
            velocidad = velocidad - (Math.floor( nivel / ACELERADORNIVEL ));
        }
        this.reinicarFantasmas();
        comeCocos.reiniciar();
        crearPuntos();
        tiempoCaza = 0;
        informar("Nivel=" + nivel,"nivel");
        informar("Velocidad=" + velocidad,"velocidad");
        alertas.push(new Alerta('LEVEL '+nivel));
    }
    this.controlarCarteles = function ()
    {
        this.mostrarCarteles();
    }
    this.controlarComecocos = function ()
    {
        if (!muriendo)
        {
            pantalla.detectarTeclas();
            comeCocos.caminar();
        }
    }
    this.controlarMuerte = function()
    {
        if (muriendo)
        {
            tiempoMuriendo++;
            let faseMuerte=Math.floor(tiempoMuriendo/(INTERMITENCIA/5));
            switch (faseMuerte)
            {
                case 0:
                    comeCocos.direccion='U';
                    comeCocos.matriz=COMECOCOS[0];
                    this.mostrarComecocos();
                    this.mostrarFantasmas()
                    this.mostrarCarteles();
                    break;
                case 1:
                    comeCocos.matriz=COMECOCOS[2];
                    this.mostrarComecocos();
                    this.mostrarCarteles();
                    break;
                case 2:
                    comeCocos.matriz=COMECOCOS[3];
                    this.mostrarComecocos();
                    this.mostrarCarteles();
                    break;
                case 3:
                    comeCocos.matriz=COMECOCOS[4];
                    this.mostrarComecocos();
                    break;
                case 4:
                    comeCocos.matriz=COMECOCOS[5];
                    this.mostrarComecocos();
                    break;
                case 5:
                    comeCocos.matriz=COMECOCOS[6];
                    this.mostrarComecocos();
                    break;
                case 6:
                    if (vidas > 0) 
                        {
                            comeCocos.direccion='R';
                            pantalla.reinicarFantasmas();
                            comeCocos.reiniciar();
                            this.mostrarComecocos();
                            muriendo=false;
                        }
                        else 
                        {
                            finalPartida = true;
                        }
                    break;
                    }
        }
    }
    this.mostrarComecocos = function()
    {
        comeCocos.pintar();
    }
    this.controlarPantalla = function()
    {
        this.limpiar();
        this.pintar();
    }
    this.controlarFruta = function()
    {
        tiempoFruta++;
        if (frutas.length > 0) 
        {
            frutas[0].pintar();
            if (comeCocos.toparCon(frutas[0]))
            {
                puntuacion = puntuacion + frutas[0].puntos;
                carteles.push(new Cartel(frutas[0].puntos, frutas[0].x, frutas[0].y)); 
                frutas.splice(0, 1);   
                tiempoFruta = 0;
            }
            if (tiempoFruta == PERMANENCIAFRUTAS)
            {
                frutas.splice(0, 1);
                tiempoFruta = 0;
            }
        }
        else
        {
            if (tiempoFruta==INTERVALOFRUTAS)
            {
                frutas.push(new Fruta(ANCHOBICHOS, ANCHOBICHOS, Math.round((EJESX[4]+EJESX[5])/2), EJESY[5], CEREZA, 2000));
                frutas[0].pintar();
                tiempoFruta=0;
            }
        }
    }
    this.controlarTiempoCaza = function()
    {
        if (tiempoCaza>0) {
            sonidoSirena.parar();
            tiempoCaza--;
        } else {
            sonidoSirena.iniciar();
        }
    }
    this.mostrarFantasmas = function()
    {
        fantasmas.forEach(mostrarFantasma)
        function mostrarFantasma(fantasma) {
            fantasma.actualizar();
        }
    }
    this.detectarTeclas = function ()
    {
        //comeCocos.direccionX = 0;
        //comeCocos.direccionY = 0;
        if (pantalla.keys && pantalla.keys[37]) {comeCocos.direccionar('L');}
        if (pantalla.keys && pantalla.keys[39]) {comeCocos.direccionar('R');}
        if (pantalla.keys && pantalla.keys[38]) {comeCocos.direccionar('U');}
        if (pantalla.keys && pantalla.keys[40]) {comeCocos.direccionar('D');}
    }
    this.mostrarCarteles = function()
    {
        carteles.forEach(procesarCartel)
        function procesarCartel(cartel) 
        {
            let i = 0;
            if (cartel.permanencia < (INTERMITENCIA*2))
            {
                cartel.mostrar();
            }
            else 
            {
                carteles.splice(i,1);
            }
            i++;
        }
    }
    this.finalPuntos = function ()
    {
        let finalPuntos=false;
        if (puntos.length==0) {
            finalPuntos=true;
        }   
        return finalPuntos;
    }
    this.procesarPuntos = function ()
    {
        for (i=0;i<puntos.length;i++)
        {
            puntos[i].pintar();
            if (comeCocos.toparCon(puntos[i])) 
            {
                sonidoComePunto.iniciar();
                if (puntos[i].tipo==2) {
                    tiempoCaza=1000;
                    puntosXfantasma=200;
                    puntuacion=puntuacion+50;
                }
                puntos.splice(i,1);
                puntuacion=puntuacion+10;
            }
        }
    }
    this.detenerFantasmas = function()
    {
        fantasmas.forEach(detenerFantasma)
        function detenerFantasma(fantasma)
        {
            fantasma.stop=true;
        }
    }
    this.controlarFantasmas = function()
    {
        if (!muriendo)
        {
            fantasmas.forEach(caminarFantasmas)
            function caminarFantasmas(fantasma) 
            {
                fantasma.caminar();
                if (comeCocos.toparCon(fantasma))
                {
                    if (tiempoCaza > 0) 
                    {
                        if (fantasma.vivo == true) 
                        {
                            puntuacion = puntuacion + puntosXfantasma;
                            carteles.push(new Cartel(puntosXfantasma, fantasma.x, fantasma.y));
                            puntosXfantasma=puntosXfantasma * 2;    
                            fantasma.matar();
                        }
                    } 
                    else 
                    {
                        comeCocos.morir();
                        pantalla.detenerFantasmas();
                    }
                }
            }
        }
    }
    this.reinicarFantasmas = function()
    {
        fantasmas.forEach(reinicarFantasma)
        function reinicarFantasma(fantasma)
        {
            fantasma.reiniciar();
        }
    }
    this.controlarPuntuacion = function()
    {
        let extras = Math.floor(puntuacion / PUNTOSVIDAEXTRA);
        let extra = extras - vidasExtras;
        if (extra>0) 
        {
            this.vidaExtra(extra);
        }
    }
    this.vidaExtra = function(extra)
    {
        sonidoVidaExtra.iniciar();
        vidas = vidas + extra;
        vidasExtras = vidasExtras + extra;
        alertas.push(new Alerta('EXTRA LIVE'));
    }
    this.controlarNivel = function()
    {
        informar('Nivel='+nivel, 'nivel');
    }
    this.controlarVelocidad = function()
    {
        informar('Velocidad='+velocidad, 'velocidad');
    }
    this.controlarReloj = function()
    {
        informar('')
    }
    this.finalPartida = function()
    {
        return finalPartida;
    }
    this.finalizarPartida = function()
    {
        alertas.splice(0,alertas.length);
        alertas.push(new Alerta('GAME OVER'));
        this.controlarPantalla();
        this.controlarAlertas();
        this.procesarPuntos();
        comeCocos.matriz=COMECOCOS[0];
        this.mostrarComecocos();
        this.mostrarFantasmas()
    }
    this.controlarAlertas = function()
    {
        if (alertas.length > 0)
        {
            if (reloj - alertas[0].reloj > 2) 
            {
                alertas.splice(0, 1);
            } 
            else 
            {
                alertas[0].mostrar();
            }
        }
    }
    this.actualizarPantalla = function() 
    {
        if (!this.finalPartida())
        {
            this.controlarPantalla();
            this.controlarAlertas();
            this.controlarVelocidad();
            this.controlarMuerte();
            this.controlarNivel();
            this.controlarPuntuacion();
            this.controlarFruta();
            this.controlarPuntos();
            this.controlarTiempoCaza();
            this.controlarFantasmas();
            this.controlarComecocos();
            this.controlarCarteles();
            this.controlarReloj();
        }
        else 
        {
            this.finalizarPartida();
        }
    }
}
