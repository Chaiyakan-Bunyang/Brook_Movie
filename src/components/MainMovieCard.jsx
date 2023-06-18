import {FaStar,FaLanguage} from "react-icons/fa";
import { FcBullish} from "react-icons/fc";
import "../css/MainMovieCard.css"
export default function MainMovieCard(props){
    const {movie} = props
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'
    return(
            <div class="col">
              <div class="card shadow-sm">
                <img
                  src={IMAGE_PATH+movie.poster_path}
                  alt=""
                  className="card-img"
                />
                <div class="card-body Card_Body">
                  <h4 class="card-title movie_title">{movie.title}</h4>
                  <p class="card-text">
                    {movie.release_date}
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
    );
}