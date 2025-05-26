import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EstablishmentCard from "@/components/cards/establishment-card";
import type { Establishment } from "@shared/schema";
import { Store, Hotel, UtensilsCrossed } from "lucide-react";

export default function Establishments() {
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);

  const { data: establishments, isLoading } = useQuery<Establishment[]>({
    queryKey: ["/api/establishments"],
  });

  const hotels = establishments?.filter(est => est.type === "hotel") || [];
  const restaurants = establishments?.filter(est => est.type === "restaurant") || [];

  const handleShowOnMap = (establishment: Establishment) => {
    setSelectedEstablishment(establishment);
    // In a real app, this would open the map page with the establishment highlighted
    console.log("Show on map:", establishment);
  };

  const renderEstablishments = (items: Establishment[], type: string) => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <Store className="mx-auto mb-4 text-gray-400" size={48} />
            <h4 className="font-semibold text-gray-700 mb-2">
              Nenhum {type} encontrado
            </h4>
            <p className="text-gray-500">
              Novos estabelecimentos serão adicionados em breve.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {items.map((establishment) => (
          <EstablishmentCard
            key={establishment.id}
            establishment={establishment}
            onShowOnMap={handleShowOnMap}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="px-4 py-6 bg-gradient-to-r from-nature to-green-600 text-white">
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <Store className="mr-2" size={24} />
          Estabelecimentos Locais
        </h1>
        <p className="text-green-100">Hotéis, pousadas e restaurantes em Guriri</p>
      </section>

      {/* Establishments Tabs */}
      <section className="px-4 py-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Store size={16} />
              Todos
            </TabsTrigger>
            <TabsTrigger value="hotels" className="flex items-center gap-2">
              <Hotel size={16} />
              Hotéis
            </TabsTrigger>
            <TabsTrigger value="restaurants" className="flex items-center gap-2">
              <UtensilsCrossed size={16} />
              Restaurantes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Hotels Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <Hotel className="text-ocean mr-2" size={20} />
                Hotéis e Pousadas
              </h3>
              {renderEstablishments(hotels, "hotel")}
            </div>

            {/* Restaurants Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <UtensilsCrossed className="text-nature mr-2" size={20} />
                Restaurantes
              </h3>
              {renderEstablishments(restaurants, "restaurante")}
            </div>
          </TabsContent>

          <TabsContent value="hotels">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <Hotel className="text-ocean mr-2" size={20} />
              Hotéis e Pousadas ({hotels.length})
            </h3>
            {renderEstablishments(hotels, "hotel")}
          </TabsContent>

          <TabsContent value="restaurants">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <UtensilsCrossed className="text-nature mr-2" size={20} />
              Restaurantes ({restaurants.length})
            </h3>
            {renderEstablishments(restaurants, "restaurante")}
          </TabsContent>
        </Tabs>
      </section>

      {/* Quick Actions */}
      <section className="px-4 py-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Dica do Viajante</h4>
            <p className="text-blue-700 text-sm mb-3">
              Reserve com antecedência durante a alta temporada (dezembro a março) 
              e aproveite as promoções da baixa temporada.
            </p>
            <div className="flex gap-2">
              <Button size="sm" className="bg-ocean hover:bg-blue-700">
                Ver no Mapa
              </Button>
              <Button size="sm" variant="outline">
                Favoritos
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
