`useclient`
import AboutSection from "./components/AboutSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import HeroSection from "./components/Herosection";
import Navbar from "./components/Navbar";
import NewsletterSection from "./components/NewsletterSection";
import PopularProducts from "./components/PopularProducts";
import ProductGrid from "./components/ProductGrid";
import ProductCards from "./product/product";
import Wishlist from "./components/wishlist";
export default function Home() {
  return (
  <>
  {/* <Navbar/> */}
  <ProductCards/>
  <Wishlist/>
  <HeroSection/>
  <FeaturesSection/>
  <ProductGrid/>
  <PopularProducts/>
  <NewsletterSection/>
  <AboutSection/>
  <Footer/>
  </> 
  );
}
