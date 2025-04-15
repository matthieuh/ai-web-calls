/**
 * Environment variable utility functions
 * 
 * This module provides utility functions for accessing environment variables
 * in a type-safe way with fallbacks for development.
 */

/**
 * Get an environment variable with a fallback value
 * 
 * @param key - The environment variable name
 * @param fallback - Optional fallback value if the environment variable is not set
 * @returns The environment variable value or the fallback
 */
export function getEnv(key: string, fallback: string = ''): string {
  return process.env[key] || fallback;
}

/**
 * Get required environment variables
 * 
 * @param keys - Array of required environment variable names
 * @returns Object with the environment variables
 * @throws Error if any required environment variable is missing
 */
export function getRequiredEnv(keys: string[]): Record<string, string> {
  const missingKeys: string[] = [];
  const env: Record<string, string> = {};

  keys.forEach(key => {
    const value = process.env[key];
    if (!value) {
      missingKeys.push(key);
    } else {
      env[key] = value;
    }
  });

  if (missingKeys.length > 0) {
    throw new Error(`Missing required environment variables: ${missingKeys.join(', ')}`);
  }

  return env;
}

/**
 * Twilio environment variables
 */
export const twilioEnv = {
  accountSid: getEnv('TWILIO_ACCOUNT_SID'),
  authToken: getEnv('TWILIO_AUTH_TOKEN'),
  apiKey: getEnv('TWILIO_API_KEY'),
  apiSecret: getEnv('TWILIO_API_SECRET'),
  twimlAppSid: getEnv('TWILIO_TWIML_APP_SID'),
  phoneNumber: getEnv('TWILIO_NUMBER'),
  baseUrl: getEnv('BASE_URL', 'http://localhost:3000')
};
