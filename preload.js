const imagenesACargar = [
  './img/000.jpg', './img/001.jpg', './img/002.jpg', './img/003.jpg',
  './img/004.jpg', './img/005.jpg', './img/006.jpg', './img/007.jpg',
  './img/008.jpg', './img/009.jpg', './img/010.jpg', './img/011.jpg',
  './img/012.jpg', './img/013.jpg', './img/014.jpg', './img/015.jpg'
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

const esperar = (milisegundos) =>
  new Promise((resolve) => setTimeout(resolve, milisegundos));

window.addEventListener('load', async () => {
  await Promise.all([
    precargarImagenes(),
    esperar(5000) // mostrar la pantalla de carga al menos 5 segundos
  ]);

  const pantallaCarga = document.getElementById('pantalla-carga');
  pantallaCarga.style.display = 'none';
});
