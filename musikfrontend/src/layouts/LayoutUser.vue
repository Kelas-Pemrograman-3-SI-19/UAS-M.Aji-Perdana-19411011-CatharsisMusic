<template>
  <q-layout view="lHh LpR fFf">
    <q-toolbar unelevated class="bg-white text-black navbar">
      <router-link class="link" :to="{ name: 'homeUser' }">
        <div class="text-h5 text-weight-bold q-ml-md" >Catharsis Music</div>
      </router-link>
      <q-space />
      <div v-if="$q.screen.md || $q.screen.lg || $q.screen.xl">
        <q-btn size="medium" :to="{ name: 'homeUser' }" flat>Home</q-btn>
        <q-btn size="medium" :to="{ name: 'myOrder' }" flat>Pesanan Saya</q-btn>
        <q-btn size="medium" :to="{ name: 'Profile' }" flat>Profile</q-btn>
        <q-btn size="medium" flat @click="logout()">logout</q-btn>
      </div>
      <q-btn v-if="$q.screen.xs || $q.screen.sm" size="medium" round icon="shopping_cart" :to="{ name: 'myOrder' }" flat />
      <q-btn v-if="$q.screen.xs || $q.screen.sm" flat round icon="menu">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup :to="{ name: 'homeUser' }" >
              <q-item-section>Home</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup :to="{ name: 'Profile' }" >
              <q-item-section>Profile</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="logout()">
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
    <q-page-container class="bg-grey-1" style="margin-bottom:0px;">
      <router-view />
    </q-page-container>
    <div class="foot text-caption text-grey-6">CatharsisMusic | 2021</div>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      drawer: null
    }
  },
  methods: {
    logout () {
      this.$q.localStorage.remove()
      this.$router.push({ name: 'loginPage' })
    }
  }
}
</script>
<style>
  @font-face{
    font-family: Deloresa;
    src: url(~assets/VtksDeloresamores-mLVXV.ttf);
  }
  @font-face{
    font-family: brutal;
    src: url(~assets/BlackBrutal-BWqWl.otf);
  }
  @font-face{
    font-family: granite;
    src: url(~assets/Granite-Bgvl.ttf);
  }
  .foot{
    width: 100%;
    height: 50px;
    background-color: #010b30;
    color: white;
    text-align: center;
    line-height: 50px;
  }

  .link {
    color: black;
    text-decoration: none;
    transition: 0.2s ease-in-out;
    font-family: granite;
  }
  .link:hover {
    color: rgb(155, 155, 155);
  }
  .link:active {
    color: rgb(107, 107, 107);
  }

  .navbar {
    box-shadow: 0px 0px 10px rgb(63, 63, 63);
    height: 60px;
    position:fixed;
    z-index:1;
  }
</style>
