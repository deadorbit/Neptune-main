<template>
  <div class="header">
    <div class="profile-info">
      <div class="d-flex align-items-center">
        <img :src="profilePictureUrl" alt="Profile Picture" class="profile-picture" />
        <span class="profile-name">{{ userName }}</span>
      </div>
      <div class="settings-icon" @click="toggleDropdown">
        <i class="fa fa-cog"></i>
        <div v-if="showDropdown" class="dropdown-menu">
          <a @click="goToSettings" class="dropdown-item">Profile Settings</a>
        </div>
      </div>
    </div>
    <button class="logout-button" @click="logout">Logout</button>
    <div class="header-content">
      <ContactList :contacts="contacts" @open-chat="openChat" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userName: String,
  },
  data() {
    return {
      profilePictureUrl: 'img/default_pfp.jpg',
      showDropdown: false,
      contacts: [
        { id: 1, name: 'User 1', profilePictureUrl: 'path-to-profile-picture' },
        { id: 2, name: 'User 2', profilePictureUrl: 'path-to-profile-picture' },
        // Add more contacts as needed
      ],
    };
  },
  methods: {
    toggleDropdown(value) {
      this.showDropdown = value;
    },
    goToSettings() {
      // Implement navigation to the profile settings page
      console.log('Navigate to settings');
    },
    logout() {
      // Implement logout logic
      this.$emit('logout');
      console.log('Logout clicked');
    },
    openChat(contact) {
      // Set the selectedContact to the clicked contact
      this.selectedContact = contact;
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Vertically center items */
  background-color: #333;
  color: white;
  padding: 30px;
}

.profile-info {
  display: flex;
  align-items: flex-start; /* Align items at the top */
  flex-direction: column; /* Stack items vertically */
}

.profile-picture {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-name {
  font-weight: bold;
  margin-right: 0px;
}

.settings-icon {
  font-size: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 750px;
  margin-left: -15px; /* Add margin to separate from profile name */
}



.settings-icon:hover .dropdown-menu {
  display: block;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  display: block;
}

/* Additional styles for header content */
.header-content {
  display: flex;
  flex-direction: column;
  margin-top: 20px; /* Add margin to move the content down */
}

.network-title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px; /* Add space between network title and contact list */
}

.logout-button {
  margin-left: 60px;
  margin-top:  -30px; /* Add margin to separate from gear icon */
  width: 90%;
}
</style>
