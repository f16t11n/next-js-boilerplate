export const messages = {
  en: {
    welcome: 'Welcome to the Dashboard',
    error_generic: 'Something went wrong. Please try again.',
    login_success: 'Login successful!',
    logout: 'You have been logged out.',
    not_found: 'Page not found.',
    // ...add more UI text and error messages here
  }
} as const;

export type SupportedLang = keyof typeof messages;
export type MessageKey = keyof typeof messages['en'];

export function getMessage(key: MessageKey, lang: SupportedLang = 'en'): string {
  return messages[lang][key] || messages['en'][key];
}
