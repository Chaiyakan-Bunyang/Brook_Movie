import { Container } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "../css/AllMovie.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AllMovieCard from "./AllMovieCard";
import Pagination from "react-bootstrap/Pagination";
import { PaginationControl } from "react-bootstrap-pagination-control";
import Form from "react-bootstrap/Form";

export default function AllMovie() {
  const [page, setPage] = useState(1);
  const [language,setLanguage] = useState('');
  const [year,setYear] = useState('');
  const [sort,setSort] = useState("popularity.desc");
  const [allmovie, setAllmovie] = useState([]);
  const [adult,setAdult] = useState(false);
  const API_KEY = "dff713f12ffdfc4081f559aa479cfbda";
  
  console.log(adult);

  const fetchAPI = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=${adult}&include_video=false&with_original_language=${language}&page=${parseInt(
        page
      )}&primary_release_year=${year}&sort_by=${sort}`,
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmY3MTNmMTJmZmRmYzQwODFmNTU5YWE0NzljZmJkYSIsInN1YiI6IjY0OGU5NGY2YzJmZjNkMDBlMmUwODI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PnwtSP4KQPalyeWaF3TEheC6AUFHRjHcln2pbT3BB_E",
        },
        params: { api_key: API_KEY },
      }
    );
    setAllmovie(response.data.results);
    console.log(response.data);
  };
  useEffect(() => {
    fetchAPI();
  }, [page,sort,language,adult]);
  const renderallmovie = () =>
    allmovie.map((movie) => <AllMovieCard key={movie.id} movie={movie} />);
 

  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  const sort_movie = (val)=> {
      setSort(val.target.value)
  }
  console.log(language);
  const filter_handle = ()=>{

  }
  return (
    <div className="mt-2">
      <Container>
        <div className="d-flex justify-content-center">
          <div className="me-3 d-none d-sm-none d-md-none d-xl-block">
            <ListGroup defaultActiveKey="#link1" className="sort-container">
              <ListGroup.Item className="bg-dark border-0 text-white">
                <h5 className="text-center">ค้นหาจาก</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Select aria-label="Default select example" onChange={(e)=>sort_movie(e)} defaultValue="popularity.desc">
                  <option value="popularity.desc">หนังยอดนิยม</option>
                  <option value="vote_average.desc">หนังคะแนนดี</option>
                  <option value="primary_release_date.asc">หนังเก่าที่สุด</option>
                </Form.Select>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup defaultActiveKey="#link1" className="mt-3">
              <ListGroup.Item className="bg-dark border-0 text-white">
                <h5 className="text-center">หมวดหมู่</h5>
              </ListGroup.Item>
              <ListGroup.Item action href="#en" value="en-US"  onClick={()=>{setLanguage('en'),setPage(1)}}>
                หนังฝรั่ง
              </ListGroup.Item>
              <ListGroup.Item action href="#th"  onClick={()=>{setLanguage('th'),setPage(1)}} >
                หนังไทย
              </ListGroup.Item>
              <ListGroup.Item action href="#ko"  onClick={()=>{setLanguage('ko'),setPage(1)}} >
                หนังเกาหลี
              </ListGroup.Item>
              <ListGroup.Item action href="#ja" onClick={()=>{setLanguage('ja'),setPage(1)}}>
                หนังญี่ปุ่น
              </ListGroup.Item>
              <ListGroup.Item action href="#cn" onClick={()=>{setLanguage('cn'),setPage(1)}}>
                หนังจีน
              </ListGroup.Item>
              <ListGroup.Item action href="#hi" onClick={()=>{setLanguage('hi'),setPage(1)}}>
                หนังอินเดีย
              </ListGroup.Item>
                      
            </ListGroup>
          </div>

          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
            {renderallmovie()}
          </div>
        </div>
        <div className="mt-5 justify-content-center ">
          <PaginationControl
            page={page}
            between={4}
            total={100}
            limit={1}
            changePage={handlePageChange}
            ellipsis={1}
          />
        </div>

        {/* 
        <Pagination 
        className="mt-5 justify-content-center"
        onClick={(e)=> handlePageChange(e.target.textContent)}
        > 
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Item>{5}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{numberOFpage}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
        */}
      </Container>
    </div>
  );
}
