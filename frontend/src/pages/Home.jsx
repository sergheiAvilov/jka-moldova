import Header from '../components/Header/Header.jsx';
import Hero from '../components/Hero/Hero.jsx';
import RedStripe from '../components/RedStripe/RedStripe.jsx';
import About from '../components/About/About.jsx';
import Disciplines from '../components/Disciplines/Disciplines.jsx';
import Instructors from '../components/Instructors/Instructors.jsx';
import Events from '../components/Events/Events.jsx';
import News from '../components/News/News.jsx';
import Quote from '../components/Quote/Quote.jsx';
import Gallery from '../components/Gallery/Gallery.jsx';
import CTA from '../components/CTA/CTA.jsx';
import Footer from '../components/Footer/Footer.jsx';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: 72 }}>
        <Hero />
        <RedStripe />
        <About />
        <Instructors />
        <Disciplines />
        <Quote />
        <Events />
        <News />
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
