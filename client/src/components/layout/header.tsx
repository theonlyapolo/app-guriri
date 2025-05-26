import { Link } from "wouter";
import { Umbrella, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmergencyModal from "@/components/modals/emergency-modal";
import { useState } from "react";

export default function Header() {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  return (
    <>
      <header className="bg-ocean text-white shadow-lg sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Umbrella className="text-sand text-2xl" size={24} />
              <h1 className="text-xl font-bold">App Guriri</h1>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-700"
              onClick={() => setShowEmergencyModal(true)}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </header>

      <EmergencyModal 
        open={showEmergencyModal} 
        onOpenChange={setShowEmergencyModal} 
      />
    </>
  );
}
