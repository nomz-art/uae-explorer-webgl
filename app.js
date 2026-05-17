const canvas = document.getElementById("scene");
const markerLayer = document.getElementById("markerLayer");
const compassTape = document.getElementById("compassTape");
const compassHeading = document.getElementById("compassHeading");
const statsList = document.getElementById("statsList");
const categoryList = document.getElementById("categoryList");
const viewAllCategories = document.getElementById("viewAllCategories");
const selectedTitle = document.getElementById("selectedTitle");
const selectedPanel = document.querySelector(".selected-panel");
const selectedPlace = document.getElementById("selectedPlace");
const selectedDescription = document.getElementById("selectedDescription");
const selectedBadge = document.getElementById("selectedBadge");
const selectedMedia = document.getElementById("selectedMedia");
const selectedPrev = document.getElementById("selectedPrev");
const selectedNext = document.getElementById("selectedNext");
const selectedImageCount = document.getElementById("selectedImageCount");
const searchToggle = document.getElementById("searchToggle");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const filterPanel = document.getElementById("filterPanel");
const filterCategoryList = document.getElementById("filterCategoryList");
const filterCityList = document.getElementById("filterCityList");
const mapLoadingOverlay = document.getElementById("mapLoadingOverlay");
const fullscreenButton = document.getElementById("fullscreenButton");
const focusButton = document.getElementById("focusButton");
const detailsButton = document.getElementById("detailsButton");
const toast = document.getElementById("toast");
const weatherPanel = document.getElementById("weatherPanel");
const weatherLoader = document.getElementById("weatherLoader");
const weatherLoaderText = document.getElementById("weatherLoaderText");
const weatherLocation = document.getElementById("weatherLocation");
const weatherIcon = document.getElementById("weatherIcon");
const weatherTemp = document.getElementById("weatherTemp");
const weatherSummary = document.getElementById("weatherSummary");
const weatherHumidity = document.getElementById("weatherHumidity");
const weatherWind = document.getElementById("weatherWind");
const weatherVisibility = document.getElementById("weatherVisibility");
const weatherUpdated = document.getElementById("weatherUpdated");
const forecast = document.getElementById("forecast");

const iconPaths = {
  camp: '<path d="m3 20 9-16 9 16Z"></path><path d="M12 4v16"></path><path d="m9 20 3-6 3 6"></path>',
  park: '<path d="M12 3v18"></path><path d="M5 11a7 7 0 0 1 14 0"></path><path d="M8 14h8"></path><path d="M4 21h16"></path>',
  bbq: '<path d="M12 3c2 3-2 4 1 7 2 2 4 4 1 8"></path><path d="M8 8c-3 4-1 8 3 10"></path><path d="M16 8c3 5 1 8-3 10"></path>',
  zoo: '<circle cx="7" cy="9" r="2"></circle><circle cx="17" cy="9" r="2"></circle><circle cx="9" cy="15" r="2"></circle><circle cx="15" cy="15" r="2"></circle><path d="M12 12c4 0 7 7 0 7s-4-7 0-7Z"></path>',
  museum: '<path d="M3 10h18"></path><path d="M5 10v9"></path><path d="M9 10v9"></path><path d="M15 10v9"></path><path d="M19 10v9"></path><path d="M2 19h20"></path><path d="m12 4 8 4H4Z"></path>',
  other: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9Z"></path>',
  child: '<circle cx="8" cy="7" r="2"></circle><circle cx="16" cy="7" r="2"></circle><path d="M8 10v8"></path><path d="M16 10v8"></path><path d="M5 13h14"></path>',
  hiking: '<path d="m3 20 7-12 4 6 3-4 4 10Z"></path><path d="M9 20h12"></path><path d="m13 9 1.5-3 1.5 3"></path><path d="M6 17l2 3"></path>'
};

const categories = [
  { id: "camp", label: "Camping Sites", short: "Camping", count: 23, color: "#76f04f", icon: iconPaths.camp },
  { id: "hiking", label: "Hiking Trails", short: "Hiking", count: 14, color: "#3dff91", icon: iconPaths.hiking },
  { id: "park", label: "Children's Parks", short: "Parks", count: 32, color: "#00d7ff", icon: iconPaths.child },
  { id: "bbq", label: "BBQ Areas", short: "BBQ", count: 18, color: "#ff8733", icon: iconPaths.bbq },
  { id: "other", label: "Other Attractions", short: "Other", count: 33, color: "#ffd02d", icon: iconPaths.other }
];

const campingSites = [
  { id: "al-qudra-lakes", name: "Al Qudra Lakes", place: "Dubai", x: 0.02, z: -0.04, description: "Popular desert-and-lakes camping area near Dubai, known for birdlife, cycling routes, BBQ evenings, and easy weekend access.", source: "MyBayut / Hertz / OutdoorLife" },
  { id: "hatta-camp", name: "Hatta Camp Site", place: "Hatta, Dubai", x: 0.66, z: -0.64, description: "Mountain camping base near Hatta's rugged trails, dam views, kayaking, and adventure facilities.", source: "MyBayut" },
  { id: "suhaila-lake", name: "Suhaila Lake", place: "Hatta, Dubai", x: 0.68, z: -0.52, description: "Free-entry Hatta camping spot with lake scenery and mountain surroundings for overnight stays.", source: "MyBayut" },
  { id: "al-lehbab-big-red", name: "Al Lehbab / Big Red", place: "Dubai", x: 0.33, z: 0.02, description: "Desert camping and dune-driving area around the famous Big Red dune, best suited to prepared 4x4 trips.", source: "MyBayut" },
  { id: "liwa-oasis", name: "Liwa Oasis", place: "Al Dhafra, Abu Dhabi", x: -0.78, z: -0.58, description: "Iconic Empty Quarter camping landscape with huge orange-red dunes, date palms, sandboarding, and stargazing.", source: "Experience Abu Dhabi / MyBayut" },
  { id: "al-khaznah", name: "Al Khaznah", place: "Abu Dhabi", x: -0.17, z: -0.38, description: "Wide sandy-dune camping area near Al Fayah, often paired with off-roading and desert camp experiences.", source: "Experience Abu Dhabi" },
  { id: "al-wathba-lake", name: "Al Wathba Lake Camp", place: "Abu Dhabi", x: -0.34, z: -0.28, description: "Organized lakeside camp area with campsites, picnic spots, desert-water scenery, and family facilities.", source: "Experience Abu Dhabi" },
  { id: "mirfa-beach", name: "Mirfa Beach", place: "Al Dhafra, Abu Dhabi", x: -0.86, z: -0.2, description: "Beach camping escape on Abu Dhabi's western coast, with calm waves and nearby towns for supplies.", source: "Experience Abu Dhabi" },
  { id: "al-dhafra-beach", name: "Al Dhafra Beach", place: "Al Dhafra, Abu Dhabi", x: -0.98, z: -0.3, description: "Remote shoreline camping option where desert scenery meets the sea along Abu Dhabi's western coast.", source: "Experience Abu Dhabi" },
  { id: "jebel-hafit-desert", name: "Jebel Hafit Desert Park", place: "Al Ain, Abu Dhabi", x: -0.02, z: -0.58, description: "Heritage-rich desert park at the foot of Jebel Hafit with basic camping, serviced camping, and glamping.", source: "Experience Abu Dhabi" },
  { id: "desert-rose-bedouin", name: "Desert Rose Bedouin Camp", place: "Al Khaznah, Abu Dhabi", x: -0.1, z: -0.42, description: "Luxury desert camping experience between Abu Dhabi and Al Ain with Bedouin-style tents and safari activities.", source: "Experience Abu Dhabi" },
  { id: "fossil-rock", name: "Fossil Rock", place: "Mleiha, Sharjah", x: 0.47, z: 0.05, description: "Scenic Sharjah desert camp area by fossil-bearing rock formations, dunes, hiking, and stargazing routes.", source: "Visit Sharjah / OutdoorLife" },
  { id: "mleiha-desert", name: "Mleiha Desert Camp", place: "Mleiha, Sharjah", x: 0.52, z: 0.0, description: "Archaeology-meets-adventure desert camping area with dunes, Camel Rock views, guided experiences, and night skies.", source: "Visit Sharjah / DubiCars" },
  { id: "al-dhaid-desert", name: "Al Dhaid Desert", place: "Sharjah", x: 0.5, z: 0.26, description: "Central Sharjah desert camping area used for quiet dune stays and longer off-road routes.", source: "MyBayut" },
  { id: "wadi-sana", name: "Wadi Sana", place: "Fujairah", x: 0.75, z: -0.3, description: "Mountain-valley camping area with rocky tracks, rugged Hajar scenery, and cooler overnight conditions.", source: "MyBayut" },
  { id: "al-aqah-beach", name: "Al Aqah Beach", place: "Fujairah", x: 0.88, z: 0.02, description: "East-coast beach camping spot near mountain backdrops, clear water, sunrise views, and snorkeling routes.", source: "DubiCars" },
  { id: "snoopy-island", name: "Snoopy Island", place: "Fujairah", x: 0.9, z: 0.08, description: "Coastal camping and snorkeling area near one of Fujairah's most recognizable offshore landmarks.", source: "MyBayut / DubiCars" },
  { id: "jebel-jais", name: "Jebel Jais", place: "Ras Al Khaimah", x: 0.79, z: 0.74, description: "UAE's highest mountain region, loved for cool-weather camping, viewpoints, hiking, and dramatic road access.", source: "Visit Ras Al Khaimah / MyBayut" },
  { id: "wadi-shawka", name: "Wadi Shawka", place: "Ras Al Khaimah", x: 0.64, z: 0.43, description: "Popular mountain camping and hiking zone with rocky wadi scenery and seasonal water views.", source: "MyBayut" },
  { id: "al-ghalilah-forest", name: "Al Ghalilah Forest", place: "Ras Al Khaimah", x: 0.87, z: 0.72, description: "Mountain-view camping area in northern Ras Al Khaimah, best visited in groups with careful navigation.", source: "MyBayut" },
  { id: "longbeach-campground", name: "Longbeach Campground", place: "Ras Al Khaimah", x: 0.72, z: 0.56, description: "Beachfront campground with ready-made tents and family-friendly coastal camping facilities.", source: "Visit Ras Al Khaimah / DubiCars" },
  { id: "al-rafaah-beach", name: "Al Rafaah Beach", place: "Umm Al Quwain", x: 0.56, z: 0.56, description: "Beach camping area near Umm Al Quwain's coast, with fishing, kayaking access, and open shoreline camping.", source: "MyBayut" },
  { id: "zorah-camping-beach", name: "Zorah Camping Beach", place: "Ajman", x: 0.48, z: 0.48, description: "Ajman beach camping spot around Al Zorah, popular for relaxed overnight coastal stays.", source: "MyBayut" }
];

