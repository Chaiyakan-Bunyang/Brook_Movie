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

export default function AllMovie() {
  const [page, setPage] = useState(1);
  const [numberOFpage, setNumberOFpage] = useState();
  const [allmovie, setAllmovie] = useState([]);
  const API_KEY = "dff713f12ffdfc4081f559aa479cfbda";

  const fetchAPI = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${parseInt(
        page
      )}&primary_release_year=2015&sort_by=popularity.desc`,
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
    setNumberOFpage(100);
    console.log(response.data);
  };
  useEffect(() => {
    fetchAPI();
  }, [page]);
  const renderallmovie = () =>
    allmovie.map((movie) => <AllMovieCard key={movie.id} movie={movie} />);
  console.log(allmovie);

  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  console.log(page);

  return (
    <div className="mt-2">
      <Container>
        <div className="d-flex justify-content-center">
          <div className="w-100 me-3 d-none d-sm-none d-md-none d-xl-block">
            <ListGroup defaultActiveKey="#link1">
              <ListGroup.Item
                action
                href="#link1"
                className="bg-dark border-0 text-white"
              >
                <h5 className="text-center">ปีที่ฉาย</h5>
              </ListGroup.Item>
              <ListGroup.Item action href="#link2" disabled></ListGroup.Item>
              <ListGroup.Item actionsa>This one is a button</ListGroup.Item>
            </ListGroup>
          </div>

          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
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
