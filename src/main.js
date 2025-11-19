// import './assets/main.css'
// import 'element-plus/dist/index.css'

import { setAccessToken } from '@/utils/auth';
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import Vue2DataBinding from './components/DataBinding/Vue2DataBinding.vue'
import Vue2DataBindingExp from './components/DataBinding/Vue2DataBindingExp.vue'
import Vue3DataBinding from './components/DataBinding/Vue3DataBinding.vue'
import Vue3DataBinding1 from './components/DataBinding/Vue3DataBinding1.vue'
import Vue3DataBinding2 from './components/DataBinding/Vue3DataBinding2.vue'

import PureTable from './components/DataTable/PureTable.vue'
import DynamicTable from './components/DataTable/DynamicTable.vue'
import DynamicTable2 from './components/DataTable/DynamicTable2.vue'

import ElementUITable from './components/DataTable/ElementUITable.vue'

const routes = [
  { path: '/', component: Vue2DataBinding },
  { path: '/Vue2DataBindingExp', component: Vue2DataBindingExp },
  { path: '/Vue3DataBinding', component: Vue3DataBinding },
  { path: '/Vue3DataBinding1', component: Vue3DataBinding1 },
  { path: '/Vue3DataBinding2', component: Vue3DataBinding2 },
  { path: '/PureTable', component: PureTable },
  { path: '/DynamicTable', component: DynamicTable },
  { path: '/DynamicTable2', component: DynamicTable2 },
  { path: '/ElementUITable', component: ElementUITable }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// just for Testing, hard code the token here.
setAccessToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImRlcHRJZCI6MSwiZGF0YVNjb3BlIjoxLCJ0b2tlblR5cGUiOmZhbHNlLCJleHAiOjE3NjM1NzU1MzMsInVzZXJJZCI6MiwiaWF0IjoxNzYzNTY4MzMzLCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl0sImp0aSI6IjEwYjFjMGIzZjJiMDRhYjJhMTE0NmFlY2E1NDMxNTU5In0.F3y0Msf-u8ivXbk1emRH3EpTka8kEbnA3-IWE-tdmbo');

createApp(App).use(router).mount('#app')