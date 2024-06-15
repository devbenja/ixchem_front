import { Carousel } from "react-bootstrap";

export const Home = () => {
  return (
    <Carousel interval={1000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./imagen1.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./imagen2.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./imagen3.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}
