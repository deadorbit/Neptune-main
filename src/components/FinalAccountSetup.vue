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
        <img :src="profilePictureUrl || 'img/default_pfp.jpg'" alt="Profile Picture Preview" />
      </div>
      <button @click="openImageLibrary">Choose Profile Picture</button>
      <div class="button-container">
        <button @click="finishSetup" :disabled="uploading">Finish</button>
      </div>
    </div>

    <!-- Image Library -->
    <div v-if="showImageLibrary" class="image-library">
      <div class="image-grid">
        <div v-for="image in imageLibrary" :key="image" class="image-item" @click="selectProfilePicture(image)">
          <img :src="image" alt="Profile Picture" />
        </div>
      </div>
      <button @click="closeImageLibrary" class="close-button">Close</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, provide, inject } from 'vue';
import { setUserProfilePicture, provideUser } from '@/userStore';


export default {
  setup() {
    const profilePictureUrl = ref("");
    const uploading = ref(false);
    const showImageLibrary = ref(false);
    const imageLibrary = [
      'img/icons8-john-wick-96.png',
      'img/icons8-luigi-96.png',
      'img/icons8-mando-96.png',
      'img/icons8-kermit-the-frog-96.png',
      'img/icons8-unicodepad-96.png',
      'img/icons8-woman-profile-skin-type-5-96.png',
      'img/icons8-female-profile-96.png',
      // Add more image paths
    ];
    const providedUsername = inject('providedUsername');

    const handleFinalAccountSetupComplete = inject('handleFinalAccountSetupComplete');

    const selectProfilePicture = (image) => {
    // Set profile picture URL in the local component state
    profilePictureUrl.value = image;
    setUserProfilePicture(providedUsername, image); // Update user store
    provideUser();
    closeImageLibrary();
  };

    const openImageLibrary = () => {
      showImageLibrary.value = true;
    };

    const closeImageLibrary = () => {
      showImageLibrary.value = false;
    };

    const finishSetup = () => {
      handleFinalAccountSetupComplete(true);
    };

    onMounted(() => {
      // Load initial profile picture or default image
      profilePictureUrl.value = 'img/default_pfp.jpg';
    });

    provide('handleFinalAccountSetupComplete', finishSetup);

    return {
      profilePictureUrl,
      uploading,
      showImageLibrary,
      imageLibrary,
      openImageLibrary,
      closeImageLibrary,
      selectProfilePicture,
      finishSetup,
    };
  },
};
</script>

<style scoped>
.profile-picture-preview img {
  max-width: 50px; /* Set the maximum width */
  max-height: 50px; /* Set the maximum height */
  border-radius: 50%;
}
.image-library {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  max-width: 80%;
}

.image-item {
  max-width: calc(33.33% - 10px); /* 3 items per row with a 10px gap */
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.3s;
  display: flex;
  justify-content: flex-start; /* Start from the left */
}

.image-item img {
  width: 100%; /* Ensure the image takes full width inside the container */
  height: auto; /* Maintain aspect ratio */
  margin: 0; /* Remove any potential margins */
  padding: 0; /* Remove any potential padding */
}

.image-item:hover {
  border: 2px solid #007bff; /* Highlight border on hover */
}

.close-button {
  position: absolute;
  bottom: 100px;
  cursor: pointer;
}
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

<style scoped>
.profile-picture-preview img {
  max-width: 50px; /* Set the maximum width */
  max-height: 50px; /* Set the maximum height */
  border-radius: 50%;
}
.image-library {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  max-width: 80%;
}

.image-item {
  max-width: calc(33.33% - 10px); /* 3 items per row with a 10px gap */
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.3s;
  display: flex;
  justify-content: flex-start; /* Start from the left */
}

.image-item img {
  width: 100%; /* Ensure the image takes full width inside the container */
  height: auto; /* Maintain aspect ratio */
  margin: 0; /* Remove any potential margins */
  padding: 0; /* Remove any potential padding */
}

.image-item:hover {
  border: 2px solid #007bff; /* Highlight border on hover */
}

.close-button {
  position: absolute;
  bottom: 100px;
  cursor: pointer;
}
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