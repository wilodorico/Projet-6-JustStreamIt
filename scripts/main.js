const bestMovieImage = document.getElementById("best-movie-image");
const bestMovieTitle = document.getElementById("best-movie-title");
const bestMovieDescription = document.getElementById("best-movie-description");
const bestMoviesByCategoryChoice = document.getElementById("bestMoviesByCategoryChoice");
const btnBestMovieDetails = document.getElementById("btn-best-movie-details");
const selectCategory = document.getElementById("category");
const defaultImageUrl = "medias/no-image.jpg";

const serviceApi = new ServiceApiMovies("http://localhost:8000/api/v1/");

// Fonction pour vider une section
function clearSection(sectionId) {
    document.getElementById(sectionId).innerHTML = "";
}

// Fonction pour ajouter un film à une section en utilisant un template
function addMovieToSection(movie, sectionId) {
    const template = document.getElementById("movie-template");
    const clone = template.content.cloneNode(true);

    const movieImage = clone.querySelector("img");
    movieImage.src = movie.image_url;
    movieImage.alt = movie.title;

    // Définit une image par défaut si l'image n'est pas disponible
    movieImage.onerror = () => (movieImage.src = defaultImageUrl);

    const movieTitle = clone.querySelector("h4");
    movieTitle.textContent = movie.title;

    const divLink = clone.querySelector(".movie-template-link");
    // Affiche le modal de détails du film lorsqu'on clique sur l'affiche du film
    divLink.addEventListener("click", () => {
        showMovieModal(movie);
    });

    document.getElementById(sectionId).appendChild(clone);
}

// Fonction pour récupérer et afficher le meilleur film
function displayBestMovie() {
    serviceApi
        .getBestMovie()
        .then((movie) => {
            bestMovieImage.src = movie.image_url;
            bestMovieImage.onerror = () => (bestMovieImage.src = defaultImageUrl);
            bestMovieImage.alt = movie.title;
            bestMovieTitle.innerHTML = movie.title;
            bestMovieDescription.innerHTML = movie.description;

            btnBestMovieDetails.addEventListener("click", () => {
                showMovieModal(movie);
            });
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération du meilleur film :", error);
        });
}

// Fonction pour récupérer les meilleurs films avec option filtre par genre
function displayBestMovies(genre, sectionId) {
    clearSection(sectionId);
    serviceApi
        .getBestMoviesByGenre(genre)
        .then((movies) => {
            movies.forEach((movie) => {
                addMovieToSection(movie, sectionId);
            });
            // Ajuster le nombre de films visibles selon la taille de l'écran
            adjustMovieGrid();
        })
        .catch((error) => {
            console.error(`Erreur lors de la récupération des films ${genre} :`, error);
        });
}

// Ajoute les genres disponibles dans la liste déroulante
function fillSelectOptionCategory() {
    serviceApi.getGenres().then((data) => {
        data.forEach((categorie) => {
            const option = document.createElement("option");
            option.value = categorie.id;
            option.text = categorie.name;
            selectCategory.add(option);
        });
    });
}

// Récupère le genre sélectionné dans la liste déroulante et affiche les meilleurs films correspondants
selectCategory.addEventListener("change", (event) => {
    const selectedCategory = event.target.options[event.target.selectedIndex].text;
    displayBestMovies(selectedCategory, "bestMoviesByCategoryChoice");
    adjustMovieGrid();
});

// Fonction pour ajuster le nombre de films visibles en fonction de la taille de l'écran
function adjustMovieGrid() {
    const grids = document.querySelectorAll(".grid-movies");

    grids.forEach((grid) => {
        const movies = Array.from(grid.children);
        const btnToggle = grid.nextElementSibling.firstElementChild;

        if (window.innerWidth < 768) {
            // Masquer tous les films après les deux premiers
            movies.forEach((movie, index) => {
                if (index < 2) {
                    movie.classList.remove("hidden");
                } else {
                    movie.classList.add("hidden");
                }
            });
        } else if (window.innerWidth < 1024) {
            // Masquer tous les films après les quatre premiers
            movies.forEach((movie, index) => {
                if (index < 4) {
                    movie.classList.remove("hidden");
                } else {
                    movie.classList.add("hidden");
                }
            });
        } else {
            // Afficher tous les films au-delà de 1024px
            movies.forEach((movie) => {
                movie.classList.remove("hidden");
            });
        }

        // Réinitialise le texte du bouton
        if (btnToggle) {
            btnToggle.textContent = "Voir plus";
        }
    });
}

// Fonction pour basculer l'affichage des films
function toggleDisplayMovies(button) {
    const grid = button.parentNode.previousElementSibling;
    const movies = Array.from(grid.children);
    const hiddenMovies = movies.filter((movie) => movie.classList.contains("hidden"));

    if (hiddenMovies.length > 0) {
        // Affiche tous les films et change le bouton en "Voir moins"
        hiddenMovies.forEach((movie) => movie.classList.remove("hidden"));
        button.textContent = "Voir moins";
    } else {
        adjustMovieGrid(); // Rétablit l'affichage initial
        button.textContent = "Voir plus";
    }
}

// Gère l'événement des boutons "Voir plus" au click
document.querySelectorAll(".btn-see-more").forEach((button) => {
    button.addEventListener("click", () => toggleDisplayMovies(button));
});

// Gère l'événement de redimensionnement de l'écran
window.addEventListener("resize", adjustMovieGrid);

// Gère l'événement de chargement de la page
window.addEventListener("load", function () {
    fillSelectOptionCategory();
    displayBestMovie();
    displayBestMovies("", "bestMovies");
    displayBestMovies("Thriller", "bestMoviesThriller");
    displayBestMovies("Family", "bestMoviesFamily");
    displayBestMovies("Action", "bestMoviesByCategoryChoice");
});
