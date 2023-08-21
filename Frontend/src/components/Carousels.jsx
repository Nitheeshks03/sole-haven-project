import { Carousel } from "@mantine/carousel";




export default function Carousels({images}) {
  const slides = images.map((image) => (
    <Carousel.Slide
      key={image}  
      style={{objectFit:'cover',maxHeight:"450px",}}
    >
      <img src={image} alt="slide" style={{width:'100%'}} loading='lazy'/>
    </Carousel.Slide>
  ));

  return (
    <Carousel
    >
      {slides}
    </Carousel>
  );
}
