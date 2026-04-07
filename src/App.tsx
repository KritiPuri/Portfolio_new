import HeroSection from './components/HeroSection';
import CustomCursor from './components/CustomCursor';
import FeaturedProjects from './components/FeaturedProjects';
import Qualifications from './components/Qualifications';
import Experiences from './components/Experiences';
import Skills from './components/Skills';
import Leadership from './components/Leadership';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-black text-white selection:bg-purple-500/30 selection:text-white">
      <CustomCursor />
      <HeroSection />
      <Experiences />
      <FeaturedProjects />
      <Skills />
      <Qualifications />
      <Leadership />
      <Footer />
    </div>
  );
}

export default App;
