<template>
  <div>
    <el-container class="main-container">
      <!-- 头部区域 -->
      <el-header>
        <!-- 左侧的 logo -->
        <img src="../../assets/logo.png" alt="" />
        <!-- 右侧的菜单 -->
        <el-menu class="el-menu-top" mode="horizontal" background-color="#23262E" text-color="#fff" active-text-color="#409EFF" :default-active="$route.path" router>
          <el-submenu index="1">
            <template slot="title">
              <!-- 头像 -->
              <img :src="user_pic" alt="" class="avatar" v-if="user_pic" />
              <img src="../../assets/logo.png" class="avatar" alt="" v-else />
              <span>个人中心</span>
            </template>
            <el-menu-item index="/user-info"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
            <el-menu-item index="/user-avatar"><i class="el-icon-camera"></i>更换头像</el-menu-item>
            <el-menu-item index="/user-pwd"><i class="el-icon-key"></i>重置密码</el-menu-item>
          </el-submenu>
          <el-menu-item index="2" @click="logoutFn"><i class="el-icon-switch-button"></i>退出</el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside width="200px">
          <!-- 左侧边栏的用户信息 -->
          <div class="user-box">
            <img :src="user_pic" alt="" v-if="user_pic" />
            <img src="../../assets/logo.png" alt="" v-else />
            <span>欢迎 {{ nickname || username }}</span>
          </div>
          <el-menu default-active="/home" class="el-menu-vertical-demo" background-color="#23262E" text-color="#fff" active-text-color="#409EFF" unique-opened router>
            <template v-for="item in menus">
              <el-menu-item v-if="!item.children" :index="item.indexPath" :key="item.indexPath">
                <i :class="item.icon"></i>{{ item.title }}
              </el-menu-item>

              <el-submenu v-else :index="item.indexPath" :key="item.indexPath">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{ item.title }}</span>
                </template>
                <el-menu-item :index="subItem.indexPath" v-for="subItem in item.children" :key="subItem.indexPath">
                  <i :class="subItem.icon"></i>{{ subItem.title }}
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <el-container>
          <!-- 页面主体区域 -->
          <el-main>
            <router-view></router-view>
          </el-main>
          <!-- 底部 footer 区域 -->
          <el-footer>© www.itheima.com - 黑马程序员</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getMenusAPI } from '@/api'
export default {
  name: 'my-layout',
  components: {

  },
  mixins: [],
  props: {

  },
  data () {
    return {
      menus: []
    }
  },
  created () {
    if (this.username) {
      this.getMenusListFn()
    }
  },
  computed: {
    ...mapGetters(['nickname', 'username', 'user_pic'])
  },
  watch: {

  },
  mounted () {

  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    logoutFn () {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('updateToken', '')
        this.$store.commit('getUserInfo', '')
        this.$router.push('/login')
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出登录'
        })
      })
    },
    async getMenusListFn () {
      const res = await getMenusAPI()
      this.menus = res.data.data
    }
  }
}
</script>
<style lang='less' scoped>
.main-container {
  height: 100vh;
  .el-header,
  .el-aside {
    background-color: #23262e;
    .el-submenu,
    .el-menu-item {
      width: 200px;
      user-select: none;
    }
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}

.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
</style>
