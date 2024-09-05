import { Carousel } from "react-bootstrap";
import './Home.css';

const images = [
	"./logo.png",
	"./Granada.jpeg",
	"./Leon.jpeg",
	"./Managua.jpeg",
	"./Matagalpa.jpeg",
	"./Sandino.jpeg",
	"./Tipitapa.jpeg",
	"./Villa.jpeg",
	"./Logo-Anfam-Ixchen.png",
];

export const Home = () => {
	return (
		<Carousel interval={7000}>
			{images.map((image, index) => (
				<Carousel.Item key={index}>
					<img
						className="d-block w-100 carousel-image"
						src={image}
						alt={`Slide ${index + 1}`}
					/>
				</Carousel.Item>
			))}
		</Carousel>
	)
}
