import * as Keychain from 'react-native-keychain';
import { StoreApi } from 'zustand';
import { StateStorage } from 'zustand/middleware';

export const SecureStorage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        try {
            const credentials = await Keychain.getGenericPassword({ service: name });
            if (credentials) {
                return credentials.password;
            }
            return null;
        }
        catch (error) {
            console.error(`SecureStorage: Error getting item "${name}"`, error);
            return null;
        }
    },

    setItem: async (name: string, value: string): Promise<void> => {
        try {
            await Keychain.setGenericPassword(name, value, {
                service: name,
                accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
            });
        } catch (error) {
            console.error(`SecureStorage: Error setting item "${name}"`, error);
        }
    },

    removeItem: async (name: string): Promise<void> => {
        try {
            await Keychain.resetGenericPassword({ service: name });
        } catch (error) {
            console.error(`SecureStorage: Error removing item "${name}"`, error);
        }
    },
}