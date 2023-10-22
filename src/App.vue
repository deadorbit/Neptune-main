<template>
  <div class="container mt-4">
    <Login v-if="showLogin" @loggedIn="handleLoggedIn"></Login>
    <Register v-if="showRegister" @registered="handleRegistered"></Register>
    <AccountSetup v-if="showAccountSetup" @continueToFinalAccountSetup="handleContinueToFinalAccountSetup" @usernameStored="handleUsernameStored"></AccountSetup>
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
import { getUser } from '@/userStore';

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
    const showRegister = ref(false); // Start with the Register screen
    const showAccountSetup = ref(false);
    const showFinalAccountSetup = ref(false);
    const showMainPage = ref(false);
    const user = getUser();

    const handleLoggedIn = () => {
      showLogin.value = false;
      showMainPage.value = true;
    };

    const handleRegistered = () => {
      showRegister.value = false;
      showAccountSetup.value = true; // Transition to the Account Setup screen
    };

    const handleContinueToFinalAccountSetup = () => {
      showAccountSetup.value = false;
      showFinalAccountSetup.value = true;
      showMainPage.value = false;
      showLogin.value = false;
      showRegister.value = false; // Transition to the Final Account Setup screen
    };
    const handleUsernameStored = () => {
      showAccountSetup.value = false;
      showFinalAccountSetup.value = true;
      showMainPage.value = false;
      showLogin.value = false;
      showRegister.value = false;
    };

    const handleFinalAccountSetupComplete = () => {
      showFinalAccountSetup.value = false;
      showMainPage.value = true;
    };

    const handleLogout = () => {
      showLogin.value = true;
      showMainPage.value = false;
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
    provide('handleFinalAccountSetupComplete', handleFinalAccountSetupComplete);
    provide('handleLogout', handleLogout);
    provide('handleContinueToFinalAccountSetup', handleContinueToFinalAccountSetup);
    provide('handleUsernameStored', handleUsernameStored);
    provide('user', user);
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