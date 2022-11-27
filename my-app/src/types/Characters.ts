export interface Characters {
  episode: string[];
  gender: string;
  id: number;
  image: string;
  name: string;
  location: Location;
  origin: Origin;
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Origin {
  name: string;
  url: string;
}