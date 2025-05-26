import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import GuririMap from "@/components/map/guriri-map";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import EstablishmentCard from "@/components/cards/establishment-card";
import type { Establishment } from "@shared/schema";
import { MapPin, Hotel, UtensilsCrossed, Filter } from "lucide-react";

export default function MapPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);

  const { data: establishments, isLoading } = useQuery<Establishment[]>({
    queryKey: ["/api/establishments"],
  });

  const filteredEstablishments = establishments?.filter(
    est => selectedType === "all" || est.type === selectedType
  ) || [];

  const mapMarkers = filteredEstablishments
    .filter(est => est.latitude && est.longitude)
    .map(est => ({
      lat: parseFloat(est.latitude!),
      lng: parseFloat(est.longitude!),
      title: est.name,
      type: est.type,
    }));

  const handleShowOnMap = (establishment: Establishment) => {
    setSelectedEstablishment(establishment);
    // Scroll to map
    document.getElementById('interactive-map')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="px-4 py-6 bg-gradient-to-r from-ocean to-blue-600 text-white">
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <MapPin className="mr-2" size={24} />
          Mapa de Guriri
        </h1>
        <p className="text-blue-100">Explore hotéis, restaurantes e pontos de interesse</p>
      </section>

      {/* Filter Buttons */}
      <section className="px-4 py-4 bg-white border-b">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Button
            variant={selectedType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("all")}
            className="whitespace-nowrap"
          >
            <Filter className="mr-1" size={14} />
            Todos
          </Button>
          <Button
            variant={selectedType === "hotel" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("hotel")}
            className="whitespace-nowrap bg-ocean hover:bg-blue-700"
          >
            <Hotel className="mr-1" size={14} />
            Hotéis
          </Button>
          <Button
            variant={selectedType === "restaurant" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType("restaurant")}
            className="whitespace-nowrap bg-nature hover:bg-green-700"
          >
            <UtensilsCrossed className="mr-1" size={14} />
            Restaurantes
          </Button>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="px-4 py-6" id="interactive-map">
        <Card className="shadow-lg overflow-hidden">
          <div className="p-4 bg-ocean text-white">
            <h3 className="text-lg font-semibold flex items-center">
              <MapPin className="mr-2" size={20} />
              Mapa Interativo
            </h3>
            {selectedEstablishment && (
              <p className="text-blue-100 text-sm mt-1">
                Visualizando: {selectedEstablishment.name}
              </p>
            )}
          </div>
          <div className="p-4">
            <GuririMap 
              className="h-80" 
              markers={mapMarkers}
            />
            <div className="flex justify-between mt-4">
              <Badge className="bg-ocean text-white">
                <Hotel className="mr-1" size={14} />
                Hotéis ({filteredEstablishments.filter(e => e.type === 'hotel').length})
              </Badge>
              <Badge className="bg-nature text-white">
                <UtensilsCrossed className="mr-1" size={14} />
                Restaurantes ({filteredEstablishments.filter(e => e.type === 'restaurant').length})
              </Badge>
            </div>
          </div>
        </Card>
      </section>

      {/* Establishments List */}
      <section className="px-4 py-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {selectedType === "all" 
            ? "Todos os Estabelecimentos" 
            : selectedType === "hotel" 
            ? "Hotéis e Pousadas"
            : "Restaurantes"
          }
        </h3>
        
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredEstablishments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MapPin className="mx-auto mb-4 text-gray-400" size={48} />
              <h4 className="font-semibold text-gray-700 mb-2">
                Nenhum estabelecimento encontrado
              </h4>
              <p className="text-gray-500">
                Tente alterar os filtros para ver mais opções.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredEstablishments.map((establishment) => (
              <EstablishmentCard
                key={establishment.id}
                establishment={establishment}
                onShowOnMap={handleShowOnMap}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
