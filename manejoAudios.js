// manejoAudios.js

const pistas = [
  './audio/audioDos.mp3',
  './audio/audioTres.mp3',
  './audio/audioCuatro.mp3',
  './audio/audioCinco.mp3',
  './audio/audioUno.mp3',
];

let indiceActual = 0;
let reproductor = new Audio();

function reproducirSiguiente() {
  reproductor.src = pistas[indiceActual];
  reproductor.play().catch((e) => {
    console.warn('Reproducción bloqueada hasta interacción del usuario');
  });

  reproductor.onended = () => {
    indiceActual = (indiceActual + 1) % pistas.length;
    reproducirSiguiente();
  };
}
function pausarMusica() {
  reproductor.pause();
}

function reanudarMusica() {
  reproductor.play().catch(() => {});
}
// Exportamos funciones globalmente
window.reproducirSiguiente = reproducirSiguiente;
window.pausarMusica = pausarMusica;
window.reanudarMusica = reanudarMusica;