<template>
  <div class="dashboard-container">
    <!--显示vuex状态-->
    <!--<div class="dashboard-text">name:{{ name }}</div>-->
    <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
    <div class="dashboard-welcome">
      <h3>欢迎来到后台</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-welcome {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
