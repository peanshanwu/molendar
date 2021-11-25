import firebase from "../utils/firebase";

const apiKey = "12e9a6484e6de743210098e375735e0d";
// const endPoint = ``
// const url = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}&language=en-US&append_to_response=videos`

export async function fetchCast(movie_id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}`
  );
  const json = await response.json();
  return json;
}

export async function fetchSearch(query) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=1&include_adult=false`
  );
  const json = await response.json();
  return json;
}

export async function fetchMovie(movie_id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
  );
  const json = await response.json();
  return json;
}

export async function fetchUpcomingNowPlayingMovies() {
  const [upcoming, nowPlaying] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&append_to_response=videos`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&append_to_response=videos`
    ),
  ]);
  const upcomingMovies = await upcoming.json();
  const nowPlayingMovies = await nowPlaying.json();
  return [upcomingMovies, nowPlayingMovies];
}

export async function fetchMultiMovies(movieArr) {
  // 電影行程可能有同部電影，與不同人不同時間觀看，須先篩選
  // console.log(movieArr);
  // const filterResult = movieArr.filter((movie, index, arr) => {
  //   return (
  //     arr.findIndex((element) => movie.movie_id === element.movie_id) === index
  //   );
  // });

  const set = new Set();
  const filterResult = movieArr.filter((movie) =>
    !set.has(movie.movie_id) ? set.add(movie.movie_id) : false
  );

  let movieIdArr = [];
  filterResult.forEach((movie) => {
    movieIdArr.push(
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.movie_id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
      )
    );
  });
  let result = await Promise.all(movieIdArr).then((res) => {
    return Promise.all(res.map(async (data) => await data.json()));
  });
  return result;
}

export async function fetchCollectionMovies(movieArr) {
  let movieIdArr = [];
  movieArr.forEach((movie) => {
    movieIdArr.push(
      fetch(
        `https://api.themoviedb.org/3/movie/${movie}?api_key=${apiKey}&language=en-US&append_to_response=videos`
      )
    );
  });
  let result = await Promise.all(movieIdArr).then((res) => {
    return Promise.all(res.map(async (data) => await data.json()));
  });
  return result;
}

export function fetchUserInfo(uid) {
  const db = firebase.firestore();
  const userRef = db.collection("users");
  return userRef.where("uid", "==", uid).get();
}
