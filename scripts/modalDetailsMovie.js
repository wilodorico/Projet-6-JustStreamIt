// Fonction pour afficher la modale avec les détails d'un film
function showMovieModal(movie) {
    const modal = document.getElementById("movie-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalImageDesktop = document.getElementById("modal-image-desktop");
    const modalImageSmallScreen = document.getElementById("modal-image-small-screen");
    const modalMovieYear = document.getElementById("modal-movie-year");
    const modalMovieGenre = document.getElementById("modal-movie-genre");
    const modalMovieRated = document.getElementById("modal-movie-rated");
    const modalMovieDuration = document.getElementById("modal-movie-duration");
    const modalMovieCountries = document.getElementById("modal-movie-countries");
    const modalIMDBScore = document.getElementById("modal-score");
    const modalMovieWriters = document.getElementById("modal-movie-writers");
    const modalDescription = document.getElementById("modal-description");
    const modalActors = document.getElementById("modal-actors");
    const defaultImage = "medias/no-image.jpg";

    // Remplir la modale avec les informations du film
    modalTitle.textContent = movie.title;
    modalMovieYear.textContent = movie.year;
    modalMovieGenre.textContent = movie.genres.join(", ");
    modalMovieRated.textContent = Number.parseFloat(movie.rated) ? movie.rated : "NR";
    modalMovieDuration.textContent = movie.duration;
    modalMovieCountries.textContent = movie.countries.join(" / ");
    modalIMDBScore.textContent = movie.imdb_score;

    modalImageDesktop.src = movie.image_url;
    modalImageDesktop.onerror = () => (modalImageDesktop.src = defaultImage);
    modalImageDesktop.alt = movie.title;

    modalImageSmallScreen.src = movie.image_url;
    modalImageSmallScreen.onerror = () => (modalImageSmallScreen.src = defaultImage);
    modalImageSmallScreen.alt = movie.title;

    modalMovieWriters.textContent = movie.writers[0] !== "Unknown" ? movie.writers.join(", ") : "Non renseigné";
    modalDescription.textContent =
        movie.long_description == "|" ? "Description non renseignée" : movie.long_description;

    modalActors.textContent = movie.actors.join(", ");

    // Afficher la modale
    modal.classList.add("active");
}

// Fermer la modale
document.querySelector(".modal-btn-close-up").addEventListener("click", () => {
    document.getElementById("movie-modal").classList.remove("active");
});

document.querySelector(".modal-btn-close-down").addEventListener("click", () => {
    document.getElementById("movie-modal").classList.remove("active");
});
