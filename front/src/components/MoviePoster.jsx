import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import useInput from "../hooks/useInput.js";

const MoviePoster = () => {
  const [movies, setMovies] = useState([]); //Variables de estado movies
  const [searchKey, setSearchkey] = useState("");
  // const searchKey = useInput();
  const APIKEY = "fe254305c860c9c2c74620fd25391dfe";
  const APIURL = "https://api.themoviedb.org/3";
  const IMGPATH = "https://image.tmdb.org/t/p/original";

  const fetchDataMovies = (searchKey) => {
    const type = searchKey ? "search" : "discover";
    //Uso axios para hacer un pedido http
    axios
      .get(`${APIURL}/${type}/movie`, {
        //Solicitar informacion a la api
        params: {
          api_key: APIKEY,
          query: searchKey,
        },
      })
      .then((res) => {
        console.log("MOVIE", res.data.results);
        setMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => fetchDataMovies(), []);

  /*  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${APIKEY}`)
      .then((res) => {
        console.log("MOVIE", res.data.results);
        setMovies(res.data.results);
      });
  }, []); */

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDataMovies(searchKey);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="searh"
          onChange={(e) => setSearchkey(e.target.value)} //{...searhkey}
        />
        <button class="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div className="container mt-3">
        <div className="row">
          {movies.map((movie) => {
            return (
              <Link /* to={RUTA PARA LAS CARDS(ver detalle de peliculas)} */>
                <div className="col-md-4 mb-3" key={movie.id}>
                  <img
                    src={`${IMGPATH + movie.poster_path}`}
                    alt="movieImage"
                    height={500}
                    width="100%"
                  />
                  <h4 className="text-center">{movie.title}</h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoviePoster;
