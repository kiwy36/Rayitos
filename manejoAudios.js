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
  reproductor.play().catch((e) => {
    console.warn('Reproducción bloqueada hasta interacción del usuario');
  });

  reproductor.onended = () => {
    indiceActual = (indiceActual + 1) % pistas.length;
    reproducirSiguiente();
  };
}

// No lo ejecutes directamente, esperá a que preload.js lo llame tras el click
