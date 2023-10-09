<template>
  <div class="container mt-4">
    <!-- Conditionally render components based on data properties -->
    <Login v-if="showLogin" @loggedIn="handleLoggedIn"></Login>
    <Register v-if="showRegister" @loggedIn="handleLoggedIn"></Register>
    <MainPage v-if="showMainPage" @logout="handleLogout"></MainPage>

  </div>
</template>

<script>
import { defineComponent, provide, ref } from 'vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import MainPage from './components/MainPage.vue';

export default defineComponent({
  components: {
    Login,
    Register,
    MainPage,
  },
  setup() {
    const showLogin = ref(true);
    const showRegister = ref(false);
    const showMainPage = ref(false);

    const handleLoggedIn = (loggedIn) => {
      showMainPage.value = loggedIn;
      showLogin.value = !loggedIn;
      showRegister.value = !loggedIn;
    };

    const handleRegistered = (registered) => {
      showMainPage.value = registered;
      showLogin.value = !registered;
      showRegister.value = !registered;
    };

    const handleLogout = () => {
      // Perform logout actions, e.g., clear user session or tokens
      // Then update the component state
      showMainPage.value = false;
      showLogin.value = true;
      showRegister.value = false;
    };

    const handleNavigate = (page) => {
      if (page === 'login') {
        showLogin.value = true;
        showRegister.value = false;
        showMainPage.value = false;
      } else if (page === 'register') {
        showLogin.value = false;
        showRegister.value = true;
        showMainPage.value = false;
      }
    };

    provide('handleNavigate', handleNavigate);
    provide('handleLoggedIn', handleLoggedIn);
    provide('handleRegistered', handleRegistered);

    return {
      showLogin,
      showRegister,
      showMainPage,
      handleLogout, 

    };
  },
});
</script>

<style>
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1a3d60;
  background: #1f2d45; /* Fallback background color */
  background-image: url('/public/img/login_register_background.jpg'); /* Background image path */
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  opacity: .75; /* Adjust the opacity value (0.0 to 1.0) as needed */
}

h1 {
  border-bottom: 1px solid #ddd;
  display: inline-block;
  padding-bottom: 10px;
}
</style>
