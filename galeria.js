// galeria.js
class Galeria {
  constructor(imagenes) {
    this.imagenes = imagenes;
    this.galeriaContainer = null;
    this.init();
  }

  init() {
    // Crear contenedor principal de la galería
    this.galeriaContainer = document.createElement('div');
    this.galeriaContainer.id = 'galeria-container';
    this.galeriaContainer.className = 'galeria-container';
    
    // Crear título de la galería
    const titulo = document.createElement('h1');
    titulo.textContent = 'Álbum de Imágenes';
    titulo.className = 'galeria-titulo';
    
    // Crear contenedor de imágenes
    const imagenesContainer = document.createElement('div');
    imagenesContainer.className = 'imagenes-grid';
    
    // Crear botón de volver
    const botonVolver = document.createElement('button');
    botonVolver.textContent = 'Volver al Menú';
    botonVolver.className = 'boton-volver';
    botonVolver.addEventListener('click', this.ocultarGaleria.bind(this));
    
    // Construir la estructura
    this.galeriaContainer.appendChild(titulo);
    this.galeriaContainer.appendChild(imagenesContainer);
    this.galeriaContainer.appendChild(botonVolver);
    
    // Añadir al body
    document.body.appendChild(this.galeriaContainer);
    
    // Cargar imágenes
    this.cargarImagenes();
  }

  cargarImagenes() {
    const imagenesContainer = this.galeriaContainer.querySelector('.imagenes-grid');
    
    this.imagenes.forEach((imagenSrc, index) => {
      const imagenItem = document.createElement('div');
      imagenItem.className = 'imagen-item';
      
      const img = document.createElement('img');
      img.src = imagenSrc;
      img.alt = `Imagen ${index + 1}`;
      img.loading = 'lazy'; // Carga diferida para mejor performance
      
      const leyenda = document.createElement('h2');
      leyenda.textContent = `Imagen ${index + 1}`;
      
      imagenItem.appendChild(img);
      imagenItem.appendChild(leyenda);
      imagenesContainer.appendChild(imagenItem);
    });
  }

  mostrarGaleria() {
    document.getElementById('contenedor-juego').style.display = 'none';
    this.galeriaContainer.style.display = 'block';
  }

  ocultarGaleria() {
    this.galeriaContainer.style.display = 'none';
    document.getElementById('contenedor-juego').style.display = 'block';
  }
}

// Inicializar la galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const imagenesACargar = [
    './img/000.jpg', './img/001.jpg', './img/002.jpg', './img/003.jpg',
    './img/004.jpg', './img/005.jpg', './img/006.jpg', './img/007.jpg',
    './img/008.jpg', './img/009.jpg', './img/010.jpg', './img/011.jpg',
    './img/012.jpg', './img/013.jpg', './img/014.jpg', './img/015.jpg'
  ];
  
  window.galeria = new Galeria(imagenesACargar);
});