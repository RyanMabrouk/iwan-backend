export function extractNameFromErrorMessage(
  errorMessage: string,
): string | null {
  const regex = /Key \(([^)]+)\)=\(([^)]+)\) already exists\./;
  const match = errorMessage.match(regex);
  return match ? match[1] : null;
}
