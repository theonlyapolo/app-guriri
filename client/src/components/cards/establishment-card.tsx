import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone } from "lucide-react";
import type { Establishment } from "@shared/schema";

interface EstablishmentCardProps {
  establishment: Establishment;
  onShowOnMap?: (establishment: Establishment) => void;
}

export default function EstablishmentCard({ 
  establishment, 
  onShowOnMap 
}: EstablishmentCardProps) {
  const getTypeColor = (type: string) => {
    return type === "hotel" ? "bg-ocean" : "bg-nature";
  };

  const getTypeLabel = (type: string) => {
    return type === "hotel" ? "Hotel" : "Restaurante";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < rating ? "text-sand fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const handleCall = () => {
    if (establishment.phone) {
      window.location.href = `tel:${establishment.phone}`;
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg smooth-transition">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-800">{establishment.name}</h3>
              <Badge className={`${getTypeColor(establishment.type)} text-white text-xs`}>
                {getTypeLabel(establishment.type)}
              </Badge>
            </div>
            
            {establishment.rating && (
              <div className="flex items-center mb-2">
                <div className="flex">
                  {renderStars(establishment.rating)}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {establishment.rating}.0 ({establishment.reviewCount} avaliações)
                </span>
              </div>
            )}
            
            <p className="text-sm text-gray-600 mb-2 flex items-center">
              <MapPin size={14} className="mr-1" />
              {establishment.address}
            </p>
            
            {establishment.priceRange && (
              <p className="text-ocean font-semibold">
                {establishment.priceRange} • {establishment.description}
              </p>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            {establishment.phone && (
              <Button
                size="icon"
                variant="ghost"
                className="text-ocean hover:bg-blue-50"
                onClick={handleCall}
              >
                <Phone size={16} />
              </Button>
            )}
            
            {onShowOnMap && establishment.latitude && establishment.longitude && (
              <Button
                size="icon"
                variant="ghost"
                className="text-ocean hover:bg-blue-50"
                onClick={() => onShowOnMap(establishment)}
              >
                <MapPin size={16} />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
