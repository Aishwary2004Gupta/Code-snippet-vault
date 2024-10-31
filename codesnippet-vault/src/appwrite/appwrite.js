import { Client, Account, Databases } from 'appwrite';
import { APPWRITE_ENDPOINT, PROJECT_ID } from '../config';

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);