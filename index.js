//Creating variables for DOM manipulation
const filmList = document.getElementById("films") //Variable created for the placeholder's content 

const poster = document.getElementById("poster")
const title = document.getElementById("title")
const runtime = document.getElementById("runtime")
const showtime = document.getElementById("showtime")
const availableTickets = document.getElementById("available-tickets")

const buyTicketButton = document.getElementById("buy-ticket") //Defining button variable

//Fetch function to get data from the json
function fetchMovies(){
    fetch("http://localhost:3000/films")
    .then(response => response.json())
    .then(films => {
        renderFilms(films);
        showMovie(films[0]);
    })
}

//Functions to render the films on the menu list 
function renderFilms(films){
    filmList.innerHTML = ""; //Clear the placeholder
    //Render for each film
    films.forEach((film) => {
        const filmElement = document.createElement("li");
        filmElement.textContent = film.title;
        filmElement.className = "film item";

        //Event listener for clicking the films on the menu list
        filmElement.addEventListener("click", () => showMovie(film));
        filmList.appendChild(filmElement);
    });
};

//Function to access the film elements from the DOM variables created
//Function to show the film
function showMovie(film){
    poster.src = film.poster;
    title.textContent = film.title;
    runtime.textContent = film.runtime;
    showtime.textContent = film.showtime;
    availableTickets.textContent = film.capacity - film.tickets_sold;

    //On click function for when the button click event is done
    buyTicketButton.onclick = function(){
        buyTicket(film);
    };
}

//Function to calculate number of tickets, patch changes to json file, and render them on the front-end
const buyTicket = function(film){
    const tickets = film.capacity - film.tickets_sold;
    if (tickets > 0){
        film.tickets_sold++;
        availableTickets.textContent = film.capacity - film.tickets_sold;

        //Patch the changes in available tickets
        fetch(`http://localhost:3000/films/${film.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tickets_sold: film.tickets_sold }),
        });
    } else {
        //Tell the user when the tickets are all sold out
        alert("All Tickets have been sold. Wanna tyr another movie?");
    }
}

//Load the DOM from the accessed data
document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
    console.log("Hurrraaaayyy");
});
