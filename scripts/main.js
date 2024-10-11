const bestMovieImage = document.getElementById('best-movie-image');
const bestMovieTitle = document.getElementById('best-movie-title');
const bestMovieDescription = document.getElementById('best-movie-description');

const serviceApi = new ServiceApiMovies('http://localhost:8000/api/v1/');


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
    .then(data => {
        const movies = data;
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('relative', 'film');
            movieElement.innerHTML = `
                <img class="w-full h-[320px] object-cover" src="${movie.image_url}" alt="${movie.title}">
                    <div class="absolute top-14 left-0 w-full h-28 bg-black opacity-50"></div>
                    <div class="absolute top-20 left-0 w-full h-28">
                        <h4 class="text-white text-2xl font-semibold ml-5 mb-3">${movie.title}</h4>
                        <div class="flex justify-end">
                            <button class="bg-zinc-800 text-white font-medium rounded-full px-6 py-1 mr-3">Détails</button>
                        </div>
                    </div>
            `;
            document.getElementById('bestMovies').appendChild(movieElement);
        });
    });

serviceApi.getBestMoviesByGenre("Thriller")
    .then(movies => {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('relative', 'film');
            movieElement.innerHTML = `
                <img class="w-full h-[320px] object-cover" src="${movie.image_url}" alt="${movie.title}">
                    <div class="absolute top-14 left-0 w-full h-28 bg-black opacity-50"></div>
                    <div class="absolute top-20 left-0 w-full h-28">
                        <h4 class="text-white text-2xl font-semibold ml-5 mb-3">${movie.title}</h4>
                        <div class="flex justify-end">
                            <button class="bg-zinc-800 text-white font-medium rounded-full px-6 py-1 mr-3">Détails</button>
                        </div>
                    </div>
            `;
            document.getElementById('bestMoviesThriller').appendChild(movieElement);
        });
    });

serviceApi.getBestMoviesByGenre("Family")
    .then(movies => {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('relative', 'film');
            movieElement.innerHTML = `
                <img class="w-full h-[320px] object-cover" src="${movie.image_url}" alt="${movie.title}">
                    <div class="absolute top-14 left-0 w-full h-28 bg-black opacity-50"></div>
                    <div class="absolute top-20 left-0 w-full h-28">
                        <h4 class="text-white text-2xl font-semibold ml-5 mb-3">${movie.title}</h4>
                        <div class="flex justify-end">
                            <button class="bg-zinc-800 text-white font-medium rounded-full px-6 py-1 mr-3">Détails</button>
                        </div>
                    </div>
            `;
            document.getElementById('bestMoviesFamily').appendChild(movieElement);
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


