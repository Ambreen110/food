import BestFoods from './components/BestFoods';
import HeroSection from './components/HeroSection';

export default function HomePage({ posts }) {
  return (
    <div>
      <HeroSection />
      <BestFoods posts={posts} />
    </div>
  );
}

