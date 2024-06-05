// Object with bilingual content
const content = {
  en: {
    pageTitle: "View Canadian Provinces Names",
    welcomeTitle: "Welcome to My Canada Web Page!",
    pageDescription: `<p>Canada is a beautiful country located in North America. It is known for its stunning landscapes,
  diverse culture, and friendly people. Whether you are exploring the bustling cities, hiking in the
  majestic Rocky Mountains, or experiencing the vibrant cultural festivals, Canada has something to offer
  for everyone.</p> <p>Get ready to discover the provinces and territories of Canada. Click on the "Provinces" link in the
  navigation bar to explore the names of Canadian provinces and click on the province name to learn a little about the province.</p>`,
    provincesTitle: "Canadian Provinces",
    homeMenu: "Home",
    provincesMenu: "Provinces",
    languageToggle: "Français"
  },
  fr: {
    pageTitle: "Voir les noms des provinces canadiennes",
    welcomeTitle: "Bienvenue sur la page Web Mon Canada!",
    pageDescription: `<p>Le Canada est un magnifique pays situé en Amérique du Nord. Il est connu pour ses paysages époustouflants,
  sa culture diversifiée et ses habitants chaleureux. Que vous exploriez les villes animées, fassiez de la randonnée
  dans les majestueuses Rocheuses ou participiez aux festivals culturels vibrants, le Canada a quelque chose à offrir
  à tous.</p><p>Préparez-vous à découvrir les provinces et territoires du Canada. Cliquez sur le lien "Provinces" dans la
  barre de navigation pour explorer les noms des provinces canadiennes et cliquez sur le nom de la province pour en savoir un peu plus sur celle-ci.</p>`,
    provincesTitle: "Provinces canadiennes",
    homeMenu: "Accueil",
    provincesMenu: "Provinces",
    languageToggle: "English"
  }
};

// Array of Canadian provinces (English version)
const provincesEn = [
  { name: "Alberta", details: "Alberta is known for its stunning Rocky Mountain scenery." },
  { name: "British Columbia", details: "British Columbia offers diverse landscapes, from mountains to coastal areas." },
  { name: "Manitoba", details: "Manitoba is known for its beautiful lakes and prairie landscapes." },
  { name: "New Brunswick", details: "New Brunswick is famous for its picturesque coastline and charming towns." },
  { name: "Newfoundland and Labrador", details: "Newfoundland and Labrador feature breathtaking coastal scenery." },
  { name: "Nova Scotia", details: "Nova Scotia is known for its historic sites, seafood, and scenic beauty." },
  { name: "Ontario", details: "Ontario is Canada's most populous province and home to the vibrant city of Toronto." },
  { name: "Prince Edward Island", details: "Prince Edward Island is famous for its red sand beaches and Anne of Green Gables." },
  { name: "Quebec", details: "Quebec is known for its French-speaking population and rich cultural heritage." },
  { name: "Saskatchewan", details: "Saskatchewan is characterized by its vast prairies and outdoor recreational opportunities." },
  { name: "Yukon", details: "Yukon offers stunning wilderness, including mountains and the famous Klondike Gold Rush region." }
];

// Array of Canadian provinces (French version)
const provincesFr = [
  { name: "Alberta", details: "L'Alberta est connue pour ses paysages époustouflants des Rocheuses." },
  { name: "British Columbia", details: "British Columbia offre des paysages variés, des montagnes aux régions côtières." },
  { name: "Manitoba", details: "Le Manitoba est connu pour ses magnifiques lacs et ses paysages de prairies." },
  { name: "New Brunswick", details: "Le New Brunswick est célèbre pour ses côtes pittoresques et ses charmantes villes." },
  { name: "Newfoundland and Labrador", details: "Le Newfoundland and Labrador offre des paysages côtiers à couper le souffle." },
  { name: "Nova Scotia", details: "Nova Scotia est connue pour ses sites historiques, ses fruits de mer et sa beauté pittoresque." },
  { name: "Ontario", details: "L'Ontario est la province la plus peuplée du Canada et abrite la vibrante ville de Toronto." },
  { name: "Prince Edward Island", details: "Le Prince Edward Island est célèbre pour ses plages de sable rouge et Anne aux pignons verts." },
  { name: "Quebec", details: "Le Québec est connu pour sa population francophone et son riche patrimoine culturel." },
  { name: "Saskatchewan", details: "La Saskatchewan est caractérisée par ses vastes prairies et ses opportunités de loisirs en plein air." },
  { name: "Yukon", details: "Le Yukon offre une nature sauvage époustouflante, des montagnes aux célèbres régions de ruée vers l'or du Klondike." }
];


