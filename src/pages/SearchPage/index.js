import axios from '../../api/axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import './SearchPage.css'
import { useDebounce } from '../../hooks/useDebounce'

const SearchPage = () => {

    // 인스턴스
    const [searchResults, setSearchResults] = useState([])


    // API기능s
    const useQuery = () =>{
        return new URLSearchParams(useLocation().search)
    }
    let query = useQuery();
    const searchTerm =  query.get("q");
    const debouncesearchTerm = useDebounce(searchTerm, 500)
    const navigate = useNavigate()

    // useEffect 부분
    useEffect(() => {
        if(debouncesearchTerm){
            fetchSearchMovie(debouncesearchTerm)
        }
    }, [debouncesearchTerm])

    const fetchSearchMovie = async () => {
        try {
            const response = await axios.get(`/search/multi?include=adult=false&query=${searchTerm}`);
            setSearchResults(response.data.results);
            console.log('response',response)
        } catch (error) {
            console.log(error)
        }
    }

    if(searchResults.length > 0){
        return(
            <section className='search-container'>
                {searchResults.map((movie)=>{
                    if(movie.backdrop_path !== null && movie.media__type !== "person"){
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500"+movie.backdrop_path;
                        return(
                            <div className='movie' key={movie.id}>
                                <div className='movie__column-poster' onClick={()=> navigate(`/${movie.id}`)}>
                                    <img src={movieImageUrl} alt="movie" className='movie__poster'/>
                                </div>
                            </div>
                        )
                    }
                })}
            </section>
        )
    }else{
        return(
            <section className='no-results'>
                <div className='no-results__text'>
                    <p>
                        찾으려는 검색어 "{searchTerm}"에 해당하는 컨텐츠가 없습니다.
                    </p>
                </div>
            </section>
        )
    }
}

export default SearchPage