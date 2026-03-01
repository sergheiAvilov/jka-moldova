import { useLang } from '../context/LangContext.jsx';
import { translations } from '../i18n/translations.js';

export function useT() {
  const { lang } = useLang();
  return translations[lang];
}
