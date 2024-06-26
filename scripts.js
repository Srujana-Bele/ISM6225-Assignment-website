
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
let subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
let movieClicks = JSON.parse(localStorage.getItem('movieClicks')) || {
    "Animal": { count: 0, link: "https://example.com/movie1", img: "images/animal.jpg" },
    "3 Idiots": { count: 0, link: "https://example.com/movie2", img: "images/threeidots.jpg" },
    "Thare Sameer Par": { count: 0, link: "https://example.com/movie3", img: "images/thare.jpg" }
};

// Dummy data for reviews, subscriptions, and most watched
const dummyReviews = [
    { name: "Srujana", text: "This website is very user friendly, I can easily customize want to watch and watch them later", date: "01/01/2024" },
    { name: "Jane Smith", text: "Loved the movie..Laapatha Ladies. MUST Watch film.", date: "02/01/2024" }
];

const dummySubscriptions = [
    { name: "Alice", plan: "Basic Plan - 250 Rs" },
    { name: "Bob", plan: "Premium Plan - 500 Rs" }
];

const dummyMostWatched = [
    { name: "12th Fail", count: 1, link: "https://example.com/movie13", img: "images/12fail.jpg" },
    { name: "Crew", count: 2, link: "https://example.com/movie10", img: "images/crew.jpg" }
];

// Initialize dummy data
function initializeDummyData() {
    if (!localStorage.getItem('dummyDataInitialized')) {
        reviews = [...dummyReviews, ...reviews];
        subscriptions = [...dummySubscriptions, ...subscriptions];
        dummyMostWatched.forEach(movie => {
            if (!movieClicks[movie.name]) {
                movieClicks[movie.name] = { count: movie.count, link: movie.link, img: movie.img };
            }
        });
        localStorage.setItem('reviews', JSON.stringify(reviews));
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
        localStorage.setItem('movieClicks', JSON.stringify(movieClicks));
        localStorage.setItem('dummyDataInitialized', 'true');
    }
}

// Wishlist Functions
function addToWishlist(movieName, movieLink, movieImg, element) {
    wishlist.push({ name: movieName, link: movieLink, img: movieImg });
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert(`${movieName} has been added to your wishlist!`);
    element.classList.add('clicked');
}

function showWishlist() {
    let wishlistContent = document.getElementById('wishlistItems');
    wishlistContent.innerHTML = '';
    wishlist.forEach(movie => {
        let div = document.createElement('div');
        div.className = 'wishlist-item';
        div.innerHTML = `
            <img src="${movie.img}" alt="${movie.name}">
            <a href="${movie.link}">${movie.name}</a> 
            <button onclick="removeFromWishlist('${movie.name}')">Remove</button>
        `;
        wishlistContent.appendChild(div);
    });
}

function removeFromWishlist(movieName) {
    wishlist = wishlist.filter(item => item.name !== movieName);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    showWishlist();
}

// Review Functions
function submitReview() {
    let reviewerName = document.getElementById('reviewerName').value;
    let reviewText = document.getElementById('reviewText').value;
    if (reviewerName && reviewText) {
        let review = {
            name: reviewerName,
            text: reviewText,
            date: new Date().toLocaleDateString()
        };
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        alert("Thank you for your review!");
        showReviews();
    } else {
        alert("Please enter your name and review.");
    }
}

function removeFromReviews(reviewText) {
    reviews = reviews.filter(review => review.text !== reviewText);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    showReviews();
}

function showReviews() {
    let reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = '';
    reviews.forEach(review => {
        let div = document.createElement('div');
        div.className = 'review-box';
        div.innerHTML = `
            <div class="review-content">
                <p><strong>${review.name}</strong> - ${review.date}</p>
                <p>${review.text}</p>
            </div>
            ${!dummyReviews.some(dummy => dummy.text === review.text) ? `<button class="remove-btn" onclick="removeFromReviews('${review.text}')">Delete</button>` : ''}
        `;
        reviewsList.appendChild(div);
    });
}

