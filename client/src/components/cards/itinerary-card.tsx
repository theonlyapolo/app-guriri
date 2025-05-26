import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, CheckCircle } from "lucide-react";
import type { Itinerary } from "@shared/schema";

interface ItineraryCardProps {
  itinerary: Itinerary;
  onViewDetails?: (itinerary: Itinerary) => void;
}

export default function ItineraryCard({ itinerary, onViewDetails }: ItineraryCardProps) {
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

  const getDifficultyButtonColor = (difficulty: string) => {
    switch (difficulty) {
      case "basic":
        return "bg-ocean hover:bg-blue-700";
      case "intermediate":
        return "bg-nature hover:bg-green-700";
      case "advanced":
        return "bg-purple-500 hover:bg-purple-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl smooth-transition">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold text-gray-800">{itinerary.title}</h4>
          <div className="flex items-center gap-2">
            {itinerary.isPopular && (
              <Star size={16} className="text-sand fill-current" />
            )}
            <Badge className={`${getDifficultyColor(itinerary.difficulty)} text-white text-sm font-medium`}>
              {getDifficultyLabel(itinerary.difficulty)}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center mb-3 text-gray-600">
          <Clock size={16} className="mr-1" />
          <span className="text-sm">{itinerary.duration} {itinerary.duration === 1 ? 'dia' : 'dias'}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{itinerary.description}</p>
        
        <div className="space-y-2 mb-4">
          {itinerary.activities?.slice(0, 3).map((activity, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <CheckCircle size={14} className="mr-2 text-green-500" />
              <span>{activity}</span>
            </div>
          ))}
          {itinerary.activities && itinerary.activities.length > 3 && (
            <p className="text-sm text-gray-500 italic">
              +{itinerary.activities.length - 3} mais atividades...
            </p>
          )}
        </div>
        
        {itinerary.price && (
          <p className="text-gray-700 font-semibold mb-4">{itinerary.price}</p>
        )}
        
        <Button
          className={`w-full font-medium ripple smooth-transition ${getDifficultyButtonColor(itinerary.difficulty)}`}
          onClick={() => onViewDetails?.(itinerary)}
        >
          Ver Roteiro Completo
        </Button>
      </CardContent>
    </Card>
  );
}
