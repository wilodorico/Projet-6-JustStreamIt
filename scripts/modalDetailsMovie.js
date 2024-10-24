// Fonction pour afficher la modale avec les détails d'un film
function showMovieModal(movie) {
    const modal = document.getElementById("movie-modal");

    // Remplir la modale avec les informations du film
    document.getElementById("modal-title").textContent = movie.title;
    document.getElementById("modal-movie-year").textContent = movie.year;
    document.getElementById("modal-movie-genre").textContent = movie.genres.join(", ");
    document.getElementById("modal-movie-rated").textContent = Number.parseFloat(movie.rated) ? movie.rated : "NR";
    document.getElementById("modal-movie-duration").textContent = movie.duration;
    document.getElementById("modal-movie-countries").textContent = movie.countries.join(" / ");
    document.getElementById("modal-score").textContent = movie.imdb_score;
    document.getElementById("modal-movie-writers").textContent =
        movie.writers[0] !== "Unknown" ? movie.writers.join(", ") : "Non renseigné";
    document.getElementById("modal-description").textContent =
        movie.long_description == "|" ? "Description non renseignée" : movie.long_description;
    document.getElementById("modal-actors").textContent =
        movie.actors[0] !== "Unknown" ? movie.actors.join(", ") : "Non renseigné";

    // Gestion des images
    setImage(document.getElementById("modal-image-desktop"), movie.image_url, movie.title);
    setImage(document.getElementById("modal-image-small-screen"), movie.image_url, movie.title);

    // Afficher la modale
    modal.classList.add("active");
}

// Fonction pour définir une image avec un fallback en cas d'erreur
function setImage(imageElement, imageUrl, altText) {
    const defaultImage = "medias/no-image.jpg";
    imageElement.src = imageUrl;
    imageElement.onerror = () => (imageElement.src = defaultImage);
    imageElement.alt = altText;
}

function closeModal() {
    document.getElementById("movie-modal").classList.remove("active");
}

document.querySelectorAll(".modal-btn-close-up, .modal-btn-close-down").forEach((button) => {
    button.addEventListener("click", closeModal);
});
