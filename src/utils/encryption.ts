// src/utils/encryption.ts

import CryptoJS from 'crypto-js';

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
        console.error("Failed to decrypt or parse data:", error);
        return null;
    }
};
