import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EMERGENCY_CONTACTS } from "@/lib/constants";
import { Phone, Shield, Flame, Truck, Leaf } from "lucide-react";

const iconMap = {
  "shield-alt": Shield,
  fire: Flame,
  ambulance: Truck,
  leaf: Leaf,
};

interface EmergencyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EmergencyModal({ open, onOpenChange }: EmergencyModalProps) {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center">
            <Phone className="mr-2" size={20} />
            Emergência
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {EMERGENCY_CONTACTS.map((contact) => {
            const IconComponent = iconMap[contact.icon as keyof typeof iconMap] || Phone;
            const colorClass = contact.color === "red" 
              ? "bg-red-50 text-red-500" 
              : contact.color === "blue" 
              ? "bg-blue-50 text-blue-500"
              : contact.color === "nature"
              ? "bg-green-50 text-nature"
              : "bg-gray-50 text-gray-500";
            
            return (
              <Button
                key={contact.number}
                variant="ghost"
                className={`w-full justify-start h-auto p-3 ${colorClass} hover:opacity-80`}
                onClick={() => handleCall(contact.number)}
              >
                <IconComponent className="mr-3" size={20} />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{contact.name}</p>
                  <p className="font-bold">{contact.number}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
