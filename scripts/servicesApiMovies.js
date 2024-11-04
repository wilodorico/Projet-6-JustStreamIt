class ServiceApiMovies {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // Méthode générique pour faire des appels GET à l'API
    // En précisant le endpoint et les params sont optionnels
    async get(endpoint, params = {}) {
        const url = new URL(`${this.baseUrl}${endpoint}`);
        // Ajoute chaque paramètre à l'URL
        Object.keys(params).forEach((key) => {
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

    // Récupère les films avec des filtres optionnels
    async getMovies(filters = {}) {
        return this.get("titles/", filters);
    }

    // Récupère les détails d'un film par son ID
    async getDetailsMovieById(movieId) {
        return this.get(`titles/${movieId}`);
    }

    // Récupère le meilleur film en fonction du score IMDb et des votes
    async getBestMovie() {
        try {
            // Récupère les films triés par score IMDb décroissant
            const data = await this.getMovies({ sort_by: "-imdb_score" });
            const movies = data.results;
            if (!movies) {
                throw new Error("Aucun film trouvé");
            }
            // Filtre les films avec le même score IMDb
            const bestScore = movies[0].imdb_score;
            const topMovies = movies.filter((movie) => movie.imdb_score === bestScore);

            // Selectionne le film avec le plus de votes
            const bestMovie = topMovies.sort((a, b) => b.votes - a.votes)[0];
            const completeInfosBestMovie = await this.getDetailsMovieById(bestMovie.id);

            return completeInfosBestMovie;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Récupère les films avec le score IMDb le plus élevé
    async getBestMoviesWithImdbScore() {
        return this.getResultsTopMovies({ sort_by: "-imdb_score" });
    }

    // Récupère les meilleurs films par genre
    async getBestMoviesByGenre(genre) {
        return this.getResultsTopMovies({ genre_contains: genre, sort_by: "-imdb_score" });
    }

    // Méthode pour récupérer les meilleurs films sur 2 pages et retourne 6 films avec tous les détails
    async getResultsTopMovies(filters = {}) {
        let topMovies = [];
        const dataFirstPage = await this.getMovies({ ...filters });
        topMovies.push(...dataFirstPage.results);

        // Vérifie et récupère les résultats de la deuxième page si disponible
        if (dataFirstPage.next) {
            const filtersSecondPage = { ...filters, page: 2 }; // Copie des filtres et ajout de 'page: 2'
            const dataSecondPage = await this.getMovies(filtersSecondPage);
            topMovies.push(...dataSecondPage.results);
        }

        // Supprime les doublons
        let uniqueMovies = this.removeDuplicates(topMovies);

        // Récupère les détails des films
        const detailedMovies = await this.getDetailsForMovies(uniqueMovies.slice(0, 6));

        return detailedMovies;
    }

    // Méthode pour récupérer les détails des films
    async getDetailsForMovies(movies) {
        const detailedMoviesPromises = movies.map((movie) => this.getDetailsMovieById(movie.id));
        const detailedMovies = await Promise.all(detailedMoviesPromises);
        return detailedMovies;
    }

    // Récupère tous les genres disponibles
    async getGenres() {
        let url = this.baseUrl + "genres/";
        let nextPage = url;
        let genres = [];
        while (nextPage) {
            const response = await fetch(nextPage);
            const data = await response.json();
            genres.push(...data.results);
            nextPage = data.next;
        }
        return genres;
    }

    // Supprime les doublons d'une liste de films en utilisant les IDs uniques
    removeDuplicates(movies) {
        const movieIds = new Set();
        const uniqueMovies = [];
        movies.forEach((movie) => {
            if (!movieIds.has(movie.id)) {
                movieIds.add(movie.id);
                uniqueMovies.push(movie);
            }
        });
        return uniqueMovies;
    }
}
