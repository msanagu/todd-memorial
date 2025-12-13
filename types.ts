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

export interface OrderOfServiceItem {
  title: string;
  performedBy?: string;
}

export interface ProgramData {
  acknowledgements: {
    text: string;
    signature: string;
  };
  inLieuOfFlowers: {
    title: string;
    description: string;
    qrCodeUrl: string;
    qrCodeLabel: string;
  };
  parkingAndReception: {
    title: string;
    text: string;
  };
  obituary: {
    title: string;
    subtitle: string;
    paragraphs: string[];
  };
  orderOfService: {
    title: string;
    items: OrderOfServiceItem[];
  };
  prayer: {
    title: string;
    paragraphs: string[];
    closing: string;
  };
}

export interface MemorialData {
  name: string;
  dob: string;
  dod: string;
  serviceDate: string;
  photoUrl: string;
  burial: EventDetail;
  service: EventDetail;
  program: ProgramData;
  liveStreamUrl?: string;
}
