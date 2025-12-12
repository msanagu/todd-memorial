import { MemorialData } from "./types";

export const MEMORIAL_DATA: MemorialData = {
  name: "TODD JAMES SAN AGUSTIN",
  dob: "March 16, 1965",
  dod: "November 16, 2025",
  serviceDate: "December 19th, 2025",
  photoUrl: "/todd-memorial/todd-marines-smaller.jpg",
  burial: {
    title: "Military Honors Burial",
    time: "11:30 AM",
    location: {
      name: "Miramar National Cemetery",
      address: "5795 Nobel Dr.",
      cityStateZip: "San Diego, CA 92122",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=5795+Nobel+Dr,+San+Diego,+CA+92122",
    },
    parkingInfo:
      "Please arrive 20 minutes early. The service will start promptly.",
    notes: [],
  },
  service: {
    title: "Memorial Service",
    time: "1:00 PM",
    location: {
      name: "First Presbyterian Church",
      address: "1735 4th Ave.",
      cityStateZip: "San Diego, CA 92101",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=1735+4th+Ave,+San+Diego,+CA+92101",
    },
    parkingInfo:
      "Street parking is limited in this area. There is a dedicated parking lot available on the corner of 3rd and Elm.",
    notes: [
      "Reception with light fare to follow immediately after the service.",
    ],
  },
};
