<template>
  
  <Layout>

    <template #page-bottom>
      <div class="my-footer">MIT Licensed | Copyright © 2021-present 不霁何虹</div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import Header from '../../components/Header.vue'
export default {
  components: {
    Layout,
    Header,
  },
}
</script>

<style lang="css">
.my-footer {
  text-align: center;
}
</style>