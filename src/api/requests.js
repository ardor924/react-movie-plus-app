// 리퀘스트


const requests = {
    fetchNowPlaying    :  "movie/now_playing",
    fetchTrending      :  "/trending/all/week",
    fetchTopRated      :  "/movie/top_rated",
    fetchActionMovies  :  "/discover/movie?with_genres=28",
    fetchComedyMovies  :  "/discover/movie?with_genres=35",
    fetchHorrorMovies  :  "/discover/movie?with_genres=27",
    fetchRomanceMovies :  "/discover/movie?with_genres=10749",
    fetchSFMovies      :  "/discover/movie?with_genres=878",
    fetchMysteryMovies :  "/discover/movie?with_genres=9648",
    fetchHistoryMovies :  "/discover/movie?with_genres=36",
    fetchDocumentaries :  "/discover/movie?with_genres=99",
    fetchMusic         :  "/discover/movie?with_genres=10402",
}

export default requests;