const parkSites = [
  { id: "mushrif-park", name: "Mushrif Park", place: "Dubai", x: 0.23, z: 0.18, description: "Large family park with ghaf trees, picnic areas, barbecue pits, sports facilities, pools, hiking, cycling, and Aventura Parks.", source: "Visit Dubai" },
  { id: "creek-park", name: "Creek Park", place: "Dubai", x: 0.18, z: 0.17, description: "Long-running Dubai Creek park with lawns, play areas, picnic space, cable car views, and family attractions nearby.", source: "Dubai BBQ roundups" },
  { id: "zabeel-park", name: "Zabeel Park", place: "Dubai", x: 0.15, z: 0.14, description: "Central Dubai green space known for lawns, family facilities, events, and easy access to Dubai Frame.", source: "Dubai BBQ roundups" },
  { id: "safa-park", name: "Safa Park", place: "Dubai", x: 0.11, z: 0.11, description: "Classic family park with cycling paths, open lawns, playgrounds, and picnic-friendly green space.", source: "Family park roundups" },
  { id: "quranic-park", name: "Quranic Park", place: "Dubai", x: 0.22, z: 0.24, description: "Educational family park with themed gardens, glass house, cave experiences, and calm walking areas.", source: "Family park roundups" },
  { id: "al-mamzar-park", name: "Al Mamzar Beach Park", place: "Dubai", x: 0.26, z: 0.28, description: "Beach-and-park destination with lawns, playgrounds, swimming areas, chalets, and picnic facilities.", source: "Property Finder / Family park roundups" },
  { id: "umm-al-emarat", name: "Umm Al Emarat Park", place: "Abu Dhabi", x: -0.42, z: -0.1, description: "One of Abu Dhabi's oldest and largest family parks, with a Shade House, Animal Barn, amphitheatre, lawns, and gardens.", source: "Experience Abu Dhabi" },
  { id: "khalifa-park", name: "Khalifa Park", place: "Abu Dhabi", x: -0.36, z: -0.12, description: "Major Abu Dhabi park with open greenery, family attractions, a train, museum areas, and picnic-friendly lawns.", source: "Experience Abu Dhabi / MyBayut" },
  { id: "jubail-mangrove-park", name: "Jubail Mangrove Park", place: "Abu Dhabi", x: -0.31, z: -0.08, description: "Boardwalk park through Abu Dhabi mangroves, popular for kayaking, birdwatching, turtles, herons, and nature walks.", source: "Experience Abu Dhabi" },
  { id: "reems-central-park", name: "Reem Central Park", place: "Abu Dhabi", x: -0.34, z: -0.06, description: "Urban waterfront park with play areas, skate space, food options, and family-friendly open areas.", source: "Family park roundups" },
  { id: "sharjah-national-park", name: "Sharjah National Park", place: "Sharjah", x: 0.39, z: 0.34, description: "Large Sharjah park with family play zones, lawns, cycling paths, picnic seating, and barbecue facilities.", source: "Property Finder / Sharjah BBQ roundups" },
  { id: "al-majaz-park", name: "Al Majaz Park", place: "Sharjah", x: 0.34, z: 0.36, description: "Waterfront family park with lagoon views, walkways, play areas, splash park access, and dining nearby.", source: "Property Finder / Visit Sharjah" },
  { id: "shees-park", name: "Shees Park", place: "Khorfakkan, Sharjah", x: 0.72, z: -0.16, description: "Mountain-side family park with terraces, waterfall, shaded seating, playgrounds, viewing platform, and barbecue area.", source: "Visit Sharjah" },
  { id: "al-noor-island-park", name: "Al Noor Island", place: "Sharjah", x: 0.35, z: 0.38, description: "Art-and-nature island with Butterfly House, gardens, light installations, boardwalk, and family play areas.", source: "Visit Sharjah" },
  { id: "al-zorah-nature", name: "Al Zorah Nature Reserve", place: "Ajman", x: 0.48, z: 0.47, description: "Mangrove and lagoon nature area in Ajman with birdlife, kayaking, walkable waterfronts, and family scenery.", source: "Ajman tourism roundups" },
  { id: "kalba-corniche-park", name: "Kalba Corniche Park", place: "Kalba, Sharjah", x: 0.79, z: -0.34, description: "East-coast family park near the water, useful for picnics, walks, and a calmer coastal outing.", source: "Visit Sharjah / Property Finder" }
];

const hikingSites = [
  { id: "jebel-jais-ghaf-summit", name: "Ghaf Summit Trail", place: "Jebel Jais, Ras Al Khaimah", x: 0.8, z: 0.76, description: "Popular Jebel Jais upper-segment hike from the viewing deck area, with marked trail signs and Hajar Mountain views.", source: "Visit Jebel Jais / Visit Ras Al Khaimah" },
  { id: "jebel-jais-lower-trails", name: "Jebel Jais Lower Trails", place: "Ras Al Khaimah", x: 0.78, z: 0.72, description: "A network of designated mountain trails through the lower Jebel Jais ecosystem, suited to varied hiking abilities.", source: "Visit Ras Al Khaimah" },
  { id: "wadi-shawka-hike", name: "Wadi Shawka Trail", place: "Ras Al Khaimah", x: 0.64, z: 0.43, description: "Well-known wadi hiking area with mountain tracks, dam views, rocky scenery, and routes also used for running and biking.", source: "Visit Ras Al Khaimah" },
  { id: "stairway-to-heaven", name: "Stairway to Heaven", place: "Ras Al Khaimah", x: 0.86, z: 0.76, description: "Advanced mountain route in the northern Hajar range, known for steep exposure and serious preparation requirements.", source: "UAE hiking references" },
  { id: "al-rabi-hiking-trail", name: "Al Rabi Hiking Trail", place: "Khorfakkan, Sharjah", x: 0.76, z: -0.12, description: "Beginner-friendly 4-5 km round trip to Al Rabi Tower, with marked paths and Gulf of Oman views.", source: "Visit Sharjah" },
  { id: "wadi-shees-nature-trail", name: "Wadi Shees Nature Trail", place: "Khorfakkan, Sharjah", x: 0.72, z: -0.16, description: "Accessible 1.8 km loop through Shees Valley beside falaj water channels, farms, palms, and mountain scenery.", source: "Visit Sharjah" },
  { id: "mleiha-hiking-trails", name: "Mleiha Hiking Trails", place: "Mleiha, Sharjah", x: 0.52, z: 0.0, description: "Desert and mountain hiking area around Mleiha's archaeological landscape, fossil formations, and dunes.", source: "Visit Sharjah" },
  { id: "fossil-rock-hike", name: "Fossil Rock Hike", place: "Mleiha, Sharjah", x: 0.47, z: 0.05, description: "Scenic hike around fossil-bearing rock formations and desert ridges, popular for sunset and stargazing trips.", source: "Visit Sharjah / UAE hiking references" },
  { id: "hatta-hiking-trails", name: "Hatta Hiking Trails", place: "Hatta, Dubai", x: 0.66, z: -0.56, description: "Marked Hajar Mountain trails around Hatta with varied routes, dam views, rocky climbs, and adventure facilities nearby.", source: "Visit Dubai / Hatta Wadi Hub" },
  { id: "hatta-sign-hike", name: "Hatta Sign Hike", place: "Hatta, Dubai", x: 0.68, z: -0.52, description: "Short but steep Hatta route toward the hillside sign, with broad views over the town and mountain valley.", source: "UAE hiking references" },
  { id: "jebel-hafeet-hike", name: "Jebel Hafeet Trails", place: "Al Ain, Abu Dhabi", x: 0.0, z: -0.6, description: "Mountain hiking around Jebel Hafeet and its desert park, with archaeology, rugged terrain, and Al Ain views.", source: "Experience Abu Dhabi" },
  { id: "al-ain-oasis-walk", name: "Al Ain Oasis Walks", place: "Al Ain, Abu Dhabi", x: -0.04, z: -0.54, description: "Shaded walking routes through palm groves and falaj irrigation systems, easier than mountain hikes but rich in heritage.", source: "Experience Abu Dhabi" },
  { id: "wadi-sana-hike", name: "Wadi Sana Hike", place: "Fujairah", x: 0.75, z: -0.3, description: "Rocky east-coast mountain-valley hiking area with rugged tracks, Hajar views, and remote-feeling terrain.", source: "UAE hiking references" },
  { id: "al-hefaiyah-mountain-trail", name: "Al Hefaiyah Mountain Trail", place: "Kalba, Sharjah", x: 0.78, z: -0.31, description: "Mountain nature area around Kalba's conservation landscape, suitable for scenic walks and wildlife-focused outings.", source: "Visit Sharjah" }
];

const bbqSites = [
  { id: "bbq-al-mamzar", name: "Al Mamzar Beach Park BBQ", place: "Dubai", x: 0.27, z: 0.29, description: "Beach park with dedicated BBQ grills, sea views, picnic lawns, and family facilities.", source: "Property Finder" },
  { id: "bbq-mushrif", name: "Mushrif Park BBQ", place: "Dubai", x: 0.24, z: 0.19, description: "Spacious Dubai park with barbecue pits, picnic areas, sports facilities, and nature trails.", source: "Visit Dubai / Property Finder" },
  { id: "bbq-creek", name: "Creek Park BBQ", place: "Dubai", x: 0.17, z: 0.17, description: "Family-friendly barbecue choice along Dubai Creek with lawns, play areas, and walking tracks.", source: "Dubai BBQ roundups" },
  { id: "bbq-zabeel", name: "Zabeel Park BBQ", place: "Dubai", x: 0.14, z: 0.14, description: "Central green park for group picnics and relaxed barbecue outings close to city landmarks.", source: "Dubai BBQ roundups" },
  { id: "bbq-al-qudra", name: "Al Qudra Lakes BBQ", place: "Dubai", x: 0.02, z: -0.03, description: "Desert lake area popular for camping, birdwatching, stargazing, and evening BBQ setups.", source: "Camping and BBQ roundups" },
  { id: "bbq-hatta", name: "Hatta BBQ Areas", place: "Hatta, Dubai", x: 0.67, z: -0.58, description: "Mountain picnic and grilling areas around Hatta, often paired with hiking, kayaking, and adventure stays.", source: "MyBayut" },
  { id: "bbq-khalifa-park", name: "Khalifa Park BBQ", place: "Abu Dhabi", x: -0.35, z: -0.13, description: "Abu Dhabi family park with dedicated barbecue spots, lawns, attractions, and relaxed weekend facilities.", source: "MyBayut" },
  { id: "bbq-dolphin-park", name: "Dolphin Park BBQ", place: "Abu Dhabi", x: -0.33, z: -0.1, description: "Green Abu Dhabi picnic and barbecue spot near Eastern Mangroves, popular for evenings outdoors.", source: "MyBayut" },
  { id: "bbq-lake-park", name: "Lake Park BBQ", place: "Abu Dhabi", x: -0.41, z: -0.11, description: "Urban park with lake views, wooden bridge scenery, and dedicated BBQ areas.", source: "MyBayut" },
  { id: "bbq-heritage-park", name: "Heritage Park BBQ", place: "Abu Dhabi", x: -0.43, z: -0.08, description: "Paved, landscaped Abu Dhabi park with fountains, play areas, and barbecue pits.", source: "MyBayut" },
  { id: "bbq-khalidiya-park", name: "Al Khalidiya Park BBQ", place: "Abu Dhabi", x: -0.45, z: -0.1, description: "Shaded neighborhood park choice for family barbecue gatherings and relaxed outdoor seating.", source: "MyBayut" },
  { id: "bbq-sharjah-national", name: "Sharjah National Park BBQ", place: "Sharjah", x: 0.4, z: 0.35, description: "Top Sharjah barbecue park with designated grilling stations, picnic tables, cycling, duck pond, and play zones.", source: "Property Finder" },
  { id: "bbq-al-majaz", name: "Al Majaz Park Picnic BBQ", place: "Sharjah", x: 0.35, z: 0.37, description: "Lagoon-side picnic and gathering area with lawns, musical fountain, splash park, and dining nearby.", source: "Property Finder" },
  { id: "bbq-shees", name: "Shees Park BBQ", place: "Sharjah", x: 0.73, z: -0.17, description: "Mountain park with designated barbecue zones, waterfall, terraces, shaded seating, and family areas.", source: "Visit Sharjah / Property Finder" },
  { id: "bbq-kalba-corniche", name: "Kalba Corniche Park BBQ", place: "Sharjah East Coast", x: 0.8, z: -0.35, description: "Coastal park option for picnics and barbecue-style family outings on Sharjah's east coast.", source: "Property Finder" },
  { id: "bbq-starz-desert", name: "Starz Desert BBQ Spot", place: "Sharjah Desert", x: 0.48, z: 0.2, description: "Desert barbecue and camping stop used for open-sky gatherings outside the city.", source: "Property Finder" },
  { id: "bbq-jebel-jais", name: "Jebel Jais BBQ Area", place: "Ras Al Khaimah", x: 0.82, z: 0.68, description: "Mountain picnic and BBQ zone near high-altitude viewpoints and hiking routes.", source: "MyBayut / Visit RAK" },
  { id: "bbq-al-rafaah", name: "Al Rafaah Beach BBQ", place: "Umm Al Quwain", x: 0.57, z: 0.55, description: "Open coastal BBQ and camping area near Umm Al Quwain, with fishing and mangrove kayaking nearby.", source: "MyBayut" }
];

const zooSites = [
  { id: "al-ain-zoo", name: "Al Ain Zoo", place: "Al Ain, Abu Dhabi", x: -0.02, z: -0.5, description: "Major regional zoo with over 4,000 animals, giraffe feeding, safari experiences, conservation work, and family areas.", source: "Experience Abu Dhabi / Al Ain Zoo" },
  { id: "emirates-park-zoo", name: "Emirates Park Zoo", place: "Al Bahia, Abu Dhabi", x: -0.24, z: -0.04, description: "Wildlife sanctuary near Yas Island with 200+ species, feeding encounters, shows, VIP animal experiences, and resort stays.", source: "Experience Abu Dhabi" },
  { id: "dubai-safari-park", name: "Dubai Safari Park", place: "Dubai", x: 0.26, z: 0.16, description: "Large eco-focused safari park in Al Warqa with themed villages, safari drives, kids farm, and thousands of animals.", source: "Dubai Safari Park / travel references" },
  { id: "sharjah-safari", name: "Sharjah Safari", place: "Al Dhaid, Sharjah", x: 0.52, z: 0.28, description: "Large safari destination outside Africa with African habitats, free-roaming wildlife areas, and major family experiences.", source: "Visit Sharjah" },
  { id: "arabias-wildlife-centre", name: "Arabia's Wildlife Centre", place: "Sharjah Desert Park", x: 0.44, z: 0.32, description: "Conservation-focused wildlife centre with Arabian oryx, Arabian leopard, rare regional animals, and children's farm access.", source: "Visit Sharjah" },
  { id: "wasit-nature-reserve", name: "Wasit Nature Reserve", place: "Sharjah", x: 0.37, z: 0.42, description: "Wetland reserve with bird hides, over 200 bird species, reptiles, small mammals, and Arabian oryx sightings.", source: "Visit Sharjah" },
  { id: "al-hefaiyah", name: "Al Hefaiyah Mountain Conservation Centre", place: "Kalba, Sharjah", x: 0.78, z: -0.31, description: "Mountain wildlife centre dedicated to native species from Hajar habitats, conservation, and family education.", source: "Visit Sharjah" }
];

