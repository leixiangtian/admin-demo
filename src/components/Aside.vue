<template>
  <div class="aside">
    <el-menu
      background-color="#2b4b6b"
      text-color="#fff"
    >
      <template v-if="rightList">
        <el-submenu class="nav-title" v-for="(item, index) in rightList" :key="index" :index="index + ''">
          <template slot="title">
            {{item.id}}
            <i class="el-icon-location"></i>
            <span slot="title">{{ item.authName }}</span>
          </template>
          <el-menu-item v-for="(childItem, idx) in item.children" :key="idx" @click="goTo(childItem)">{{ childItem.authName }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      rightList: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    console.log(this.userInfo)
    this.rightList = this.userInfo.rights
  },
  methods: {
    goTo (item) {
      console.log(item)
      this.$router.push({ path: item.path, query: { name: item.authName } })
    }
  }
}
</script>

<style lang="less" scoped>
.nav-title {
  & /deep/ i {
    color: #fff;
  }
  .el-menu-item {
    color: #fff;
  }
}
</style>
