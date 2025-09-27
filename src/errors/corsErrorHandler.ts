import logger from './logger';

export function handleCorsError(error: any) {
  logger.error('CORS Error:', error);
  return {
    status: 403,
    message: 'CORS error: The request is not allowed from this origin. Please check your environment settings or contact support.',
    details: process.env.NODE_ENV === 'development' ? error?.message || error : undefined,
  };
}
