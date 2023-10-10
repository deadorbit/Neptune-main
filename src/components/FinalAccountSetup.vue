<template>
    <div class="final-account-setup">
      <!-- Background image -->
      <div class="background-image"></div>
  
      <!-- Profile picture setup -->
      <div class="profile-picture-container">
        <h2 style="font-family: Verdana, sans-serif; font-weight: bold; color: #fff;">
          Final Account Setup
        </h2>
        <div class="profile-picture-preview">
          <img
            :src="profilePictureUrl || 'img/default_pfp.jpg'"
            alt="Profile Picture Preview"
          />
        </div>
        <input type="file" accept="image/*" @change="handleFileChange" />
        <button @click="uploadProfilePicture" :disabled="uploading">Upload Profile Picture</button>
      </div>
    </div>
  </template>
  
  <script>
  import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
  import { getDatabase, ref, update, get } from "firebase/database";
  import { getAuth } from "firebase/auth";
  
  export default {
    data() {
      return {
        username: "",
        profilePictureUrl: "", // Initialize with an empty string
        uploading: false,
      };
    },
    async created() {
      // Retrieve the username from the user's account information
      const user = getAuth().currentUser;
      if (user) {
        const username = await this.getUsernameFromDatabase(user.uid);
        if (username) {
          this.username = username;
        }
      }
    },
    methods: {
      async getUsernameFromDatabase(uid) {
        try {
          const db = getDatabase();
          const userRef = ref(db, `users/${uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            return snapshot.val().username;
          }
          return null;
        } catch (error) {
          console.error("Error retrieving username from database:", error);
          // Handle the error as needed
          return null;
        }
      },
  
      async handleFileChange(event) {
        // Handle the file selection
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          this.uploading = true;
          try {
            const profilePictureUrl = await this.uploadProfilePicture(selectedFile);
            this.profilePictureUrl = profilePictureUrl;
          } catch (error) {
            console.error("Error uploading profile picture:", error);
          } finally {
            this.uploading = false;
          }
        }
      },
  
      async uploadProfilePicture(file) {
        try {
          // Create a reference to the storage location
          const storage = getStorage();
          const storageRef = storageRef(storage, `profilePictures/${file.name}`);
  
          // Upload the file
          const snapshot = await uploadBytes(storageRef, file);
  
          // Get the download URL for the uploaded file
          const downloadURL = await getDownloadURL(snapshot.ref);
  
          // Update the user's data with the profile picture URL
          const user = getAuth().currentUser;
          if (user) {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`);
            await update(userRef, { profilePictureUrl: downloadURL });
          }
  
          return downloadURL;
        } catch (error) {
          console.error("Error uploading profile picture:", error);
          throw error;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .final-account-setup {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/public/img/login_register_background.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    opacity: 0.8;
    z-index: -1;
  }
  
  .profile-picture-container {
    background-color: #343434; /* Set background color to #343434 */
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  
  .profile-picture-preview {
    margin: 20px 0;
    display: flex;
    justify-content: center;
  }
  
  .profile-picture-preview img {
    max-width: 200px;
    max-height: 200px;
    border-radius: 50%;
  }
  
  input[type="file"] {
    display: none;
  }
  
  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  