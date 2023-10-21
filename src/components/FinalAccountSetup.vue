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
      <div class="button-container">
        <button @click="uploadProfilePicture" :disabled="uploading">Upload Profile Picture</button>

        <!-- "Finish" button below the profile picture setup -->
        <button @click="finishSetup" class="btn-finish">Finish</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, provide, inject } from 'vue';
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, update } from "firebase/database";
import { getAuth } from "firebase/auth";

export default {
  setup() {
    const profilePictureUrl = ref("");
    const uploading = ref(false);
    const handleFinalAccountSetupComplete = inject('handleFinalAccountSetupComplete');

    const uploadProfilePicture = async (file) => {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePictures/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const user = getAuth().currentUser;
        if (user) {
          const db = getDatabase();
          const userRef = dbRef(db, `users/${user.uid}`);
          await update(userRef, { profilePictureUrl: downloadURL });
          // Set the profilePictureUrl in the local state
          profilePictureUrl.value = downloadURL;
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        throw error;
      }
    };

    const handleFileChange = async (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        uploading.value = true;
        try {
          await uploadProfilePicture(selectedFile);
        } catch (error) {
          console.error("Error uploading profile picture:", error);
        } finally {
          uploading.value = false;
        }
      }
    };

    onMounted(() => {
      const user = getAuth().currentUser;
      if (user) {
        const db = getDatabase();
        const userRef = dbRef(db, `users/${user.uid}`);
        update(userRef, { username: user.displayName });
      }
    });

    provide('handleFinalAccountSetupComplete', handleFinalAccountSetupComplete);

    return {
      profilePictureUrl,
      uploading,
      handleFileChange,
    };
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

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -20px;
  margin-top: 20px;
}

button {
  background-color: #617992;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 40px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover {
  background-color: #0056b3;
}
</style>
