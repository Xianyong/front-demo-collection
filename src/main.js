// import './assets/main.css'

// import { createApp } from 'vue'

// import App from './App.vue'

// import vue2DataBinding from './components/DataBinding/Vue2DataBinding.vue'
// import Vue2DataBindingExp from './components/DataBinding/Vue2DataBindingExp.vue'
// import vue3DataBinding from './components/DataBinding/Vue3DataBinding.vue'

// createApp(vue3DataBinding).mount('#app')
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import Vue2DataBinding from './components/DataBinding/Vue2DataBinding.vue'
import Vue2DataBindingExp from './components/DataBinding/Vue2DataBindingExp.vue'
import Vue3DataBinding from './components/DataBinding/Vue3DataBinding.vue'
import Vue3DataBinding1 from './components/DataBinding/Vue3DataBinding1.vue'
import Vue3DataBinding2 from './components/DataBinding/Vue3DataBinding2.vue'

import PureTable from './components/DataTable/PureTable.vue'

const routes = [
  { path: '/', component: Vue2DataBinding },
  { path: '/Vue2DataBindingExp', component: Vue2DataBindingExp },
  { path: '/Vue3DataBinding', component: Vue3DataBinding },
  { path: '/Vue3DataBinding1', component: Vue3DataBinding1 },
  { path: '/Vue3DataBinding2', component: Vue3DataBinding2 },
  { path: '/PureTable', component: PureTable }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')