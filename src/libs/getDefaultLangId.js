import getPlatform from './getPlatform';

import displayLanguages from '../constants/displayLanguages';

// strip country code from langId
// en-US => en / vi-vn => vi
const getLanguageCode = (langId) => {
  const parts = langId.toLowerCase().split('-');

  return parts[0];
};

const getDefaultLangId = () => {
  let userLanguages;
  switch (getPlatform()) {
    case 'electron': {
      /* global remote */
      userLanguages = [remote.app.getLocale()];
      break;
    }
    case 'windows': {
      /* global Windows */
      userLanguages = Windows.Globalization.ApplicationLanguages.languages;
      break;
    }
    default: {
      userLanguages = ['en'];
    }
  }

  let defaultLangId = 'en';

  userLanguages.some((userLang) => {
    let isMatch = false;

    Object.keys(displayLanguages).some((appLang) => {
      isMatch = getLanguageCode(appLang) === getLanguageCode(userLang);

      if (isMatch) {
        defaultLangId = appLang;
      }

      return isMatch;
    });

    return isMatch;
  });

  return defaultLangId;
};

export default getDefaultLangId;
