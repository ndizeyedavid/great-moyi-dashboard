// fileService.js
import { storage } from "../utils/appwrite";

const FileService = {
  async uploadFile(bucketId, file) {
    try {
      const response = await storage.createFile(bucketId, "unique()", file);
      return response;
    } catch (error) {
      console.error("File Upload Error:", error);
      return null;
    }
  },

  async getFilePreview(bucketId, fileId) {
    try {
      return storage.getFilePreview(bucketId, fileId);
    } catch (error) {
      console.error("Get File Preview Error:", error);
      return null;
    }
  },

  async listFiles(bucketId) {
    try {
      const response = await storage.listFiles(bucketId);
      return response.files; // Returns array of files
    } catch (error) {
      console.error("List Files Error:", error);
      return [];
    }
  },

  async deleteFile(bucketId, fileId) {
    try {
      await storage.deleteFile(bucketId, fileId);
      return true;
    } catch (error) {
      console.error("Delete File Error:", error);
      return false;
    }
  },
};

export default FileService;