// Variable to track the current language (English by default)
let currentLanguage = "en";

// Variable to track the currently selected province
let selectedProvince = null;

function toggleLanguage(language) {
  currentLanguage = language;

  // Updating all bilingual content
  const langContent = content[currentLanguage];
  document.getElementById("page-title").textContent = langContent.pageTitle;
  document.getElementById("welcome-title").textContent = langContent.welcomeTitle;
  document.getElementById("page-description").innerHTML = langContent.pageDescription;
  document.getElementById("provinces-title").textContent = langContent.provincesTitle;
  document.getElementById("home-menu").textContent = langContent.homeMenu;
  document.getElementById("provinces-menu").textContent = langContent.provincesMenu;
  document.getElementById("language-toggle").innerHTML = `
    <a href="#" onclick="toggleLanguage('${currentLanguage === 'en' ? 'fr' : 'en'}')">
      ${currentLanguage === 'en' ? 'Français' : 'English'}
    </a>
  `;

  // Re-rendering the province list with the updated language
  renderProvinceList();

  // If a province is currently selected, I update its details in the new language
  if (selectedProvince) {
    const provinces = currentLanguage === "en" ? provincesEn : provincesFr;
    const newSelectedProvince = provinces.find((province) => province.name === selectedProvince.name);
    showProvinceDetails(newSelectedProvince);
  }
}

function showHome() {
  document.getElementById("home").style.display = "block";
  document.getElementById("provinces").style.display = "none";
  selectedProvince = null; // Resetting the selected province when going back to the home page
}

function showProvinces() {
  document.getElementById("province-details").style.display = "none";
  document.getElementById("home").style.display = "none";
  document.getElementById("provinces").style.display = "block";
  renderProvinceList();

  // Updating the province details if a province is currently selected
  if (selectedProvince) {
    showProvinceDetails(selectedProvince);
  }
}

function renderProvinceList() {
  const provinceList = document.getElementById("province-list");
  provinceList.innerHTML = "";
  const provinces = currentLanguage === "en" ? provincesEn : provincesFr;
  provinces.forEach((province) => {
    const listItem = document.createElement("li");
    listItem.textContent = province.name;
    listItem.dataset.province = province.name; // Aa data attribute to identify the province
    listItem.addEventListener("click", () => {
      showProvinceDetails(province);
    });
    listItem.addEventListener("mouseover", () => {
      listItem.style.cursor = "pointer";
      listItem.style.textDecoration = "underline";
    });
    listItem.addEventListener("mouseout", () => {
      // Removing underline on mouseout unless it's the selected province
      if (selectedProvince && selectedProvince.name !== province.name) {
        listItem.style.textDecoration = "none";
      }
    });

    // Checking if the current province is the selected province, and underline it
    if (selectedProvince && selectedProvince.name === province.name) {
      listItem.style.textDecoration = "underline";
    }

    provinceList.appendChild(listItem);
  });
}

function showProvinceDetails(province) {
  selectedProvince = province;
  const provinceDetails = document.getElementById("province-details");
  if (selectedProvince) {
    provinceDetails.style.display = "block";
    provinceDetails.innerHTML = selectedProvince.details;
  } else {
    provinceDetails.style.display = "none";
  }

  // Updating the underline on the province list
  const provinceList = document.getElementById("province-list");
  const provinces = currentLanguage === "en" ? provincesEn : provincesFr;
  provinces.forEach((province) => {
    const listItem = provinceList.querySelector(`li[data-province="${province.name}"]`);
    if (listItem) {
      if (selectedProvince && selectedProvince.name === province.name) {
        listItem.style.textDecoration = "underline";
      } else {
        listItem.style.textDecoration = "none";
      }
    }
  });
}

// Setting the default content to English
toggleLanguage("en");


// Thank you for reading my project code, let's work togethe.
