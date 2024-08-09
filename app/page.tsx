import HeroSec from "../components/LandingPage/HeroSec1"
import QuickLinksPage from "../components/LandingPage/QuickLinksPage";
import Navigation from "../components/LandingPage/NavigationBig"
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className={`overflow-x-hidden`}>
      <SearchBar />
      <HeroSec />
      <QuickLinksPage />
      <Navigation />
    </div>
  );
}
