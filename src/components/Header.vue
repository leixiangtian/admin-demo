<template>
  <div class="header">
    <div class="header-left">
      <div class="header-left__logo">
        <img src="@/assets/logo.png" alt="">
      </div>
      <div class="header-left__title">后台管理系统权限Demo</div>
    </div>
    <div class="header-right">
      <div class="header-right__info">
        <div class="header-right__info-name" style="color:#fff;">{{ userInfo.username || ''}}</div>
      </div>
      <div class="header-right__logout">
        <el-button type="danger" size="20" @click="logout">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  mounted () {
    console.log(this.userInfo)
    console.log(this.$store.state)
  },
  methods: {
    logout () {
      this.$confirm('你是否要退出登录?', '登出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setTimeout(() => {
          sessionStorage.removeItem('admin_demo_userInfo')
          sessionStorage.removeItem('admin_demo_token')
          console.log(sessionStorage.getItem('admin_demo_userInfo'))
          this.$router.push('/login')
          window.location.reload()
        }, 500)
      }).catch(err => err)
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  box-shadow: 0 2px 5px #2b4b6b;
  &-left {
    height: 100%;
    display: flex;
    align-items: center;
    &__logo {
      width: 80px;
      height: 100%;
      padding: 5px;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    &__title {
      font-size: 20px;
      color: #fff;
      // text-shadow: 10px 10px rgba(25, 255, 255, .3);
    }
  }
  &-right {
    height: 100%;
    display: flex;
    align-items: center;
    &__info {
      &-name {
        color: #2b4b6b;
        font-size: 16px;
        margin-right: 15px;
      }
    }
  }
}
</style>
