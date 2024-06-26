import React, { useRef } from 'react'
import './MovieModal.css'
import useOnclickOutside from '../../hooks/useOnclickOutside';


const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) => {

  const ref = useRef();
  useOnclickOutside(ref,()=>{
    setModalOpen(false);
  });

  return (
    <div className='presentation' role="presentation">
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span
            onClick={() => setModalOpen(false)}
            className="modal-close"
          >
            X
          </span>

          <img
            className='modal__poster-img'
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal-img"
          />

          <div className='modal__content'>
            <p className='modal__details'>
              <span className='modal__user_perc'> 추천도 80.4% </span>
              <br/>        
              {release_date ? release_date : first_air_date}   
            </p>

            <h2 className='modal__title'> {title ? title : name}</h2>
            <p className='modal__overview'>⭐ {vote_average.toFixed(2)}점</p>
            <p className='modal__overview'>{overview ? overview : 'Script None'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal