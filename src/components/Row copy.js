import axios from '../api/axios'
import React, { useCallback, useEffect,useState } from 'react'
import './Row.css'
import MovieModal from './MovieModal';


const Row = ({title,id,fetchURL}) => {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelection] = useState({})


    const fetcMovieData = useCallback(async () =>{
        const response = await axios.get(fetchURL);
        setMovies(response.data.results);
    },[fetchURL])
    

    useEffect(() => {
        fetcMovieData();
    }, [fetcMovieData])

    const handleClick = (movie) =>{
        setModalOpen(true);
        console.log(movie)
        setMovieSelection(movie);
    }

  return (
    <div>
        <h2>{title}</h2>
        <div className='slider'>
            <div className='slider__arrow-left' onClick={() =>{
                    document.getElementById(id).scrollLeft -= window.innerWidth - 80
                }}>
            <span className='arrow'
                onClick={() =>{
                    document.getElementById(id).scrollLeft -= window.innerWidth - 80
                }}>
                    {"<"}
                </span>
            </div>
            <div id={id} className='row__posters'>
                {movies.map((movie)=> (
                    <img
                    className='row__poster'
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.name}
                    onClick={() => handleClick(movie)}
                    />
                ))}
            </div>
            <div className='slider__arrow-right' onClick={() =>{
                    document.getElementById(id).scrollLeft += window.innerWidth - 80
                }}>
                <span className='arrow'
                onClick={() =>{
                    document.getElementById(id).scrollLeft += window.innerWidth - 80
                }}>
                    {">"}
                </span>
            </div>            
        </div>
        {modalOpen &&
        <MovieModal
          {...movieSelected}
          setModalOpen={setModalOpen}
        />
      }
    </div>
  )
}

export default Row

