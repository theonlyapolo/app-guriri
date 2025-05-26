import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import GuririMap from "@/components/map/guriri-map";
import ReportForm from "@/components/forms/report-form";
import { GURIRI_HISTORY } from "@/lib/constants";
import { 
  Map, 
  Turtle, 
  AlertTriangle, 
  Landmark, 
  Info,
  Plus,
  Leaf,
  ExternalLink 
} from "lucide-react";

export default function Home() {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showTamarModal, setShowTamarModal] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-br from-ocean to-blue-600">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative h-full flex items-end p-6">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">Praia de Guriri</h2>
            <p className="text-blue-100 text-lg">Descubra o paraíso capixaba</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          <Link href="/map">
            <Card className="ripple shadow-lg border-l-4 border-sand smooth-transition hover:shadow-xl cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Map className="text-ocean" size={24} />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">Mapa</h3>
                    <p className="text-sm text-gray-600">Explorar região</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Card 
            className="ripple shadow-lg border-l-4 border-nature smooth-transition hover:shadow-xl cursor-pointer"
            onClick={() => setShowTamarModal(true)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Turtle className="text-nature" size={24} />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Projeto Tamar</h3>
                  <p className="text-sm text-gray-600">Preservação</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="px-4 py-6">
        <Card className="shadow-lg overflow-hidden">
          <div className="p-4 bg-ocean text-white">
            <h3 className="text-lg font-semibold flex items-center">
              <Map className="mr-2" size={20} />
              Mapa Interativo
            </h3>
          </div>
          <div className="p-4">
            <GuririMap className="h-64" />
            <div className="flex justify-between mt-4">
              <Badge className="bg-ocean text-white">
                <Map className="mr-1" size={14} />
                Hotéis
              </Badge>
              <Badge className="bg-nature text-white">
                <Turtle className="mr-1" size={14} />
                Restaurantes
              </Badge>
            </div>
          </div>
        </Card>
      </section>

      {/* Environmental Conservation */}
      <section className="px-4 py-6">
        <Card className="bg-gradient-to-r from-nature to-green-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Leaf className="mr-3" size={24} />
              <h3 className="text-xl font-bold">Preservação Ambiental</h3>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <Turtle className="mr-2" size={20} />
                <h4 className="font-semibold">Projeto Tamar</h4>
              </div>
              <p className="text-green-100 text-sm mb-3">
                Conheça o trabalho de preservação das tartarugas marinhas na região. 
                Visitas educativas e ações de conscientização.
              </p>
              <Button 
                className="bg-white text-nature hover:bg-green-50"
                onClick={() => setShowTamarModal(true)}
              >
                Saiba Mais
              </Button>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <AlertTriangle className="mr-2" size={20} />
                <h4 className="font-semibold">Denúncia Ambiental</h4>
              </div>
              <p className="text-green-100 text-sm mb-3">
                Reporte crimes ambientais e ajude na preservação do nosso litoral.
              </p>
              <Button 
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={() => setShowReportModal(true)}
              >
                Fazer Denúncia
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* History and Information */}
      <section className="px-4 py-6">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Landmark className="text-sand mr-2" size={24} />
              {GURIRI_HISTORY.title}
            </h3>
            
            <div 
              className="mb-4 h-40 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1544982503-9f984c14501a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400')"
              }}
            />
            
            <p className="text-gray-600 leading-relaxed mb-4">
              {GURIRI_HISTORY.description}
            </p>
            
            <div className="bg-sand/10 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <Info className="text-sand mr-2" size={20} />
                Curiosidades
              </h4>
              <ul className="text-gray-600 space-y-1 text-sm">
                {GURIRI_HISTORY.facts.map((fact, index) => (
                  <li key={index}>• {fact}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Floating Action Button */}
      <Button
        className="floating-btn fixed bottom-20 right-4 bg-nature text-white w-14 h-14 rounded-full z-30"
        onClick={() => setShowReportModal(true)}
      >
        <Plus size={20} />
      </Button>

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

      {/* Tamar Project Modal */}
      <Dialog open={showTamarModal} onOpenChange={setShowTamarModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-nature flex items-center">
              <Turtle className="mr-2" size={20} />
              Projeto Tamar - Guriri
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div 
              className="h-48 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400')"
              }}
            />
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Sobre o Projeto</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                O Projeto TAMAR atua em Guriri desde 1982, protegendo as tartarugas marinhas que desovam 
                nas praias da região. O trabalho inclui monitoramento de ninhos, pesquisa científica, 
                educação ambiental e envolvimento da comunidade local.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Atividades</h4>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Visitas guiadas ao centro de visitantes</li>
                <li>• Acompanhamento de desovas (temporada)</li>
                <li>• Palestras educativas</li>
                <li>• Adoção simbólica de tartarugas</li>
              </ul>
            </div>
            <Button className="w-full bg-nature hover:bg-green-700">
              <ExternalLink className="mr-2" size={16} />
              Visitar Site Oficial
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
