import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReportForm from "@/components/forms/report-form";
import { EMERGENCY_CONTACTS } from "@/lib/constants";
import { 
  Phone, 
  Shield, 
  Flame, 
  Truck, 
  Leaf, 
  AlertTriangle,
  Plus,
  ExternalLink 
} from "lucide-react";

const iconMap = {
  "shield-alt": Shield,
  fire: Flame,
  ambulance: Truck,
  leaf: Leaf,
};

export default function Emergency() {
  const [showReportModal, setShowReportModal] = useState(false);

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const getContactColor = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-50 hover:bg-red-100 border-red-200";
      case "blue":
        return "bg-blue-50 hover:bg-blue-100 border-blue-200";
      case "nature":
        return "bg-green-50 hover:bg-green-100 border-green-200";
      default:
        return "bg-gray-50 hover:bg-gray-100 border-gray-200";
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "red":
        return "text-red-500";
      case "blue":
        return "text-blue-500";
      case "nature":
        return "text-nature";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="px-4 py-6 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <Phone className="mr-2" size={24} />
          Contatos de Emergência
        </h1>
        <p className="text-red-100">Números importantes para sua segurança</p>
      </section>

      {/* Emergency Contacts */}
      <section className="px-4 py-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <AlertTriangle className="text-red-500 mr-2" size={24} />
          Números de Emergência
        </h3>
        
        <div className="space-y-3">
          {EMERGENCY_CONTACTS.map((contact) => {
            const IconComponent = iconMap[contact.icon as keyof typeof iconMap] || Phone;
            
            return (
              <Card 
                key={contact.number}
                className={`${getContactColor(contact.color)} border smooth-transition cursor-pointer`}
                onClick={() => handleCall(contact.number)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <IconComponent 
                      className={`mr-3 ${getIconColor(contact.color)}`} 
                      size={24} 
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                      <p className={`font-bold text-lg ${getIconColor(contact.color)}`}>
                        {contact.number}
                      </p>
                    </div>
                    <ExternalLink className="text-gray-400" size={20} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Environmental Protection */}
      <section className="px-4 py-6">
        <Card className="bg-gradient-to-r from-nature to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Leaf className="mr-3" size={24} />
              <h3 className="text-xl font-bold">Proteção Ambiental</h3>
            </div>
            
            <p className="text-green-100 mb-4">
              Sua colaboração é fundamental para preservar o meio ambiente de Guriri. 
              Denuncie crimes ambientais e ajude a proteger nossa fauna e flora.
            </p>
            
            <Button 
              className="bg-white text-nature hover:bg-green-50 w-full"
              onClick={() => setShowReportModal(true)}
            >
              <Plus className="mr-2" size={16} />
              Fazer Denúncia Ambiental
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Safety Tips */}
      <section className="px-4 py-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Shield className="text-blue-500 mr-2" size={24} />
              Dicas de Segurança
            </h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Na Praia</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Sempre nade próximo aos salva-vidas</li>
                  <li>• Observe as condições do mar e bandeiras</li>
                  <li>• Use protetor solar e evite exposição excessiva</li>
                  <li>• Mantenha-se hidratado</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Meio Ambiente</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Não deixe lixo na praia ou trilhas</li>
                  <li>• Respeite a fauna e flora local</li>
                  <li>• Não perturbe ninhos de tartarugas</li>
                  <li>• Use apenas produtos biodegradáveis</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2">Segurança Geral</h4>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• Mantenha documentos em local seguro</li>
                  <li>• Evite exibir objetos de valor</li>
                  <li>• Informe alguém sobre seus planos</li>
                  <li>• Tenha sempre um meio de comunicação</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Hospital and Medical Services */}
      <section className="px-4 py-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Truck className="text-blue-500 mr-2" size={24} />
              Serviços Médicos Locais
            </h3>
            
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800">Hospital Municipal</h4>
                <p className="text-gray-600 text-sm">Rua Principal, 100 - Centro</p>
                <p className="text-blue-600 font-medium">(27) 3000-0000</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800">Farmácia 24h</h4>
                <p className="text-gray-600 text-sm">Av. Beira Mar, 200</p>
                <p className="text-green-600 font-medium">(27) 3000-1111</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800">Posto de Saúde</h4>
                <p className="text-gray-600 text-sm">Rua das Flores, 50</p>
                <p className="text-purple-600 font-medium">(27) 3000-2222</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Report Modal */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-nature flex items-center">
              <AlertTriangle className="mr-2" size={20} />
              Denúncia Ambiental
            </DialogTitle>
          </DialogHeader>
          <ReportForm onSuccess={() => setShowReportModal(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
