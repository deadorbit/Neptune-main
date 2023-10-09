<template>
  <div class="contact-list">
    <ul class="nav flex-column">
      <li class="nav-item" v-for="contact in contacts" :key="contact.id">
        <!-- Emit an event when a contact is clicked -->
        <a class="nav-link" @click="openChat(contact)">{{ contact.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    contacts: Array,
  },
  methods: {
    openChat(contact) {
      // Emit an event to the parent component (MainPage.vue)
      this.$emit('open-chat', contact);
    },
  },
};
</script>
  
  <style scoped>
  .contact-list {
    flex: 1;
    overflow-y: auto;
    background-color: #fff;
    border-right: 1px solid #ddd;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    padding: 10px;
    color: #333;
    text-decoration: none;
  }
  
  .profile-picture {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .nav-link:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
  </style>
  