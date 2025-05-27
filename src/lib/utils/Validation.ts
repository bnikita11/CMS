// For now, let's assume this is in a utility file or directly in your component.
// You might want to create a separate file like `src/utils/validation.ts` for this.

/**
 * Validates a Nepalese passport number based on common known formats.
 *
 * Known formats include:
 * - 8 digits (older MRP)
 * - 9 digits (newer e-passports)
 * - 2 letters followed by 7 digits (common across both types)
 *
 * @param passportNumber The passport number string to validate.
 * @returns True if the passport number matches a known Nepalese format, false otherwise.
 */
export function validateNepalesePassport(passportNumber: string): boolean {
    if (!passportNumber) {
        return false;
    }

    // Convert to uppercase and remove any whitespace for consistent matching
    const cleanPassportNumber = passportNumber.trim().toUpperCase();

    // Regex for 8 digits (e.g., 12345678)
    const eightDigitRegex = /^\d{8}$/;

    // Regex for 9 digits (e.g., 987654321) - common for e-passports
    const nineDigitRegex = /^\d{9}$/;

    // Regex for 2 letters followed by 7 digits (e.g., AB1234567)
    // The letters are typically uppercase.
    const twoLettersSevenDigitsRegex = /^[A-Z]{2}\d{7}$/;

    // Check against all known patterns
    return (
        eightDigitRegex.test(cleanPassportNumber) ||
        nineDigitRegex.test(cleanPassportNumber) ||
        twoLettersSevenDigitsRegex.test(cleanPassportNumber)
    );
}

// --- Examples of usage (for testing) ---
console.log("Valid Nepalese Passports:");
console.log("12345678 (8 digits):", validateNepalesePassport("12345678")); // true
console.log("NP1234567 (2 letters + 7 digits):", validateNepalesePassport("NP1234567")); // true
console.log("AB9876543 (2 letters + 7 digits):", validateNepalesePassport("AB9876543")); // true
console.log("987654321 (9 digits):", validateNepalesePassport("987654321")); // true
console.log("NP 1234567 (with space, should be trimmed):", validateNepalesePassport("NP 1234567")); // true (due to .trim())

console.log("\nInvalid Nepalese Passports:");
console.log("1234567 (7 digits):", validateNepalesePassport("1234567")); // false
console.log("ABC1234567 (3 letters + 7 digits):", validateNepalesePassport("ABC1234567")); // false
console.log("12345ABCD (mixed, wrong pattern):", validateNepalesePassport("12345ABCD")); // false
console.log("NP123456 (too few digits after letters):", validateNepalesePassport("NP123456")); // false
console.log("A12345678 (1 letter + 8 digits):", validateNepalesePassport("A12345678")); // false
console.log("np1234567 (lowercase, should be converted):", validateNepalesePassport("np1234567")); // true (due to .toUpperCase())
console.log("1234567890 (10 digits):", validateNepalesePassport("1234567890")); // false