// Subscription Functions
function proceedToPayment() {
    let name = document.getElementById('name').value;
    let plan = document.querySelector('input[name="plan"]:checked').value;
    let planText = plan == "250" ? "Single Screen - 250 Rs" : "Three Screens - 500 Rs";
    
    document.getElementById('selectedPlan').textContent = `Selected Plan: ${planText}`;
    document.getElementById('paymentSection').style.display = 'block';
}

function makePayment() {
    let name = document.getElementById('name').value;
    let plan = document.querySelector('input[name="plan"]:checked').value;
    let planText = plan == "250" ? "Basic Plan - 250 Rs" : "Premium Plan - 500 Rs";
    
    subscriptions.push({ name: name, plan: planText });
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    alert(`Payment successful! Thank you for subscribing, ${name}! You have chosen the ${planText} plan.`);
    showSubscriptions();
}

function removeSubscription(name) {
    subscriptions = subscriptions.filter(subscription => subscription.name !== name);
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    showSubscriptions();
}

function showSubscriptions() {
    let subscriptionDetails = document.getElementById('subscriptionDetails');
    subscriptionDetails.innerHTML = '';
    subscriptions.forEach(subscription => {
        let div = document.createElement('div');
        div.innerHTML = `
            ${subscription.name} has subscribed to the ${subscription.plan} plan. 
            ${!dummySubscriptions.some(dummy => dummy.name === subscription.name) ? `<button onclick="removeSubscription('${subscription.name}')">Remove</button>` : ''}
        `;
        subscriptionDetails.appendChild(div);
    });
}


function searchMovies() {
    const query = document.getElementById('searchBar').value.toLowerCase().trim();
    const movies = document.querySelectorAll('.movie, .trending-movie, .most-watched-movie');

    let found = false;
    console.log(`Searching for: ${query}`); 

    movies.forEach(movie => {
        const movieAnchor = movie.querySelector('a');
        if (movieAnchor) {
            const movieName = movieAnchor.textContent.toLowerCase().trim();
            console.log(`Checking movie: ${movieName} against query: ${query}`); 
            if (movieName.includes(query)) {
                movie.scrollIntoView({ behavior: 'smooth', block: 'center' });
                movie.style.border = '2px solid red';
                setTimeout(() => {
                    movie.style.border = 'none';
                }, 3000);
                found = true;
            }
        } else {
            console.log('No anchor tag found for movie element:', movie); 
        }
    });

    if (!found) {
        alert('Movie not found!');
    }
}



function trackMovieClick(movieName, movieLink, movieImg) {
    if (movieClicks[movieName]) {
        movieClicks[movieName].count += 1;
    } else {
        movieClicks[movieName] = { count: 1, link: movieLink, img: movieImg };
    }
    localStorage.setItem('movieClicks', JSON.stringify(movieClicks));
    renderMostWatchedMovies();
    window.location.href = movieLink;
}

function getMostWatchedMovies() {
    let mostWatched = Object.entries(movieClicks)
        .sort((a, b) => b[1].count - a[1].count) // Sort by click count in descending order
        .slice(0, 3); // Limit to top 3 movies
    return mostWatched.map(movie => ({ name: movie[0], count: movie[1].count, link: movie[1].link, img: movie[1].img }));
}

function renderMostWatchedMovies() {
    let mostWatchedMoviesList = document.getElementById('mostWatchedMovies');
    let mostWatched = getMostWatchedMovies();
    mostWatchedMoviesList.innerHTML = '';
    mostWatched.forEach(movie => {
        let div = document.createElement('div');
        div.className = 'most-watched-movie';
        div.innerHTML = `
            <a href="#" onclick="trackMovieClick('${movie.name}', '${movie.link}', '${movie.img}')"><img src="${movie.img}" alt="${movie.name}"></a>
            <a href="#" onclick="trackMovieClick('${movie.name}', '${movie.link}', '${movie.img}')">${movie.name} (${movie.count} views)</a>
        `;
        mostWatchedMoviesList.appendChild(div);
    });
}


