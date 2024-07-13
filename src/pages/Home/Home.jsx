import { Carousel } from "react-bootstrap";
import './Home.css';

const images = [
	"./imagen_ixchem1.jpeg",
	// "./imagen_ixchem2.jpeg",
	"./imagen_ixchem3.jpeg",
	"./imagen_ixchem4.jpeg",
	"./imagen_ixchem5.jpeg",
	"./imagen_ixchem6.jpeg",
];

export const Home = () => {
	return (
		<Carousel interval={1000}>
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
