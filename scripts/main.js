const bestMovieImage = document.getElementById('best-movie-image');
const bestMovieTitle = document.getElementById('best-movie-title');
const bestMovieDescription = document.getElementById('best-movie-description');
const bestMoviesByCategoryChoice = document.getElementById('bestMoviesByCategoryChoice');
const btnBestMovieDetails = document.getElementById('btn-best-movie-details');
const selectCategory = document.getElementById('category');

const serviceApi = new ServiceApiMovies('http://localhost:8000/api/v1/');


// Fonction pour vider une section
function clearSection(sectionId) {
    document.getElementById(sectionId).innerHTML = '';
}

// Fonction pour ajouter un film à une section avec son template
function addMovieToSection(movie, sectionId) {
    const template = document.getElementById("movie-template");
    const clone = template.content.cloneNode(true);

    const movieImage = clone.querySelector('img');
    movieImage.src = movie.image_url;
    movieImage.alt = movie.title;

    const movieTitle = clone.querySelector('h4');
    movieTitle.textContent = movie.title;

    const detailsButton = clone.querySelector('button');
    detailsButton.addEventListener('click', () => {
        showMovieModal(movie);
    });

    document.getElementById(sectionId).appendChild(clone);
}


// Fonction pour récupérer et afficher le meilleur film
function displayBestMovie() {
    serviceApi.getBestMovie()
        .then(movie => {
            console.log("#bestMovie", movie);
            bestMovieImage.src = movie.image_url;
            bestMovieImage.alt = movie.title;
            bestMovieTitle.innerHTML = movie.title;
            bestMovieDescription.innerHTML = movie.description;

            btnBestMovieDetails.addEventListener('click', () => {
                showMovieModal(movie);
            });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération du meilleur film :", error);
        });
}

// Fonction pour récupérer et afficher les films les mieux notés
function displayBestMovies() {
    serviceApi.getBestMoviesWithImdbScore()
        .then(movies => {
            movies.forEach(movie => {
                addMovieToSection(movie, 'bestMovies');
            });
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des meilleurs films :", error);
        });
}

// Fonction pour récupérer et afficher les films par genre
function displayMoviesByGenre(genre, sectionId) {
    clearSection(sectionId);
    serviceApi.getBestMoviesByGenre(genre)
        .then(movies => {
            movies.forEach(movie => {
                addMovieToSection(movie, sectionId);
            });
        })
        .catch(error => {
            console.error(`Erreur lors de la récupération des films ${genre} :`, error);
        });
};


function fillSelectOptionCategory() {
    serviceApi.getGenres()
    .then(data => {
        data.forEach(categorie => {
            const option = document.createElement('option');
            option.value = categorie.id;
            option.text = categorie.name;
            selectCategory.add(option, null);
        })
    });
};

fillSelectOptionCategory();

selectCategory.addEventListener("change", (event) => {
    const selectedCategory = event.target.options[event.target.selectedIndex].text;
    displayMoviesByGenre(selectedCategory, "bestMoviesByCategoryChoice");
})

displayBestMovie();
displayBestMovies();
displayMoviesByGenre("Thriller", "bestMoviesThriller");
displayMoviesByGenre("Family", "bestMoviesFamily");
displayMoviesByGenre("Action", "bestMoviesByCategoryChoice");



// Pour voir le format des données
let getDetailsMovieById = serviceApi.getDetailsMovieById(118715);
getDetailsMovieById.then(data => {
    console.log("getDetailsMovieById", data);
});

let getBestMoviesWithImdbAbove9 = serviceApi.getBestMoviesWithImdbScore();
getBestMoviesWithImdbAbove9.then(data => {
    console.log("getBestMoviesWithImdbAbove9", data);
});

let genres = serviceApi.getGenres();
genres.then(data => {
    console.log("getGenres", data);
});

let bestMoviesByGenre = serviceApi.getBestMoviesByGenre("Thriller");
bestMoviesByGenre.then(data => {
    console.log("getBestMoviesByGenre", data);
});