let trendingMovies = [
    { name: "Salaar", link: "https://example.com/movie3", img: "images/salaar.jpg" },
    { name: "Gangubai Kathiawadi", link: "https://example.com/movie4", img: "images/gangubai.jpg" },
    { name: "Laapathaa Ladies", link: "https://example.com/movie5", img: "images/lapathaladies.jpg" }
];

let movies = [
    { name: "Animal", link: "https://example.com/movie1", img: "images/animal.jpg" },
    { name: "3 Idiots", link: "https://example.com/movie2", img: "images/threeidots.jpg" },
    { name: "Thare Sameer Par", link: "https://example.com/movie3", img: "images/thare.jpg" },
    { name: "Salaar", link: "https://example.com/movie6", img: "images/salaar.jpg" },
    { name: "MS Dhoni", link: "https://example.com/movie2", img: "images/msdhoni.jpg" },
    { name: "Laapataa Ladies", link: "https://example.com/movie5", img: "images/lapathaladies.jpg" },
    { name: "Gangubai Kathiawadi", link: "https://example.com/movie4", img: "images/gangubai.jpg" },
    { name: "Dangal", link: "https://example.com/movie7", img: "images/dhangal.jpg" },
    { name: "Dhadak", link: "https://example.com/movie8", img: "images/dhadak.jpg" },
    { name: "Dear Zindagi", link: "https://example.com/movie9", img: "images/dearzindagi.jpg" },
    { name: "Crew", link: "https://example.com/movie10", img: "images/crew.jpg" },
    { name: "Ae Dil Hai Mushkil", link: "https://example.com/movie11", img: "images/aedil.jpg" },
    { name: "PK", link: "https://example.com/movie12", img: "images/pk.jpg" },
    { name: "12th Fail", link: "https://example.com/movie13", img: "images/12fail.jpg" },
    { name: "Chandu Champion", link: "https://example.com/movie14", img: "images/chanduchamp.jpg" }
];

function renderTrendingMovies() {
    let trendingMoviesList = document.getElementById('trendingMovies');
    trendingMovies.forEach(movie => {
        let div = document.createElement('div');
        div.className = 'trending-movie';
        div.innerHTML = `
            <a href="#" onclick="trackMovieClick('${movie.name}', '${movie.link}', '${movie.img}')"><img src="${movie.img}" alt="${movie.name}"></a>
            <a href="#" onclick="trackMovieClick('${movie.name}', '${movie.link}', '${movie.img}')">${movie.name}</a>
            <button class="wishlist-btn" onclick="addToWishlist('${movie.name}', '${movie.link}', '${movie.img}', this)" title="Add to Wishlist"><i class="fa fa-heart"></i></button>
        `;
        trendingMoviesList.appendChild(div);
    });
}

function renderMovies() {
    let moviesList = document.getElementById('moviesList');
    movies.forEach(movie => {
        let div = document.createElement('div');
        div.className = 'movie';
        div.innerHTML = `
            <a href="#" onclick="trackMovieClick('${movie.name}', '${movie.link}', '${movie.img}')"><img src="${movie.img}" alt="${movie.name}"></a>
            <a href="#" onclick="trackMovieClick('${movie.name}', '${movie.link}', '${movie.img}')">${movie.name}</a>
            <button class="wishlist-btn" onclick="addToWishlist('${movie.name}', '${movie.link}', '${movie.img}', this)" title="Add to Wishlist"><i class="fa fa-heart"></i></button>
        `;
        moviesList.appendChild(div);
    });
}


initializeDummyData();

// Render functions for initial load
if (document.getElementById('trendingMovies')) {
    renderTrendingMovies();
}

if (document.getElementById('moviesList')) {
    renderMovies();
}

if (document.getElementById('mostWatchedMovies')) {
    renderMostWatchedMovies();
}

// Initial call to show wishlist items
if (document.getElementById('wishlistItems')) {
    showWishlist();
}

// Initial call to show reviews
if (document.getElementById('reviewsList')) {
    showReviews();
}

// Initial call to show subscriptions
if (document.getElementById('subscriptionDetails')) {
    showSubscriptions();
}
