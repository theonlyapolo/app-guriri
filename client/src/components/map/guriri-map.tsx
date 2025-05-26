import { useEffect, useRef, useState } from "react";
import { GURIRI_LOCATION } from "@/lib/constants";
import { MapPin, Satellite, Map as MapIcon, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuririMapProps {
  className?: string;
  markers?: Array<{
    lat: number;
    lng: number;
    title: string;
    type?: string;
  }>;
}

export default function GuririMap({ className = "h-64", markers = [] }: GuririMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapType, setMapType] = useState<'satellite' | 'roadmap' | 'hybrid'>('satellite');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current || !window.google?.maps?.Map) return;

      try {
        setIsLoading(false);
        setError(false);

        const map = new window.google.maps.Map(mapRef.current, {
          center: GURIRI_LOCATION,
          zoom: 15,
          mapTypeId: mapType,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: window.google.maps.ControlPosition.TOP_CENTER,
          },
          zoomControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          gestureHandling: 'cooperative',
        });

        mapInstanceRef.current = map;

        // Marker principal da Praia de Guriri
        const guririMarker = new window.google.maps.Marker({
          position: GURIRI_LOCATION,
          map: map,
          title: "Praia de Guriri - São Mateus, ES",
          icon: {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#0D47A1" stroke="white" stroke-width="2"/>
                <circle cx="20" cy="20" r="12" fill="#FFB300"/>
                <circle cx="20" cy="20" r="6" fill="white"/>
                <text x="20" y="24" font-family="Arial" font-size="8" fill="#0D47A1" text-anchor="middle">🏖️</text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 20),
          },
        });

        // Info window para o marker principal
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #0D47A1; font-size: 16px;">🏖️ Praia de Guriri</h3>
              <p style="margin: 0; font-size: 14px; color: #555;">
                Paraíso natural do Espírito Santo<br>
                📍 São Mateus - ES<br>
                🐢 Área de preservação do Projeto Tamar
              </p>
            </div>
          `
        });

        guririMarker.addListener('click', () => {
          infoWindow.open(map, guririMarker);
        });

        // Adicionar markers dos estabelecimentos
        markers.forEach((marker) => {
          const iconColor = marker.type === "hotel" ? "#1976d2" : "#2e7d32";
          const iconEmoji = marker.type === "hotel" ? "🏨" : "🍽️";
          
          const establishmentMarker = new window.google.maps.Marker({
            position: { lat: marker.lat, lng: marker.lng },
            map: map,
            title: marker.title,
            icon: {
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="13" fill="${iconColor}" stroke="white" stroke-width="2"/>
                  <circle cx="15" cy="15" r="8" fill="white"/>
                  <text x="15" y="19" font-family="Arial" font-size="10" text-anchor="middle">${iconEmoji}</text>
                </svg>
              `)}`,
              scaledSize: new window.google.maps.Size(30, 30),
              anchor: new window.google.maps.Point(15, 15),
            },
          });

          const establishmentInfo = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 6px; max-width: 180px;">
                <h4 style="margin: 0 0 4px 0; color: ${iconColor};">${iconEmoji} ${marker.title}</h4>
                <p style="margin: 0; font-size: 12px; color: #666;">
                  ${marker.type === "hotel" ? "Hospedagem" : "Restaurante"}
                </p>
              </div>
            `
          });

          establishmentMarker.addListener('click', () => {
            establishmentInfo.open(map, establishmentMarker);
          });
        });

      } catch (error) {
        console.error("Error initializing Google Maps:", error);
        setError(true);
        setIsLoading(false);
      }
    };

    const loadGoogleMaps = () => {
      if (window.google?.maps?.Map) {
        initializeMap();
        return;
      }

      if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
        setError(true);
        setIsLoading(false);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        initializeMap();
      };
      
      script.onerror = () => {
        console.error("Failed to load Google Maps");
        setError(true);
        setIsLoading(false);
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [markers, mapType]);

  // Função para alterar tipo do mapa
  const changeMapType = (type: 'satellite' | 'roadmap' | 'hybrid') => {
    setMapType(type);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setMapTypeId(type);
    }
  };

  if (error) {
    return (
      <div className={`relative ${className} bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center`}>
        <div className="text-center text-white p-6">
          <MapPin className="mx-auto mb-3" size={40} />
          <h3 className="font-bold text-lg mb-2">Praia de Guriri</h3>
          <p className="text-sm text-blue-100 mb-1">São Mateus - ES</p>
          <p className="text-xs text-blue-200">Lat: {GURIRI_LOCATION.lat}</p>
          <p className="text-xs text-blue-200">Lng: {GURIRI_LOCATION.lng}</p>
          <div className="mt-4 text-xs">
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
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      
      {/* Controles de Mapa */}
      <div className="absolute top-2 left-2 flex gap-1 bg-white rounded-lg shadow-md p-1">
        <Button
          size="sm"
          variant={mapType === 'satellite' ? 'default' : 'ghost'}
          onClick={() => changeMapType('satellite')}
          className="h-8 px-2"
          title="Vista de Satélite"
        >
          <Satellite size={14} />
        </Button>
        <Button
          size="sm"
          variant={mapType === 'roadmap' ? 'default' : 'ghost'}
          onClick={() => changeMapType('roadmap')}
          className="h-8 px-2"
          title="Mapa de Ruas"
        >
          <MapIcon size={14} />
        </Button>
        <Button
          size="sm"
          variant={mapType === 'hybrid' ? 'default' : 'ghost'}
          onClick={() => changeMapType('hybrid')}
          className="h-8 px-2"
          title="Vista Híbrida"
        >
          <Layers size={14} />
        </Button>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">Carregando vista da praia...</p>
          </div>
        </div>
      )}
    </div>
  );
}