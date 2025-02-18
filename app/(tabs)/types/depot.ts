
interface Coordinates {
    type: 'Point';
    crs: {
      type: string;
      properties: {
        name: string;
      };
    };
    coordinates: [number, number];
  }
  
  export interface Depot {
    depot_id: number;
    jardin_id: number;
    depot: string;
    capacite: number;
    adresse: string | null;
    codepostal: string | null;
    ville: string | null;
    localisation: {
      type: string;
      crs: {
        type: string;
        properties: {
          name: string;
        };
      };
      coordinates: [number, number];
    } | null;
    contact: string | null;
    telephone: string | null;
    email: string | null;
  }