import logger from './logger';

// Broader error shape union we may encounter
type MaybeError = { message?: string } | Error | string | unknown;

function isErrorWithMessage(value: unknown): value is { message: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof (value as { message: unknown }).message === 'string'
  );
}

export function handleCorsError(error: MaybeError) {
  logger.error('CORS Error:', error);
  let details: string | undefined;
  if (process.env.NODE_ENV === 'development') {
    if (typeof error === 'string') {
      details = error;
    } else if (isErrorWithMessage(error)) {
      details = error.message;
    } else {
      try {
        details = JSON.stringify(error);
      } catch {
        details = String(error);
      }
    }
  }
  return {
    status: 403,
    message:
      'CORS error: The request is not allowed from this origin. Please check your environment settings or contact support.',
    details,
  };
}
