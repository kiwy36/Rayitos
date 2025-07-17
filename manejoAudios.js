// manejoAudios.js

const pistas = [
    './audio/audioUno.mp3',
    './audio/audioDos.mp3',
    './audio/audioTres.mp3',
    './audio/audioCuatro.mp3',
    './audio/audioCinco.mp3',
];

let indiceActual = 0;
let reproductor = new Audio();

function reproducirSiguiente() {
  reproductor.src = pistas[indiceActual];
  reproductor.play();

  reproductor.onended = () => {
    indiceActual = (indiceActual + 1) % pistas.length;
    reproducirSiguiente();
  };
}

document.addEventListener('DOMContentLoaded', () => {
  reproducirSiguiente();
});
