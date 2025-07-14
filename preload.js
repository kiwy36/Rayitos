const imagenesParaCargar = [
  './img/000.jpg', './img/001.jpg', './img/002.jpg', './img/003.jpg',
  './img/004.jpg', './img/005.jpg', './img/006.jpg', './img/007.jpg',
  './img/008.jpg', './img/009.jpg', './img/010.jpg', './img/011.jpg',
  './img/012.jpg', './img/013.jpg', './img/014.jpg', './img/015.jpg'
];

let cargadas = 0;

function ocultarPantallaCarga() {
  const pantalla = document.getElementById('pantalla-carga');
  pantalla.style.display = 'none';
  document.getElementById('seleccion-dificultad').style.display = 'block';
}

function precargarImagenes(callback) {
  imagenesParaCargar.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      cargadas++;
      if (cargadas === imagenesParaCargar.length) {
        callback();
      }
    };
    img.onerror = () => {
      console.warn('Error al cargar:', src);
      cargadas++;
      if (cargadas === imagenesParaCargar.length) {
        callback();
      }
    };
  });
}

// Inicia al cargar la página
window.addEventListener('load', () => {
  precargarImagenes(ocultarPantallaCarga);
});
