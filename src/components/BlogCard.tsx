import '../styles/BlogCard.css';

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  buttonText: string;
}

const BlogCard = ({ title, excerpt, image, buttonText }: BlogCardProps) => {
  return (
    <article className="blog-card">
      <img className="blog-card__image" src={image} alt={title} />
      <div className="blog-card__body">
        <h3 className="blog-card__title">{title}</h3>
        <p className="blog-card__excerpt">{excerpt}</p>
        <button className="blog-card__btn">{buttonText}</button>
      </div>
    </article>
  );
};

export default BlogCard;