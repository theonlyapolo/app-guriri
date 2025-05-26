import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ItineraryCard from "@/components/cards/itinerary-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Itinerary } from "@shared/schema";
import { Route, Clock, CheckCircle, MapPin } from "lucide-react";
import { useState } from "react";

export default function Itineraries() {
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  
  const { data: itineraries, isLoading } = useQuery<Itinerary[]>({
    queryKey: ["/api/itineraries"],
  });

  const handleViewDetails = (itinerary: Itinerary) => {
    setSelectedItinerary(itinerary);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "basic":
        return "bg-sand";
      case "intermediate":
        return "bg-nature";
      case "advanced":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "basic":
        return "Básico";
      case "intermediate":
        return "Popular";
      case "advanced":
        return "Exclusivo";
      default:
        return difficulty;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="px-4 py-6 bg-gradient-to-r from-sand to-yellow-500 text-white">
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <Route className="mr-2" size={24} />
          Roteiros de Viagem
        </h1>
        <p className="text-yellow-100">Descubra o melhor de Guriri em 1, 3 ou 5 dias</p>
      </section>

      {/* Itineraries List */}
      <section className="px-4 py-6">
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                  <Skeleton className="h-10 w-full mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !itineraries || itineraries.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Route className="mx-auto mb-4 text-gray-400" size={48} />
              <h4 className="font-semibold text-gray-700 mb-2">
                Nenhum roteiro disponível
              </h4>
              <p className="text-gray-500">
                Os roteiros estão sendo preparados. Volte em breve!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {itineraries.map((itinerary) => (
              <ItineraryCard
                key={itinerary.id}
                itinerary={itinerary}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </section>

      {/* Itinerary Details Modal */}
      <Dialog open={!!selectedItinerary} onOpenChange={() => setSelectedItinerary(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedItinerary && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Route className="mr-2" size={20} />
                    {selectedItinerary.title}
                  </span>
                  <Badge className={`${getDifficultyColor(selectedItinerary.difficulty)} text-white`}>
                    {getDifficultyLabel(selectedItinerary.difficulty)}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{selectedItinerary.duration} {selectedItinerary.duration === 1 ? 'dia' : 'dias'}</span>
                  </div>
                  {selectedItinerary.price && (
                    <div className="flex items-center">
                      <span className="font-semibold">{selectedItinerary.price}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Sobre este roteiro</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedItinerary.description}
                  </p>
                </div>

                {/* Activities */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <CheckCircle size={18} className="mr-2 text-green-500" />
                    Atividades Incluídas
                  </h4>
                  <div className="space-y-3">
                    {selectedItinerary.activities?.map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle size={16} className="mr-3 mt-0.5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <MapPin size={18} className="mr-2" />
                    Dicas Importantes
                  </h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Reserve acomodações com antecedência na alta temporada</li>
                    <li>• Use protetor solar e traga chapéu</li>
                    <li>• Respeite as regras de preservação ambiental</li>
                    <li>• Mantenha distância segura dos animais marinhos</li>
                  </ul>
                </div>

                {/* Contact for Booking */}
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-gray-800 mb-2">Interesse neste roteiro?</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Entre em contato conosco para personalizar seu roteiro e fazer a reserva.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <button className="bg-ocean text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 smooth-transition">
                      WhatsApp
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 smooth-transition">
                      E-mail
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
