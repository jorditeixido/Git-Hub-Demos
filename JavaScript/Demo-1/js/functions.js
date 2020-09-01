//GESTIÓN DE FECHAS
//Inicializa variables globales del crono
var m = 0;
var s = 0;
var f = 0;
var idInterval = 0;

function gestionarCrono()
{
    mostrarCrono();
    if (idInterval < 1) //El Crono está parado
    {
        idInterval = setInterval(mostrarCrono, 10);
        cambiarTextoBoton('iniciarCrono', 'Parar');
        deshabilitarBoton('reiniciarCrono');
    } else //El crono está en marcha
    {
        clearInterval(idInterval);
        idInterval = 0;
        cambiarTextoBoton('iniciarCrono', 'Iniciar');
        habilitarBoton('reiniciarCrono');
    }
}
function mostrarCrono()
{
    let mAux, sAux, fAux;
    f++;
    if (f > 99) {s++; f = 0;}
    if (s > 59) {m++; s = 0;}
    if (m > 59) {m = 0;}

    if (f < 10) {fAux = "0" + f;} else {fAux = f;}
    if (s < 10) {sAux = "0" + s;} else {sAux = s;}
    if (m < 10) {mAux = "0" + m;} else {mAux = m;}

    document.getElementById("crono").innerHTML = mAux + ":" + sAux + ":" + fAux; 
}
function reiniciarCrono()
{
    clearInterval(idInterval);
    idInterval = 0;
    f = 0;
    s = 0;
    m = 0;
    document.getElementById("crono").innerHTML = "00:00:00";
    deshabilitarBoton('reiniciarCrono');
}

//GESTION DE IMÁGENES
function intercambiarImagen()
{
    let imagen = document.getElementById('imagen');
    let src = imagen.src;
    let arbol = src.substring(src.length - 5, src.length - 4);

    if (arbol == 1) 
    {
        imagen.src = "img/arbol2.jpg";
    }
    else 
    {
        imagen.src = "img/arbol1.jpg";
    }
}
function cambiarCapa(capa)
{
    const MOSTRAR = "Mostrar Capa";
    const OCULTAR = "Ocultar Capa";
    let estado = document.getElementById(capa).style.display;
    let texto = "";

    if (estado == "none")
    {
        mostrarCapa(capa);
        texto = OCULTAR;
    } else 
    {
        ocultarCapa(capa);
        texto = MOSTRAR;
    }
    cambiarTextoBoton('cambiarCapa',texto)
}

//GESTIÓN DE TEXTOS
function fontSize(i)
{
    const MAX = 20;
    const MIN = 10;
    const TEXTO = "Texto de prueba...";

    let texto = document.getElementById('texto');
    let fontSize = document.getElementById('fontSize').value;
    //Establece el nuevo valor manteniendo los límites entre MIN y MAX
    fontSize = Math.max(Math.min(Math.abs(fontSize) + i, MAX), MIN);
    
    if (fontSize == MIN) 
    {
        deshabilitarBoton('reducir');
    }
    else if (fontSize == MAX)
    {
        deshabilitarBoton('aumentar');
    } else 
    { 
        habilitarBoton('reducir');
        habilitarBoton('aumentar');
    }

    document.getElementById('fontSize').value = fontSize;
    texto.style.fontSize = fontSize + 'px';
    texto.innerHTML = TEXTO + " (" + fontSize + ")";
}
function cambiarColorTexto()
{
    let texto = document.getElementById('texto');
    let red = byte();
    let green = byte();
    let blue = byte();
    
    texto.style.color = rgb(red, green, blue);
    texto.style.background = rgb(invertir(red),invertir(green),invertir(blue))
}
function invertir(color)
{
    return 255 - color;
}
function byte()
{
    return Math.round(Math.random() * 255);
}
function rgb(red, green, blue)
{
    red = decimalToHex(red);
    green = decimalToHex(green);
    blue = decimalToHex(blue);
    return '#' + red + green + blue;
}
function decimalToHex(decimal) 
{
    decimal = decimal.toString(16);
    if (decimal.length==1) 
    {
        decimal = "0" + decimal;
    }
    return decimal;
}
function mayusculas()
{
    let texto = document.getElementById('texto');
    texto.innerHTML = texto.innerHTML.toLocaleUpperCase();
    cambiarTextoBoton('mayusculas','Minúsculas');
    document.getElementById('mayusculas').removeEventListener("click",mayusculas);
    document.getElementById('mayusculas').addEventListener("click",minusculas);
    cambiarBoton('mayusculas','btn-primary','btn-success');
}
function minusculas()
{
    let texto = document.getElementById('texto');
    texto.innerHTML = texto.innerHTML.toLocaleLowerCase();
    cambiarTextoBoton('mayusculas','Mayúsculas');
    document.getElementById('mayusculas').removeEventListener("click",minusculas);
    document.getElementById('mayusculas').addEventListener("click",mayusculas);
    cambiarBoton('mayusculas','btn-success','btn-primary');
}

// FUNCIONES COMUNES
function deshabilitarBoton(boton)
{
    boton = document.getElementById(boton);
    boton.disabled = true;
    boton.classList.remove('btn-primary');
    boton.classList.add('btn-secondary');
}
function habilitarBoton(boton)
{
    boton=document.getElementById(boton);
    boton.disabled = false;
    boton.classList.remove('btn-secondary');
    boton.classList.add('btn-primary');
}
function cambiarBoton(boton,antes,ahora)
{
    boton=document.getElementById(boton);
    boton.classList.remove(antes);
    boton.classList.add(ahora);
}
function mostrarCapa(capa)
{
    document.getElementById(capa).style.display = "block";
}
function ocultarCapa(capa)
{
    document.getElementById(capa).style.display = "none";
}
function cambiarTextoBoton(boton,texto)
{
    boton=document.getElementById(boton);
    boton.innerHTML = texto;
}
