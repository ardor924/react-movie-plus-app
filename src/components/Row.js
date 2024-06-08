import axios from '../api/axios'
import React, { useCallback, useEffect,useState } from 'react'
import './Row.css'
import MovieModal from './MovieModal';

import { Navigation,Pagination,Scrollbar,A11y } from 'swiper/modules';
import { Swiper,SwiperSlide } from 'swiper/react';

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/scrollbar"
import "swiper/css/pagination"
import styled from 'styled-components';


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
    <Container>
        <h2>{title}</h2>
        <Swiper 
            // install swiper modules
            modules={[Navigation,Pagination,Scrollbar,A11y]}
            loop={true} // lopp사용여부
            navigation // arrow 버튼 사용여부
            pagination={{clickable:true}} // 페이지버튼 표시여부
            breakpoints={{
                1378:{
                    slidesPerView:6,
                    slidesPerGroup:6,
                },
                998:{
                    slidesPerView:5,
                    slidesPerGroup:5,
                },
                625:{
                    slidesPerView:4,
                    slidesPerGroup:4,
                },
                0:{
                    slidesPerView:3,
                    slidesPerGroup:3,
                }
            }}
        >
            <Content id={id}>

                {movies.map((movie)=> (
                    <SwiperSlide key={movie.id}>
                        <Wrap>
                            <img
                            key={movie.id}
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.name}
                            onClick={() => handleClick(movie)}
                            />
                        </Wrap>
                    </SwiperSlide>
                ))}
            </Content>
        </Swiper>


        {modalOpen &&
        <MovieModal
          {...movieSelected}
          setModalOpen={setModalOpen}
        />
      }
    </Container>
  )
}

export default Row


const Container = styled.div`
    padding:0 0 26px;
`;

const Content = styled.div`
    
`;
const Wrap = styled.div`
    width:95%;
    height:95%;
    padding-top:56.25%;
    border-radius:10px;
    box-shadow : rgb(0 0 0 69%) 0px 26px 30px -10px,
                 rgb(0 0 0 73%) 0px 16px 10px -10px;
    cursor : pointer;
    overflow : hidden;
    position : relative;
    transition : all 250ms cubic-bezier(0.25,0.46,0.45,0.94);
    border 3px solid rgba(249,249,249,0.1);

    img{
        inset:0px;
        display:block;
        height :100%;
        width :100%;
        object-fit :cover;
        opacity:1;
        position:absolute;
        transition : opacity 500ms ease-in-out;
        z-index:1;
    }
    &:hover{
        box-shadow : rgb(0 0 0 80%) 0px 40px 48px -16px,
        rgb(0 0 0 73%) 0px 30px 22px -10px;
        transform:scale(0.98);
        border-color: rgba(249,249,249,0.8);
    }

`;