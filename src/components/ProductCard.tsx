import { Heart } from 'lucide-react';
import '../styles/ProductCard.css';

interface ProductCardProps {
  name: string;
  price: string;
  likes: number;
  image: string;
  bgColor: string;
}

const ProductCard = ({ name, price, likes, image, bgColor }: ProductCardProps) => {
  return (
    <article className="product-card" style={{ backgroundColor: bgColor }}>
      <span className="product-card__likes">
        <Heart size={12} fill="currentColor" />
        {likes} likes
      </span>
      <img className="product-card__image" src={image} alt={name} />
      <h3 className="product-card__name">{name}</h3>
      <div className="product-card__footer">
        <span className="product-card__price">{price}</span>
        <button className="product-card__btn">BUY NOW</button>
      </div>
    </article>
  );
};

export default ProductCard;