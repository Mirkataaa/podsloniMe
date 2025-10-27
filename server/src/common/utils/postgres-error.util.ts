import { QueryFailedError } from 'typeorm';

export function isPostgresError(
  error: unknown,
): error is QueryFailedError & { code: string } {
  return (
    error instanceof QueryFailedError &&
    typeof (error as QueryFailedError & Record<string, unknown>).code ===
      'string'
  );
}
