<template>
  <div>
      <br>
      <button @click='click'>按键</button>
  </div>
</template>

<script>

import { usePageData ,useSiteData,useSiteLocaleData} from '@vuepress/client'
export default {
    name:"Header",
    data(){
        return{
            
        }
    },
    methods:{
        click(){
            // console.log($site.pages);
            let page = useSiteLocaleData()
            console.log(page.value) // foobar
            
        }
    },
}
</script>

<style>

</style>