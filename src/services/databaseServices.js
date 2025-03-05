// databaseService.js
import { databases } from "../utils/appwrite";

const databaseId = import.meta.env.VITE_DATABASE_ID;

const DatabaseService = {
  async createDocument(collectionId, data) {
    try {
      const response = await databases.createDocument(
        databaseId,
        collectionId,
        "unique()",
        data
      );
      return response;
    } catch (error) {
      console.error("Create Error:", error);
      return null;
    }
  },

  async getDocument(collectionId, documentId) {
    try {
      const response = await databases.getDocument(
        databaseId,
        collectionId,
        documentId
      );
      return response;
    } catch (error) {
      console.error("Get Error:", error);
      return null;
    }
  },

  async updateDocument(collectionId, documentId, data) {
    try {
      const response = await databases.updateDocument(
        databaseId,
        collectionId,
        documentId,
        data
      );
      return response;
    } catch (error) {
      console.error("Update Error:", error);
      return null;
    }
  },

  async deleteDocument(collectionId, documentId) {
    try {
      await databases.deleteDocument(databaseId, collectionId, documentId);
      return true;
    } catch (error) {
      console.error("Delete Error:", error);
      return false;
    }
  },

  async listDocuments(collectionId) {
    try {
      const response = await databases.listDocuments(databaseId, collectionId);
      return response.documents;
    } catch (error) {
      console.error("List Error:", error);
      return [];
    }
  },
};

export default DatabaseService;
