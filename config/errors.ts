// Centralized error configuration for all error pages
export const errorConfig = {
  // Client Errors (4xx)
  badRequest: {
    code: 400,
    title: "Bad Request",
    description: "The request could not be understood by the server due to malformed syntax.",
    action: { label: "Go Home", href: "/" },
    icon: "⚠️"
  },
  unauthorized: {
    code: 401,
    title: "Unauthorized",
    description: "You need to log in to access this page.",
    action: { label: "Login", href: "/login" },
    icon: "🔒"
  },
  forbidden: {
    code: 403,
    title: "Forbidden",
    description: "You don't have permission to access this resource.",
    action: { label: "Go Back", href: "javascript:history.back()" },
    icon: "🚫"
  },
  notFound: {
    code: 404,
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved.",
    action: { label: "Go Home", href: "/" },
    icon: "🔍"
  },
  requestTimeout: {
    code: 408,
    title: "Request Timeout",
    description: "The request took too long to complete. Please try again.",
    action: { label: "Retry", href: "javascript:location.reload()" },
    icon: "⏱️"
  },
  conflict: {
    code: 409,
    title: "Conflict",
    description: "There was a conflict with the current state of the resource.",
    action: { label: "Refresh", href: "javascript:location.reload()" },
    icon: "⚡"
  },
  gone: {
    code: 410,
    title: "Gone",
    description: "The resource you're looking for is no longer available.",
    action: { label: "Go Home", href: "/" },
    icon: "💨"
  },
  tooManyRequests: {
    code: 429,
    title: "Too Many Requests",
    description: "You've made too many requests. Please wait before trying again.",
    action: null,
    icon: "🚦"
  },

  // Server Errors (5xx)
  internalError: {
    code: 500,
    title: "Internal Server Error",
    description: "Something went wrong on our end. We're working to fix it.",
    action: { label: "Try Again", href: "javascript:location.reload()" },
    icon: "🔧"
  },
  notImplemented: {
    code: 501,
    title: "Not Implemented",
    description: "This feature is not yet implemented.",
    action: { label: "Go Back", href: "javascript:history.back()" },
    icon: "🚧"
  },
  badGateway: {
    code: 502,
    title: "Bad Gateway",
    description: "The server received an invalid response from the upstream server.",
    action: { label: "Retry", href: "javascript:location.reload()" },
    icon: "🌐"
  },
  serviceUnavailable: {
    code: 503,
    title: "Service Unavailable",
    description: "We're temporarily offline for maintenance. Please try again later.",
    action: null,
    icon: "🔨"
  },
  gatewayTimeout: {
    code: 504,
    title: "Gateway Timeout",
    description: "The server didn't respond in time. Please try again.",
    action: { label: "Retry", href: "javascript:location.reload()" },
    icon: "⏰"
  },

  // System / Misc Errors
  maintenance: {
    code: null,
    title: "Under Maintenance",
    description: "We're performing scheduled maintenance. We'll be back soon!",
    action: null,
    icon: "🔧"
  },
  networkError: {
    code: null,
    title: "Network Error",
    description: "Failed to reach the server. Please check your internet connection.",
    action: { label: "Retry", href: "javascript:location.reload()" },
    icon: "📡"
  },
  unknownError: {
    code: null,
    title: "Something Went Wrong",
    description: "An unexpected error occurred. Please try again or contact support.",
    action: { label: "Go Home", href: "/" },
    icon: "❓"
  }
} as const;

// HTTP status code to error key mapping
export const statusCodeMap: Record<number, keyof typeof errorConfig> = {
  400: 'badRequest',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'notFound',
  408: 'requestTimeout',
  409: 'conflict',
  410: 'gone',
  429: 'tooManyRequests',
  500: 'internalError',
  501: 'notImplemented',
  502: 'badGateway',
  503: 'serviceUnavailable',
  504: 'gatewayTimeout',
};

// Helper function to get error config by status code
export function getErrorConfigByCode(statusCode: number) {
  const errorKey = statusCodeMap[statusCode];
  return errorKey ? errorConfig[errorKey] : errorConfig.unknownError;
}

// Helper function to get all available error types
export function getAvailableErrorTypes() {
  return Object.keys(errorConfig);
}

export type ErrorConfigKey = keyof typeof errorConfig;
export type ErrorConfig = typeof errorConfig[ErrorConfigKey];