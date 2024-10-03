import { I18nTranslations } from '../../generated/i18n.generated';
type ErrorsType = I18nTranslations['errors'];
declare const ERRORS: (message: keyof ErrorsType) => "NotNullViolation" | "UniqueViolation" | "ForeignKeyViolation" | "UnknownPostgresError" | "Unexpected error!" | "User not found" | "Unauthorized" | "Validation failed (uuid is expected)" | "Book not found" | "Failed to add category to book" | "Failed to add subcategory to book" | "Failed to remove subcategory from book" | "Failed to remove category from book";
export { ERRORS };
