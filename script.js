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

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        card.querySelector('.card-inner').classList.toggle('flipped');
    });
});

