import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import About from '../pages/About';
import Products from '../pages/Products';
import Services from '../pages/Services';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      
      {/* Move Products above Services */}
      <div id="products">
        <Products />
      </div>
      
      <div id="services">
        <Services />
      </div>

      <div id="blog">
        <Blog />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
