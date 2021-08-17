<template>
 <div>
      <br>
  <button @click='resolvePages'>获取博客</button>
  <button @click='test'>TEst</button>
 </div>
</template>

<script>
import { provide } from "vue"
import  { ClientAppSetup } from "@vuepress/client"
import { inject } from "vue"
import { usePagesData } from "@vuepress/client"
import  { InjectionKey } from "vue"
export default {
    name:"GetPages",
    data(){
        return{
            
        }
    },
methods:{
     
async resolvePages () {
  const pagesData = usePagesData()
  const pages = await Promise.all(
    Object.keys(pagesData.value).map((key) => pagesData.value[key]())
  )
  console.log(pages)
  return pages 
},
 async test(){
    let pagesData = usePagesData()
    console.log(await pagesData.value["v-8bbac970"]())
    
}
}
}
</script>

<style>

</style>