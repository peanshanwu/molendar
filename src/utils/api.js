// const apiKey = '12e9a6484e6de743210098e375735e0d'
// const endPoint = ``
// const url = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}&language=en-US&append_to_response=videos`

import firebase from '../utils/firebase';

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

export async function fetchUpcomingNoPlayingMovies() {
  const [upcoming, nowPlaying] = await Promise.all([
    fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=12e9a6484e6de743210098e375735e0d&language=en-US&append_to_response=videos'),
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=12e9a6484e6de743210098e375735e0d&language=en-US&append_to_response=videos')
  ]);
  const upcomingMovies = await upcoming.json();
  const nowPlayingMovies = await nowPlaying.json();
  return [upcomingMovies, nowPlayingMovies];
}


export async function fetchMultiMovies(movieArr) {
  let movieIdArr = []
  movieArr.forEach((movie) => {
    movieIdArr.push(fetch(`https://api.themoviedb.org/3/movie/${movie.movie_id}?api_key=12e9a6484e6de743210098e375735e0d&language=en-US&append_to_response=videos`))
  })
  let result = await Promise.all(movieIdArr)
    .then((res) => {
      return Promise.all(
        res.map(async (data) => await data.json())
      )
  })
  return result
}

export function fetchUserInfo(uid) {
  const db = firebase.firestore();
  const userRef = db.collection("users");

  // Create a query against the collection.
  return userRef.where("uid", "==", uid)
  .get()
  // .then(querySnapshot => {
  //   // console.log(querySnapshot.docs[0].data());
  //   return querySnapshot.docs[0].data()
  // })
}
