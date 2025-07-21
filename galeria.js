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
        this.imagenes.forEach((imagen) => {
            const imagenItem = document.createElement('div');
            imagenItem.className = 'imagen-item';
            imagenItem.id = imagen.id;

            const img = document.createElement('img');
            img.src = imagen.src;
            img.alt = imagen.leyenda;
            img.loading = 'lazy';

            const leyenda = document.createElement('h2');
            leyenda.textContent = imagen.leyenda;

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
        { id: '01', src: './img/000.jpg', leyenda: 'Diez años de Rayitos' },
        { id: '02', src: './img/001.jpg', leyenda: 'Joberg' },
        { id: '03', src: './img/002.jpg', leyenda: 'Tony y La Gran Estaca' },
        { id: '04', src: './img/017.jpg', leyenda: 'Castor' },
        { id: '05', src: './img/018.png', leyenda: 'Los viernes de Sativa' },
        { id: '06', src: './img/003.jpg', leyenda: 'Diseño 2025' },
        { id: '07', src: './img/004.jpg', leyenda: 'Diseño 2024' },
        { id: '08', src: './img/005.jpg', leyenda: 'Diseño 2023' },
        { id: '09', src: './img/006.jpg', leyenda: 'Diseño 2022' },
        { id: '10', src: './img/007.jpg', leyenda: 'Diseño 2021' },
        { id: '11', src: './img/008.jpg', leyenda: 'Diseño 2020' },
        { id: '12', src: './img/009.jpg', leyenda: 'Diseño 2019/12' },
        { id: '13', src: './img/010.jpg', leyenda: 'Diseño 2019/9' },
        { id: '14', src: './img/011.jpg', leyenda: 'Diseño 2019' },
        { id: '15', src: './img/012.jpg', leyenda: 'Diseño 2018' },
        { id: '16', src: './img/018.jpg', leyenda: 'Diseño 2017' },
        { id: '17', src: './img/014.jpg', leyenda: 'Diseño 2016' },
        { id: '18', src: './img/013.jpg', leyenda: 'Diseño 2013' },
        { id: '19', src: './img/015.jpg', leyenda: 'Rayitos del pasado' },
    ];
    window.galeria = new Galeria(imagenesACargar);
});