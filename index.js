
const filmList = document.getElementById("films")

const poster = document.getElementById("poster")
const title = document.getElementById("title")
const runtime = document.getElementById("runtime")
const showtime = document.getElementById("showtime")
const availableTickets = document.getElementById("available-tickets")

const buyTicketButton = document.getElementById("buy-ticket")

function fetchMovies(){
    fetch("http://localhost:3000/films")
    .then(response => response.json())
    .then(films => {
        renderFilms(films);
        showMovie(films[0]);
    })
}

function renderFilms(films){
    filmList.innerHTML = ""; //Clear the placeholder
    films.forEach((film) => {
        const filmElement = document.createElement("li");
        filmElement.textContent = film.title;
        filmElement.className = "film item";
        filmElement.addEventListener("click", () => showMovie(film));
        filmList.appendChild(filmElement);
    });
};

function showMovie(film){
    poster.src = film.poster;
    title.textContent = film.title;
    runtime.textContent = film.runtime;
    showtime.textContent = film.showtime;
    availableTickets.textContent = film.capacity - film.tickets_sold;

    buyTicketButton.onclick = function(){
        buyTicket(film);
    };
}

const buyTicket = function(film){
    const tickets = film.capacity - film.tickets_sold;
    if (tickets > 0){
        film.tickets_sold++;
        availableTickets.textContent = film.capacity - film.tickets_sold;

        fetch(`http://localhost:3000/films/${film.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tickets_sold: film.tickets_sold }),
        });
    } else {
        alert("All Tickets have been sold. Wanna tyr another movie?");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
    console.log("Hurrraaaayyy");
});