import { useEffect, useRef } from "react";
import { GURIRI_LOCATION } from "@/lib/constants";
import { MapPin } from "lucide-react";

interface GoogleMapProps {
  className?: string;
  markers?: Array<{
    lat: number;
    lng: number;
    title: string;
    type?: string;
  }>;
}

declare global {
  interface Window {
    google?: any;
    initMap?: () => void;
  }
}

export default function GoogleMap({ className = "h-64", markers = [] }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current || !window.google?.maps?.Map) return;

      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: GURIRI_LOCATION,
          zoom: GURIRI_LOCATION.zoom,
          styles: [
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#1976d2" }],
            },
            {
              featureType: "landscape.natural",
              elementType: "geometry.fill",
              stylers: [{ color: "#4caf50" }],
            },
          ],
        });

        mapInstanceRef.current = map;

        // Add default Guriri marker
        if (window.google.maps.Marker) {
          new window.google.maps.Marker({
            position: GURIRI_LOCATION,
            map: map,
            title: "Praia de Guriri",
            icon: {
              url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" fill="#0D47A1"/>
                  <circle cx="16" cy="16" r="8" fill="#FFB300"/>
                  <circle cx="16" cy="16" r="4" fill="white"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(32, 32),
            },
          });
        }

        // Add additional markers
        if (window.google.maps.Marker) {
          markers.forEach((marker) => {
            const icon = marker.type === "hotel" 
              ? "#1976d2" 
              : marker.type === "restaurant" 
              ? "#2e7d32" 
              : "#ff6f00";

            new window.google.maps.Marker({
              position: { lat: marker.lat, lng: marker.lng },
              map: map,
              title: marker.title,
              icon: {
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" fill="${icon}"/>
                    <circle cx="12" cy="12" r="4" fill="white"/>
                  </svg>
                `)}`,
                scaledSize: new window.google.maps.Size(24, 24),
              },
            });
          });
        }
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
      }
    };

    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"
      }&libraries=places`;
      script.async = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [markers]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      {!window.google && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
          <div className="text-center">
            <Map className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-gray-600">Carregando mapa...</p>
          </div>
        </div>
      )}
    </div>
  );
}
