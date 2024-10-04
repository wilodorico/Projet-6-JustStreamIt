const getData = async () => {
    const response = await fetch('http://localhost:8000/api/v1/titles/');
    const data = await response.json();
    return data;
};


getData().then(data => {
    const movies = data.results;
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
