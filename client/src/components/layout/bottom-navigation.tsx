import { Link, useLocation } from "wouter";
import { Home, Map, Route, Store, Phone } from "lucide-react";

const navigationItems = [
  { path: "/", icon: Home, label: "Início" },
  { path: "/map", icon: Map, label: "Mapa" },
  { path: "/itineraries", icon: Route, label: "Roteiros" },
  { path: "/establishments", icon: Store, label: "Locais" },
  { path: "/emergency", icon: Phone, label: "Emergência" },
];

export default function BottomNavigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map(({ path, icon: Icon, label }) => {
          const isActive = location === path;
          
          return (
            <Link
              key={path}
              href={path}
              className={`flex flex-col items-center py-2 px-3 smooth-transition ${
                isActive ? "text-ocean" : "text-gray-500 hover:text-ocean"
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
