// src/utils/encryption.ts

// Since crypto-js is loaded as a script that creates a global CryptoJS object,
// and we don't have proper typings installed, we declare it here to satisfy TypeScript.
// We also need to import it to make sure the script is loaded before this module.
import '../lib/crypto.js';

// Define a type for the global CryptoJS object.
// This is a simplified version focusing on what we need (AES).
declare const CryptoJS: {
  AES: {
    encrypt: (message: string, key: string) => { toString: () => string };
    decrypt: (ciphertext: string, key: string) => { toString: (encoder: any) => string };
  };
  enc: {
    Utf8: any;
  };
};

// A simple way to hide the key slightly. In a real-world scenario,
// this would need more advanced obfuscation.
const SECRET_KEY = ['Meka', 'dron', 'Idle', 'Secret', 'Key', '2024'].join('_');

/**
 * Encrypts a JavaScript object.
 * @param data The object to encrypt.
 * @returns An encrypted string (ciphertext).
 */
export const encryptData = (data: object): string => {
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
};

/**
 * Decrypts a string back into a JavaScript object.
 * @param ciphertext The encrypted string.
 * @returns The decrypted object, or null if decryption fails.
 */
export const decryptData = (ciphertext: string): object | null => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const decryptedJson = bytes.toString(CryptoJS.enc.Utf8);
        
        // If the decrypted string is empty, it means the key is wrong or the data is corrupt.
        if (!decryptedJson) {
            return null;
        }
        
        return JSON.parse(decryptedJson);
    } catch (error) {
        // This can happen if the data is not valid JSON or other decryption errors occur.
        // console.error("Failed to decrypt or parse data:", error);
        return null;
    }
};
