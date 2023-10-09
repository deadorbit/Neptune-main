<template>
  <div class="main-page">
    <div class="header">
      <Header :profilePictureUrl="profilePictureUrl" :userName="userName" @logout="logout" />
      <div class="search-and-contacts">
        <SearchBar />

        <div class="network-title">Your Network</div>
        <ContactList :contacts="contacts" @open-chat="openChat" />
      </div>
      <!-- Add a spacer to push content to the top -->
      <div class="spacer"></div>
    </div>
    <div class="messaging-area">
      <MessagingSession v-if="selectedContact" :contact="selectedContact" />
    </div>
  </div>
</template>

<script>
import Header from './MainProfileHeader.vue';
import SearchBar from './MainUserSearch.vue';
import ContactList from './MainContactList.vue';
import MessagingSession from './MessagingSession.vue';
import { auth } from '@/main';

export default {
  components: {
    Header,
    SearchBar,
    ContactList,
    MessagingSession,
  },
  data() {
    return {
      profilePictureUrl: 'path-to-profile-picture',
      userName: 'John Doe',
      contacts: [
        { id: 1, name: 'User 1', profilePictureUrl: 'path-to-profile-picture' },
        { id: 2, name: 'User 2', profilePictureUrl: 'path-to-profile-picture' },
        // Add more contacts as needed
      ],
      selectedContact: null,
    };
  },
  methods: {
    openChat(contact) {
      // Set the selectedContact to the clicked contact
      this.selectedContact = contact;
    },

    logout() {
      // Sign out of Firebase
      auth.signOut().then(() => {
        // Redirect the user to the login page
        window.location.href = '/login'; // Replace '/login' with your login page URL
      }).catch((error) => {
        console.error('Logout error:', error);
      });
    },

  },
};
</script>

<style scoped>
.main-page {
  display: flex;
  height: 100vh;
}

.header {
  background-color: #333;
  color: white;
  display: flex;
  flex-direction: column;
}

.profile-info {
  display: flex;
  flex-direction: column;
  /* Stack profile info vertically */
}

.search-and-contacts {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.spacer {
  flex: 1;
  /* Push content to the top */
}

.messaging-area {
  flex: 1;
  overflow-y: auto;
  background-color: #fff;
}

/* Adjust styling as needed for the chat area */
</style>
