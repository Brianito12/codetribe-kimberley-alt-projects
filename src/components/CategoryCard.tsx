import '../styles/CategoryCard.css';

interface CategoryCardProps {
  title: string;
  image: string;
}

const CategoryCard = ({ title, image }: CategoryCardProps) => {
  return (
    <article className="category-card">
      <img className="category-card__image" src={image} alt={title} />
      <div className="category-card__overlay">
        <h3 className="category-card__title">{title}</h3>
        <button className="category-card__btn">View More</button>
      </div>
    </article>
  );
};

export default CategoryCard;