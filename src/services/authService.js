// authService.js
import { account } from "../utils/appwrite";

const AuthService = {
  async login(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error("Login Error:", error);
      return null;
    }
  },

  async getAdmin() {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error("Get Admin Error:", error);
      return null;
    }
  },

  async logout() {
    try {
      await account.deleteSession("current");
      return true;
    } catch (error) {
      console.error("Logout Error:", error);
      return false;
    }
  },
};

export default AuthService;
