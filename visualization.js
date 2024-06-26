const movieClicks = JSON.parse(localStorage.getItem('movieClicks')) || {
    "Movie 1": { count: 0, link: "https://example.com/movie1", img: "images/movie1.jpg" },
    "Movie 2": { count: 0, link: "https://example.com/movie2", img: "images/movie2.jpg" },
    "Movie 3": { count: 0, link: "https://example.com/movie3", img: "images/movie3.jpg" }
};
const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];

function renderCharts() {
    const ctx1 = document.getElementById('barChart').getContext('2d');
    const ctx2 = document.getElementById('pieChart').getContext('2d');
    const ctx3 = document.getElementById('topWatchedChart').getContext('2d');

    // Aggregate data for general bar and pie charts
    const movieViews = Object.values(movieClicks).map(movie => movie.count);

    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Watched Movie count', 'Reviews', 'Subscriptions', 'Wishlist'],
            datasets: [{
                label: 'Count',
                data: [movieViews.reduce((a, b) => a + b, 0), reviews.length, subscriptions.length, wishlist.length],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['Most Watched Movies', 'Reviews', 'Subscriptions', 'Wishlist'],
            datasets: [{
                data: [movieViews.reduce((a, b) => a + b, 0), reviews.length, subscriptions.length, wishlist.length],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        }
    });

    // Data for top watched movies chart
    const topWatchedMovies = getTopWatchedMovies();
    const topWatchedLabels = topWatchedMovies.map(movie => movie.name);
    const topWatchedCounts = topWatchedMovies.map(movie => movie.count);

    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: topWatchedLabels,
            datasets: [{
                label: 'Views',
                data: topWatchedCounts,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function getTopWatchedMovies() {
    return Object.entries(movieClicks)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 5)
        .map(movie => ({ name: movie[0], count: movie[1].count }));
}

window.onload = renderCharts;
