// Select one element
const heading = document.querySelector('.info h2');
console.log(heading.innerText);
heading.style.fontFamily = 'cursive';

// Select multiple elements
const hobbies = document.querySelectorAll('.info li');
hobbies.forEach((hobby) => {
  hobby.style.backgroundColor = '#f90';
});


// Events
const button = document.querySelector('#click-me');
button.addEventListener('click', (event) => {
  console.log('I was clicked!');
  console.log(event.currentTarget);
  event.currentTarget.innerText = 'Please wait...';
  event.currentTarget.setAttribute('disabled', '');
});


// fetch for a GET request


const movieSearch = (searchTerm) => {
  const url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=adf1f2d7`;
  fetch(url)
    .then(response => response.json())
    .then((json) => {
      const movies = json.Search;
      console.log(`There are ${movies.length} movies found`);

      // First, clear the old results!
      const results = document.getElementById('results');
      results.innerHTML = '';

      movies.forEach((movie) => {
        const movieTag = `<li class="list-inline-item">
          <img src="${movie.Poster}" alt="${movie.Title}">
          <p>${movie.Title}</p>
        </li>`;
        results.insertAdjacentHTML('beforeend', movieTag);
      });
    });
};

movieSearch('back to the future');


// Search movies form
const searchForm = document.querySelector('#movie-search');
console.log(searchForm);

searchForm.addEventListener('submit', (event) => {
  // Prevent page from reloading
  event.preventDefault();
  // Grab input from the form
  const searchTerm = event.currentTarget.querySelector('#keyword').value;
  console.log(`Search term: ${searchTerm}`)
  // Build a URL to search with that input
  // Fetch the URL
  // Show results in the page
  movieSearch(searchTerm);
});


// POST search
const searchAlgoliaPlaces = (event) => {
  fetch("https://places-dsn.algolia.net/1/places/query", {
    method: "POST",
    body: JSON.stringify({ query: event.currentTarget.value })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data.hits); // Look at local_names.default
    });
};

const input = document.querySelector("#place");
input.addEventListener("keyup", searchAlgoliaPlaces);
