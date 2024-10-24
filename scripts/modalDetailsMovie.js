// Fonction pour afficher la modale avec les détails d'un film
function showMovieModal(movie) {
    const modal = document.getElementById("movie-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalMovieYear = document.getElementById("modal-movie-year");
    const modalMovieGenre = document.getElementById("modal-movie-genre");
    const modalMovieRated = document.getElementById("modal-movie-rated");
    const modalMovieDuration = document.getElementById("modal-movie-duration");
    const modalMovieCountries = document.getElementById("modal-movie-countries");
    const modalIMDBScore = document.getElementById("modal-score");
    const modalMovieWriters = document.getElementById("modal-movie-writers");
    const modalDescription = document.getElementById("modal-description");
    const modalActors = document.getElementById("modal-actors");

    // Remplir la modale avec les informations du film
    modalTitle.textContent = movie.title;
    modalMovieYear.textContent = movie.year;
    modalMovieGenre.textContent = movie.genres.join(", ");
    modalMovieRated.textContent = Number.parseFloat(movie.rated) ? movie.rated : "NR";
    modalMovieDuration.textContent = movie.duration;
    modalMovieCountries.textContent = movie.countries.join(" / ");
    modalIMDBScore.textContent = movie.imdb_score;

    modalImage.src = movie.image_url;
    modalImage.onerror = () => (modalImage.src = "medias/no-image-2.jpg");
    modalImage.alt = movie.title;
    modalMovieWriters.textContent = movie.writers[0] !== "Unknown" ? movie.writers.join(", ") : "Non renseigné";
    modalDescription.textContent =
        movie.long_description == "|" ? "Description non renseignée" : movie.long_description;

    modalActors.textContent = movie.actors.join(", ");

    // Afficher la modale
    modal.classList.add("active");
}

// Fermer la modale
document.getElementById("modal-close-btn-down").addEventListener("click", () => {
    document.getElementById("movie-modal").classList.remove("active");
});
