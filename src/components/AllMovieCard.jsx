import {FaStar,FaLanguage} from "react-icons/fa";
import { FcBullish} from "react-icons/fc";
import "../css/AllMovieCard.css"
export default function AllMovieCard (props){
    const {movie} = props
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'
    const movie_poster = IMAGE_PATH+movie.poster_path;    

    return(
        <div class="col">
        <div class="card shadow-sm cards">
          <img
            src={movie_poster?movie_poster:"../IMG/no_image.png"}
            alt=""
            className="card-img"
            style={{height:'300px'}}
          />
          <div class="card-body Card_Body">
            <h6 class="card-title movie_titles"><strong>{movie.title.length>=50?movie.title.slice(0,50)+'...':movie.title}</strong></h6>
            <p class="card-text">
              {movie.release_date?movie.release_date:'xx-xx-xxx'}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <p
                  class="border border-gray rounded p-1 me-2"
                >
                  <FaStar style={{fontSize:'30px',color:'#FFCD00 '}}/> {movie.vote_average}
                </p>
                <p                     
                   class="border border-gray rounded p-1"
                >
                 {movie.original_language}
                </p>
              </div>
              <small class="text-muted">
              <FcBullish/>
                  {movie.popularity}</small>
            </div>
          </div>
        </div>
      </div>   
    )
}