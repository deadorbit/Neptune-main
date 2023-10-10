<template>
  <div class="search-bar">
    <input
      type="text"
      class="form-control"
      placeholder="Search for users..."
      v-model="searchQuery"
      @input="searchUsers"
    />
    <div class="search-results" v-show="showResults">
      <ul>
        <li v-for="user in searchResults" :key="user.uid">{{ user.username }}</li>
      </ul>
      <p v-if="searchResults.length === 0 && searchQuery.length > 0">We couldn't find any users with that alias.</p>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, query, orderByChild, startAt, endAt, limitToFirst, get } from 'firebase/database';

export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      showResults: false,
    };
  },
  methods: {
    async searchUsers() {
      if (this.searchQuery === '') {
        this.searchResults = [];
        this.showResults = false;
        return;
      }

      const db = getDatabase();
      const usersRef = ref(db, 'usernames');
      const queryRef = query(
        usersRef,
        orderByChild('username'),
        startAt(this.searchQuery.toLowerCase()),
        endAt(this.searchQuery.toLowerCase() + '\uf8ff'),
        limitToFirst(5)
      );

      try {
        const snapshot = await get(queryRef);
        if (snapshot.exists()) {
          const users = [];
          snapshot.forEach((childSnapshot) => {
            const user = childSnapshot.val();
            users.push(user);
          });
          this.searchResults = users;
          this.showResults = true;
        } else {
          this.searchResults = [];
          this.showResults = false;
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
  },
};
</script>

<style scoped>
.search-bar {
  position: relative;
  padding: 10px;
  background-color: #333;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  background-color: white;
  z-index: 1;
}

.search-results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-results li {
  padding: 10px;
  cursor: pointer;
}

.search-results li:hover {
  background-color: #f0f0f0;
}
</style>
