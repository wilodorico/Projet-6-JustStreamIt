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

// Fonction pour ajouter un film à une section avec son template
function addMovieToSection(movie, sectionId) {
    const template = document.getElementById("movie-template");
    const clone = template.content.cloneNode(true);

    const movieImage = clone.querySelector("img");
    movieImage.src = movie.image_url;
    movieImage.alt = movie.title;

    movieImage.onerror = () => (movieImage.src = defaultImageUrl);

    const movieTitle = clone.querySelector("h4");
    movieTitle.textContent = movie.title;

    const divLink = clone.querySelector("#movie-template-link");
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
        })
        .catch((error) => {
            console.error(`Erreur lors de la récupération des films ${genre} :`, error);
        });
}

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

selectCategory.addEventListener("change", (event) => {
    const selectedCategory = event.target.options[event.target.selectedIndex].text;
    displayBestMovies(selectedCategory, "bestMoviesByCategoryChoice");
});

fillSelectOptionCategory();
displayBestMovie();
displayBestMovies("", "bestMovies");
displayBestMovies("Thriller", "bestMoviesThriller");
displayBestMovies("Family", "bestMoviesFamily");
displayBestMovies("Action", "bestMoviesByCategoryChoice");
