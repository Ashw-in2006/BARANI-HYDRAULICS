import { useNavigate } from 'react-router-dom';
import { Calculator, Droplets, Ruler, Scale, Table, Link, Settings } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Tonnage Calculator', icon: Calculator, path: '/tonnage' },
    { title: 'Pump Flow and Motor HP Calculator', icon: Droplets, path: '/calculator' },
    { title: 'Tie Rod & Step Dia Calculator', icon: Ruler, path: '/tierod' },
    { title: 'Shaft or Plate Weight & Foundation Calculator', icon: Scale, path: '/weight' },
    { title: 'Main Cylinder Assembly Calculator', icon: Settings, path: '/main-cylinder' },
    { title: 'Die Cushion Cylinders Calculator', icon: Settings, path: '/die-cushion' },
    { title: 'Metric Chart', icon: Table, path: '/metric' },
    { title: 'Chain Selection', icon: Link, path: '/chain' },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to BARANI HYDRAULICUS
          </h1>
          <p className="text-xl text-gray-600">
            Your trusted partner in hydraulic solutions
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-lg shadow-lg p-6 cursor-pointer hover:bg-gray-100 hover:shadow-xl transition-all duration-300"
                onClick={() => navigate(item.path)}
              >
                <div className="flex flex-col items-center space-y-4">
                  <Icon size={40} className="text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-800 text-center">
                    {item.title}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;