const museumSites = [
  { id: "louvre-abu-dhabi", name: "Louvre Abu Dhabi", place: "Saadiyat Island, Abu Dhabi", x: -0.35, z: -0.08, description: "Universal museum in Saadiyat Cultural District with global art and historical collections under a landmark dome.", source: "Experience Abu Dhabi" },
  { id: "zayed-national-museum", name: "Zayed National Museum", place: "Saadiyat Island, Abu Dhabi", x: -0.33, z: -0.07, description: "Cultural museum celebrating UAE history, Sheikh Zayed's values, and over 300,000 years of human history in the land.", source: "Experience Abu Dhabi" },
  { id: "qasr-al-hosn", name: "Qasr Al Hosn", place: "Abu Dhabi", x: -0.43, z: -0.09, description: "Abu Dhabi's oldest stone building, restored as a museum and heritage landmark telling the city's story.", source: "Experience Abu Dhabi" },
  { id: "al-ain-museum", name: "Al Ain Museum", place: "Al Ain, Abu Dhabi", x: -0.03, z: -0.52, description: "Oldest museum in the UAE, charting Al Ain's history from the Stone Age through the formation of the UAE.", source: "Experience Abu Dhabi" },
  { id: "museum-of-future", name: "Museum of the Future", place: "Dubai", x: 0.13, z: 0.13, description: "Immersive Dubai museum exploring possible futures, future technologies, ecosystems, wellness, and children's experiences.", source: "Museum of the Future" },
  { id: "etihad-museum", name: "Etihad Museum", place: "Dubai", x: 0.12, z: 0.12, description: "Museum dedicated to preserving the UAE's modern history and the story of the Union House signing.", source: "Visit Dubai" },
  { id: "al-shindagha-museum", name: "Al Shindagha Museum", place: "Dubai", x: 0.16, z: 0.18, description: "UAE's largest open-air heritage museum, connecting visitors with Dubai Creek heritage and Emirati culture.", source: "Dubai Culture" },
  { id: "dubai-museum", name: "Dubai Museum / Al Fahidi Fort", place: "Dubai", x: 0.15, z: 0.17, description: "Historic fort and museum area in old Dubai, tied to the city's heritage and creek-side development story.", source: "Dubai heritage references" },
  { id: "sharjah-islamic-museum", name: "Sharjah Museum of Islamic Civilization", place: "Sharjah", x: 0.36, z: 0.37, description: "Major museum with more than 5,000 Islamic artifacts, science displays, manuscripts, ceramics, coins, and art galleries.", source: "Visit Sharjah" },
  { id: "sharjah-archaeology", name: "Sharjah Archaeology Museum", place: "Sharjah", x: 0.39, z: 0.34, description: "Archaeology museum with relics from Stone Age through Islamic eras, including Mleiha finds and interactive exhibits.", source: "Visit Sharjah" },
  { id: "sharjah-heritage", name: "Sharjah Heritage Museum", place: "Heart of Sharjah", x: 0.36, z: 0.36, description: "Restored heritage-house museum covering Emirati traditions, desert life, celebrations, livelihoods, and oral culture.", source: "Visit Sharjah" },
  { id: "sharjah-art", name: "Sharjah Art Museum", place: "Sharjah", x: 0.35, z: 0.37, description: "Large art museum and gallery destination connected to Sharjah's role as a regional cultural capital.", source: "Visit Sharjah / museum references" },
  { id: "mleiha-archaeology", name: "Mleiha Archaeological Centre", place: "Mleiha, Sharjah", x: 0.52, z: 0.01, description: "Archaeological centre and desert history gateway with Bronze Age tombs, fossils, tours, and adventure routes nearby.", source: "Visit Sharjah" },
  { id: "ajman-museum", name: "Ajman Museum", place: "Ajman", x: 0.45, z: 0.47, description: "Historic fort museum covering Emirati heritage, archaeology, weapons, manuscripts, and traditional life.", source: "Ajman tourism references" },
  { id: "uaq-national-museum", name: "Umm Al Quwain National Museum", place: "Umm Al Quwain", x: 0.56, z: 0.55, description: "Fort-based museum preserving local history, archaeology, traditional weapons, and coastal heritage.", source: "UAE museum references" }
];

const otherAttractions = [
  { id: "burj-khalifa", name: "Burj Khalifa", place: "Dubai", x: 0.12, z: 0.12, description: "World's tallest building, with observation decks, skyline views, dining, and Downtown Dubai access.", source: "Visit Dubai" },
  { id: "dubai-frame", name: "Dubai Frame", place: "Dubai", x: 0.14, z: 0.15, description: "Landmark frame-shaped attraction connecting views of old and new Dubai from a high glass bridge.", source: "Dubai attraction references" },
  { id: "dubai-fountain", name: "Dubai Fountain", place: "Downtown Dubai", x: 0.13, z: 0.11, description: "Large choreographed fountain show beside Dubai Mall and Burj Khalifa.", source: "Dubai attraction references" },
  { id: "palm-jumeirah", name: "Palm Jumeirah", place: "Dubai", x: 0.08, z: 0.08, description: "Iconic palm-shaped island with resorts, beaches, monorail views, and The View observation experience.", source: "Dubai attraction references" },
  { id: "miracle-garden", name: "Dubai Miracle Garden", place: "Dubai", x: 0.09, z: 0.02, description: "Seasonal flower attraction with large sculptural displays, themed gardens, and family-friendly photo spots.", source: "Dubai attraction references" },
  { id: "global-village", name: "Global Village", place: "Dubai", x: 0.05, z: 0.0, description: "Seasonal multicultural attraction with country pavilions, shows, shopping, rides, and international food.", source: "Dubai attraction references" },
  { id: "sheikh-zayed-grand-mosque", name: "Sheikh Zayed Grand Mosque", place: "Abu Dhabi", x: -0.35, z: -0.14, description: "One of the world's largest mosques, known for white marble domes, chandeliers, reflective pools, and guided cultural tours.", source: "Experience Abu Dhabi" },
  { id: "qasr-al-watan", name: "Qasr Al Watan", place: "Abu Dhabi", x: -0.46, z: -0.09, description: "Working Presidential palace and cultural landmark with grand halls, exhibitions, and Palace In Motion light show.", source: "Experience Abu Dhabi" },
  { id: "ferrari-world", name: "Ferrari World Yas Island", place: "Abu Dhabi", x: -0.25, z: -0.06, description: "Indoor Ferrari-themed park on Yas Island with major thrill rides and family attractions.", source: "Abu Dhabi tourism references" },
  { id: "yas-marina-circuit", name: "Yas Marina Circuit", place: "Abu Dhabi", x: -0.24, z: -0.07, description: "Formula 1 circuit and motorsport destination with events, driving experiences, and Yas Island nightlife nearby.", source: "Abu Dhabi tourism references" },
  { id: "al-ain-oasis", name: "Al Ain Oasis", place: "Al Ain, Abu Dhabi", x: -0.04, z: -0.54, description: "UNESCO-linked oasis with shaded palm pathways, falaj irrigation, and heritage walking routes.", source: "Experience Abu Dhabi" },
  { id: "jebel-hafeet", name: "Jebel Hafeet", place: "Al Ain, Abu Dhabi", x: 0.0, z: -0.6, description: "Abu Dhabi's tallest peak with mountain road viewpoints, tombs nearby, and desert park access.", source: "Experience Abu Dhabi" },
  { id: "sir-bani-yas", name: "Sir Bani Yas Island", place: "Abu Dhabi", x: -0.97, z: -0.08, description: "Nature island with wildlife, beaches, heritage sites, and outdoor adventure experiences.", source: "Experience Abu Dhabi" },
  { id: "central-souk", name: "Central Souk / Blue Souk", place: "Sharjah", x: 0.34, z: 0.37, description: "Iconic Sharjah market with blue tile facade, 600+ shops, handicrafts, jewellery, and heritage shopping.", source: "Visit Sharjah" },
  { id: "al-qasba", name: "Al Qasba", place: "Sharjah", x: 0.33, z: 0.35, description: "Canal-side family attraction with restaurants, public art, walkways, and evening waterfront atmosphere.", source: "Visit Sharjah / local references" },
  { id: "khorfakkan-amphitheatre", name: "Khorfakkan Amphitheatre", place: "Sharjah East Coast", x: 0.76, z: -0.12, description: "Roman-inspired amphitheatre near Khorfakkan beach, waterfall, mountain scenery, and coastal walks.", source: "Visit Sharjah references" },
  { id: "sira-khorfakkan", name: "Sira Khorfakkan Island", place: "Khorfakkan, Sharjah", x: 0.8, z: -0.1, description: "Small island off Khorfakkan for snorkeling, diving, kayaking, turtles, coral reef views, and clear water.", source: "Visit Sharjah" },
  { id: "hatta-dam", name: "Hatta Dam", place: "Hatta, Dubai", x: 0.69, z: -0.55, description: "Mountain reservoir attraction known for turquoise water, kayaking, viewpoints, and Hajar scenery.", source: "Dubai attraction references" },
  { id: "jebel-jais-attraction", name: "Jebel Jais", place: "Ras Al Khaimah", x: 0.8, z: 0.76, description: "Highest mountain region in the UAE, with viewpoints, hiking, cool weather, and adventure attractions.", source: "Visit Ras Al Khaimah" },
  { id: "fujairah-fort", name: "Fujairah Fort", place: "Fujairah", x: 0.82, z: -0.22, description: "Historic fort and landmark near Fujairah city, connected to the emirate's heritage and old settlement area.", source: "Fujairah tourism references" }
];

const categoryDirectories = {
  camp: campingSites,
  hiking: hikingSites,
  park: parkSites,
  bbq: bbqSites,
  other: [...zooSites, ...museumSites, ...otherAttractions]
};

categories.forEach((category) => {
  category.count = categoryDirectories[category.id].length;
});

const locations = [
  ...Object.entries(categoryDirectories).flatMap(([category, items]) => items.map((item) => ({ ...item, category })))
];

const cityFilters = ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al-Quwain", "Ras Al-Khaimah", "Fujairah"];

const emirateLabels = [
  { name: "Abu Dhabi", x: -0.32, z: -0.2 },
  { name: "Dubai", x: 0.21, z: 0.18 },
  { name: "Sharjah", x: 0.36, z: 0.36 },
  { name: "Ajman", x: 0.46, z: 0.48 },
  { name: "Umm Al-Quwain", x: 0.58, z: 0.58 },
  { name: "Ras Al-Khaimah", x: 0.78, z: 0.78 },
  { name: "Fujairah", x: 0.86, z: -0.12 }
];

let gl;
let program;
let glbProgram;
let buffers;
let mesh = null;
let glbModel = null;
let glbTexture = null;
let glbTextures = new Map();
let normalMapSupported = false;
let uintIndexExtension = null;
let geoBoundary = null;
let geoPolygons = [];
let mapBounds = { west: 51.5317798, south: 22.6316214, east: 56.3816347, north: 26.0695283 };
let mvpMatrix = identity();
let nodeMatrix = identity();
let animationId = 0;
let activeView = "3d";
let selectedCategory = null;
let selectedLocation = null;
let selectedImageIndex = 0;
let enabledCategories = new Set(categories.map((category) => category.id));
let activeCityFilter = null;
let mapIsLoading = true;
let expandedCategory = null;
let yaw = Math.PI;
let pitch = 0.92;
let zoom = 1.12;
let panX = 0.02;
let panY = -0.08;
let saved3dCamera = { yaw, pitch, zoom, panX, panY };
let dragging = false;
let dragMode = "rotate";
let lastPointer = { x: 0, y: 0 };
let pointerStart = { x: 0, y: 0 };
let weatherRequestId = 0;

