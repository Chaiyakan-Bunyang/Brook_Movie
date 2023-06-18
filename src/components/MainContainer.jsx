import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../css/MainContainer.css";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import MainMovieCard from "./MainMovieCard";
import { Button } from "react-bootstrap";

function MainContainer() {
  const API_KEY = 'dff713f12ffdfc4081f559aa479cfbda'
  const API_URL = 'https://api.themoviedb.org/3/'
  const [movies,setMovies] = useState([])
  const fetchMovie = async ()=>{
      const {data:{results}} = await axios.get(`${API_URL}/movie/now_playing`,{
        params:{
          api_key: API_KEY
        }
      })
      setMovies(results)
  }
  const fetchMovieUpcoming = async ()=>{
    const {data:{results}} = await axios.get(`${API_URL}/movie/upcoming`,{
      params:{
        api_key: API_KEY
      }
    })
    setMovies(results)
  }

  useEffect(()=>{
    fetchMovie()
  },[])

  const renderMovies = () =>(
    movies.map(movie=>(
      <MainMovieCard
       key={movie.id}
       movie={movie}
      />
    ))
  )

  return (
    
      <Container>
        <div className="bg-light">
          <div className="d-flex justify-content-center">
            <Tabs
              defaultActiveKey="ongoing"
              id="uncontrolled-tab-example"
              className="mb-3 mt-3 Tab_btn"
              variant="pills"
              onSelect={key => {
                if (key === "comingsoon") {
                  fetchMovieUpcoming();
                }
                else{
                  fetchMovie();
                }
              }
            }
            >
              <Tab eventKey="ongoing" title={<h5>กำลังฉาย</h5>} className="Tab_btn">
              </Tab>
              <Tab eventKey="comingsoon" title={<h5>โปรแกรมหน้า</h5>} onClick={fetchMovieUpcoming}>
              </Tab>
            </Tabs>
          </div>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
          {renderMovies()}
          </div>
        </div>
      </Container>
    
  );
}

export default MainContainer;
