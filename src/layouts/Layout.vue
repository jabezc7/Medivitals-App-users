<template>
    <Header />
    <Navigation />
    <div class="lg:px-4">
        <router-view />
    </div>
</template>

<script setup>
    import Header from './header/Header.vue'
    import Navigation from './header/Navigation.vue'
</script>