const glbModelBounds = {
  west: -5.438,
  east: 5.438,
  south: -4.202,
  north: 4.199,
  markerY: 0.72
};

const glbGeoBounds = {
  west: 51.45,
  south: 22.55,
  east: 56.55,
  north: 26.2
};

const emirateWeatherFallbacks = [
  { match: /hatta/i, name: "Hatta", latitude: 24.8069, longitude: 56.125 },
  { match: /dubai|jumeirah|shindagha|burj|zabeel|mamzar|qudra|global village|miracle/i, name: "Dubai", latitude: 25.2048, longitude: 55.2708 },
  { match: /abu dhabi|yas|saadiyat|al ain|liwa|dhafra|khaznah|wathba|mirfa|sila|sir bani yas/i, name: "Abu Dhabi", latitude: 24.4539, longitude: 54.3773 },
  { match: /sharjah|mleiha|dhaid|khorfakkan|kalba|shees|fossil/i, name: "Sharjah", latitude: 25.3463, longitude: 55.4209 },
  { match: /ajman|zorah/i, name: "Ajman", latitude: 25.4052, longitude: 55.5136 },
  { match: /umm al quwain|uaq|rafaah/i, name: "Umm Al Quwain", latitude: 25.5647, longitude: 55.5552 },
  { match: /ras al khaimah|jebel jais|wadi shawka|ghalilah|longbeach/i, name: "Ras Al Khaimah", latitude: 25.8007, longitude: 55.9762 },
  { match: /fujairah|snoopy|aqah|wadi sana/i, name: "Fujairah", latitude: 25.1288, longitude: 56.3265 }
];

const weatherCodeText = {
  0: "Clear",
  1: "Mostly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime Fog",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Heavy Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  80: "Light Showers",
  81: "Showers",
  82: "Heavy Showers",
  95: "Thunderstorm"
};

const compassDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const locationCoordinates = {
  "al-qudra-lakes": [55.3606, 24.8362],
  "hatta-camp": [56.125, 24.8069],
  "suhaila-lake": [56.114, 24.803],
  "al-lehbab-big-red": [55.6107, 24.9306],
  "liwa-oasis": [53.77, 23.133],
  "al-khaznah": [55.121, 24.172],
  "al-wathba-lake": [54.732, 24.255],
  "mirfa-beach": [53.491, 24.091],
  "al-dhafra-beach": [53.055, 23.75],
  "jebel-hafit-desert": [55.776, 24.048],
  "fossil-rock": [55.832, 25.132],
  "mleiha-desert": [55.865, 25.129],
  "al-dhaid-desert": [55.881, 25.288],
  "wadi-sana": [56.13, 25.1],
  "al-aqah-beach": [56.363, 25.492],
  "snoopy-island": [56.365, 25.493],
  "jebel-jais": [56.183, 25.953],
  "wadi-shawka": [56.057, 25.116],
  "al-ghalilah-forest": [56.104, 25.944],
  "longbeach-campground": [55.95, 25.745],
  "al-rafaah-beach": [55.62, 25.62],
  "zorah-camping-beach": [55.484, 25.421],
  "dubai": [55.2708, 25.2048],
  "abu-dhabi": [54.3773, 24.4539],
  "sharjah": [55.4209, 25.3463],
  "ajman": [55.5136, 25.4052],
  "umm-al-quwain": [55.5552, 25.5647],
  "ras-al-khaimah": [55.9762, 25.8007],
  "fujairah": [56.3265, 25.1288],
  "al-ain": [55.8023, 24.1302],
  "hatta": [56.125, 24.8069],
  "jebel-jais-attraction": [56.183, 25.953],
  "khorfakkan-amphitheatre": [56.342, 25.3313],
  "sira-khorfakkan": [56.365, 25.35],
  "kalba-corniche-park": [56.355, 25.074],
  "bbq-kalba-corniche": [56.355, 25.074],
  "al-hefaiyah": [56.293, 25.075],
  "sir-bani-yas": [52.583, 24.333],
  "sheikh-zayed-grand-mosque": [54.4749, 24.4128],
  "qasr-al-watan": [54.3043, 24.4624],
  "ferrari-world": [54.6075, 24.484],
  "yas-marina-circuit": [54.6031, 24.4672],
  "louvre-abu-dhabi": [54.3989, 24.5337],
  "zayed-national-museum": [54.4002, 24.533],
  "qasr-al-hosn": [54.3547, 24.4826],
  "al-ain-museum": [55.763, 24.216],
  "al-ain-zoo": [55.739, 24.179],
  "al-ain-oasis": [55.7633, 24.2167],
  "jebel-hafeet": [55.778, 24.057],
  "burj-khalifa": [55.2744, 25.1972],
  "dubai-frame": [55.3003, 25.2355],
  "dubai-fountain": [55.275, 25.195],
  "palm-jumeirah": [55.139, 25.112],
  "miracle-garden": [55.244, 25.060],
  "global-village": [55.309, 25.067],
  "museum-of-future": [55.281, 25.219],
  "etihad-museum": [55.260, 25.239],
  "al-shindagha-museum": [55.300, 25.265],
  "dubai-museum": [55.297, 25.264],
  "mushrif-park": [55.455, 25.221],
  "creek-park": [55.321, 25.235],
  "zabeel-park": [55.298, 25.235],
  "safa-park": [55.242, 25.187],
  "quranic-park": [55.451, 25.217],
  "al-mamzar-park": [55.335, 25.317],
  "dubai-safari-park": [55.450, 25.205],
  "sharjah-safari": [55.824, 25.289],
  "arabias-wildlife-centre": [55.697, 25.279],
  "wasit-nature-reserve": [55.459, 25.35],
  "sharjah-national-park": [55.478, 25.300],
  "al-majaz-park": [55.389, 25.325],
  "al-noor-island-park": [55.386, 25.333],
  "central-souk": [55.385, 25.356],
  "al-qasba": [55.376, 25.321],
  "sharjah-islamic-museum": [55.389, 25.366],
  "sharjah-archaeology": [55.436, 25.327],
  "sharjah-heritage": [55.386, 25.359],
  "sharjah-art": [55.389, 25.366],
  "mleiha-archaeology": [55.855, 25.128],
  "ajman-museum": [55.444, 25.411],
  "uaq-national-museum": [55.565, 25.565],
  "al-zorah-nature": [55.477, 25.427],
  "umm-al-emarat": [54.407, 24.433],
  "khalifa-park": [54.474, 24.423],
  "jubail-mangrove-park": [54.502, 24.545],
  "reems-central-park": [54.407, 24.493],
  "emirates-park-zoo": [54.672, 24.556],
  "hatta-dam": [56.116, 24.789],
  "fujairah-fort": [56.337, 25.135]
  ,
  "jebel-jais-ghaf-summit": [56.131, 25.938],
  "jebel-jais-lower-trails": [56.15, 25.86],
  "wadi-shawka-hike": [56.057, 25.116],
  "stairway-to-heaven": [56.15, 25.92],
  "al-rabi-hiking-trail": [56.342, 25.331],
  "wadi-shees-nature-trail": [56.245, 25.298],
  "mleiha-hiking-trails": [55.855, 25.128],
  "fossil-rock-hike": [55.832, 25.132],
  "hatta-hiking-trails": [56.125, 24.8069],
  "hatta-sign-hike": [56.119, 24.802],
  "jebel-hafeet-hike": [55.778, 24.057],
  "al-ain-oasis-walk": [55.7633, 24.2167],
  "wadi-sana-hike": [56.13, 25.1],
  "al-hefaiyah-mountain-trail": [56.293, 25.075]
};

function svg(icon) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg>`;
}

function categoryFor(id) {
  return categories.find((category) => category.id === id);
}

function cityForLocation(location) {
  const text = `${location.place || ""} ${location.name || ""}`.toLowerCase();
  const rules = [
    ["Umm Al-Quwain", /umm al[\s-]?quwain|uaq/],
    ["Ras Al-Khaimah", /ras al[\s-]?khaimah|jebel jais|rak/],
    ["Abu Dhabi", /abu dhabi|al ain|liwa|dhafra|yas|saadiyat|sir bani yas|mirfa|sila|khaznah|wathba/],
    ["Dubai", /dubai|hatta|jumeirah|qudra|mamzar|mushrif|zabeel|safa|palm|burj/],
    ["Sharjah", /sharjah|khorfakkan|kalba|mleiha|dhaid|shees|fossil/],
    ["Ajman", /ajman|zorah/],
    ["Fujairah", /fujairah|aqah|snoopy|wadi sana/]
  ];
  const match = rules.find(([, pattern]) => pattern.test(text));
  return match ? match[0] : "Abu Dhabi";
}

function visibleLocations() {
  return locations.filter((location) => (
    enabledCategories.has(location.category)
    && (!activeCityFilter || cityForLocation(location) === activeCityFilter)
  ));
}

function setMapLoading(loading) {
  mapIsLoading = loading;
  document.body.classList.toggle("map-loading", loading);
  if (mapLoadingOverlay) mapLoadingOverlay.classList.toggle("hidden", !loading);
  markerLayer.classList.toggle("hidden", loading);
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 90000) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    window.clearTimeout(timer);
  }
}

function renderStats() {
  const total = categories.reduce((sum, category) => sum + category.count, 0);
  const rows = [{ label: "Total Attractions", count: total, color: "#00d7ff", icon: iconPaths.other }, ...categories.map((category) => ({ label: category.id === "other" ? "Other" : category.short, count: category.count, color: category.color, icon: category.icon }))];
  statsList.innerHTML = rows.map((row) => `
    <div class="stat-row" style="--accent:${row.color}">
      <span class="stat-icon">${svg(row.icon)}</span>
      <span>${row.label}</span>
      <span class="stat-count">${row.count}</span>
    </div>
  `).join("");
}

function renderCategories() {
  categoryList.innerHTML = categories.map((category) => {
    const off = enabledCategories.has(category.id) ? "" : " off";
    const active = selectedCategory === category.id ? " active" : "";
    const expanded = expandedCategory === category.id ? " expanded" : "";
    const directory = categoryDirectories[category.id] || [];
    const sites = expandedCategory === category.id
      ? `<div class="category-sites" style="--accent:${category.color}" data-sites="${category.id}">
          ${directory.map((site) => `
            <button class="site-row${selectedLocation?.id === site.id ? " selected" : ""}" data-location="${site.id}" type="button">
              <span>${site.name}</span>
              <small>${site.place}</small>
            </button>
          `).join("")}
        </div>`
      : "";
    return `
      <button class="category-card${off}${active}${expanded}" style="--accent:${category.color}" data-category="${category.id}" type="button" aria-expanded="${expandedCategory === category.id}" aria-pressed="${enabledCategories.has(category.id)}">
        <span class="category-icon">${svg(category.icon)}</span>
        <span>
          <span class="category-name">${category.label}</span>
          <span class="category-count">${category.count} Locations</span>
        </span>
        <span class="chevron" aria-hidden="true">v</span>
      </button>
      ${sites}
    `;
  }).join("");
}

function renderFilterPanel() {
  filterCategoryList.innerHTML = [
    `<button class="filter-option${enabledCategories.size === categories.length ? " active" : ""}" data-filter-category="all" type="button">All Categories</button>`,
    ...categories.map((category) => `
      <button class="filter-option${enabledCategories.size === 1 && enabledCategories.has(category.id) ? " active" : ""}" data-filter-category="${category.id}" type="button">
        ${category.label}
      </button>
    `)
  ].join("");

  filterCityList.innerHTML = [
    `<button class="filter-option${!activeCityFilter ? " active" : ""}" data-filter-city="all" type="button">All Cities</button>`,
    ...cityFilters.map((city) => `
      <button class="filter-option${activeCityFilter === city ? " active" : ""}" data-filter-city="${city}" type="button">
        ${city}
      </button>
    `)
  ].join("");
}

function renderSelected() {
  if (!selectedLocation) return;
  const category = categoryFor(selectedLocation.category);
  const media = mediaForLocation(selectedLocation);
  selectedImageIndex = clamp(selectedImageIndex, 0, media.length - 1);
  selectedTitle.textContent = selectedLocation.name;
  selectedPlace.textContent = selectedLocation.place;
  selectedDescription.textContent = `${selectedLocation.description} ${selectedLocation.source ? `Reference: ${selectedLocation.source}.` : ""}`;
  selectedBadge.style.setProperty("--accent", category.color);
  selectedBadge.innerHTML = svg(category.icon);
  selectedMedia.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.3)), url("${media[selectedImageIndex]}")`;
  selectedImageCount.textContent = `${selectedImageIndex + 1} / ${media.length}`;
}

