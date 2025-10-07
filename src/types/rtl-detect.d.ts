declare module 'rtl-detect' {
  /**
   * Determines the text direction for a given locale
   * @param locale - The locale string (e.g., 'en', 'ar', 'he')
   * @returns 'ltr' for left-to-right languages, 'rtl' for right-to-left languages
   */
  export function getLangDir(locale: string): 'ltr' | 'rtl'
}
