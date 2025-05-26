import { 
  establishments, 
  reports, 
  itineraries,
  users, 
  type Establishment, 
  type InsertEstablishment,
  type Report,
  type InsertReport,
  type Itinerary,
  type InsertItinerary,
  type User, 
  type InsertUser 
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Establishments
  getEstablishments(type?: string): Promise<Establishment[]>;
  getEstablishment(id: number): Promise<Establishment | undefined>;
  createEstablishment(establishment: InsertEstablishment): Promise<Establishment>;
  
  // Reports
  createReport(report: InsertReport): Promise<Report>;
  getReports(): Promise<Report[]>;
  
  // Itineraries
  getItineraries(): Promise<Itinerary[]>;
  getItinerary(id: number): Promise<Itinerary | undefined>;
  createItinerary(itinerary: InsertItinerary): Promise<Itinerary>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private establishments: Map<number, Establishment>;
  private reports: Map<number, Report>;
  private itineraries: Map<number, Itinerary>;
  private currentUserId: number;
  private currentEstablishmentId: number;
  private currentReportId: number;
  private currentItineraryId: number;

  constructor() {
    this.users = new Map();
    this.establishments = new Map();
    this.reports = new Map();
    this.itineraries = new Map();
    this.currentUserId = 1;
    this.currentEstablishmentId = 1;
    this.currentReportId = 1;
    this.currentItineraryId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed establishments
    const sampleEstablishments: InsertEstablishment[] = [
      {
        name: "Pousada Guriri Beach",
        type: "hotel",
        address: "Rua das Conchas, 123",
        phone: "(27) 99999-1234",
        rating: 4,
        reviewCount: 89,
        priceRange: "$$",
        description: "Pousada aconchegante na beira da praia",
        latitude: "-18.7175",
        longitude: "-39.7450",
      },
      {
        name: "Hotel Vista Mar",
        type: "hotel",
        address: "Av. Beira Mar, 456",
        phone: "(27) 99999-5678",
        rating: 5,
        reviewCount: 156,
        priceRange: "$$$",
        description: "Hotel de luxo com vista para o mar",
        latitude: "-18.7168",
        longitude: "-39.7458",
      },
      {
        name: "Moqueca da Vovó",
        type: "restaurant",
        address: "Rua do Porto, 789",
        phone: "(27) 99999-9012",
        rating: 5,
        reviewCount: 234,
        priceRange: "$$",
        description: "Especialidades em comida capixaba",
        latitude: "-18.7170",
        longitude: "-39.7452",
      },
      {
        name: "Barraca do João",
        type: "restaurant",
        address: "Praia Central - Orla",
        phone: "(27) 99999-3456",
        rating: 4,
        reviewCount: 167,
        priceRange: "$",
        description: "Frutos do mar frescos na orla",
        latitude: "-18.7178",
        longitude: "-39.7448",
      }
    ];

    sampleEstablishments.forEach(establishment => {
      this.createEstablishment(establishment);
    });

    // Seed itineraries
    const sampleItineraries: InsertItinerary[] = [
      {
        title: "1 Dia - Essencial",
        duration: 1,
        difficulty: "basic",
        description: "Roteiro básico para conhecer o essencial de Guriri",
        activities: [
          "8h - Chegada e check-in",
          "10h - Praia principal",
          "12h - Almoço na orla",
          "14h - Visita ao centro histórico",
          "16h - Passeio de barco",
          "18h - Por do sol na praia"
        ],
        price: "R$ 50-80",
        isPopular: false,
      },
      {
        title: "3 Dias - Completo",
        duration: 3,
        difficulty: "intermediate",
        description: "Roteiro completo com todas as principais atividades",
        activities: [
          "Dia 1: Chegada e praias",
          "Dia 2: Projeto Tamar e trilhas",
          "Dia 3: Pesca tradicional e artesanato",
          "Visitas aos restaurantes locais",
          "Passeios de barco",
          "Atividades culturais"
        ],
        price: "R$ 200-350",
        isPopular: true,
      },
      {
        title: "5 Dias - Premium",
        duration: 5,
        difficulty: "advanced",
        description: "Experiência completa e exclusiva",
        activities: [
          "Todas as atrações principais",
          "Tour fotográfico profissional",
          "Experiências gastronômicas",
          "Atividades de relaxamento",
          "Passeios privativos",
          "Hospedagem premium",
          "Guia especializado"
        ],
        price: "R$ 500-800",
        isPopular: false,
      }
    ];

    sampleItineraries.forEach(itinerary => {
      this.createItinerary(itinerary);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Establishment methods
  async getEstablishments(type?: string): Promise<Establishment[]> {
    const allEstablishments = Array.from(this.establishments.values()).filter(e => e.isActive);
    if (type) {
      return allEstablishments.filter(e => e.type === type);
    }
    return allEstablishments;
  }

  async getEstablishment(id: number): Promise<Establishment | undefined> {
    return this.establishments.get(id);
  }

  async createEstablishment(insertEstablishment: InsertEstablishment): Promise<Establishment> {
    const id = this.currentEstablishmentId++;
    const establishment: Establishment = { 
      ...insertEstablishment, 
      id,
      isActive: true 
    };
    this.establishments.set(id, establishment);
    return establishment;
  }

  // Report methods
  async createReport(insertReport: InsertReport): Promise<Report> {
    const id = this.currentReportId++;
    const report: Report = { 
      ...insertReport, 
      id,
      status: "pending",
      createdAt: new Date()
    };
    this.reports.set(id, report);
    return report;
  }

  async getReports(): Promise<Report[]> {
    return Array.from(this.reports.values());
  }

  // Itinerary methods
  async getItineraries(): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values());
  }

  async getItinerary(id: number): Promise<Itinerary | undefined> {
    return this.itineraries.get(id);
  }

  async createItinerary(insertItinerary: InsertItinerary): Promise<Itinerary> {
    const id = this.currentItineraryId++;
    const itinerary: Itinerary = { ...insertItinerary, id };
    this.itineraries.set(id, itinerary);
    return itinerary;
  }
}

export const storage = new MemStorage();
