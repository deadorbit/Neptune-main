<template>
    <div id="container">
      <div id="start">
        <p>CryptLink</p>
      </div>
      <div id="center">
        <form class="form-inline">
          <input class="form-control" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
      <div id="end">

      </div>
    </div>
    
</template>
  
<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
        
    }
  }
</script>
  
<style>
/* Style the right-aligned search box */
    .search-container {
      display: flex;
      justify-content: flex-end;
      padding: 0px;
      background-color: transparent; /* You can set a background color here if needed */
    }

    .search-container .form-inline {
      margin-right: 15px;
      margin-top: 0px;
    }

    /* Optional: Style the search input and button */
    .search-container input[type="search"] {
      width: 200px;
    }
</style>