const textoEncriptado = document.getElementById('texto_encriptado');
const mensajeError = document.getElementById('error_en_pantalla');
const mensajeUsuario = document.getElementById('input-user');
const botonDesencriptar = document.getElementById('boton_desencriptar');
const textoParaCopiar = document.getElementById('texto_encriptado');
const botonCopiar = document.getElementById('boton-copiar')

const eliminarAcentos = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const verificaCaracteres = (texto) => {
    const mayusculas = /[A-Z]/;
    const acentos = /[áéíóúÁÉÍÓÚ]/;
    return mayusculas.test(texto) || acentos.test(texto);
}

const encriptarTexto = () => {
    const botonCopiarTexto = document.getElementById('boton-copiar')
    const tituloTextoEncriptado = document.getElementById('titulo_texto_encriptado');
    let texto = mensajeUsuario.value;

    botonCopiar.innerText = 'Copiar texto'

    if (!texto) {
        return
    }

    if (verificaCaracteres(texto)) {
        document.getElementById('error_en_pantalla').style.display = 'flex'
        return;
    }

    mensajeError.style.display = "none";

    texto = eliminarAcentos(texto.toLowerCase());

    const reemplazos = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat',
    };

    const textoModificado = texto.replace(/[aeiou]/g, letras => reemplazos[letras]);

    botonDesencriptar.removeAttribute('disabled');
    botonCopiarTexto.removeAttribute('hidden')
    tituloTextoEncriptado.removeAttribute('hidden')

    textoEncriptado.innerText = textoModificado;
}

const desencriptarTexto = () => {
    let texto = mensajeUsuario.value;

    botonCopiar.innerText = 'Copiar texto'

    if (!texto) {
        return
    }
    if (verificaCaracteres(texto)) {
        document.getElementsByClassName('alerta_en_pantalla').style.display = 'fixed'
        return;
    }


    texto = eliminarAcentos(texto.toLowerCase());

    const reemplazosInvertidos = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u',
    };

    const textoModificado = texto.replace(/enter|imes|ai|ober|ufat/g, letras => reemplazosInvertidos[letras]);

    textoEncriptado.innerText = textoModificado;
}

botonCopiar.addEventListener('click', () => {
    const texto = textoParaCopiar.innerText;

    navigator.clipboard.writeText(texto)
    if (!texto) {
        alert('Error al copiar en el portapapeles, no existe texto')
    }
    else if (texto) {
        botonCopiar.innerText = '¡Copiado!'
    }
});

const cerrarMensaje = () => {
    document.getElementById('error_en_pantalla').style.display = 'none';
}