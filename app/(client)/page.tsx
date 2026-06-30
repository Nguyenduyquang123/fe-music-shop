import AboutSectionPage from "@/public/src/components/layout/home/aboutsection";
import FeaturedblogPage from "@/public/src/components/layout/home/featuredblog";
import FeaturedProductPage from "@/public/src/components/layout/home/featuredproduct";
import HeroPage from "@/public/src/components/layout/home/hero";

export default function Home() {
  return (
    <>
      <HeroPage />
      <FeaturedProductPage />
      <AboutSectionPage />
      <FeaturedblogPage />
    </>
  );
}
