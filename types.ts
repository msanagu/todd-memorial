export interface Location {
  name: string;
  address: string;
  cityStateZip: string;
  mapLink: string;
}

export interface EventDetail {
  title: string;
  time: string;
  location: Location;
  parkingInfo: string;
  notes?: string[];
}

export interface MemorialData {
  name: string;
  dob: string;
  dod: string;
  serviceDate: string;
  photoUrl: string;
  burial: EventDetail;
  service: EventDetail;
  liveStreamUrl?: string;
}
