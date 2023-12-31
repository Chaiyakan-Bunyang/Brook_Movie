import Carousel from "react-bootstrap/Carousel";
import "../css/CarouselsMain.css";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";

export default function CarouselsMain() {
  return (
    <Container>
      <Carousel className="bg-dark Carousel-container" fade>
        <Carousel.Item>
          <img
            className="img-fluid Carousel_IMG"
            src="/IMG/Carousels_IMG1.jpg"
            alt="First Slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="img-fluid Carousel_IMG"
            src="/IMG/Carousels_IMG2.jpg"
            alt="Second slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="img-fluid Carousel_IMG"
            src="/IMG/Carousels_IMG3.jpg"
            alt="Third slide"
          /> 
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
