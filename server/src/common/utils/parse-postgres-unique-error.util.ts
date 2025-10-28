import { QueryFailedError } from 'typeorm';

export function parsePostgresUniqueError(error: unknown): string | null {
  if (!isPostgresError(error) || error.code !== '23505') return null;

  const detail = error.detail;
  if (!detail) return 'Вече съществува запис с тази стойност.';

  // detail: Key (email)=(test@example.com) already exists.
  const match = detail.match(/\(([^)]+)\)=\(([^)]+)\)/);
  if (!match) return 'Вече съществува запис с тази стойност.';

  const field = match[1];
  const value = match[2];

  return humanizeField(field, value);
}

function isPostgresError(
  error: unknown,
): error is QueryFailedError & { code: string; detail?: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    error instanceof QueryFailedError &&
    'code' in error &&
    typeof (error as { code?: unknown }).code === 'string'
  );
}

function humanizeField(field: string, value: string): string {
  switch (field) {
    case 'email':
      return `Имейл "${value}" вече е зает.`;
    case 'username':
      return `Потребителското име "${value}" вече е заето.`;
    default:
      return `Стойността за полето "${field}" вече съществува.`;
  }
}
