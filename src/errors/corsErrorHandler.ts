import logger from './logger';

type MaybeError = { message?: string } | string | unknown;

export function handleCorsError(error: MaybeError) {
  logger.error('CORS Error:', error);
  let details: string | undefined;
  if (process.env.NODE_ENV === 'development') {
    if (typeof error === 'string') details = error;
    else if (error && typeof (error as any).message === 'string') details = (error as any).message;
    else details = JSON.stringify(error);
  }
  return {
    status: 403,
    message: 'CORS error: The request is not allowed from this origin. Please check your environment settings or contact support.',
    details,
  };
}
