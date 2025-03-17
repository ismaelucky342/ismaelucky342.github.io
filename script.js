document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname.split("/").pop(); 
    document.querySelectorAll(".nav-item").forEach(item => {
        const link = item.getAttribute("href").split("/").pop();
        if (currentPath === link) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
});

// Seleccionamos todas las tarjetas
const cards = document.querySelectorAll('.card');

// Añadimos el evento de clic para cada tarjeta
cards.forEach(card => {
    card.addEventListener('click', () => {
        const cardInner = card.querySelector('.card-inner');
        cardInner.classList.toggle('flipped'); // Al hacer clic, se agrega o elimina la clase "flipped"
    });
});

function redirectTo(projectName) {
    window.location.href = `/projects/${projectName}.html`;
}
