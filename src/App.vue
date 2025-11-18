<script>
  export default {
    data()
    {
      return {
        username: 'name',
        msg: 'Hello Vue 3 + Vite!',
        age:25
      }
    },
    methods:{
      changeName()
      {
        this.username = 'new name';
      }
    }
}
</script>

<template>
  <main>
    <h1>{{msg}}</h1>
    <p>
      <label for="username">Username:</label>
      <input id="username" v-model="username">{{username}}
      <br />
      <label for="userage">Age:</label>
      <input id="userage" type="number" v-model.number="age" placeholder="Enter your age"> {{age}}
    </p>
    <p>
      <button @click="changeName()">Clear</button>
    </p>
    
    <!-- {{msg}} -->
  </main>
  <footer>
    &copy; 2025, name
  </footer>
</template>

<style scoped>
h1 {
  font-weight:bold;
  text-align:center;
  color:#42b983;
  font-size: 2em;
  /* width: ; */
  position: fixed;
  top: 0;
}

/* STEP 2: Style the footer */
footer {
  position: fixed;
  bottom: 0;
  left:0;
  width:100;
  text-align:center;
  width: 100%;
}
</style>
