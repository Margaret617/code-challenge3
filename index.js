document.addEventListener('DOMContentLoaded', function () {
    fetch("db.json")
        .then(function(response){
            return response.json();
        })
        .then(function(movies){
            let placeholder = document.querySelector("#films");
            let movieHTML = "";

            movies.forEach(movie => {
                let remainingTickets = +movie.capacity - +movie.tickets_sold;

                movieHTML += `
                    <tr data-movie-id="${movie.id}">
                        <td>${movie.id}</td>
                        <td>${movie.title}</td>
                        <td>${movie.runtime}</td>
                        <td>${movie.capacity}</td>
                        <td>${movie.showtime}</td>
                        <td class="tickets-sold">${movie.tickets_sold}</td>
                        <td>${movie.description}</td>
                        <td><img src='${movie.poster}' alt='${movie.title} poster'></td>
                        <td><button type="button" class="buy-ticket-btn">Buy Ticket</button></td>
                        <td class="tickets-remaining">${remainingTickets}</td>
                        <td class="all-tickets-sold">${movie.tickets_sold}</td>
                    </tr>
                `;
            });

            placeholder.innerHTML = movieHTML;

            document.querySelectorAll('.buy-ticket-btn').forEach(button => {
                button.addEventListener('click', function() {
                    let row = this.closest('tr');
                    let ticketsSoldElement = row.querySelector('.tickets-sold');
                    let ticketsRemainingElement = row.querySelector('.tickets-remaining');
                    let allTicketsSoldElement = row.querySelector('.all-tickets-sold');

                    let ticketsSold = +ticketsSoldElement.innerText;
                    let capacity = +row.cells[3].innerText;

                    if (ticketsSold < capacity) {
                        ticketsSold++;
                        ticketsSoldElement.innerText = ticketsSold;
                        ticketsRemainingElement.innerText = capacity - ticketsSold;
                        allTicketsSoldElement.innerText = ticketsSold;
                    } else {
                        alert("Tickets are sold out for this movie.");
                    }
                });
            });
        })
        .catch(function(error) {
            console.log(error);
        });
});
