import { I18nTranslations } from '../../../generated/i18n.generated';
export declare function TranslateDto(decorator_name: keyof I18nTranslations['validation']): (a: import("class-validator").ValidationArguments) => string;
