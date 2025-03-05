// migration
import { Client, Databases, Account, Storage } from "appwrite";
const client = new Client();

client.setProject(import.meta.env.VITE_PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

export { client, databases, account, storage };
