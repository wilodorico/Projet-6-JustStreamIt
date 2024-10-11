const bestMovieImage = document.getElementById('best-movie-image');
const bestMovieTitle = document.getElementById('best-movie-title');
const bestMovieDescription = document.getElementById('best-movie-description');

const serviceApi = new ServiceApiMovies('http://localhost:8000/api/v1/');

function addMovieToSection(movie, sectionId) {
    const template = document.getElementById("movie-template");
    const clone = template.content.cloneNode(true);

    const movieImage = clone.querySelector('img');
    movieImage.src = movie.image_url;
    movieImage.alt = movie.title;

    const movieTitle = clone.querySelector('h4');
    movieTitle.textContent = movie.title;

    document.getElementById(sectionId).appendChild(clone);
};


serviceApi.getBestMovie()
    .then(movie => {
        bestMovieImage.src = movie.image_url;
        bestMovieImage.alt = movie.title;
        bestMovieTitle.innerHTML = movie.title;
        bestMovieDescription.innerHTML = movie.description;
    })
    .catch(error => {
        console.error("Erreur lors de la récupération du meilleur film :", error);
    })

serviceApi.getBestMoviesWithImdbAbove9()
    .then(movies => {
        movies.forEach(movie => {
            addMovieToSection(movie, 'bestMovies');
        });
    });

serviceApi.getBestMoviesByGenre("Thriller")
    .then(movies => {
        movies.forEach(movie => {
            addMovieToSection(movie, 'bestMoviesThriller');
        });
    });

serviceApi.getBestMoviesByGenre("Family")
    .then(movies => {
        movies.forEach(movie => {
            addMovieToSection(movie, 'bestMoviesFamily');
        });
    });

// Pour voir le format des données
let getDetailsMovieById = serviceApi.getDetailsMovieById(12492650);
getDetailsMovieById.then(data => {
    console.log("getDetailsMovieById", data);
});

let getBestMoviesWithImdbAbove9 = serviceApi.getBestMoviesWithImdbAbove9();
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


