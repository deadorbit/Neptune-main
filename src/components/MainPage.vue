<template>
  <div class="main-page">
    <Header :profilePictureUrl="profilePictureUrl" :userName="userName" @logout="logout" />
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
import MessagingSession from './MessagingSession.vue'; // Ensure correct import path
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
      // Initialize profilePictureUrl and userName with default values
      profilePictureUrl: 'img/default_pfp.jpg',
      userName: 'Loading...', // Display a loading message initially
      contacts: [
        { id: 1, name: 'User 1', profilePictureUrl: 'path-to-profile-picture' },
        { id: 2, name: 'User 2', profilePictureUrl: 'path-to-profile-picture' },
        // Add more contacts as needed
      ],
      selectedContact: null, // Ensure that selectedContact is initialized
    };
  },
  methods: {
    async fetchUserProfile() {
      // Check if a user is currently authenticated
      if (auth.currentUser) {
        try {
          // Fetch user's display name and photo URL from Firebase Authentication
          const user = auth.currentUser;
          this.userName = user.displayName || 'No Name';
          this.profilePictureUrl = user.photoURL || 'img/default_pfp.jpg';
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    },

    updateSearchResults(results) {
      this.searchResults = results;
    },

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
  mounted() {
    // Fetch user profile information when the component is mounted
    this.fetchUserProfile();

    // Set the selectedContact to the first contact in the array
    if (this.contacts.length > 0) {
      this.selectedContact = this.contacts[0];
    }
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

.messaging-session {
  flex: 2; /* You can adjust the flex value as needed to make it larger */
  overflow-y: auto;
  background-color: #343434;
}

/* Adjust styling as needed for the chat area */
</style>