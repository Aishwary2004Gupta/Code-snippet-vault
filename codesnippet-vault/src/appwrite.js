import { Client, Account, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('6721d41f001590bec8aa'); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
