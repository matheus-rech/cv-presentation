export interface Publication {
  citation: string;
  title: string;
  journal: string;
  year: string;
  volume: string;
  previewImage: string;
}

export interface AbstractPresentation {
  title: string;
  event: string;
  location: string;
  year: string;
  type: string;
}

export const defaultPublications: Publication[] = [
  {
    citation:
      "Rech MM, de Macedo Filho L, White AJ, et al. Machine learning models to forecast outcomes of pituitary surgery: systematic review. Brain Sciences. 2023;13(3):495.",
    title: "Machine learning models to forecast outcomes of pituitary surgery: systematic review",
    journal: "Brain Sciences",
    year: "2023",
    volume: "13(3):495",
    previewImage: "/lovable-uploads/ac39a80a-0286-4a02-862d-ba3e3b4f65b7.png",
  },
  {
    citation:
      "Rech MM, Ramos MB, Piva FE, et al. Publication trends of intrathecal baclofen therapy: bibliometric analysis. World Neurosurgery. 2024;181:e94-e106.",
    title: "Publication trends of intrathecal baclofen therapy: bibliometric analysis",
    journal: "World Neurosurgery",
    year: "2024",
    volume: "181:e94-e106",
    previewImage: "/lovable-uploads/ac39a80a-0286-4a02-862d-ba3e3b4f65b7.png",
  },
  {
    citation:
      "Rech MM, Corso LL, Dal Bó EF, et al. Development and validation of a machine learning model to predict mortality in cirrhosis with esophageal variceal bleeding. World Journal of Hepatology. Accepted 2025.",
    title:
      "Development and validation of a machine learning model to predict mortality in cirrhosis with esophageal variceal bleeding",
    journal: "World Journal of Hepatology",
    year: "2025",
    volume: "Accepted",
    previewImage: "/lovable-uploads/ac39a80a-0286-4a02-862d-ba3e3b4f65b7.png",
  },
  {
    citation:
      "Ramos MB, Rech MM, Dagostini CM, Britz JPE, Teixeira MJ, Figueiredo EG. Author Impact Factor as a metric in neurosurgery. World Neurosurgery. 2022;165:e74-e82.",
    title: "Author Impact Factor as a metric in neurosurgery",
    journal: "World Neurosurgery",
    year: "2022",
    volume: "165:e74-e82",
    previewImage: "/lovable-uploads/ac39a80a-0286-4a02-862d-ba3e3b4f65b7.png",
  },
  {
    citation:
      "Soldera J, Corso LL, Rech MM, et al. Predicting major adverse cardiovascular events after liver transplantation using supervised machine learning. World Journal of Hepatology. 2024;16(2):193-210.",
    title:
      "Predicting major adverse cardiovascular events after liver transplantation using supervised machine learning",
    journal: "World Journal of Hepatology",
    year: "2024",
    volume: "16(2):193-210",
    previewImage: "/lovable-uploads/ac39a80a-0286-4a02-862d-ba3e3b4f65b7.png",
  },
  {
    citation:
      "Ramos MB, Rech MM, Telles JPM, Moraes WM, Teixeira MJ, Figueiredo EG. Emergency neurological life support in literature: bibliometric study. Arquivos de Neuro-Psiquiatria. 2024;82(01):001-010.",
    title: "Emergency neurological life support in literature: bibliometric study",
    journal: "Arquivos de Neuro-Psiquiatria",
    year: "2024",
    volume: "82(01):001-010",
    previewImage: "/lovable-uploads/ac39a80a-0286-4a02-862d-ba3e3b4f65b7.png",
  },
];

// Focused publications for shorter resume versions
export const focusedPublications: Publication[] = [
  defaultPublications[0], // Machine learning pituitary surgery
  defaultPublications[1], // Baclofen therapy bibliometric
  defaultPublications[2], // Cirrhosis mortality prediction
];

export const defaultAbstracts: AbstractPresentation[] = [
  {
    title: "Interpretable Machine Learning Algorithms Applied to Outcome Prediction in Spine Surgery",
    event: "XXXI Young Researchers Meeting",
    location: "Caxias do Sul, Brazil",
    year: "2023",
    type: "Oral Presentation"
  },
  {
    title: "Publication Trends of Research on Intrathecal Baclofen Therapy",
    event: "XXXIV Brazilian Congress of Neurosurgery",
    location: "São Paulo, Brazil",
    year: "2023",
    type: "Poster"
  },
  {
    title: "Prospective Validation of a Neural Network Model for the Prediction of 1-Year Mortality in Cirrhotic Patients",
    event: "Digestive Disease Week (AASLD/AGA)",
    location: "Chicago, IL",
    year: "2023",
    type: "Oral Presentation"
  },
  {
    title: "Predicting Post-Liver Transplantation Major Adverse Cardiovascular Events Using a Machine Learning Algorithm",
    event: "Digestive Disease Week (AASLD/AGA)",
    location: "Chicago, IL",
    year: "2023",
    type: "Oral Presentation"
  },
  {
    title: "Knowledge, Attitudes and Behaviors Regarding the Use of Clinical Practice Guidelines Among Spine Surgeons in Latin America",
    event: "XXXIII Brazilian Congress of Neurosurgery",
    location: "João Pessoa, Brazil",
    year: "2022",
    type: "Oral Presentation"
  },
  {
    title: "Use of a Machine Learning Algorithm to Predict Rebleeding and Mortality for Esophageal Variceal Bleeding in Cirrhotic Patients",
    event: "XXIX Young Researchers Meeting",
    location: "Caxias do Sul, Brazil",
    year: "2021",
    type: "Oral Presentation"
  },
  {
    title: "Aerospace Medicine: History and Contemporary Relevance",
    event: "VII Gaucho Meeting of History of Medicine (online)",
    location: "",
    year: "2020",
    type: "Oral Presentation"
  },
  {
    title: "Innovation in the Academic Path: Medical Students' Scientific Initiation in Artificial Intelligence Projects",
    event: "58th Brazilian Congress of Medical Education (online)",
    location: "",
    year: "2020",
    type: "Poster"
  },
  {
    title: "Mathematical Model to Predict Mortality Rate Variations in Southeast Brazil Due to COVID-19",
    event: "XXVIII Young Researchers Meeting",
    location: "Caxias do Sul, Brazil",
    year: "2020",
    type: "Oral Presentation"
  }
];