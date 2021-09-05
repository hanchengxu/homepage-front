<template>
  <Header />
      <router-view v-slot="{ Component , route}">
         <transition :name="route.meta.transition" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
  <Footer />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
// import NewPage from './components/NewPage.vue';
import Container from './components/Container/Container.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
export default {
  name: 'App',
  components: {
    Container,
    Header,
    Footer
  }
}
</script>
<style>
.main-container{
  min-height: 1000px;
}
</style>