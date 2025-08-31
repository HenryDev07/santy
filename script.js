const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

navSlide();

// Detectar scroll hacia abajo o arriba para ocultar/mostrar el header
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
const header = document.querySelector("header");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Si el menú hamburguesa está abierto, no ocultar el header
    if (navLinks.classList.contains("nav-active")) {
        return;
    }

    if (currentScroll > lastScrollTop) {
        // Scroll hacia abajo — ocultar header
        header.classList.add("header-hidden");
    } else {
        // Scroll hacia arriba — mostrar header
        header.classList.remove("header-hidden");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});



// Cuando se cargue todo el contenido de la página
document.addEventListener("DOMContentLoaded", function() {
  // Seleccionar todas las imágenes de corte
  const imagenes = document.querySelectorAll(".corte img");

  // Agregar evento click a cada imagen
  imagenes.forEach(function(img) {
    img.addEventListener("click", function() {
      document.getElementById("imagenGrande").src = this.src;
      document.getElementById("visor").style.display = "flex";
    });
  });

  // Cerrar visor al hacer click en él
  document.getElementById("visor").addEventListener("click", function() {
    this.style.display = "none";
  });
});

// botones de precio dinamicos
document.addEventListener("DOMContentLoaded", function() {
  // Función para actualizar precio
  function actualizarPrecio(corte) {
    const precioEl = corte.querySelector(".precio");
    const base = parseFloat(precioEl.getAttribute("data-base"));
    let extra = 0;

    if (corte.querySelector(".ceja-btn").classList.contains("active")) {
      extra += 1;
    }
    if (corte.querySelector(".barba-btn").classList.contains("active")) {
      extra += 2.50;
    }

    const nuevoPrecio = (base + extra).toFixed(2);
    precioEl.textContent = `$${nuevoPrecio}`;
  }

  // Agregar eventos a los botones
  const cortes = document.querySelectorAll(".corte");
  cortes.forEach(corte => {
    const cejaBtn = corte.querySelector(".ceja-btn");
    const barbaBtn = corte.querySelector(".barba-btn");

    cejaBtn.addEventListener("click", () => {
      cejaBtn.classList.toggle("active");
      actualizarPrecio(corte);
    });

    barbaBtn.addEventListener("click", () => {
      barbaBtn.classList.toggle("active");
      actualizarPrecio(corte);
    });
  });
});


// carrusel
const fotos = document.querySelector('.fotos');
const imagenes = document.querySelectorAll('.fotos img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

let currentIndex = 0;
let intervalo;

// Activar imagen actual
function updateActive() {
  imagenes.forEach(img => img.classList.remove('active'));
  imagenes[currentIndex].classList.add('active');

  // Centrar imagen activa dentro del contenedor sin mover la ventana
  const img = imagenes[currentIndex];
  const offsetLeft = img.offsetLeft - (fotos.offsetWidth / 2) + (img.offsetWidth / 2);
  fotos.scrollTo({ left: offsetLeft, behavior: 'smooth' });
}

// Desplazar a la siguiente imagen
function nextImage() {
  currentIndex = (currentIndex + 1) % imagenes.length;
  updateActive();
}

// Iniciar carrusel automático
function iniciarCarrusel() {
  clearInterval(intervalo);
  intervalo = setInterval(nextImage, 3000);
}

// Iniciar carrusel
updateActive();
iniciarCarrusel();

// Al tocar en galería: pausar carrusel
fotos.addEventListener('touchstart', () => clearInterval(intervalo));

// Al hacer clic en imagen: mostrar lightbox y pausar carrusel
imagenes.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
    clearInterval(intervalo);
  });
});

// Cerrar lightbox al tocar fuera y reanudar carrusel
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
  iniciarCarrusel();
});

//PANTALLA DE CARGA
