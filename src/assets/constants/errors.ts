import { I18nTranslations } from '../../generated/i18n.generated';
type ErrorsType = I18nTranslations['errors'];
const ERRORS = (message: keyof ErrorsType) => {
  return message;
};
export { ERRORS };
