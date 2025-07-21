const imagenesACargar = [
  './img/000.jpg', './img/001.jpg', './img/002.jpg', './img/003.jpg',
  './img/004.jpg', './img/005.jpg', './img/006.jpg', './img/007.jpg',
  './img/008.jpg', './img/009.jpg', './img/010.jpg', './img/011.jpg',
  './img/012.jpg', './img/013.jpg', './img/014.jpg', './img/015.jpg',
  './img/016.jpg', './img/017.jpg', './img/018.jpg', './img/018.png',
];

const audios = [
  './audio/audioUno.mp3',
  './audio/audioDos.mp3',
  './audio/audioTres.mp3',
  './audio/audioCuatro.mp3',
  './audio/audioCinco.mp3',
  './audio/audioPunto.mp3',
  './audio/GameOver.mp3',
  './audio/win.mp3'
];

const precargarImagenes = () => {
  const promesas = imagenesACargar.map((url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = resolve;
    });
  });
  return Promise.all(promesas);
};

const precargarAudios = () => {
  const promesas = audios.map((url) => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.src = url;
      audio.oncanplaythrough = resolve;
      audio.onerror = resolve;
    });
  });
  return Promise.all(promesas);
};

const esperar = (milisegundos) =>
  new Promise((resolve) => setTimeout(resolve, milisegundos));

window.addEventListener('load', async () => {
  await Promise.all([
    precargarImagenes(),
    precargarAudios(),
    esperar(5000) // spinner al menos 5 segundos
  ]);

  const textoCarga = document.querySelector('.texto-carga');
  const botonInicio = document.getElementById('boton-inicio');

  textoCarga.style.display = 'none';
  botonInicio.style.display = 'block';

  botonInicio.addEventListener('click', () => {
    document.getElementById('pantalla-carga').style.display = 'none';
    document.getElementById('contenedor-juego').style.display = 'block';

    // Delegar el manejo de la música al otro script
    if (typeof reproducirSiguiente === 'function') {
      reproducirSiguiente();
    }
  });
});
// Al final de preload.js, añade:
function precargarImagenesGaleria() {
  const imagenes = [
    './img/000.jpg', './img/001.jpg', './img/002.jpg', './img/003.jpg',
    './img/004.jpg', './img/005.jpg', './img/006.jpg', './img/007.jpg',
    './img/008.jpg', './img/009.jpg', './img/010.jpg', './img/011.jpg',
    './img/012.jpg', './img/013.jpg', './img/014.jpg', './img/015.jpg',
    './img/016.jpg', './img/017.jpg', './img/018.jpg', './img/018.png',
  ];
  
  imagenes.forEach(src => {
    new Image().src = src;
  });
}

// Llamar a la función al inicio
precargarImagenesGaleria();