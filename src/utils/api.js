// const apiKey = '12e9a6484e6de743210098e375735e0d'
// const endPoint = ``
// const url = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}&language=en-US&append_to_response=videos`


export async function fetchUpcomingMovie() {
  const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=12e9a6484e6de743210098e375735e0d&language=en-US&append_to_response=videos');
  const json = await response.json();
  return json;
}

export async function fetchNowPlayingMovie() {
  const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=12e9a6484e6de743210098e375735e0d&language=en-US&append_to_response=videos');
  const json = await response.json();
  return json;
}

export async function fetchMovie(endPoint) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${endPoint}?api_key=12e9a6484e6de743210098e375735e0d&language=en-US&append_to_response=videos`);
  const json = await response.json();
  return json;
}

// async function fetchMoviesAndCategories() {
//   const [moviesResponse, categoriesResponse] = await Promise.all([
//     fetch('/movies'),
//     fetch('/categories')
//   ]);
//   const movies = await moviesResponse.json();
//   const categories = await categoriesResponse.json();
//   return [movies, categories];
// }

// Promise.all([
// 	fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=12e9a6484e6de743210098e375735e0d&language=en-US&append_to_response=videos'),
// 	fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=12e9a6484e6de743210098e375735e0d&language=en-US&append_to_response=videos')
// ]).then(function (responses) {
// 	// Get a JSON object from each of the responses
// 	return Promise.all(responses.map(function (response) {
// 		return response.json();
// 	}));
// }).then(function (data) {
// 	// Log the data to the console
// 	// You would do something with both sets of data here
// 	console.log(data);
// }).catch(function (error) {
// 	// if there's an error, log it
// 	console.log(error);
// });

export async function fetchMovies() {
  const [upcoming, nowPlaying] = await Promise.all([
    fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=12e9a6484e6de743210098e375735e0d&language=en-US&append_to_response=videos'),
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=12e9a6484e6de743210098e375735e0d&language=en-US&append_to_response=videos')
  ]);
  const upcomingMovies = await upcoming.json();
  const nowPlayingMovies = await nowPlaying.json();
  return [upcomingMovies, nowPlayingMovies];
}

// fetchMoviesAndCategories().then(([movies, categories]) => {
//   movies;     // fetched movies
//   categories; // fetched categories
// }).catch(error => {
//   // /movies or /categories request failed
// });


