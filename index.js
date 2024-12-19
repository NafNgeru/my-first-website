const API_URL = require('./db.json');

async function fetchFilms(){ //Used to asynchronously fetch data from the db.json
    const response = fetch(API_URL);
     return response.json;
}

function updateMovieDetails(movie){ //Connect data to the DOM
    document.getElementById("poster").src = movie.poster;
    document.getElementById("title").textContext = movie.title;
    document.getElementById("runtime").textContext = movie.runtime;
    document.getElementById("showtime").textContext = movie.showtime;
    
    const availableTickets = movie.capacity - movie.tickets_sold;
    document.getElementById("tickets").textContent = availableTickets;

    const buyButton = document.getElementById("buy-ticket");
    buyButton.disabled = availableTickets <= 0;
    buyButton.onclick = () => {
        if (availableTickets > 0) {
            movie.tickets_sold++;
            updateMovieDetails(movie);
        }
    };
}

async function initialize() {
    const films = await fetchFilms();
    const filmList = document.getElementById("films");
    filmList.innerHTML = "";

    films.forEach((film, index) => {
        const filmItem = document.createElement("li");
        filmItem.textContent = film.title;
        filmItem.classList.add("film", "item");
        filmItem.onclick = () => updateMovieDetails(film);
        filmList.appendChild(filmItem);

        if (index === 0) updateMovieDetails(film); // Load first movie by default
    });
}

initialize();