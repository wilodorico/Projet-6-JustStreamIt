class ApiMoviesServices {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // Construire une URL avec les filtres
    buildUrl(filters={}) {
        const url = new URL(this.baseUrl);
        Object.keys(filters).forEach(key => {
            url.searchParams.append(key, filters[key]);
        });
        return url.toString();
    }

    async getMovies(filters={}) {
        const url = this.buildUrl(filters);
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getBestMovie() {
        return this.getMovies({sort_by: '-imdb_score'})
            .then(movies => movies.results[0])
            .catch(error => {
                console.error(error);
                throw error;
            });
    }

    async getMovieById(movieId) {
        try {
            const response = await fetch(`${this.baseUrl}${movieId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const serviceApi = new ApiMoviesServices('http://localhost:8000/api/v1/titles/');

let bestMovies = serviceApi.getBestMoviesWithImdbAbove9();
bestMovies.then(data => {
    console.log("bestMovies", data);
});

let movie = serviceApi.getMovieById(12492650);
movie.then(data => {
    console.log("movie", data);
});