function mediaForLocation(location) {
  const pools = {
    camp: [
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=720&q=80",
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=720&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=720&q=80"
    ],
    hiking: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=720&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=720&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=720&q=80"
    ],
    park: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=720&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=720&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=720&q=80"
    ],
    bbq: [
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=720&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=720&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=720&q=80"
    ],
    other: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=720&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=720&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=720&q=80"
    ]
  };
  return pools[location.category] || pools.other;
}

function changeSelectedImage(direction) {
  if (!selectedLocation) return;
  const media = mediaForLocation(selectedLocation);
  selectedImageIndex = (selectedImageIndex + direction + media.length) % media.length;
  renderSelected();
}

function renderMarkers() {
  const markerHtml = visibleLocations().map((location) => {
    const category = categoryFor(location.category);
    const selected = location.id === selectedLocation?.id ? " selected" : "";
    return `<button class="marker${selected}" style="--accent:${category.color}" data-location="${location.id}" type="button" title="${location.name}" aria-label="${location.name}">${svg(category.icon)}</button>`;
  }).join("");
  const labelHtml = emirateLabels.map((label) => `<span class="label" data-label="${label.name}">${label.name}</span>`).join("");
  markerLayer.innerHTML = markerHtml + labelHtml;
  updateMarkerPositions();
}

function updateMarkerPositions() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  for (const button of markerLayer.querySelectorAll(".marker")) {
    const location = locations.find((item) => item.id === button.dataset.location);
    const point = scenePointForLocation(location);
    const projected = projectPoint(point.x, point.y, point.z, width, height);
    button.style.left = `${projected.x}px`;
    button.style.top = `${projected.y}px`;
    button.style.display = projected.visible ? "grid" : "none";
  }
  for (const label of markerLayer.querySelectorAll(".label")) {
    const info = emirateLabels.find((item) => item.name === label.dataset.label);
    const point = scenePointForLocation(info);
    const projected = projectPoint(point.x, point.y, point.z, width, height);
    label.style.left = `${projected.x}px`;
    label.style.top = `${projected.y - 42}px`;
    label.style.display = projected.visible ? "block" : "none";
  }
}

function selectLocation(locationId) {
  const location = locations.find((item) => item.id === locationId);
  if (!location) return;
  selectedLocation = location;
  selectedImageIndex = 0;
  selectedCategory = location.category;
  if (!enabledCategories.has(location.category)) enabledCategories.add(location.category);
  if (activeCityFilter && cityForLocation(location) !== activeCityFilter) activeCityFilter = null;
  renderCategories();
  renderFilterPanel();
  renderSelected();
  renderMarkers();
  showSelectedPanel();
  updateWeatherForLocation(location);
}

function showSelectedPanel() {
  selectedPanel.classList.remove("closed");
  selectedPanel.setAttribute("aria-hidden", "false");
}

function closeSelectedPanel(clearSelection = false) {
  if (clearSelection) {
    selectedLocation = null;
    renderCategories();
    renderMarkers();
    resetWeatherIdle();
  }
  selectedPanel.classList.add("closed");
  selectedPanel.setAttribute("aria-hidden", "true");
}

function resetWeatherIdle() {
  weatherRequestId++;
  weatherPanel.classList.remove("ready", "loading", "error");
  weatherLoader.classList.remove("hidden");
  weatherLoaderText.textContent = "Select location for current weather";
  weatherLocation.textContent = "Select a location";
  weatherTemp.textContent = "-- degC";
  weatherSummary.textContent = "Waiting";
  weatherHumidity.textContent = "--";
  weatherWind.textContent = "--";
  weatherVisibility.textContent = "--";
  weatherUpdated.textContent = "Live weather loads when you click a location.";
  forecast.innerHTML = Array.from({ length: 5 }, () => "<div><span>--</span><b>--</b></div>").join("");
}

function setWeatherLoading(location) {
  weatherPanel.classList.add("loading");
  weatherPanel.classList.remove("ready", "error");
  weatherLoader.classList.remove("hidden");
  weatherLoaderText.textContent = "Loading live location weather";
  weatherLocation.textContent = location.name;
  weatherTemp.textContent = "-- degC";
  weatherSummary.textContent = "Loading";
  weatherHumidity.textContent = "--";
  weatherWind.textContent = "--";
  weatherVisibility.textContent = "--";
  weatherUpdated.textContent = `Fetching current weather for ${location.place}...`;
  forecast.innerHTML = Array.from({ length: 5 }, () => "<div><span>--</span><b>--</b></div>").join("");
}

async function updateWeatherForLocation(location) {
  const requestId = ++weatherRequestId;
  setWeatherLoading(location);

  try {
    const resolved = await resolveWeatherCoordinates(location);
    const params = new URLSearchParams({
      latitude: resolved.latitude,
      longitude: resolved.longitude,
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m,visibility",
      daily: "weather_code,temperature_2m_max,temperature_2m_min",
      forecast_days: "5",
      timezone: "auto",
      temperature_unit: "celsius",
      wind_speed_unit: "kmh",
      precipitation_unit: "mm"
    });
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error("Weather request failed");
    const weather = await response.json();
    const payload = { location, resolved, weather };
    renderWeather(payload, requestId);
  } catch (error) {
    if (requestId !== weatherRequestId) return;
    weatherPanel.classList.remove("loading");
    weatherPanel.classList.add("error");
    weatherLoader.classList.add("hidden");
    weatherSummary.textContent = "Unavailable";
    weatherUpdated.textContent = "Live weather could not be loaded. Check your internet connection and try another location.";
    showToast("Weather lookup failed");
  }
}

async function resolveWeatherCoordinates(location) {
  const queryParts = [
    `${location.name} ${location.place}`,
    location.name,
    location.place
  ];

  for (const query of queryParts) {
    const result = await geocodeUaePlace(query);
    if (result) return result;
  }

  const fallbackText = `${location.name} ${location.place}`;
  const fallback = emirateWeatherFallbacks.find((item) => item.match.test(fallbackText));
  if (fallback) return { ...fallback, fallback: true };
  return { name: "United Arab Emirates", latitude: 24.4539, longitude: 54.3773, fallback: true };
}

async function geocodeUaePlace(query) {
  const params = new URLSearchParams({
    name: query,
    count: "1",
    language: "en",
    format: "json",
    countryCode: "AE"
  });
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
  if (!response.ok) return null;
  const data = await response.json();
  const result = data.results && data.results[0];
  if (!result) return null;
  return {
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    admin1: result.admin1,
    country: result.country
  };
}

function renderWeather(payload, requestId) {
  if (requestId !== weatherRequestId) return;
  const { location, resolved, weather } = payload;
  const current = weather.current || {};
  const units = weather.current_units || {};
  const summary = weatherCodeText[current.weather_code] || "Current";
  const temperature = Math.round(current.temperature_2m);
  const apparent = Math.round(current.apparent_temperature);
  const wind = Math.round(current.wind_speed_10m);
  const gust = Math.round(current.wind_gusts_10m || current.wind_speed_10m);
  const visibilityKm = Number.isFinite(current.visibility) ? Math.round(current.visibility / 100) / 10 : null;
  const time = current.time ? new Date(current.time).toLocaleString([], { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" }) : "now";
  const resolvedName = [resolved.name, resolved.admin1].filter(Boolean).join(", ");

  weatherPanel.classList.remove("loading");
  weatherPanel.classList.add("ready");
  weatherLoader.classList.add("hidden");
  weatherIcon.classList.toggle("night", current.is_day === 0);
  weatherIcon.classList.toggle("cloudy", current.weather_code >= 2);
  weatherIcon.classList.toggle("rainy", current.weather_code >= 51);
  weatherLocation.textContent = `${location.name} - ${location.place}`;
  weatherTemp.textContent = `${temperature} ${units.temperature_2m || "degC"}`;
  weatherSummary.textContent = `${summary} / feels ${apparent} degC`;
  weatherHumidity.textContent = `${current.relative_humidity_2m}${units.relative_humidity_2m || "%"}`;
  weatherWind.textContent = `${wind} ${units.wind_speed_10m || "km/h"} / gust ${gust}`;
  weatherVisibility.textContent = visibilityKm ? `${visibilityKm} km` : "--";
  weatherUpdated.textContent = `Updated ${time} from ${resolvedName || "Open-Meteo"}`;
  renderForecast(weather.daily);
}

function renderForecast(daily) {
  if (!daily || !daily.time) return;
  forecast.innerHTML = daily.time.map((date, index) => {
    const day = new Date(`${date}T12:00:00`).toLocaleDateString([], { weekday: "short" });
    const high = Math.round(daily.temperature_2m_max[index]);
    const low = Math.round(daily.temperature_2m_min[index]);
    return `<div><span>${day}</span><b>${high}/${low}</b></div>`;
  }).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function initCompass() {
  const ticks = [];
  for (let i = -24; i <= 24; i++) {
    const direction = compassDirections[(i % compassDirections.length + compassDirections.length) % compassDirections.length];
    const major = i % 2 === 0;
    ticks.push(`
      <span class="compass-tick${major ? " major" : ""}" style="--i:${i}">
        <b>${direction}</b>
      </span>
    `);
  }
  compassTape.innerHTML = ticks.join("");
  updateCompass();
}

function updateCompass() {
  if (!compassTape) return;
  const heading = ((-yaw * 180 / Math.PI) % 360 + 360) % 360;
  const step = 52;
  compassTape.style.transform = `translateX(${(heading / 45) * step}px)`;
  const nearest = Math.round(heading / 45) % compassDirections.length;
  compassHeading.textContent = compassDirections[nearest];
}

function initUI() {
  setMapLoading(true);
  initCompass();
  renderStats();
  renderCategories();
  renderFilterPanel();
  renderMarkers();
  resetWeatherIdle();

  categoryList.addEventListener("click", (event) => {
    const siteButton = event.target.closest("[data-location]");
    if (siteButton) {
      selectLocation(siteButton.dataset.location);
      showToast(siteButton.querySelector("span").textContent);
      return;
    }
    const button = event.target.closest("[data-category]");
    if (!button) return;
    const categoryId = button.dataset.category;
    expandedCategory = expandedCategory === categoryId ? null : categoryId;
    selectedCategory = categoryId;
    renderCategories();
    renderFilterPanel();
    showToast(expandedCategory === categoryId ? `${categoryFor(categoryId).label} list opened` : `${categoryFor(categoryId).label} list closed`);
  });

  viewAllCategories.addEventListener("click", () => {
    enabledCategories = new Set(categories.map((category) => category.id));
    activeCityFilter = null;
    renderCategories();
    renderFilterPanel();
    renderMarkers();
    showToast("All categories visible");
  });

  markerLayer.addEventListener("click", (event) => {
    const marker = event.target.closest("[data-location]");
    if (!marker) return;
    selectLocation(marker.dataset.location);
  });

  selectedPrev.addEventListener("click", () => changeSelectedImage(-1));
  selectedNext.addEventListener("click", () => changeSelectedImage(1));

  document.querySelectorAll(".view-button").forEach((button) => {
    button.addEventListener("click", () => {
      const nextView = button.dataset.view;
      if (nextView === activeView) return;
      if (activeView === "3d") {
        saved3dCamera = { yaw: 0, pitch, zoom, panX, panY };
      }
      activeView = nextView;
      document.querySelectorAll(".view-button").forEach((item) => item.classList.toggle("active", item === button));
      if (activeView === "3d") {
        yaw = 0;
        pitch = saved3dCamera.pitch;
        zoom = saved3dCamera.zoom;
        panX = saved3dCamera.panX;
        panY = saved3dCamera.panY;
      }
      if (activeView === "satellite") {
        yaw = 0;
        pitch = -Math.PI / 2;
        zoom = 1.18;
        panX = 0;
        panY = 0;
      }
      refreshTerrainForView();
      updateCompass();
      showToast(`${button.textContent.trim()} view active`);
    });
  });

  searchToggle.addEventListener("click", () => {
    searchPanel.classList.toggle("hidden");
    filterPanel.classList.add("hidden");
    if (!searchPanel.classList.contains("hidden")) searchInput.focus();
  });

  searchPanel.addEventListener("submit", (event) => {
    event.preventDefault();
    runSearch();
  });

  searchInput.addEventListener("input", runSearch);

  searchResults.addEventListener("click", (event) => {
    const result = event.target.closest("[data-location]");
    if (result) {
      selectLocation(result.dataset.location);
      searchPanel.classList.add("hidden");
    }
  });

  fullscreenButton.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      showToast("Fullscreen mode enabled");
    } else {
      await document.exitFullscreen();
      showToast("Fullscreen mode closed");
    }
  });

  focusButton.addEventListener("click", () => {
    filterPanel.classList.toggle("hidden");
    searchPanel.classList.add("hidden");
  });

  filterPanel.addEventListener("click", (event) => {
    const clearButton = event.target.closest("[data-filter-clear]");
    if (clearButton) {
      enabledCategories = new Set(categories.map((category) => category.id));
      activeCityFilter = null;
      selectedCategory = null;
      renderCategories();
      renderFilterPanel();
      renderMarkers();
      showToast("All locations visible");
      return;
    }

    const categoryButton = event.target.closest("[data-filter-category]");
    if (categoryButton) {
      const categoryId = categoryButton.dataset.filterCategory;
      enabledCategories = categoryId === "all" ? new Set(categories.map((category) => category.id)) : new Set([categoryId]);
      selectedCategory = categoryId === "all" ? null : categoryId;
      if (selectedLocation && !enabledCategories.has(selectedLocation.category)) closeSelectedPanel(true);
      renderCategories();
      renderFilterPanel();
      renderMarkers();
      showToast(categoryId === "all" ? "All categories visible" : `${categoryFor(categoryId).label} isolated`);
      return;
    }

    const cityButton = event.target.closest("[data-filter-city]");
    if (cityButton) {
      activeCityFilter = cityButton.dataset.filterCity === "all" ? null : cityButton.dataset.filterCity;
      if (selectedLocation && activeCityFilter && cityForLocation(selectedLocation) !== activeCityFilter) closeSelectedPanel(true);
      renderFilterPanel();
      renderMarkers();
      showToast(activeCityFilter ? `${activeCityFilter} locations visible` : "All cities visible");
    }
  });

  document.addEventListener("pointerdown", (event) => {
    const clickedSearch = searchPanel.contains(event.target) || searchToggle.contains(event.target);
    const clickedFilter = filterPanel.contains(event.target) || focusButton.contains(event.target);
    const clickedCategoryPanel = categoryList.contains(event.target) || viewAllCategories.contains(event.target);
    if (!clickedSearch) searchPanel.classList.add("hidden");
    if (!clickedFilter) filterPanel.classList.add("hidden");
    if (!clickedCategoryPanel && selectedCategory) {
      selectedCategory = null;
      renderCategories();
      renderFilterPanel();
    }
    const clickedLocation = event.target.closest("[data-location]");
    const clickedSelectedPanel = selectedPanel.contains(event.target);
    const clickedDetails = detailsButton.contains(event.target);
    if (selectedLocation && !clickedLocation && !clickedSelectedPanel && !clickedDetails) {
      closeSelectedPanel(true);
    }
  });

  detailsButton.addEventListener("click", () => {
    if (!selectedLocation) return;
    const query = encodeURIComponent(`${selectedLocation.name} ${selectedLocation.place}`);
    window.open(`https://www.google.com/search?q=${query}`, "_blank", "noopener,noreferrer");
  });
}

function runSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    searchResults.innerHTML = "";
    return;
  }
  const matches = locations.filter((location) => {
    const category = categoryFor(location.category);
    return `${location.name} ${location.place} ${location.description} ${category.label}`.toLowerCase().includes(query);
  }).slice(0, 5);
  searchResults.innerHTML = matches.length
    ? matches.map((location) => `<button class="search-result" data-location="${location.id}" type="button">${location.name}<br><small>${location.place}</small></button>`).join("")
    : '<div class="search-result">No local MVP match yet.</div>';
}

function initWebGL() {
  gl = canvas.getContext("webgl", { antialias: true, alpha: true });
  if (!gl) {
    setMapLoading(false);
    showToast("WebGL is not available in this browser.");
    return false;
  }
  uintIndexExtension = gl.getExtension("OES_element_index_uint");
  normalMapSupported = Boolean(gl.getExtension("OES_standard_derivatives"));

  const vertexShader = compileShader(gl.VERTEX_SHADER, `
    attribute vec3 aPosition;
    attribute vec3 aColor;
    attribute float aGlow;
    uniform mat4 uMvp;
    varying vec3 vColor;
    varying float vGlow;
    void main() {
      gl_Position = uMvp * vec4(aPosition, 1.0);
      vColor = aColor;
      vGlow = aGlow;
    }
  `);

  const fragmentShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    varying vec3 vColor;
    varying float vGlow;
    void main() {
      vec3 glow = vec3(0.0, 0.75, 1.0) * vGlow;
      gl_FragColor = vec4(vColor + glow, 1.0);
    }
  `);

  program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program));
  }

  glbProgram = createProgram(`
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aTexcoord;
    uniform mat4 uMvp;
    uniform mat4 uNode;
    varying vec3 vNormal;
    varying vec2 vTexcoord;
    varying vec3 vWorldPosition;
    varying float vHeight;
    void main() {
      vec4 world = uNode * vec4(aPosition, 1.0);
      gl_Position = uMvp * world;
      vNormal = mat3(uNode) * aNormal;
      vTexcoord = aTexcoord;
      vWorldPosition = world.xyz;
      vHeight = world.y;
    }
  `, `
    ${normalMapSupported ? "#extension GL_OES_standard_derivatives : enable" : ""}
    precision mediump float;
    uniform sampler2D uTexture;
    uniform sampler2D uNormalTexture;
    uniform vec4 uBaseColor;
    uniform int uUseTexture;
    uniform int uUseNormalTexture;
    uniform int uViewMode;
    varying vec3 vNormal;
    varying vec2 vTexcoord;
    varying vec3 vWorldPosition;
    varying float vHeight;
    ${normalMapSupported ? `
    vec3 normalFromMap(vec3 normal) {
      vec3 mapNormal = texture2D(uNormalTexture, vTexcoord).xyz * 2.0 - 1.0;
      vec3 q1 = dFdx(vWorldPosition);
      vec3 q2 = dFdy(vWorldPosition);
      vec2 st1 = dFdx(vTexcoord);
      vec2 st2 = dFdy(vTexcoord);
      vec3 tangent = normalize(q1 * st2.t - q2 * st1.t);
      vec3 bitangent = normalize(-q1 * st2.s + q2 * st1.s);
      return normalize(mat3(tangent, bitangent, normal) * mapNormal);
    }
    ` : ""}
    void main() {
      vec3 normal = normalize(vNormal);
      ${normalMapSupported ? "if (uUseNormalTexture == 1) normal = normalFromMap(normal);" : ""}
      vec3 lightA = normalize(vec3(-0.45, 0.82, 0.35));
      vec3 lightB = normalize(vec3(0.65, 0.35, -0.45));
      float shade = 0.72 + max(dot(normal, lightA), 0.0) * 0.36 + max(dot(normal, lightB), 0.0) * 0.18;
      vec4 tex = texture2D(uTexture, vTexcoord);
      vec4 base = uUseTexture == 1 ? tex : uBaseColor;
      vec3 color = base.rgb * shade + vec3(0.04, 0.035, 0.025);
      if (uViewMode == 1) {
        color = mix(color, vec3(0.74, 0.68, 0.58), 0.06);
      } else if (uViewMode == 2) {
        color = mix(color, vec3(0.62, 0.5, 0.32), 0.12);
      }
      if (uViewMode == 0) {
        color += vec3(0.0, 0.55, 0.74) * smoothstep(0.35, 0.72, vHeight) * 0.18;
      }
      gl_FragColor = vec4(min(color, vec3(1.0)), base.a);
    }
  `);

  glbTexture = createSolidTexture([196, 166, 110, 255]);

  mesh = buildTerrainMesh();
  buffers = {
    position: gl.createBuffer(),
    color: gl.createBuffer(),
    glow: gl.createBuffer(),
    index: gl.createBuffer()
  };

  uploadTerrainMesh();

  window.addEventListener("resize", resize);
  if ("ResizeObserver" in window) {
    const canvasObserver = new ResizeObserver(() => resize());
    canvasObserver.observe(canvas);
  }
  forceCanvasResize();
  loadMapAssets();
  return true;
}

function forceCanvasResize() {
  resize();
  requestAnimationFrame(resize);
  window.setTimeout(resize, 80);
  window.setTimeout(resize, 240);
}

async function loadMapAssets() {
  setMapLoading(true);
  showToast("Loading local UAE GLB model...");
  try {
    const loaded = await loadGlbModel("uae-map.glb");
    if (loaded) return;
    const boundaryLoaded = await loadGeoBoundary("uae-boundary-simplified.json");
    if (boundaryLoaded) return;
  } catch (error) {
    console.warn("Map loading failed", error);
  }

  glbModel = null;
  geoBoundary = null;
  renderMarkers();
  setMapLoading(false);
  forceCanvasResize();
  showToast("Using simplified local terrain.");
}

function uploadTerrainMesh() {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.positions, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.colors, gl.DYNAMIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.glow);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.glows, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);
}

async function loadGeoBoundary(url) {
  try {
    const response = await fetchWithTimeout(url, {}, 15000);
    if (!response.ok) throw new Error(`Could not load ${url}`);
    geoBoundary = await response.json();
    mapBounds = {
      west: geoBoundary.bounds[0],
      south: geoBoundary.bounds[1],
      east: geoBoundary.bounds[2],
      north: geoBoundary.bounds[3]
    };
    geoPolygons = prepareGeoPolygons(geoBoundary.polygons);
    glbModel = null;
    mesh = buildTerrainMesh();
    uploadTerrainMesh();
    renderMarkers();
    setMapLoading(false);
    forceCanvasResize();
    showToast("Accurate UAE boundary map loaded");
    return true;
  } catch (error) {
    console.warn(error);
    showToast("Could not load boundary fallback.");
    return false;
  }
}

function createProgram(vertexSource, fragmentSource) {
  const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(shaderProgram));
  }
  return shaderProgram;
}

function createSolidTexture(rgba) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(rgba));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return texture;
}

async function loadGlbModel(url) {
  try {
    const response = await fetchWithTimeout(url, {}, 90000);
    if (!response.ok) throw new Error(`Could not load ${url}`);
    const arrayBuffer = await response.arrayBuffer();
    const parsed = parseGlb(arrayBuffer);
    const loaded = createGlbModel(parsed);
    if (!loaded.primitives.length) throw new Error("No renderable GLB primitives found");
    glbModel = loaded;
    nodeMatrix = loaded.nodeMatrix;
    loadGlbTextures(parsed).catch((textureError) => console.warn("GLB textures could not be loaded", textureError));
    renderMarkers();
    updateMarkerPositions();
    setMapLoading(false);
    forceCanvasResize();
    showToast("High-detail UAE GLB model loaded");
    return true;
  } catch (error) {
    console.warn(error);
    glbModel = null;
    showToast("Trying fallback UAE boundary map...");
    return false;
  }
}

function parseGlb(arrayBuffer) {
  const header = new DataView(arrayBuffer, 0, 12);
  if (String.fromCharCode(...new Uint8Array(arrayBuffer, 0, 4)) !== "glTF") {
    throw new Error("Invalid GLB file");
  }
  let offset = 12;
  let json = null;
  let binStart = 0;
  while (offset < arrayBuffer.byteLength) {
    const view = new DataView(arrayBuffer, offset, 8);
    const length = view.getUint32(0, true);
    const type = String.fromCharCode(...new Uint8Array(arrayBuffer, offset + 4, 4));
    if (type === "JSON") {
      json = JSON.parse(new TextDecoder().decode(new Uint8Array(arrayBuffer, offset + 8, length)));
    }
    if (type === "BIN\u0000") {
      binStart = offset + 8;
    }
    offset += 8 + length;
  }
  if (!json || !binStart) throw new Error("GLB is missing JSON or BIN chunks");
  return { json, arrayBuffer, binStart };
}

function createGlbModel(parsed) {
  const { json } = parsed;
  const node = json.nodes?.find((item) => item.mesh !== undefined) || json.nodes?.[0] || {};
  const sourceMesh = json.meshes?.[node.mesh ?? 0];
  const primitives = [];
  for (const primitive of sourceMesh?.primitives || []) {
    const position = createAttributeBuffer(parsed, primitive.attributes.POSITION);
    const normal = createAttributeBuffer(parsed, primitive.attributes.NORMAL);
    const texcoord = createAttributeBuffer(parsed, primitive.attributes.TEXCOORD_0);
    const indices = createIndexBuffer(parsed, primitive.indices);
    if (!position || !normal || !texcoord || !indices) continue;
    const material = json.materials?.[primitive.material] || {};
    const color = material.pbrMetallicRoughness?.baseColorFactor || [0.62, 0.52, 0.38, 1];
    const textureIndex = material.pbrMetallicRoughness?.baseColorTexture?.index;
    const normalTextureIndex = material.normalTexture?.index;
    primitives.push({ position, normal, texcoord, indices, color, textureIndex, normalTextureIndex });
  }

  return {
    primitives,
    nodeMatrix: node.matrix || composeNodeMatrix(node)
  };
}

function createAttributeBuffer(parsed, accessorIndex) {
  if (accessorIndex === undefined) return null;
  const accessor = parsed.json.accessors[accessorIndex];
  const array = accessorArray(parsed, accessorIndex);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
  return {
    buffer,
    size: componentCount(accessor.type),
    type: accessor.componentType,
    normalized: Boolean(accessor.normalized),
    stride: parsed.json.bufferViews[accessor.bufferView].byteStride || 0,
    offset: 0
  };
}

function createIndexBuffer(parsed, accessorIndex) {
  if (accessorIndex === undefined) return null;
  const accessor = parsed.json.accessors[accessorIndex];
  if (accessor.componentType === gl.UNSIGNED_INT && !uintIndexExtension) {
    throw new Error("This browser/GPU does not support uint32 GLB indices");
  }
  const array = accessorArray(parsed, accessorIndex);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, gl.STATIC_DRAW);
  return {
    buffer,
    count: accessor.count,
    type: accessor.componentType,
    offset: 0
  };
}

function accessorArray(parsed, accessorIndex) {
  const accessor = parsed.json.accessors[accessorIndex];
  const bufferView = parsed.json.bufferViews[accessor.bufferView];
  const byteOffset = parsed.binStart + (bufferView.byteOffset || 0) + (accessor.byteOffset || 0);
  const count = accessor.count * componentCount(accessor.type);
  const ArrayType = typedArrayForComponent(accessor.componentType);
  return new ArrayType(parsed.arrayBuffer, byteOffset, count);
}

function typedArrayForComponent(componentType) {
  if (componentType === 5126) return Float32Array;
  if (componentType === 5125) return Uint32Array;
  if (componentType === 5123) return Uint16Array;
  if (componentType === 5121) return Uint8Array;
  throw new Error(`Unsupported GLB component type ${componentType}`);
}

function componentCount(type) {
  if (type === "SCALAR") return 1;
  if (type === "VEC2") return 2;
  if (type === "VEC3") return 3;
  if (type === "VEC4") return 4;
  if (type === "MAT4") return 16;
  throw new Error(`Unsupported GLB accessor type ${type}`);
}

async function loadGlbTextures(parsed) {
  glbTextures = new Map();
  const textures = parsed.json.textures || [];
  await Promise.all(textures.map(async (textureInfo, textureIndex) => {
    const image = parsed.json.images?.[textureInfo.source];
    if (!image || image.bufferView === undefined) return;
    const texture = await createTextureFromGlbImage(parsed, image);
    glbTextures.set(textureIndex, texture);
  }));
}

async function createTextureFromGlbImage(parsed, image) {
  const view = parsed.json.bufferViews[image.bufferView];
  const start = parsed.binStart + (view.byteOffset || 0);
  const blob = new Blob([parsed.arrayBuffer.slice(start, start + view.byteLength)], { type: image.mimeType || "image/png" });
  const bitmap = await createImageBitmap(blob);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);
  const powerOfTwo = isPowerOfTwo(bitmap.width) && isPowerOfTwo(bitmap.height);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, powerOfTwo ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, powerOfTwo ? gl.REPEAT : gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, powerOfTwo ? gl.REPEAT : gl.CLAMP_TO_EDGE);
  if (powerOfTwo) gl.generateMipmap(gl.TEXTURE_2D);
  return texture;
}

function isPowerOfTwo(value) {
  return value > 0 && (value & (value - 1)) === 0;
}

function composeNodeMatrix(node) {
  const translationValue = node.translation || [0, 0, 0];
  const rotationValue = node.rotation || [0, 0, 0, 1];
  const scaleValue = node.scale || [1, 1, 1];
  return multiply(translation(translationValue[0], translationValue[1], translationValue[2]), multiply(quaternionMatrix(rotationValue), scale(scaleValue[0], scaleValue[1], scaleValue[2])));
}

function quaternionMatrix(q) {
  const [x, y, z, w] = q;
  const x2 = x + x;
  const y2 = y + y;
  const z2 = z + z;
  const xx = x * x2;
  const xy = x * y2;
  const xz = x * z2;
  const yy = y * y2;
  const yz = y * z2;
  const zz = z * z2;
  const wx = w * x2;
  const wy = w * y2;
  const wz = w * z2;
  return [
    1 - (yy + zz), xy + wz, xz - wy, 0,
    xy - wz, 1 - (xx + zz), yz + wx, 0,
    xz + wy, yz - wx, 1 - (xx + yy), 0,
    0, 0, 0, 1
  ];
}

function compileShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

function buildTerrainMesh() {
  const size = geoBoundary ? 420 : 118;
  const positions = [];
  const colors = [];
  const glows = [];
  const indices = [];
  const indexGrid = Array.from({ length: size + 1 }, () => Array(size + 1).fill(-1));
  for (let row = 0; row <= size; row++) {
    for (let col = 0; col <= size; col++) {
      let x;
      let z;
      let y;
      let lon;
      let lat;
      let inside;
      if (geoBoundary) {
        lon = mapBounds.west + (col / size) * (mapBounds.east - mapBounds.west);
        lat = mapBounds.south + (row / size) * (mapBounds.north - mapBounds.south);
        inside = insideGeoBoundary(lon, lat);
        const point = geoToScene(lon, lat);
        x = point.x;
        z = point.z;
        y = heightAtGeo(lon, lat);
      } else {
        x = -1.15 + (col / size) * 2.3;
        z = -0.86 + (row / size) * 1.9;
        inside = insideUaeShape(x, z);
        y = heightAt(x, z);
      }
      if (!inside) continue;
      indexGrid[row][col] = positions.length / 3;
      positions.push(x, y, z);
      const color = geoBoundary ? colorForGeoPoint(lon, lat, y) : colorForPoint(x, z, y);
      colors.push(color[0], color[1], color[2]);
      glows.push(geoBoundary ? cityGlowGeo(lon, lat) : cityGlow(x, z));
    }
  }

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const a = indexGrid[row][col];
      const b = indexGrid[row][col + 1];
      const c = indexGrid[row + 1][col];
      const d = indexGrid[row + 1][col + 1];
      if (a >= 0 && b >= 0 && c >= 0) indices.push(a, c, b);
      if (b >= 0 && c >= 0 && d >= 0) indices.push(b, c, d);
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    glows: new Float32Array(glows),
    indices: positions.length / 3 > 65535 ? new Uint32Array(indices) : new Uint16Array(indices)
  };
}

function prepareGeoPolygons(polygons) {
  return polygons.map((polygon) => {
    const rings = polygon.map((ring) => {
      const bounds = ring.reduce((box, point) => [
        Math.min(box[0], point[0]),
        Math.min(box[1], point[1]),
        Math.max(box[2], point[0]),
        Math.max(box[3], point[1])
      ], [Infinity, Infinity, -Infinity, -Infinity]);
      return { points: ring, bounds };
    });
    const bounds = rings.reduce((box, ring) => [
      Math.min(box[0], ring.bounds[0]),
      Math.min(box[1], ring.bounds[1]),
      Math.max(box[2], ring.bounds[2]),
      Math.max(box[3], ring.bounds[3])
    ], [Infinity, Infinity, -Infinity, -Infinity]);
    return { rings, bounds };
  });
}

function insideGeoBoundary(lon, lat) {
  if (!geoPolygons.length) return false;
  for (const polygon of geoPolygons) {
    if (lon < polygon.bounds[0] || lon > polygon.bounds[2] || lat < polygon.bounds[1] || lat > polygon.bounds[3]) continue;
    if (!polygon.rings.length || !pointInPolygon(lon, lat, polygon.rings[0].points)) continue;
    let inHole = false;
    for (let i = 1; i < polygon.rings.length; i++) {
      const ring = polygon.rings[i];
      if (lon < ring.bounds[0] || lon > ring.bounds[2] || lat < ring.bounds[1] || lat > ring.bounds[3]) continue;
      if (pointInPolygon(lon, lat, ring.points)) {
        inHole = true;
        break;
      }
    }
    if (!inHole) return true;
  }
  return false;
}

function geoToScene(lon, lat) {
  const nx = (lon - mapBounds.west) / (mapBounds.east - mapBounds.west);
  const nz = (lat - mapBounds.south) / (mapBounds.north - mapBounds.south);
  return {
    x: (nx - 0.5) * 2.55,
    z: (nz - 0.5) * 1.9
  };
}

function heightAtGeo(lon, lat) {
  const eastMountain = Math.exp(-Math.pow((lon - 56.05) * 2.7, 2)) * Math.exp(-Math.pow((lat - 24.9) * 1.4, 2));
  const jebelJais = Math.exp(-Math.pow((lon - 56.18) * 9.5, 2)) * Math.exp(-Math.pow((lat - 25.95) * 9.5, 2));
  const alAin = Math.exp(-Math.pow((lon - 55.78) * 6.8, 2)) * Math.exp(-Math.pow((lat - 24.08) * 6.6, 2));
  const desert = Math.exp(-Math.pow((lon - 53.4) * 1.3, 2)) * Math.exp(-Math.pow((lat - 23.2) * 1.9, 2));
  const ripples = Math.sin(lon * 18.0 + lat * 8.0) * 0.012 + Math.cos(lat * 20.0) * 0.01;
  return 0.025 + eastMountain * 0.26 + jebelJais * 0.34 + alAin * 0.12 + desert * 0.06 + ripples;
}

function colorForGeoPoint(lon, lat, y) {
  const nx = (lon - mapBounds.west) / (mapBounds.east - mapBounds.west);
  const nz = (lat - mapBounds.south) / (mapBounds.north - mapBounds.south);
  const mountains = Math.exp(-Math.pow((lon - 56.05) * 2.45, 2)) * Math.exp(-Math.pow((lat - 25.0) * 1.35, 2));
  const northUrban = cityGlowGeo(lon, lat);
  const mangrove = Math.exp(-Math.pow((lon - 54.8) * 4.6, 2)) * Math.exp(-Math.pow((lat - 24.58) * 8.5, 2));
  const coastBand = Math.exp(-Math.pow((lat - (24.72 + (lon - 54.2) * 0.33)) * 8.5, 2)) * Math.exp(-Math.pow((lon - 54.9) * 0.7, 2));
  const dunes = Math.sin(lon * 17.0 + lat * 8.0) * 0.035 + Math.sin(lon * 31.0 - lat * 3.0) * 0.022;
  let color = [
    0.74 + dunes + nz * 0.08,
    0.49 + dunes * 0.5 + nz * 0.04,
    0.27 + dunes * 0.25
  ];

  color = mixColor(color, [0.5, 0.42, 0.34], mountains * 0.62);
  color = mixColor(color, [0.24, 0.26, 0.25], northUrban * 0.72);
  color = mixColor(color, [0.04, 0.55, 0.62], Math.min(0.8, mangrove * 0.95 + coastBand * 0.42));
  color = mixColor(color, [0.9, 0.68, 0.43], Math.max(0, 0.45 - nx) * 0.18);

  if (activeView === "satellite") {
    color = mixColor(color, [0.09, 0.15, 0.17], 0.16);
  }

  return color.map((value) => clamp(value, 0.02, 0.98));
}

function mixColor(a, b, t) {
  const amount = clamp(t, 0, 1);
  return [
    a[0] * (1 - amount) + b[0] * amount,
    a[1] * (1 - amount) + b[1] * amount,
    a[2] * (1 - amount) + b[2] * amount
  ];
}

function cityGlowGeo(lon, lat) {
  const cities = [
    [55.2708, 25.2048, 1.2],
    [55.4209, 25.3463, 0.95],
    [55.9762, 25.8007, 0.7],
    [54.3773, 24.4539, 0.85],
    [55.8023, 24.1302, 0.55],
    [56.3265, 25.1288, 0.55]
  ];
  let glow = 0;
  for (const [cityLon, cityLat, power] of cities) {
    const d = Math.hypot((lon - cityLon) * 1.15, lat - cityLat);
    glow += Math.max(0, 1 - d * 7.5) * power;
  }
  return Math.min(0.9, glow * 0.38);
}

function insideUaeShape(x, z) {
  const coast = [
    [-1.08, -0.34], [-0.82, -0.5], [-0.55, -0.58], [-0.22, -0.63], [0.15, -0.72],
    [0.48, -0.68], [0.72, -0.52], [0.9, -0.24], [0.86, 0.06], [0.74, 0.33],
    [0.72, 0.66], [0.6, 0.86], [0.48, 0.57], [0.36, 0.36], [0.15, 0.13],
    [-0.1, -0.03], [-0.43, -0.09], [-0.78, -0.17], [-1.08, -0.34]
  ];
  return pointInPolygon(x, z, coast);
}

function pointInPolygon(x, z, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], zi = polygon[i][1];
    const xj = polygon[j][0], zj = polygon[j][1];
    const intersect = ((zi > z) !== (zj > z)) && (x < ((xj - xi) * (z - zi)) / (zj - zi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function heightAt(x, z) {
  const ridge = Math.exp(-Math.pow((x - 0.62) * 2.1, 2)) * Math.exp(-Math.pow((z - 0.02) * 1.2, 2));
  const south = Math.exp(-Math.pow((x + 0.1) * 1.5, 2)) * Math.exp(-Math.pow((z + 0.54) * 2.2, 2));
  const ripples = Math.sin(x * 13.0 + z * 5.0) * 0.025 + Math.cos(z * 17.0 - x * 3.0) * 0.02;
  return 0.03 + ridge * 0.34 + south * 0.12 + ripples;
}

function cityGlow(x, z) {
  const corridors = [
    [0.18, 0.14], [0.28, 0.28], [0.44, 0.46], [0.6, 0.62], [-0.38, -0.12], [0.75, -0.18]
  ];
  let glow = 0;
  for (const [cx, cz] of corridors) {
    const distance = Math.hypot(x - cx, z - cz);
    glow += Math.max(0, 1 - distance * 8);
  }
  return Math.min(0.55, glow * 0.18);
}

function colorForPoint(x, z, y) {
  if (activeView === "satellite") {
    const urban = cityGlow(x, z);
    return [0.04 + urban, 0.12 + urban * 0.75, 0.17 + urban * 0.2];
  }
  const sand = 0.45 + y * 0.9;
  return [sand, 0.34 + y * 0.46, 0.2 + y * 0.22];
}

function updateTerrainColors() {
  for (let i = 0; i < mesh.positions.length; i += 3) {
    const color = colorForPoint(mesh.positions[i], mesh.positions[i + 2], mesh.positions[i + 1]);
    mesh.colors[i] = color[0];
    mesh.colors[i + 1] = color[1];
    mesh.colors[i + 2] = color[2];
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.colors, gl.DYNAMIC_DRAW);
}

function refreshTerrainForView() {
  if (geoBoundary) {
    mesh = buildTerrainMesh();
    uploadTerrainMesh();
  } else {
    updateTerrainColors();
  }
}

function resize() {
  if (!gl) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  const cssWidth = rect.width || canvas.clientWidth || window.innerWidth;
  const cssHeight = rect.height || canvas.clientHeight || window.innerHeight;
  const width = Math.max(1, Math.floor(cssWidth * dpr));
  const height = Math.max(1, Math.floor(cssHeight * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  gl.viewport(0, 0, canvas.width, canvas.height);
  updateMarkerPositions();
}

function draw() {
  animationId = requestAnimationFrame(draw);
  gl.clearColor(0, 0, 0, 0);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const aspect = canvas.width / canvas.height;
  const projection = perspective(45 * Math.PI / 180, aspect, 0.1, 20);
  const view = multiply(translation(panX, panY, glbModel ? -5.6 : -4.2), multiply(rotationX(pitch), rotationY(yaw)));
  const model = glbModel
    ? scale((activeView === "3d" ? -1 : 1) * zoom * 0.34, zoom * 0.34, zoom * 0.34)
    : scale(zoom, 1, zoom);
  mvpMatrix = multiply(projection, multiply(view, model));

  if (mapIsLoading && !glbModel && !geoBoundary) {
    return;
  }

  if (glbModel) {
    drawGlbModel();
  } else {
    drawProceduralTerrain();
  }

  updateMarkerPositions();
}

function drawProceduralTerrain() {
  gl.useProgram(program);
  const positionLocation = gl.getAttribLocation(program, "aPosition");
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLocation);

  const colorLocation = gl.getAttribLocation(program, "aColor");
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colorLocation);

  const glowLocation = gl.getAttribLocation(program, "aGlow");
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.glow);
  gl.vertexAttribPointer(glowLocation, 1, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(glowLocation);

  gl.uniformMatrix4fv(gl.getUniformLocation(program, "uMvp"), false, new Float32Array(mvpMatrix));
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
  gl.drawElements(gl.TRIANGLES, mesh.indices.length, mesh.indices instanceof Uint32Array ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT, 0);
}

function drawGlbModel() {
  gl.useProgram(glbProgram);
  gl.disable(gl.CULL_FACE);
  gl.uniformMatrix4fv(gl.getUniformLocation(glbProgram, "uMvp"), false, new Float32Array(mvpMatrix));
  gl.uniformMatrix4fv(gl.getUniformLocation(glbProgram, "uNode"), false, new Float32Array(nodeMatrix));
  gl.uniform1i(gl.getUniformLocation(glbProgram, "uViewMode"), activeView === "satellite" ? 1 : 0);

  const positionLocation = gl.getAttribLocation(glbProgram, "aPosition");
  const normalLocation = gl.getAttribLocation(glbProgram, "aNormal");
  const texcoordLocation = gl.getAttribLocation(glbProgram, "aTexcoord");

  for (const primitive of glbModel.primitives) {
    bindGlbAttribute(positionLocation, primitive.position);
    bindGlbAttribute(normalLocation, primitive.normal);
    bindGlbAttribute(texcoordLocation, primitive.texcoord);
    const baseTexture = glbTextures.get(primitive.textureIndex) || glbTexture;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, baseTexture);
    gl.uniform1i(gl.getUniformLocation(glbProgram, "uTexture"), 0);
    const normalTexture = glbTextures.get(primitive.normalTextureIndex);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, normalTexture || glbTexture);
    gl.uniform1i(gl.getUniformLocation(glbProgram, "uNormalTexture"), 1);
    gl.uniform4fv(gl.getUniformLocation(glbProgram, "uBaseColor"), new Float32Array(primitive.color));
    gl.uniform1i(gl.getUniformLocation(glbProgram, "uUseTexture"), glbTextures.has(primitive.textureIndex) ? 1 : 0);
    gl.uniform1i(gl.getUniformLocation(glbProgram, "uUseNormalTexture"), normalMapSupported && normalTexture ? 1 : 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, primitive.indices.buffer);
    gl.drawElements(gl.TRIANGLES, primitive.indices.count, primitive.indices.type, primitive.indices.offset);
  }
}

function bindGlbAttribute(location, attribute) {
  if (location < 0 || !attribute) return;
  gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
  gl.vertexAttribPointer(location, attribute.size, attribute.type, attribute.normalized, attribute.stride, attribute.offset);
  gl.enableVertexAttribArray(location);
}

function scenePointForLocation(location) {
  if (glbModel) {
    const [lon, lat] = coordinatesForLocation(location);
    const nx = clamp((lon - glbGeoBounds.west) / (glbGeoBounds.east - glbGeoBounds.west), 0, 1);
    const nz = clamp((lat - glbGeoBounds.south) / (glbGeoBounds.north - glbGeoBounds.south), 0, 1);
    return {
      x: glbModelBounds.west + nx * (glbModelBounds.east - glbModelBounds.west),
      y: glbModelBounds.markerY,
      z: glbModelBounds.south + nz * (glbModelBounds.north - glbModelBounds.south)
    };
  }
  if (geoBoundary) {
    const [lon, lat] = coordinatesForLocation(location);
    const point = geoToScene(lon, lat);
    return { x: point.x, y: heightAtGeo(lon, lat) + 0.09, z: point.z };
  }
  if (!glbModel) {
    return { x: location.x, y: heightAt(location.x, location.z) + 0.08, z: location.z };
  }
}

function coordinatesForLocation(location) {
  if (locationCoordinates[location.id]) return locationCoordinates[location.id];
  const slug = (location.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (locationCoordinates[slug]) return locationCoordinates[slug];
  const text = `${location.id} ${location.name || ""} ${location.place || ""}`.toLowerCase();
  const rules = [
    [/hatta/, locationCoordinates.hatta],
    [/jebel jais|ras al khaimah|rak/, locationCoordinates["ras-al-khaimah"]],
    [/fujairah|kalba|khorfakkan|aqah|snoopy/, locationCoordinates.fujairah],
    [/al ain|jebel haf/, locationCoordinates["al-ain"]],
    [/liwa|dhafra|mirfa|sir bani/, [53.4, 23.7]],
    [/abu dhabi|yas|saadiyat|wathba|khaznah|jubail|reem|emarat|khalifa/, locationCoordinates["abu-dhabi"]],
    [/dubai|qudra|mamzar|mushrif|creek|zabeel|safa|quranic|palm|burj|future|shindagha|etihad|global|miracle|safari/, locationCoordinates.dubai],
    [/sharjah|mleiha|dhaid|majaz|noor|qasba|wasit|souk|archaeology|islamic/, locationCoordinates.sharjah],
    [/ajman|zorah/, locationCoordinates.ajman],
    [/umm al quwain|uaq|rafaah/, locationCoordinates["umm-al-quwain"]]
  ];
  const match = rules.find(([pattern]) => pattern.test(text));
  return match ? match[1] : [54.3773, 24.4539];
}

function initInput() {
  canvas.addEventListener("pointerdown", (event) => {
    pointerStart = { x: event.clientX, y: event.clientY };
    if (activeView !== "3d") return;
    dragging = true;
    dragMode = event.shiftKey ? "pan" : "rotate";
    lastPointer = { x: event.clientX, y: event.clientY };
    canvas.classList.add("dragging");
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!dragging || activeView !== "3d") return;
    const dx = event.clientX - lastPointer.x;
    const dy = event.clientY - lastPointer.y;
    lastPointer = { x: event.clientX, y: event.clientY };
    if (dragMode === "pan") {
      panX += dx / window.innerWidth * 2.2;
      panY -= dy / window.innerHeight * 2.2;
    } else {
      yaw += dx * 0.006;
      pitch = clamp(pitch + dy * 0.004, -Math.PI / 2, 1.34);
      updateCompass();
    }
  });

  canvas.addEventListener("pointerup", (event) => {
    const clickDistance = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
    if (dragging) {
      dragging = false;
      canvas.classList.remove("dragging");
      canvas.releasePointerCapture(event.pointerId);
    }
    if (clickDistance < 6) closeSelectedPanel(true);
  });

  canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    if (activeView !== "3d") return;
    zoom = clamp(zoom * (event.deltaY > 0 ? 0.94 : 1.06), 0.68, 1.7);
  }, { passive: false });

  window.addEventListener("keydown", (event) => {
    const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(event.target?.tagName) || event.target?.isContentEditable;
    if (typing && event.key !== "Escape") return;
    if (activeView === "3d") {
      const key = event.key.toLowerCase();
      const panStep = 0.045;
      if (key === "w") zoom = clamp(zoom * 1.06, 0.68, 1.9);
      if (key === "s") zoom = clamp(zoom * 0.94, 0.68, 1.9);
      if (key === "a") panX -= panStep;
      if (key === "d") panX += panStep;
    }
    if (event.key === "Escape") {
      searchPanel.classList.add("hidden");
      filterPanel.classList.add("hidden");
      closeSelectedPanel(true);
    }
  });
}

function projectPoint(x, y, z, width, height) {
  const vector = multiplyVec4(mvpMatrix, [x, y, z, 1]);
  if (vector[3] <= 0) return { x: 0, y: 0, visible: false };
  const ndcX = vector[0] / vector[3];
  const ndcY = vector[1] / vector[3];
  return {
    x: (ndcX * 0.5 + 0.5) * width,
    y: (-ndcY * 0.5 + 0.5) * height,
    visible: ndcX > -1.25 && ndcX < 1.25 && ndcY > -1.25 && ndcY < 1.25
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function identity() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

function multiply(a, b) {
  const out = new Array(16).fill(0);
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      for (let i = 0; i < 4; i++) out[col * 4 + row] += a[i * 4 + row] * b[col * 4 + i];
    }
  }
  return out;
}

function multiplyVec4(m, v) {
  return [
    m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12] * v[3],
    m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13] * v[3],
    m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14] * v[3],
    m[3] * v[0] + m[7] * v[1] + m[11] * v[2] + m[15] * v[3]
  ];
}

function perspective(fovy, aspect, near, far) {
  const f = 1 / Math.tan(fovy / 2);
  const rangeInv = 1 / (near - far);
  return [
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near + far) * rangeInv, -1,
    0, 0, near * far * rangeInv * 2, 0
  ];
}

function translation(x, y, z) {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
}

function rotationX(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
}

function rotationY(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
}

function scale(x, y, z) {
  return [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1];
}

initUI();
try {
  canvas.classList.add("active");
  if (initWebGL()) {
    initInput();
    draw();
  }
} catch (error) {
  console.error(error);
  setMapLoading(false);
  showToast("Map renderer could not start.");
}
