import { Carousel } from "react-bootstrap";
import './Home.css';

export const Home = () => {
  return (
    <Carousel interval={1000}>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="./imagen1.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="./imagen2.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="./imagen3.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}
