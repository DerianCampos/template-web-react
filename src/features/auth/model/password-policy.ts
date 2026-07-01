/**
 * Client-side password policy validation.
 * Mirrors the BE policy: min 8 chars, upper + lower + digit + special.
 */

export interface PasswordValidationResult {
  valid: boolean;
  errors: string[];
}

const MIN_LENGTH = 8;
const HAS_UPPER = /[A-Z]/;
const HAS_LOWER = /[a-z]/;
const HAS_DIGIT = /[0-9]/;
const HAS_SPECIAL = /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/`~']/;

/** Validate a password against the policy. Returns result with error messages. */
export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  if (!password || password.length < MIN_LENGTH) {
    errors.push(`Password must be at least ${MIN_LENGTH} characters`);
  }
  if (!HAS_UPPER.test(password)) {
    errors.push("Password must include at least one uppercase letter");
  }
  if (!HAS_LOWER.test(password)) {
    errors.push("Password must include at least one lowercase letter");
  }
  if (!HAS_DIGIT.test(password)) {
    errors.push("Password must include at least one digit");
  }
  if (!HAS_SPECIAL.test(password)) {
    errors.push(
      "Password must include at least one special character (!@#$%^&*...)", 
    );
  }

  return { valid: errors.length === 0, errors };
}
