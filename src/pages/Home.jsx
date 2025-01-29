import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import About from '../pages/About';
import Products from '../pages/Products';
import Services from '../pages/Services';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Products />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
