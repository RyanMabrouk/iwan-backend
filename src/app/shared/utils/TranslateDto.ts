import { I18nTranslations } from '../../../generated/i18n.generated';
import { i18nValidationMessage } from 'nestjs-i18n';

export function TranslateDto(
  decorator_name: keyof I18nTranslations['validation'],
) {
  return i18nValidationMessage<I18nTranslations>(
    `validation.${decorator_name}`,
  );
}
