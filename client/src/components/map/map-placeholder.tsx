import { MapPin } from "lucide-react";

interface MapPlaceholderProps {
  className?: string;
  markers?: Array<{
    lat: number;
    lng: number;
    title: string;
    type?: string;
  }>;
}

export default function MapPlaceholder({ className = "h-64", markers = [] }: MapPlaceholderProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <div className="text-center text-white">
          <MapPin className="mx-auto mb-2" size={32} />
          <p className="font-semibold">Praia de Guriri</p>
          <p className="text-sm text-blue-100">São Mateus - ES</p>
          <div className="mt-3 text-xs">
            <div className="flex items-center justify-center gap-4">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-blue-800 rounded-full mr-1"></div>
                Hotéis ({markers.filter(m => m.type === 'hotel').length})
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                Restaurantes ({markers.filter(m => m.type === 'restaurant').length})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}