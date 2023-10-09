<template>
  <div class="container mt-4">
    <!-- Conditionally render components based on data properties -->
    <Login v-if="showLogin" @loggedIn="handleLoggedIn"></Login>
    <Register v-if="showRegister" @registered="handleRegistered"></Register>
    <AccountSetup v-if="showAccountSetup" @accountSetupComplete="handleAccountSetupComplete"></AccountSetup>
    <FinalAccountSetup v-if="showFinalAccountSetup" @finalAccountSetupComplete="handleFinalAccountSetupComplete"></FinalAccountSetup>
    <MainPage v-if="showMainPage" @logout="handleLogout"></MainPage>
  </div>
</template>

<script>
import { defineComponent, provide, ref } from 'vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import AccountSetup from './components/AccountSetup.vue';
import FinalAccountSetup from './components/FinalAccountSetup.vue';
import MainPage from './components/MainPage.vue';

export default defineComponent({
  components: {
    Login,
    Register,
    AccountSetup, 
    FinalAccountSetup,
    MainPage,
  },
  setup() {
    const showLogin = ref(true);
    const showRegister = ref(false);
    const showAccountSetup = ref(false);
    const showFinalAccountSetup = ref(false);
    const showMainPage = ref(false);

    const handleLoggedIn = () => {
      showLogin.value = false;
      showRegister.value = false;
      showAccountSetup.value = false;
      showMainPage.value = true;
      showFinalAccountSetup.value = false;
    };

    const handleRegistered = () => {
      showLogin.value = false;
      showRegister.value = false;
      showAccountSetup.value = true;
      showMainPage.value = false;
      showFinalAccountSetup.value = false;
    };

    const handleAccountSetupComplete = () => {
      showLogin.value = false;
      showRegister.value = false;
      showAccountSetup.value = false;
      showMainPage.value = false;
      showFinalAccountSetup.value = true;
    };

    const handleFinalAccountSetupComplete = () => {
      showLogin.value = false;
      showRegister.value = false;
      showAccountSetup.value = false;
      showMainPage.value = true;
      showFinalAccountSetup.value = false;
    };

    const handleLogout = () => {
      showLogin.value = true;
      showRegister.value = false;
      showAccountSetup.value = false;
      showMainPage.value = false;
      showFinalAccountSetup.value = false;
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
    provide('handleAccountSetupComplete', handleAccountSetupComplete);
    provide('handleFinalAccountSetupComplete', handleFinalAccountSetupComplete);
    provide('handleLogout', handleLogout);

    return {
      showLogin,
      showRegister,
      showAccountSetup,
      showFinalAccountSetup,
      showMainPage,
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
  background: #1f2d45;
  /* Fallback background color */
  background-image: url('/public/img/login_register_background.jpg');
  /* Background image path */
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  opacity: .75;
  /* Adjust the opacity value (0.0 to 1.0) as needed */
}

h1 {
  border-bottom: 1px solid #ddd;
  display: inline-block;
  padding-bottom: 10px;
}
</style>