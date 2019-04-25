<template>
  <div>
    <el-dialog :visible.sync="showPasswordModal" title="修改密码" width="50%">
      <div>
        <el-form ref="form" label-width="150px">
          <el-form-item label="旧密码">
            <el-input v-model="editPassword.old_password"/>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="editPassword.password" type="password"/>
          </el-form-item>
          <el-form-item label="重复输入新密码">
            <el-input v-model="editPassword.password_confirmation" type="password"/>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showPasswordModal = false">取 消</el-button>
        <el-button type="primary" @click="changePassword">确 定</el-button>
      </span>
    </el-dialog>

    <div class="navbar">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
      <breadcrumb />

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span style="line-height:50px;display:block;float:left;padding:0px 20px;">{{ user_name }}</span>
          <img v-if="checkPermission(['staff'])" src="https://tvax2.sinaimg.cn/crop.0.0.512.512.180/b6475437ly8g20u4imk4yj20e80e8dgi.jpg" class="user-avatar">
          <img v-if="checkPermission(['super'])" src="https://tvax4.sinaimg.cn/crop.0.0.1080.1080.180/9bf2cd1ely8g1q6qkvdjxj20u00u0n0d.jpg" class="user-avatar">
          <img v-if="checkPermission(['channel'])" src="https://tvax4.sinaimg.cn/crop.0.0.1242.1242.180/6842019aly8fon6sygphgj20yi0yiaf0.jpg" class="user-avatar">
          <img v-if="checkPermission(['marketStaff'])" src="https://tvax4.sinaimg.cn/crop.0.0.1242.1242.180/6842019aly8fon6sygphgj20yi0yiaf0.jpg" class="user-avatar">

          <!--<i class="el-icon-caret-bottom"/>-->
          <span style="line-height:50px;display:block;float:right;padding:0px 20px;">
            <el-button type="text" @click="showPasswordModal = true">修改密码</el-button>
            <el-button type="text" @click="logout">注销</el-button>
          </span>
        </div>
        <!--<el-dropdown-menu slot="dropdown" class="user-dropdown">-->
        <!--<router-link class="inlineBlock" to="/">-->
        <!--<el-dropdown-item>-->
        <!--首页-->
        <!--</el-dropdown-item>-->
        <!--</router-link>-->

        <!--<el-dropdown-item divided>-->
        <!--<span style="display:block;" @click="logout">注销</span>-->
        <!--</el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
      </el-dropdown>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { checkPermission } from '../../../utils/auth'
import { changePassword } from '../../../api/login'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      user_name: '',
      showPasswordModal: false,
      editPassword: {
        old_password: '',
        new_password: '',
        password_confirmation: ''

      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {
    this.user_name = localStorage.getItem('user_name')
  },
  methods: {
    checkPermission,
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    changePassword() {
      changePassword(this.editPassword).then(response => {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        })
        this.showPasswordModal = false
        this.editPassword = {
          old_password: '',
          new_password: '',
          password_confirmation: ''

        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

