<template>
    <button @click="logout" class="logout-button">Logout</button>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Implement logout logic here
        this.$emit('logout'); // Emit a custom event to trigger logout in the parent component
      },
    },
  };
  </script>
