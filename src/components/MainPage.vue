<template>
  <div class="main-page">
    <Header :profilePictureUrl="user.profilePictureUrl" :userName="user.userName" @logout="logout" />
    <div class="search-and-contacts">
      <!-- Pass the 'contacts' prop to the SearchBar component -->
      <SearchBar :contacts="contacts" @search-results="updateSearchResults" />
      <div class="network-title">Your Network</div>
      <ContactList :contacts="contacts" @open-chat="openChat" />
    </div>
    <div class="spacer"></div>
    <div class="messaging-session">
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
import { inject } from 'vue';

export default {
  components: {
    Header,
    SearchBar,
    ContactList,
    MessagingSession,
  },
  setup() {
    const user = inject('user', { userName: 'Default User', profilePictureUrl: 'default.jpg' });

    const contacts = [
      { id: 1, name: 'User 1', profilePictureUrl: 'path-to-profile-picture' },
      { id: 2, name: 'User 2', profilePictureUrl: 'path-to-profile-picture' },
      // Add more contacts as needed
    ];
    let selectedContact = null;

    const openChat = (contact) => {
      selectedContact = contact;
    };

    const logout = () => {
      auth.signOut().then(() => {
        window.location.href = '/login';
      }).catch((error) => {
        console.error('Logout error:', error);
      });
    };

    // Fetch user profile information when the component is mounted
    return {
      user,
      contacts,
      selectedContact,
      openChat,
      logout,
    };
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
}

.search-and-contacts {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.spacer {
  flex: 1;
}

.messaging-session {
  flex: 2;
  overflow-y: auto;
  background-color: #343434;
}
</style>