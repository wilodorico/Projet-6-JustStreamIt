class ServiceApiMovies {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // Méthode générique pour faire des appels GET à l'API 
    // En précisant le endpoint et les params sont optionnels
    async get(endpoint, params={}) {
        const url = new URL(`${this.baseUrl}${endpoint}`);
        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        });
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur : ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de l'appel à l'API", error);
            throw error;
        }
    }

    async getMovies(filters={}) {
        return this.get('titles/', filters);
    }

    async getDetailsMovieById(movieId) {
        return this.get(`titles/${movieId}`);
    }

    async getSixResultsTopMovies(filters={}) {
        let topMovies = [];
        const dataFirstPage = await this.getMovies(filters);
        const dataSecondPage = await this.getMovies(filters, 2);
        topMovies.push(...dataFirstPage.results);
        topMovies.push(...dataSecondPage.results);
        return topMovies.slice(0, 6);
    }

    async getBestMoviesWithImdbAbove9() {
        return this.getSixResultsTopMovies({imdb_score_min: '9'})
    }

    async getBestMovie() {
        try {
            const data = await this.getMovies({ sort_by: '-imdb_score' });
            const movies = data.results;
            if (!movies) {
                throw new Error("Aucun film trouvé");
            }
            // Meilleur film basé sur le score IMDb et en cas d'égalité, sur le nombre de votes
            const bestScore = movies[0].imdb_score;
            const topMovies = movies.filter(movie => movie.imdb_score === bestScore);
            const bestMovie = topMovies.sort((a, b) => b.votes - a.votes)[0];
            const completeInfosBestMovie = await this.getDetailsMovieById(bestMovie.id);
            return completeInfosBestMovie;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getGenres() {
        let url = this.baseUrl + 'genres/';
        let nextPage = url;
        let genres = [];
        while(nextPage){
            const response = await fetch(nextPage);
            const data = await response.json();
            genres.push(...data.results);
            nextPage = data.next;
        }
        return genres;
    }

    async getBestMoviesByGenre(genre) {
        return this.getSixResultsTopMovies({genre: genre, sort_by: '-imdb_score'})
    }
}
