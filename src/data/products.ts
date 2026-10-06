export interface Product {
  id: string;
  discount?: string;
  category: string;
  title: string;
  rating?: number;
  reviewsCount?: number;
  oldPrice?: number;
  price: number;
  image: string;
}

export const productsData: Product[] = [
  { id: "prod-1", discount: "-24 %", category: "Fresno – Leña", title: "Palé de leña de fresno cortada y secada en horno, 25 cm", rating: 5, reviewsCount: 214, oldPrice: 439.00, price: 307.30, image: "/img/prod/hele-pallet-essenhout-schuin-transparant-light-2-2-1.jpg" },
  { id: "prod-2", discount: "-21 %", category: "Roble – Leña", title: "Palé de leña de roble cortada y secada en horno, 25 cm", rating: 5, reviewsCount: 431, oldPrice: 429.00, price: 300.30, image: "/img/prod/hele-pallet-eikenhout-schuin-transparant-light-1.jpg" },
  { id: "prod-3", category: "Fresno – Leña", title: "Medio palé de leña cortada (mezcla de abedul y fresno)", rating: 4.5, reviewsCount: 279, price: 195.30, image: "/img/prod/halve-pallet-berken-essen-mix-schuin-transparant-light.jpg" },
  { id: "prod-4", discount: "-22 %", category: "Carpe – Leña", title: "Palé de leña de carpe cortada y secada en horno, 25 cm", rating: 4, reviewsCount: 58, oldPrice: 449.00, price: 314.30, image: "/img/prod/hele-pallet-haagbeuk-schuin-transparant-light_2-1.jpg" },
  { id: "prod-5", discount: "-30 %", category: "Leña", title: "Encendedores 100 % naturales de lana de madera (50 unidades)", rating: 4, reviewsCount: 58, oldPrice: 8.00, price: 5.60, image: "/img/prod/allume-feu-100-naturel-en-laine-de-bois-50-pcs-2-430x430.webp" },
  { id: "prod-6", discount: "-30 %", category: "Leña", title: "120 kg de leña seca de haya, astillas para encender y madera dura", rating: 4, reviewsCount: 58, oldPrice: 84.00, price: 58.80, image: "/img/prod/7c66e9cf-d354-4e2f-9af7-8e6ccf87c873-400x300.avif" },
  { id: "prod-7", discount: "-30 %", category: "Abedul – Leña", title: "88 sacos de leña de abedul cortada y secada en horno, 25 cm", rating: 4, reviewsCount: 58, oldPrice: 409.00, price: 286.30, image: "/img/prod/80-zakken-haardhout_2-430x430.png" },
  { id: "prod-8", discount: "-30 %", category: "Pellets", title: "Pellets Bioénergie – Palé de 66 sacos de 15 kg", rating: 4, reviewsCount: 58, oldPrice: 380.00, price: 266.00, image: "/img/prod/74-large_default-1-430x430.webp" },
  { id: "prod-9", discount: "-30 %", category: "Leña", title: "Leña de 25 cm en saco sobre palé (1,3 m³) – Extra seca", rating: 4, reviewsCount: 58, oldPrice: 301.00, price: 210.70, image: "/img/prod/bois25-extrasec-brz-430x430.webp" },
  { id: "prod-10", discount: "-31 %", category: "Leña", title: "Leña de 33 cm en saco sobre palé (1,7 m³)", rating: 4, reviewsCount: 58, oldPrice: 310.00, price: 215.00, image: "/img/prod/buches-de-bois-sec-40cm-3-1-430x430.webp" },
  { id: "prod-11", discount: "-28 %", category: "Leña", title: "Leña a granel cortada a 50 cm, 100 % madera dura", rating: 4, reviewsCount: 58, oldPrice: 65.00, price: 46.50, image: "/img/prod/Bois-Vrac-arrivage-scaled-2-430x410.webp" },
  { id: "prod-12", discount: "-30 %", category: "Pellets", title: "Pellets Butagaz, palé de 66 sacos de 15 kg", rating: 4, reviewsCount: 58, oldPrice: 400.00, price: 280.00, image: "/img/prod/image-3-1-430x385.webp" },
  { id: "prod-13", discount: "-8 %", category: "Briquetas de madera", title: "Briquetas de haya Pollmeier Premium Plus, 960 kg", rating: 4, reviewsCount: 58, oldPrice: 310.00, price: 286.30, image: "/img/prod/Pollmeier10Palette-Photoroom-430x430.jpg" },
  { id: "prod-14", discount: "-30 %", category: "Pellets", title: "Pellets ECOBIO, palé de 66 sacos de 15 kg", rating: 4, reviewsCount: 58, oldPrice: 425.00, price: 297.00, image: "/img/prod/ECOBIO-1-PALETTE-600x658-1-1-430x472.webp" },
  { id: "prod-15", discount: "-26 %", category: "Pellets", title: "Pellets Helios – Palé de 65 sacos de 15 kg", rating: 4, reviewsCount: 58, oldPrice: 360.00, price: 266.00, image: "/img/prod/20-large_default-1-1-430x430.webp" },
  { id: "prod-16", discount: "-30 %", category: "Briquetas de madera", title: "Briquetas de madera comprimida Uckermark, 960 kg", rating: 4, reviewsCount: 58, oldPrice: 329.00, price: 230.30, image: "/img/prod/holzbriketts-uckermark-palettenware-960kg-informationen-430x430.jpg" },
  { id: "prod-17", discount: "-26 %", category: "Pellets", title: "Pellets Green Energy – Palé de 65 sacos de 15 kg", rating: 4, reviewsCount: 58, oldPrice: 360.00, price: 266.00, image: "/img/prod/3-Pellet-Green-Energy-Palette-de-65-sacs-de-15-kg-1-430x430.webp" },
  { id: "prod-18", discount: "-30 %", category: "Estufas de leña", title: "TORON 50 8 kW – Estufa de leña DEVILLE", rating: 5, reviewsCount: 214, oldPrice: 1342.00, price: 939.40, image: "/img/prod/poele-bois-deville-toron-50-8-1-2-300x300.webp" },
  { id: "prod-19", discount: "-30 %", category: "Estufas de leña", title: "Estufa de leña SARA 12 kW – INTERSTOVES", rating: 5, reviewsCount: 431, oldPrice: 577.00, price: 403.90, image: "/img/prod/poele-bois-interstoves-sara-12-300x300.webp" },
  { id: "prod-20", discount: "-30 %", category: "Estufas de leña", title: "Estufa de leña SANDY 8 kW – LAB – DEVILLE", rating: 4.5, reviewsCount: 1142, oldPrice: 1142.00, price: 799.40, image: "/img/prod/poele-bois-deville-sandy-8-300x300.webp" },
  { id: "prod-21", discount: "-30 %", category: "Estufas de leña", title: "Estufa de leña LYA 12 kW – INTERSTOVES", rating: 4, reviewsCount: 58, oldPrice: 489.00, price: 342.30, image: "/img/prod/poele-bois-interstoves-lya-12-300x300.webp" },
  { id: "prod-22", discount: "-30 %", category: "Estufas de leña", title: "ALESSIA 14 kW – Estufa de leña INTERSTOVES", rating: 4, reviewsCount: 58, oldPrice: 577.00, price: 403.90, image: "/img/prod/poele-bois-interstoves-alessia-14-2-300x300.webp" },
  { id: "prod-23", discount: "-30 %", category: "Estufas de leña", title: "Estufa de leña estanca EGUZKI 6 kW – DEVILLE", rating: 4, reviewsCount: 58, oldPrice: 2600.00, price: 1820.00, image: "/img/prod/poele-bois-deville-eguzki-6-300x300.webp" },
];
