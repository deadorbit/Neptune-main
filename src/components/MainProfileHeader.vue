<template>
  <div class="header">
    <div class="profile-info">
      <div class="d-flex align-items-center">
        


        <img :src="profilePictureUrl" alt="Profile Picture" class="profile-picture" />
        <span class="profile-name">{{ userName }}</span>
        <div class="settings-icon" @click="toggleDropdown">
          <i class="fa fa-cog"></i>
          <div v-if="showDropdown" class="dropdown-menu">
            <a @click="goToSettings" class="dropdown-item">Profile Settings</a>
          </div>
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
      this.$emit('logout')
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
/* Your existing CSS styles */
.profile-info {
  display: flex;
  align-items: center;
  margin-right: 40px;
}

.profile-picture {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
  margin-left: 10px;
  margin-top: 10px;

}

.profile-name {
  font-weight: bold;
  margin-right: 20px;
}

.settings-icon {
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
}

.dropdown-menu {
  position: absolute;
  background-color: white;
  display: none;
  right: .5;
  top: calc(100% + 5px);
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
  margin-left: 15px;
  margin-top: 10px;
  width: 90%; /* Add margin to separate the button from the profile name */
}
</style>
