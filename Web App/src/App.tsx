import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TestAll from "./pages/TestAll";
import Adversaries from "./pages/Adversaries";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./components/ui/navigation-menu";
import CreateAdversary from "./pages/CreateAdversary";
import EncounterCreatorPage from "./pages/EncounterCreatorPage";
import AdvFeaturesPage from "./components/AdversaryFeaturesTable/page";
import { AdversaryCards } from "./components/AdversaryCards";
import AdversaryCardsPage from "./pages/AdversaryCardsPage";

function App() {
  return (<>
  <Router>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Adversaries</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink asChild>
              <Link to="/adversaries">List of Adversaries</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link to="/adversary-features">List of Adversary Features</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link to="/adversary-cards">Adversary Cards</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link to="/create-adversary">Create Adversary</Link>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Encounters</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/create-encounter">Encounter Creator</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    <Routes>
      <Route path="/" element={<TestAll />} />
      <Route path="/adversary-cards" element={<AdversaryCardsPage />} />
      <Route path="/adversaries" element={<Adversaries />} />
      <Route path="/create-adversary" element={<CreateAdversary />} />
      <Route path="/create-encounter" element={<EncounterCreatorPage />} />
      <Route path="/adversary-features" element={<AdvFeaturesPage adv=""/>} />
    </Routes>
  </Router>
  </>)
}

export default App
