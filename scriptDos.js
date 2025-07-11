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
let cantidadPares = 0;

let tiempoRestante = 0;
let movimientosRestantes = 0;
let temporizador = null;

const $tiempo = document.getElementById('tiempo');
const $movimientos = document.getElementById('movimientos');
const $start = document.getElementById('start');
const $reiniciar = document.getElementById('reiniciar');

const dificultades = {
  3: { tiempo: 30, movimientos: 10, nombre: "Fácil" },
  8: { tiempo: 60, movimientos: 30, nombre: "Normal" },
  16: { tiempo: 90, movimientos: 50, nombre: "Difícil" }
};

function elegirDificultad(pares) {
  $start.style.display = 'inline-block';
  cantidadPares = pares;
  imagenes = todasLasImagenes.slice(0, pares);

  const { tiempo, movimientos } = dificultades[pares];
  tiempoRestante = tiempo;
  movimientosRestantes = movimientos;

  document.getElementById('seleccion-dificultad').style.display = 'none';
  $start.style.display = 'inline-block';
}

$start.addEventListener('click', iniciarJuego);
$reiniciar.addEventListener('click', reiniciarJuego);

function iniciarJuego() {
  
  document.getElementById('start').style.display = 'none';
  const tablero = document.getElementById('tablero');
  tablero.innerHTML = '';
  firstCard = null;
  lockBoard = false;
  matchedPairs = 0;

  $tiempo.style.display = 'block';
  $movimientos.style.display = 'block';
  actualizarContadores();

  cards = [...imagenes, ...imagenes].sort(() => 0.5 - Math.random());

  cards.forEach((url, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.url = url;
    card.dataset.index = index;
    card.addEventListener('click', () => manejarClick(card));
    tablero.appendChild(card);
  });

  iniciarTemporizador();
}

function iniciarTemporizador() {
  clearInterval(temporizador);
  temporizador = setInterval(() => {
    tiempoRestante--;
    actualizarContadores(); // ✅ Actualiza el DOM

    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      if (matchedPairs < imagenes.length) {
        mostrarFinal("lose");
      }
    }
  }, 1000);
}

// ⬆️ LUEGO SIGUE: function mostrarFinal(...)

function actualizarContadores() {
  $tiempo.textContent = `Tiempo restante: ${tiempoRestante}s`;
  $movimientos.textContent = `Movimientos restantes: ${movimientosRestantes}`;
}

function manejarClick(card) {
  if (lockBoard || card.classList.contains('revealed')) return;
  if (movimientosRestantes <= 0 || tiempoRestante <= 0) return;

  const img = document.createElement('img');
  img.src = card.dataset.url;
  img.classList.add('imagen-carta');
  card.innerHTML = '';
  card.appendChild(img);
  card.classList.add('revealed');

  if (!firstCard) {
    firstCard = card;
  } else {
    const segunda = card;

    // ✅ Ahora sí contamos 1 movimiento por intento de par
    movimientosRestantes--;
    actualizarContadores();

    if (firstCard.dataset.url === segunda.dataset.url) {
      // ✅ Agregamos clase para animación de brillo
      firstCard.classList.add('matched');
      segunda.classList.add('matched');
      
      firstCard = null;
      matchedPairs++;

      if (matchedPairs === imagenes.length) {
        clearInterval(temporizador);
        mostrarFinal("win");
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

    if (movimientosRestantes === 0 && matchedPairs < imagenes.length) {
      clearInterval(temporizador);
      mostrarFinal("lose");
    }
  }
}


function mostrarFinal(resultado) {
  $tiempo.textContent = `Tiempo restante: ${tiempoRestante}s`;
  $movimientos.textContent = `Movimientos restantes: ${movimientosRestantes}`;
  $tiempo.style.display = 'block';
  $movimientos.style.display = 'block';
  $reiniciar.style.display = 'inline-block';

  const dificultad = dificultades[cantidadPares].nombre;

  if (resultado === "win") {
    Swal.fire({
      title: "¡Ganaste! 🎉",
      text: `Dificultad: ${dificultad}\nTiempo restante: ${tiempoRestante}s\nMovimientos restantes: ${movimientosRestantes}`,
      icon: "success"
    });
  } else {
    Swal.fire({
      title: "Perdiste 😢",
      text: `Resolvió ${matchedPairs} de ${imagenes.length} pares.`,
      icon: "error"
    });
  }
}

function reiniciarJuego() {
  clearInterval(temporizador);

  $tiempo.style.display = 'none';
  $movimientos.style.display = 'none';
  $reiniciar.style.display = 'none';
  $start.style.display = 'none';

  $tiempo.textContent = '';
  $movimientos.textContent = '';

  document.getElementById('seleccion-dificultad').style.display = 'block';
  document.getElementById('tablero').innerHTML = '';
}
