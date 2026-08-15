export type BloodType = "O+" | "O-" | "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-";

export type Donor = {
  id: string;
  name: string;
  bloodType: BloodType;
  area: string;
  phone: string;
  lastDonation: string;
  available: boolean;
};

export const BLOOD_TYPES: BloodType[] = [
  "O+",
  "O-",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
];

export const donors: Donor[] = [
  {
    id: "1",
    name: "Amal Perera",
    bloodType: "O+",
    area: "Colombo",
    phone: "0771234567",
    lastDonation: "2026-05-12",
    available: true,
  },
  {
    id: "2",
    name: "Nimal Silva",
    bloodType: "A+",
    area: "Kandy",
    phone: "0712345678",
    lastDonation: "2026-03-02",
    available: true,
  },
  {
    id: "3",
    name: "Kasun Fernando",
    bloodType: "B+",
    area: "Colombo",
    phone: "0763456789",
    lastDonation: "2026-06-20",
    available: false,
  },
  {
    id: "4",
    name: "Ayesha Perera",
    bloodType: "O-",
    area: "Galle",
    phone: "0754567890",
    lastDonation: "2026-01-18",
    available: true,
  },
  {
    id: "5",
    name: "Dinuka Jayasinghe",
    bloodType: "AB+",
    area: "Negombo",
    phone: "0785678901",
    lastDonation: "2025-11-30",
    available: true,
  },
  {
    id: "6",
    name: "Malith Gunawardena",
    bloodType: "A-",
    area: "Kandy",
    phone: "0726789012",
    lastDonation: "2026-04-08",
    available: false,
  },
  {
    id: "7",
    name: "Sachini Silva",
    bloodType: "B-",
    area: "Colombo",
    phone: "0747890123",
    lastDonation: "2026-07-01",
    available: true,
  },
  {
    id: "8",
    name: "Tharindu Perera",
    bloodType: "O+",
    area: "Matara",
    phone: "0708901234",
    lastDonation: "2026-02-14",
    available: true,
  },
  {
    id: "9",
    name: "Hiruni Fernando",
    bloodType: "AB-",
    area: "Galle",
    phone: "0779012345",
    lastDonation: "2025-12-25",
    available: false,
  },
  {
    id: "10",
    name: "Ravindu Dias",
    bloodType: "O+",
    area: "Negombo",
    phone: "0710123456",
    lastDonation: "2026-06-05",
    available: true,
  },
  {
    id: "11",
    name: "Shanika Wickramasinghe",
    bloodType: "A+",
    area: "Colombo",
    phone: "0723456789",
    lastDonation: "2026-05-29",
    available: true,
  },
  {
    id: "12",
    name: "Chamara Rathnayake",
    bloodType: "B+",
    area: "Matara",
    phone: "0765678123",
    lastDonation: "2026-03-19",
    available: true,
  },
];
