import Header from './components/Header';
import Hero from './components/Hero';
import CategoryCard from './components/CategoryCard';
import ProductCard from './components/ProductCard';
import BlogCard from './components/BlogCard';
import Footer from './components/Footer';
import './styles/App.css';

const categories = [
  { title: 'Coffee Mocha', image: '/assets/mocha.png' },
  { title: 'Espresso Americano', image: '/assets/espresso.png' },
  { title: 'Cappuccino', image: '/assets/cappuccino.png' },
];

const milkshakes = [
  { name: 'Mocha Shake', price: '$20.00', likes: 30, image: '/assets/mocha-shake.png', bgColor: '#e8f5e9' },
  { name: 'Lavender Shake', price: '$20.00', likes: 30, image: '/assets/lavender-shake.png', bgColor: '#ede7f6' },
  { name: 'Caramel Shake', price: '$20.00', likes: 30, image: '/assets/caramel-shake.png', bgColor: '#fce4ec' },
  { name: 'Chocolate Shake', price: '$20.00', likes: 30, image: '/assets/choco-shake.png', bgColor: '#efebe9' },
];

const blogs = [
  {
    title: 'Coffee Connoisseur',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/assets/blog1.jpg',
    buttonText: 'Read More',
  },
  {
    title: 'Coffee Connoisseur',
    excerpt:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/assets/blog2.jpg',
    buttonText: 'Read More',
  },
  {
    title: 'Coffee Connoisseur',
    excerpt:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: '/assets/blog3.jpg',
    buttonText: 'Read More',
  },
];

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />

      <section className="section">
        <h2 className="section__title">TOP CATEGORIES</h2>
        <p className="section__subtitle">
          Explore The Recent Most Bought Drinks This Week
        </p>
        <div className="categories-grid">
          {categories.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">TOP MILK SHAKES</h2>
        <p className="section__subtitle">
          Explore The Recent Most Bought Shakes This Week
        </p>
        <div className="products-grid">
          {milkshakes.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">LATEST BLOGS</h2>
        <p className="section__subtitle">
          Explore The Recent Most Read Stories This Week
        </p>
        <div className="blogs-grid">
          {blogs.map((b, i) => (
            <BlogCard key={i} {...b} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;