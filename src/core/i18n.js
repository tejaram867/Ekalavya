import i18n from 'https://cdn.jsdelivr.net/npm/i18next/+esm';

const resources = {
  en: {
    translation: {
      "welcome": "Empowering the Next Scholar",
      "subtitle": "Access global scholarships, expert mentoring, and a vibrant student community all in one place.",
      "explore_scholarships": "Explore Scholarships",
      "join_mentor": "Join as Mentor",
      "nav": {
        "home": "Home",
        "scholarships": "Scholarships",
        "mentoring": "Mentoring",
        "peer_connect": "Peer Connect",
        "library": "Library",
        "ecosystem": "Ecosystem",
        "about": "About",
        "path": "Path",
        "team": "Team",
        "faq": "FAQ"
      }
    }
  },
  hi: {
    translation: {
      "welcome": "अगले विद्वान को सशक्त बनाना",
      "subtitle": "वैश्विक छात्रवृत्ति, विशेषज्ञ सलाह और एक जीवंत छात्र समुदाय तक एक ही स्थान पर पहुँचें।",
      "explore_scholarships": "छात्रवृत्ति खोजें",
      "join_mentor": "मेंटॉर के रूप में जुड़ें",
      "nav": {
        "home": "होम",
        "scholarships": "छात्रवृत्ति",
        "mentoring": "मेंटोरिंग",
        "peer_connect": "पियर कनेक्ट",
        "library": "लाइब्रेरी",
        "ecosystem": "पारिस्थितिकी तंत्र",
        "about": "हमारे बारे में",
        "path": "पथ",
        "team": "टीम",
        "faq": "सामान्य प्रश्न"
      }
    }
  }
};

export const initI18n = async () => {
    await i18n.init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });
    return i18n;
};

export default i18n;
