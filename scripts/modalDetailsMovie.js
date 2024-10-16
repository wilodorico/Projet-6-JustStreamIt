// Fonction pour afficher la modale avec les détails d'un film
function showMovieModal(movie) {
    const modal = document.getElementById('movie-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalYear = document.getElementById('modal-year');
    const modalMovieRated = document.getElementById('modal-movie-rated');
    const modalDuration = document.getElementById('modal-duration');
    const modalMovieCountries = document.getElementById('modal-movie-countries');
    const modalIMDBScore = document.getElementById('modal-score')
    const modalActors = document.getElementById('modal-actors');

    // Remplir la modale avec les informations du film
    modalTitle.textContent = movie.title;
    modalYear.textContent = movie.year;
    modalMovieRated.textContent = Number.parseFloat(movie.rated) ? movie.rated : "NR";
    modalDuration.textContent = movie.duration;
    modalMovieCountries.textContent = movie.countries.join(' / ');
    modalIMDBScore.textContent = movie.imdb_score

    modalImage.src = movie.image_url;
    modalImage.alt = movie.title;
    modalDescription.textContent = movie.long_description;

    modalActors.textContent = movie.actors.join(', ');

    // Afficher la modale
    modal.classList.add('active');
}

// Fermer la modale
document.getElementById('modal-close-btn-down').addEventListener('click', () => {
    document.getElementById('movie-modal').classList.remove('active');
});