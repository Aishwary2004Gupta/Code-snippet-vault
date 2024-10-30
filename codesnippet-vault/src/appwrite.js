import { Client, Account, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('YOUR_APPWRITE_ENDPOINT') // Your Appwrite endpoint
  .setProject('YOUR_PROJECT_ID'); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
