import type { PropertyBase } from "@/lib/property-math";
import modernFamilyHouse from "@/assets/property-modern-family-house.jpg";
import luxuryApartment from "@/assets/property-luxury-apartment.jpg";
import commercialPlot from "@/assets/property-commercial-plot.jpg";
import seaView from "@/assets/property-sea-view.jpg";
import furnishedFlat from "@/assets/property-furnished-flat.jpg";
import residentialPlot from "@/assets/property-residential-plot.jpg";
import familyHome from "@/assets/property-family-home.jpg";
import officeFloor from "@/assets/property-office-floor.jpg";
import gardenVilla from "@/assets/property-garden-villa.jpg";
import studio from "@/assets/property-studio.jpg";
import investmentPlot from "@/assets/property-investment-plot.jpg";
import modern3Bed from "@/assets/property-modern-3bed.jpg";

export interface Property extends PropertyBase {
  image: string;
}

export const properties: Property[] = [
  { id: 1, title: "Modern family house", city: "Lahore", type: "House", purpose: "Sale", crore: 8.5, beds: 5, baths: 5, area: "10 Marla", location: "DHA Phase 6", image: modernFamilyHouse, features: ["Parking", "Garden", "Security", "Servant quarter"], listedDaysAgo: 3 },
  { id: 2, title: "Luxury 3-bed apartment", city: "Islamabad", type: "Apartment", purpose: "Sale", crore: 4.2, beds: 3, baths: 3, area: "1,650 sqft", location: "Bahria Town", image: luxuryApartment, features: ["Lift", "Parking", "Security", "Swimming pool"], listedDaysAgo: 5 },
  { id: 3, title: "Corner commercial plot", city: "Lahore", type: "Commercial", purpose: "Sale", crore: 12, beds: 0, baths: 0, area: "8 Marla", location: "Gulberg", image: commercialPlot, features: ["Corner"], listedDaysAgo: 12 },
  { id: 4, title: "Sea-view apartment", city: "Karachi", type: "Apartment", purpose: "Sale", crore: 6.8, beds: 3, baths: 3, area: "1,900 sqft", location: "Clifton", image: seaView, features: ["Furnished", "Lift", "Parking", "Security", "Swimming pool"], listedDaysAgo: 1 },
  { id: 5, title: "Furnished 2-bed flat", city: "Islamabad", type: "Apartment", purpose: "Rent", crore: 0.12, beds: 2, baths: 2, area: "1,100 sqft", location: "E-11", image: furnishedFlat, features: ["Furnished", "Lift", "Parking", "Security"], listedDaysAgo: 4 },
  { id: 6, title: "Residential plot", city: "Lahore", type: "Plot", purpose: "Sale", crore: 2.6, beds: 0, baths: 0, area: "5 Marla", location: "Bahria Orchard", image: residentialPlot, features: [], listedDaysAgo: 20 },
  { id: 7, title: "Spacious family home", city: "Karachi", type: "House", purpose: "Rent", crore: 0.25, beds: 4, baths: 4, area: "500 sq yd", location: "DHA Phase 8", image: familyHome, features: ["Parking", "Garden", "Security", "Servant quarter"], listedDaysAgo: 8 },
  { id: 8, title: "Corporate office floor", city: "Islamabad", type: "Commercial", purpose: "Rent", crore: 0.6, beds: 0, baths: 4, area: "4,000 sqft", location: "Blue Area", image: officeFloor, features: ["Lift", "Parking", "Security"], listedDaysAgo: 15 },
  { id: 9, title: "Garden villa", city: "Lahore", type: "House", purpose: "Sale", crore: 15, beds: 6, baths: 6, area: "2 Kanal", location: "Model Town", image: gardenVilla, features: ["Parking", "Garden", "Security", "Corner", "Swimming pool", "Servant quarter"], listedDaysAgo: 6 },
  { id: 10, title: "Studio apartment", city: "Karachi", type: "Apartment", purpose: "Rent", crore: 0.07, beds: 1, baths: 1, area: "550 sqft", location: "Gulshan", image: studio, features: ["Furnished", "Lift", "Security"], listedDaysAgo: 2 },
  { id: 11, title: "Investment plot", city: "Islamabad", type: "Plot", purpose: "Sale", crore: 3.4, beds: 0, baths: 0, area: "1 Kanal", location: "Park Enclave", image: investmentPlot, features: ["Corner"], listedDaysAgo: 30 },
  { id: 12, title: "Modern 3-bed house", city: "Lahore", type: "House", purpose: "Rent", crore: 0.2, beds: 3, baths: 3, area: "7 Marla", location: "Johar Town", image: modern3Bed, features: ["Parking", "Garden"], listedDaysAgo: 10 },
];

export const testimonials = [
  { quote: "AYTO found us a home in two weeks and handled every document. Smooth and honest.", name: "Ahmed Raza", role: "Home buyer" },
  { quote: "Their valuation was spot on. I sold my plot above the price I expected.", name: "Sana Khan", role: "Plot seller" },
  { quote: "Professional agents who really listen. We rent our office through them.", name: "Bilal Mehmood", role: "Office tenant" },
];
