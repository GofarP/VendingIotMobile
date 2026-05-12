import * as Keychain from 'react-native-keychain';
import { StateStorage } from 'zustand/middleware';

export const SecureStorage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        const credentials = await Keychain.getGenericPassword({ service: name });
        return credentials ? credentials.password : null;
    },
    setItem: async (name: string, value: string): Promise<void> => {
        await Keychain.setGenericPassword(name, value, { service: name });
    },
    removeItem:async(name:string):Promise<void>=>{
        await Keychain.resetGenericPassword({service:name});
    }
}