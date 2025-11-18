<template>
  <div class="container">
    <nav id="navigator">
      <router-link to="/">Vue2DataBinding</router-link>
      <router-link to="/Vue2DataBindingExp">Vue2DataBindingExp</router-link>
      <hr class="divider" />
      <router-link to="/Vue3DataBinding">Vue3DataBinding</router-link>
      <router-link to="/Vue3DataBinding1">Vue3DataBinding1</router-link>
      <router-link to="/Vue3DataBinding2">Vue3DataBinding2</router-link>
    </nav>
    <main id="app">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  min-height: 100vh;
}

#navigator {
  width: 200px;
  background-color: #f0f0f0;
  padding: 20px 0;
}

#app {
  flex: 1;
  padding: 20px;
}

#navigator a {
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: #333;
}

#navigator a:hover {
  background-color: #ddd;
}

/* Active link styling */
.router-link-active {
  background-color: #ddd;
  font-weight: bold;
}
</style>