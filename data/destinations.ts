// ============================================================
// Ceylora — Sri Lanka Travel App
// Destination dataset
// Coordinates are approximate (good enough for map pins /
// distance sorting — verify exact values before production use)
// ============================================================

export type Category =
  | "faith"        // temples, kovils, churches, mosques
  | "fun"          // adventure, sports, surfing, safaris
  | "nature"       // national parks, forests, waterfalls
  | "beach"        // beach towns, coastal
  | "hillcountry"  // tea estates, viewpoints, cool climate
  | "culture"      // forts, museums, ancient cities
  | "wellness"     // ayurveda, spas, retreats
  | "food";        // markets, tea factories, spice gardens

export type StayType =
  | "hotel"
  | "resort"
  | "villa"
  | "guesthouse"
  | "ecolodge";

export interface Destination {
  id: string;
  name: string;
  district: string;
  province: string;
  categories: Category[];
  stayOptions: StayType[];
  description: string;
  latitude: number;
  longitude: number;
  bestFor?: string; // short tag e.g. "Sunrise hike", "Whale watching Nov-Apr"
}

export const destinations: Destination[] = [
  {
    id: "1",
    name: "Gangaramaya Temple",
    district: "Colombo",
    province: "Western",
    categories: ["faith", "culture"],
    stayOptions: ["hotel"],
    description:
      "One of Colombo's most important Buddhist temples, blending traditional architecture with an eclectic museum of donated artifacts.",
    latitude: 6.9169,
    longitude: 79.8565,
  },
  {
    id: "2",
    name: "Negombo Beach & Fish Market",
    district: "Gampaha",
    province: "Western",
    categories: ["beach", "food"],
    stayOptions: ["hotel", "resort", "guesthouse"],
    description:
      "Long sandy beach next to a working fish market (Lellama) — go early morning to watch the daily catch come in.",
    latitude: 7.2083,
    longitude: 79.8358,
    bestFor: "Early morning market visit",
  },
  {
    id: "3",
    name: "Kalutara Bodhiya",
    district: "Kalutara",
    province: "Western",
    categories: ["faith"],
    stayOptions: ["hotel"],
    description:
      "A large hollow stupa on the Kalutara riverbank, uniquely walkable inside, with murals depicting the life of Buddha.",
    latitude: 6.5854,
    longitude: 79.9607,
  },
  {
    id: "4",
    name: "Temple of the Sacred Tooth Relic",
    district: "Kandy",
    province: "Central",
    categories: ["faith", "culture"],
    stayOptions: ["hotel", "guesthouse"],
    description:
      "Sri Lanka's most sacred Buddhist site, housing a relic of the Buddha's tooth inside the historic Kandy royal palace complex.",
    latitude: 7.2936,
    longitude: 80.6413,
  },
  {
    id: "5",
    name: "Royal Botanical Gardens, Peradeniya",
    district: "Kandy",
    province: "Central",
    categories: ["nature"],
    stayOptions: ["hotel", "guesthouse"],
    description:
      "147-acre botanical garden with a giant Javan fig tree, orchid house, and avenue of royal palms.",
    latitude: 7.2675,
    longitude: 80.5975,
  },
  {
    id: "6",
    name: "Aluvihare Rock Temple",
    district: "Matale",
    province: "Central",
    categories: ["faith", "culture"],
    stayOptions: ["guesthouse"],
    description:
      "Historic cave temple where the Pali Canon of Buddhist scripture was first written down on ola leaves.",
    latitude: 7.5289,
    longitude: 80.654,
  },
  {
    id: "7",
    name: "Pedro Tea Estate",
    district: "Nuwara Eliya",
    province: "Central",
    categories: ["hillcountry", "food"],
    stayOptions: ["hotel", "villa"],
    description:
      "Working tea plantation and factory offering tours of the tea-making process with tastings overlooking the hills.",
    latitude: 6.9682,
    longitude: 80.7514,
  },
  {
    id: "8",
    name: "Horton Plains & World's End",
    district: "Nuwara Eliya",
    province: "Central",
    categories: ["nature", "fun", "hillcountry"],
    stayOptions: ["ecolodge", "guesthouse"],
    description:
      "Highland plateau ending in a sheer 870m cliff drop. A 9km loop hike best started at dawn before the mist rolls in.",
    latitude: 6.8096,
    longitude: 80.7997,
    bestFor: "Sunrise hike",
  },
  {
    id: "9",
    name: "Galle Fort",
    district: "Galle",
    province: "Southern",
    categories: ["culture"],
    stayOptions: ["hotel", "villa", "guesthouse"],
    description:
      "UNESCO-listed Dutch colonial fort with ramparts, a lighthouse, and boutique cafes lining cobbled streets.",
    latitude: 6.0269,
    longitude: 80.2167,
  },
  {
    id: "10",
    name: "Unawatuna Beach",
    district: "Galle",
    province: "Southern",
    categories: ["beach", "fun"],
    stayOptions: ["hotel", "resort", "guesthouse"],
    description:
      "Sheltered bay beach popular for swimming and snorkeling, with a relaxed strip of beach bars and cafes.",
    latitude: 6.0108,
    longitude: 80.2489,
  },
  {
    id: "11",
    name: "Mirissa Beach",
    district: "Matara",
    province: "Southern",
    categories: ["beach", "fun"],
    stayOptions: ["hotel", "villa", "guesthouse"],
    description:
      "Crescent beach and one of the world's best spots for blue whale watching boat tours.",
    latitude: 5.9483,
    longitude: 80.4589,
    bestFor: "Whale watching Nov–Apr",
  },
  {
    id: "12",
    name: "Yala National Park",
    district: "Hambantota",
    province: "Southern",
    categories: ["nature", "fun"],
    stayOptions: ["ecolodge", "resort"],
    description:
      "Sri Lanka's most visited national park, famous for having one of the highest leopard densities in the world.",
    latitude: 6.3725,
    longitude: 81.5185,
    bestFor: "Leopard safari",
  },
  {
    id: "13",
    name: "Bundala National Park",
    district: "Hambantota",
    province: "Southern",
    categories: ["nature"],
    stayOptions: ["ecolodge"],
    description:
      "Wetland sanctuary and RAMSAR site known for large flocks of migratory flamingos and other waterbirds.",
    latitude: 6.1971,
    longitude: 81.2189,
  },
  {
    id: "14",
    name: "Nallur Kandaswamy Kovil",
    district: "Jaffna",
    province: "Northern",
    categories: ["faith", "culture"],
    stayOptions: ["hotel", "guesthouse"],
    description:
      "The most significant Hindu temple in Jaffna, dedicated to Lord Murugan, especially vibrant during its annual festival.",
    latitude: 9.6714,
    longitude: 80.0257,
  },
  {
    id: "15",
    name: "Jaffna Fort",
    district: "Jaffna",
    province: "Northern",
    categories: ["culture"],
    stayOptions: ["hotel"],
    description:
      "Sprawling Dutch-built coastal fort, one of the largest in Asia, currently under restoration.",
    latitude: 9.6603,
    longitude: 80.0089,
  },
  {
    id: "16",
    name: "Koneswaram Temple",
    district: "Trincomalee",
    province: "Eastern",
    categories: ["faith"],
    stayOptions: ["hotel"],
    description:
      "Hindu temple perched on Swami Rock cliff with dramatic ocean views, one of the five ancient Ishwarams of Shiva.",
    latitude: 8.5776,
    longitude: 81.2367,
  },
  {
    id: "17",
    name: "Nilaveli Beach",
    district: "Trincomalee",
    province: "Eastern",
    categories: ["beach", "fun"],
    stayOptions: ["resort", "hotel", "villa"],
    description:
      "Calm, powder-white beach with easy access to snorkeling and diving at nearby Pigeon Island.",
    latitude: 8.6667,
    longitude: 81.1833,
  },
  {
    id: "18",
    name: "Arugam Bay",
    district: "Ampara",
    province: "Eastern",
    categories: ["fun", "beach"],
    stayOptions: ["guesthouse", "villa", "hotel"],
    description:
      "Sri Lanka's premier surf town, with consistent right-hand point breaks suited to all levels.",
    latitude: 6.8404,
    longitude: 81.836,
    bestFor: "Surfing Apr–Oct",
  },
  {
    id: "19",
    name: "Ridi Viharaya (Silver Temple)",
    district: "Kurunegala",
    province: "North Western",
    categories: ["faith"],
    stayOptions: ["guesthouse"],
    description:
      "Historic cave temple said to mark the site where the silver ore for the Ruwanwelisaya stupa was discovered.",
    latitude: 7.5978,
    longitude: 80.4772,
  },
  {
    id: "20",
    name: "Wilpattu National Park",
    district: "Puttalam",
    province: "North Western",
    categories: ["nature", "fun"],
    stayOptions: ["ecolodge"],
    description:
      "Sri Lanka's largest national park, named for its many natural lakes ('willu'), home to leopards and sloth bears.",
    latitude: 8.4593,
    longitude: 80.0339,
  },
  {
    id: "21",
    name: "Kalpitiya",
    district: "Puttalam",
    province: "North Western",
    categories: ["fun", "beach"],
    stayOptions: ["resort", "villa", "guesthouse"],
    description:
      "Peninsula known for kitesurfing, dolphin-watching boat trips, and quiet lagoon-side stays.",
    latitude: 8.2314,
    longitude: 79.7647,
    bestFor: "Kitesurfing May–Oct, dolphins Nov–Mar",
  },
  {
    id: "22",
    name: "Sri Maha Bodhi & Ruwanwelisaya",
    district: "Anuradhapura",
    province: "North Central",
    categories: ["faith", "culture"],
    stayOptions: ["hotel", "guesthouse"],
    description:
      "Sacred fig tree grown from a cutting of the original Bodhi tree, next to a gleaming white ancient stupa.",
    latitude: 8.3517,
    longitude: 80.3982,
  },
  {
    id: "23",
    name: "Ancient City of Polonnaruwa",
    district: "Polonnaruwa",
    province: "North Central",
    categories: ["culture", "faith"],
    stayOptions: ["hotel", "guesthouse"],
    description:
      "UNESCO-listed medieval capital with well-preserved ruins, palaces, and the famous Gal Vihara rock-cut Buddha statues.",
    latitude: 7.9403,
    longitude: 81.0188,
  },
  {
    id: "24",
    name: "Sigiriya Rock Fortress",
    district: "Matale",
    province: "Central",
    categories: ["culture", "fun"],
    stayOptions: ["hotel", "resort", "villa"],
    description:
      "5th-century rock citadel with ancient frescoes and water gardens; the climb to the summit is a highlight of any trip.",
    latitude: 7.957,
    longitude: 80.7603,
    bestFor: "Early morning climb",
  },
  {
    id: "25",
    name: "Dambulla Cave Temple",
    district: "Matale",
    province: "Central",
    categories: ["faith", "culture"],
    stayOptions: ["hotel", "guesthouse"],
    description:
      "Five cave shrines carved into a rock face, containing over 150 Buddha statues and painted ceilings dating back 2,000+ years.",
    latitude: 7.8567,
    longitude: 80.6491,
  },
  {
    id: "26",
    name: "Ella & Nine Arch Bridge",
    district: "Badulla",
    province: "Uva",
    categories: ["hillcountry", "fun"],
    stayOptions: ["villa", "guesthouse", "hotel"],
    description:
      "Laid-back hill town famous for the Nine Arch Bridge, Little Adam's Peak hike, and views over the Ella Gap.",
    latitude: 6.8781,
    longitude: 81.0592,
    bestFor: "Sunrise train photo spot",
  },
  {
    id: "27",
    name: "Diyaluma Falls",
    district: "Badulla",
    province: "Uva",
    categories: ["nature", "fun"],
    stayOptions: ["guesthouse", "ecolodge"],
    description:
      "Sri Lanka's second-tallest waterfall (220m), with natural infinity pools accessible via a short hike near the top.",
    latitude: 6.7333,
    longitude: 81.0333,
  },
  {
    id: "28",
    name: "Adam's Peak (Sri Pada)",
    district: "Ratnapura",
    province: "Sabaragamuwa",
    categories: ["faith", "fun", "hillcountry"],
    stayOptions: ["guesthouse"],
    description:
      "Sacred mountain revered by four religions, climbed overnight by pilgrims to reach the summit shrine by sunrise.",
    latitude: 6.8096,
    longitude: 80.4994,
    bestFor: "Overnight pilgrimage hike, season Dec–May",
  },
  {
    id: "29",
    name: "Sinharaja Forest Reserve",
    district: "Ratnapura",
    province: "Sabaragamuwa",
    categories: ["nature"],
    stayOptions: ["ecolodge", "guesthouse"],
    description:
      "UNESCO-listed rainforest, Sri Lanka's last major primary rainforest, rich in endemic birds and biodiversity.",
    latitude: 6.4064,
    longitude: 80.4864,
    bestFor: "Bird watching",
  },
  {
    id: "30",
    name: "Pinnawala Elephant Orphanage",
    district: "Kegalle",
    province: "Sabaragamuwa",
    categories: ["nature", "fun"],
    stayOptions: ["hotel", "guesthouse"],
    description:
      "Sanctuary for orphaned and injured elephants, famous for herd bathing sessions in the nearby river.",
    latitude: 7.302,
    longitude: 80.3897,
    bestFor: "River bathing time (10am / 2pm)",
  },

  // ------------------------------------------------------------
  // Colombo district — additional entries
  // ------------------------------------------------------------
  {
    id: "31",
    name: "Galle Face Green",
    district: "Colombo",
    province: "Western",
    categories: ["fun", "food"],
    stayOptions: ["hotel"],
    description:
      "Colombo's iconic oceanfront promenade — kite flying, street food carts, and sunset walks along the seafront.",
    latitude: 6.9226,
    longitude: 79.8437,
    bestFor: "Sunset & evening street food",
  },
  {
    id: "32",
    name: "Viharamahadevi Park",
    district: "Colombo",
    province: "Western",
    categories: ["nature"],
    stayOptions: ["hotel"],
    description:
      "Colombo's largest and oldest public park, next to the Town Hall, with a Buddha statue, fountains, and shaded walking paths.",
    latitude: 6.9147,
    longitude: 79.8619,
  },
  {
    id: "33",
    name: "Seema Malaka Temple",
    district: "Colombo",
    province: "Western",
    categories: ["faith", "culture"],
    stayOptions: ["hotel"],
    description:
      "A meditation temple built on stilts over Beira Lake, designed by renowned architect Geoffrey Bawa.",
    latitude: 6.918,
    longitude: 79.8489,
  },
  {
    id: "34",
    name: "National Museum of Colombo",
    district: "Colombo",
    province: "Western",
    categories: ["culture"],
    stayOptions: ["hotel"],
    description:
      "Sri Lanka's largest museum, housing the royal regalia of the Kandyan kings and artifacts spanning the island's history.",
    latitude: 6.9107,
    longitude: 79.8613,
  },
  {
    id: "35",
    name: "Independence Memorial Hall",
    district: "Colombo",
    province: "Western",
    categories: ["culture"],
    stayOptions: ["hotel"],
    description:
      "Monument commemorating Sri Lanka's independence in 1948, built in the style of an ancient royal audience hall.",
    latitude: 6.9058,
    longitude: 79.8683,
  },
  {
    id: "36",
    name: "Pettah Floating Market",
    district: "Colombo",
    province: "Western",
    categories: ["food"],
    stayOptions: ["guesthouse"],
    description:
      "Vendor stalls built over a canal in the heart of Pettah's bustling wholesale market district.",
    latitude: 6.9396,
    longitude: 79.8508,
  },
  {
    id: "37",
    name: "Jami Ul-Alfar Mosque (Red Mosque)",
    district: "Colombo",
    province: "Western",
    categories: ["faith", "culture"],
    stayOptions: ["guesthouse"],
    description:
      "Instantly recognizable candy-striped red-and-white mosque, a Pettah landmark since 1908.",
    latitude: 6.9385,
    longitude: 79.8506,
  },
  {
    id: "38",
    name: "Dutch Hospital Shopping Precinct",
    district: "Colombo",
    province: "Western",
    categories: ["food", "culture"],
    stayOptions: ["hotel"],
    description:
      "Colombo's oldest colonial building, restored into a courtyard of restaurants, cafes, and boutique shops.",
    latitude: 6.9337,
    longitude: 79.8428,
  },
  {
    id: "39",
    name: "Mount Lavinia Beach",
    district: "Colombo",
    province: "Western",
    categories: ["beach", "fun"],
    stayOptions: ["hotel", "resort", "villa"],
    description:
      "Popular city-adjacent beach lined with seafood shacks, a short train ride south of central Colombo.",
    latitude: 6.8398,
    longitude: 79.8653,
  },
  {
    id: "40",
    name: "Wolvendaal Church",
    district: "Colombo",
    province: "Western",
    categories: ["faith", "culture"],
    stayOptions: ["guesthouse"],
    description:
      "The oldest Protestant church in Sri Lanka still in use, built by the Dutch in 1749 with a cross-shaped floor plan.",
    latitude: 6.9386,
    longitude: 79.8511,
  },
  {
    id: "41",
    name: "St. Anthony's Shrine, Kochchikade",
    district: "Colombo",
    province: "Western",
    categories: ["faith"],
    stayOptions: ["hotel"],
    description:
      "One of Colombo's most visited Catholic churches, drawing devotees of all faiths for its reputed miracles.",
    latitude: 6.9414,
    longitude: 79.8506,
  },
  {
    id: "42",
    name: "Colombo Lotus Tower",
    district: "Colombo",
    province: "Western",
    categories: ["fun", "culture"],
    stayOptions: ["hotel"],
    description:
      "South Asia's tallest self-supported structure, with an observation deck offering 360° views over the city.",
    latitude: 6.927,
    longitude: 79.85,
  },
  {
    id: "43",
    name: "National Zoological Gardens, Dehiwala",
    district: "Colombo",
    province: "Western",
    categories: ["nature", "fun"],
    stayOptions: ["hotel"],
    description:
      "One of the oldest zoos in Asia, with a well-known daily elephant show and a large walk-through aviary.",
    latitude: 6.8567,
    longitude: 79.873,
  },
  {
    id: "44",
    name: "Sri Lanka Parliament, Sri Jayawardenepura Kotte",
    district: "Colombo",
    province: "Western",
    categories: ["culture"],
    stayOptions: ["hotel"],
    description:
      "The national legislature building, set on an artificial island in Diyawanna Lake — striking modern Sri Lankan architecture.",
    latitude: 6.8926,
    longitude: 79.9187,
  },

  // ------------------------------------------------------------
  // Fun activities — go-karting, rafting/zipline, water park
  // ------------------------------------------------------------
  {
    id: "45",
    name: "SpeedBay Karting — Port City Colombo",
    district: "Colombo",
    province: "Western",
    categories: ["fun"],
    stayOptions: ["hotel"],
    description:
      "Go-karting on Colombo's newest reclaimed-land district, with a modern track and skyline views over the artificial island.",
    latitude: 6.928,
    longitude: 79.84,
    bestFor: "Go-karting, ~10-min sessions",
  },
  {
    id: "46",
    name: "ProRide Electric Avenue Karting — Kotte",
    district: "Colombo",
    province: "Western",
    categories: ["fun"],
    stayOptions: ["hotel"],
    description:
      "Compact electric go-kart track in Kotte, a relaxed, beginner-friendly option close to central Colombo.",
    latitude: 6.8905,
    longitude: 79.917,
    bestFor: "Beginner-friendly electric karting",
  },
  {
    id: "47",
    name: "Gravel Karting — Nawala",
    district: "Colombo",
    province: "Western",
    categories: ["fun"],
    stayOptions: ["hotel"],
    description:
      "Sri Lanka's first gravel go-kart circuit, a 500m off-road drift track for a rawer karting experience.",
    latitude: 6.893,
    longitude: 79.888,
    bestFor: "Off-road drift karting",
  },
  {
    id: "48",
    name: "SpeedBay Pearl Bay — Bandaragama",
    district: "Kalutara",
    province: "Western",
    categories: ["fun"],
    stayOptions: ["hotel", "resort"],
    description:
      "Sri Lanka's largest karting venue, a CIK-FIA certified 1.2km circuit used for both leisure and competitive racing.",
    latitude: 6.7166,
    longitude: 80.0,
    bestFor: "Serious karting, full-day outings",
  },
  {
    id: "49",
    name: "Kitulgala Rafting, Ziplining & Canyoning",
    district: "Kegalle",
    province: "Sabaragamuwa",
    categories: ["fun", "nature"],
    stayOptions: ["ecolodge", "guesthouse"],
    description:
      "Sri Lanka's adventure capital on the Kelani River — white-water rafting, ziplining over the rainforest canopy, canyoning, and waterfall abseiling.",
    latitude: 6.9928,
    longitude: 80.4136,
    bestFor: "Rafting + zipline combo day trips",
  },
  {
    id: "50",
    name: "Leisure World Water Park — Hanwella",
    district: "Colombo",
    province: "Western",
    categories: ["fun"],
    stayOptions: ["hotel"],
    description:
      "Sri Lanka's original water and amusement park — slides, wave pools, and rides set in a landscaped park about an hour from Colombo.",
    latitude: 6.9058,
    longitude: 80.0836,
    bestFor: "Family day out",
  },

  // ------------------------------------------------------------
  // Hiking spots
  // ------------------------------------------------------------
  {
    id: "51",
    name: "Pidurangala Rock",
    district: "Matale",
    province: "Central",
    categories: ["hillcountry", "fun", "culture"],
    stayOptions: ["guesthouse", "hotel"],
    description:
      "A steep boulder-scramble climb next to a cave temple, rewarding hikers with the best panoramic view of Sigiriya Rock itself.",
    latitude: 7.9647,
    longitude: 80.7568,
    bestFor: "Sunrise/sunset views of Sigiriya",
  },
  {
    id: "52",
    name: "Knuckles Mountain Range",
    district: "Kandy",
    province: "Central",
    categories: ["nature", "fun", "hillcountry"],
    stayOptions: ["ecolodge", "guesthouse"],
    description:
      "A rugged, cloud-forested mountain range with trails from easy walks to multi-day treks — the Mini World's End trail near Meemure is a favorite.",
    latitude: 7.47,
    longitude: 80.78,
    bestFor: "Multi-day trekking",
  },
  {
    id: "53",
    name: "Riverston",
    district: "Matale",
    province: "Central",
    categories: ["nature", "hillcountry"],
    stayOptions: ["ecolodge", "guesthouse"],
    description:
      "A quieter, less-visited highland viewpoint in the Knuckles foothills, with grassland trails and sweeping valley views.",
    latitude: 7.5199,
    longitude: 80.7286,
  },
  {
    id: "54",
    name: "Bible Rock (Bathalegala)",
    district: "Kegalle",
    province: "Sabaragamuwa",
    categories: ["hillcountry", "fun"],
    stayOptions: ["guesthouse"],
    description:
      "A distinctive flat-topped rock resembling an open book, offering a moderate half-day hike near Kadugannawa.",
    latitude: 7.256,
    longitude: 80.48,
  },
];

// ------------------------------------------------------------
// Helper: category display metadata (for filter chips / icons)
// ------------------------------------------------------------
export const categoryMeta: Record<Category, { label: string; icon: string }> = {
  faith: { label: "Faith & Heritage", icon: "🛕" },
  fun: { label: "Fun & Adventure", icon: "🏄" },
  nature: { label: "Nature & Wildlife", icon: "🌿" },
  beach: { label: "Beaches", icon: "🏖️" },
  hillcountry: { label: "Hill Country", icon: "⛰️" },
  culture: { label: "Culture & History", icon: "🏛️" },
  wellness: { label: "Wellness", icon: "🧘" },
  food: { label: "Food & Markets", icon: "🍛" },
};

export const stayMeta: Record<StayType, { label: string; icon: string }> = {
  hotel: { label: "Hotel", icon: "🏨" },
  resort: { label: "Resort", icon: "🏝️" },
  villa: { label: "Villa", icon: "🏡" },
  guesthouse: { label: "Guesthouse", icon: "🛏️" },
  ecolodge: { label: "Eco-lodge", icon: "🌲" },
};
