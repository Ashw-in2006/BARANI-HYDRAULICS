import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Calculator from './components/Calculator';
import TonnageCalculator from './components/TonnageCalculator';
import WeightCalculator from './components/WeightCalculator';
import About from './pages/About';
import TieRod from './pages/TieRod';
import TieRodResults from './pages/TieRodResults';
import CylinderCalculations from './components/CylinderCalculations';
import PlateCalculator from './pages/PlateCalculator';
import MainCylinderCalculator from './components/MainCylinderCalculator';
import MainCylinderResultsPage from './pages/MainCylinderResults';
import DieCushionCalculator from './components/DieCushionCalculator';
import DieCushionResultsPage from './pages/DieCushionResults';

// Placeholder components for future implementation
const MetricChart = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-4">Metric Chart</h1>
    <p>Coming soon...</p>
  </div>
);

const ChainSelection = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-4">Chain Selection</h1>
    <p>Coming soon...</p>
  </div>
);

const NotFound = () => (
  <div className="container mx-auto px-4 py-8 text-center">
    <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/tonnage" element={<TonnageCalculator />} />
            <Route path="/cylinder" element={<CylinderCalculations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/weight" element={<WeightCalculator />} />
            <Route path="/tierod" element={<TieRod />} />
            <Route path="/tierod/results" element={<TieRodResults />} />
            <Route path="/plate" element={<PlateCalculator />} />
            <Route path="/main-cylinder" element={<MainCylinderCalculator />} />
            <Route path="/main-cylinder-results" element={<MainCylinderResultsPage />} />
            <Route path="/metric" element={<MetricChart />} />
            <Route path="/chain" element={<ChainSelection />} />
            <Route path="/die-cushion" element={<DieCushionCalculator />} />
            <Route path="/die-cushion-results" element={<DieCushionResultsPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;