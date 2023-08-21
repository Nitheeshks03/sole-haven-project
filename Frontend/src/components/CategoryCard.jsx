import "./CategoryCard.css";



function CategoryCard({title, image, backgroundStyle }) {
  return (
    <>
      <div className="category-card">
        <figure style={backgroundStyle}>
          <img className="card-img" src={image} alt="" />
        </figure>
        <div className="card-content">
          <h3>{title}</h3>
        </div>
      </div>
    </>
  );
}

export default CategoryCard;
