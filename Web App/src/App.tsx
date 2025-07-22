import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import TestAll from "./pages/TestAll";
import Adversaries from "./pages/Adversaries";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./components/ui/navigation-menu";
import CreateAdversary from "./pages/CreateAdversary";
import EncounterCreatorPage from "./pages/EncounterCreatorPage";

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
            <NavigationMenuLink href="/adversaries">List of Adversaries</NavigationMenuLink>
            <NavigationMenuLink href="/">Adversaries</NavigationMenuLink>
            <NavigationMenuLink href="/create-adversary">Create Adversary</NavigationMenuLink>
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
      <Route path="/adversaries" element={<Adversaries />} />
      <Route path="/create-adversary" element={<CreateAdversary />} />
      <Route path="/create-encounter" element={<EncounterCreatorPage />} />
    </Routes>
  </Router>
  </>)
}

export default App
