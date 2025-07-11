// Base de imágenes (mínimo 16 para dificultad máxima)
const todasLasImagenes = [
  './img/000.jpg', './img/001.jpg', './img/002.jpg', './img/003.jpg',
  './img/004.jpg', './img/005.jpg', './img/006.jpg', './img/007.jpg',
  './img/008.jpg', './img/009.jpg', './img/010.jpg', './img/011.jpg',
  './img/012.jpg', './img/013.jpg', './img/014.jpg', './img/015.jpg'
];

let cards = [];
let imagenes = [];
let firstCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Guardamos la dificultad elegida (número de pares)
let cantidadPares = 0;

function elegirDificultad(pares) {
  cantidadPares = pares;
  imagenes = todasLasImagenes.slice(0, pares); // Seleccionamos solo las necesarias

  // Ocultamos botones de dificultad y mostramos "Comenzar juego"
  document.getElementById('seleccion-dificultad').style.display = 'none';
  document.getElementById('start').style.display = 'inline-block';
}

// Click en botón comenzar
document.getElementById('start').addEventListener('click', iniciarJuego);

function iniciarJuego() {
  const tablero = document.getElementById('tablero');
  tablero.innerHTML = '';
  firstCard = null;
  lockBoard = false;
  matchedPairs = 0;

  // Duplicamos y mezclamos las imágenes seleccionadas
  cards = [...imagenes, ...imagenes].sort(() => 0.5 - Math.random());

  cards.forEach((url, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.url = url;
    card.dataset.index = index;

    card.addEventListener('click', () => manejarClick(card));
    tablero.appendChild(card);
  });
}

function manejarClick(card) {
  if (lockBoard || card.classList.contains('revealed')) return;

  const img = document.createElement('img');
  img.src = card.dataset.url;
  img.alt = 'carta';
  img.classList.add('imagen-carta');
  card.innerHTML = '';
  card.appendChild(img);
  card.classList.add('revealed');

  if (!firstCard) {
    firstCard = card;
  } else {
    const segunda = card;
    if (firstCard.dataset.url === segunda.dataset.url) {
      firstCard = null;
      matchedPairs++;
      if (matchedPairs === imagenes.length) {
        setTimeout(() => alert("¡Ganaste! 🎉"), 300);
      }
    } else {
      lockBoard = true;
      setTimeout(() => {
        firstCard.innerHTML = '';
        segunda.innerHTML = '';
        firstCard.classList.remove('revealed');
        segunda.classList.remove('revealed');
        firstCard = null;
        lockBoard = false;
      }, 1000);
    }
  }
}
