// userController.js
const userService = require("../services/userService");

const userController = {
  profile: async (req, res) => {
    try {
      console.log("User information:", req.user);
      const profileData = await userService.getProfile(req.user.email);
      res.status(200).json(profileData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to fetch user profile");
    }
  },

  updateProfile: async (req, res) => {
    try {
      await userService.updateProfile(req.user.email, req.body);
      res.status(200).send("Profile updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to update user profile");
    }
  },

  getAllUser: async (req, res) => {
    try {
      const users = await userService.getAllUser();
      res.status(201).json(users);
    } catch (error) {
      console.error("Error fetching user: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const deleteUser = await userService.deleteUser(userId);
      if (!deleteUser) {
        res.status(404).json({ message: "User not found" });
      }
      res.status(201).json({ message: "Delete User successfully" });
    } catch (error) {
      console.error("Error deleting user: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = userController;
