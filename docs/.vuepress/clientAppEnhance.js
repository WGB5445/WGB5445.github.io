import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import { defineClientAppEnhance } from '@vuepress/client'


export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.use(ElementPlus)
})