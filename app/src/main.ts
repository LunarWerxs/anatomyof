import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import AnatomyPage from './components/AnatomyPage.vue'
import './style.css'

// Hash history so deep links work on static hosts (GitHub Pages) without
// any server-side rewrite rules.
const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/:langId?/:variant?', name: 'anatomy', component: AnatomyPage }],
})

createApp(App).use(router).mount('#app')
