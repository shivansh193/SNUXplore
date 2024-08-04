import HeroSec from "../components/LandingPage/HeroSec1"
import QuickLinksPage from "../components/LandingPage/QuickLinksPage";
import Navigation from "../components/LandingPage/NavigationBig"

export default function Home() {
  return (
    <div className={`overflow-x-hidden`}>
      <HeroSec />
      <QuickLinksPage />
      <Navigation />
    </div>
  );
}
