<template>
  <div class="real-data">
    <div v-if="isSuper" class="button-line">
      <el-button type="primary" style="margin-right: 10px;" @click="toggleUserType('1')">全部用户</el-button>
      <el-button type="primary" @click="toggleUserType('2')">认证用户</el-button>
    </div>
    <div class="table-content">
      <el-table
        v-loading="listLoading"
        :data="userList"
        element-loading-text="Loading"
        stripe
        border
        fit
        highlight-current-row>
        <el-table-column
          prop="id"
          show-overflow-tooltip
          label="id"
          width="40">
          <template slot-scope="scope">
            <span>{{ scope.row.id || '暂无' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          show-overflow-tooltip
          label="渠道"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.channel || '暂无' }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="name"-->
          <!--show-overflow-tooltip-->
          <!--label="姓名"-->
        <!--&gt;-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.name || '暂无' }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="mobile"
          show-overflow-tooltip
          label="手机号">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile || '暂无' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="isSuper"
          prop="id_card"
          show-overflow-tooltip
          label="身份证">
          <template slot-scope="scope">
            <span>{{ scope.row.id_card || '暂无' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="isSuper"
          prop="education"
          show-overflow-tooltip
          label="学历"
          width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.education || '暂无' }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="alipay_score"-->
        <!--show-overflow-tooltip-->
        <!--label="芝麻信用分"-->
        <!--width="100"  v-if="isSuper">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.alipay_score || '暂无' }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="province"-->
        <!--show-overflow-tooltip-->
        <!--label="城市"  v-if="isSuper">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.province  }}{{ scope.row.city  }}{{ scope.row.area  }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--prop="address"-->
        <!--show-overflow-tooltip-->
        <!--label="地址">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.address || '暂无' }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
        <!--prop="alipay_verify"-->
        <!--show-overflow-tooltip-->
        <!--label="是否认证"-->
        <!--width="180">-->
        <!--<template slot-scope="scope">-->
        <!--<el-tag v-if="scope.row.pay_time" type="success">已认证</el-tag>-->
        <!--<el-tag v-else type="danger">未认证</el-tag>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="created_at"
          show-overflow-tooltip
          label="注册时间" >
          <template slot-scope="scope">
            <span>{{ scope.row.created_at }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrap">
        <el-pagination
          :total="total"
          :current-page.sync="postData.page"
          background
          layout="prev, pager, next, jumper"
          @current-change="changePage"/>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getAllUserList, getVerifyUserList } from '@/api/user'

  export default {
    name: 'index',
    data () {
      return {
        isSuper:false,
        fetchType: '1',
        listLoading: false,
        userList: [],
        postData: {
          page: 1
        },
        total: 0,
      }
    },
    created () {
      if(localStorage.getItem('role') == 'super')
      {
        this.isSuper = true;
      }
    },
    mounted () {
      this.fetchUserData()
    },
    methods: {
      toggleUserType (type) {
        this.fetchType = type
        if (type === '1') {
          this.fetchUserData()
        } else {
          this.fetchVerifyUserData()
        }
      },
      fetchUserData () {
        this.listLoading = true
        getAllUserList(this.postData).then( res => {
          this.userList = res.data
          this.total = res.meta.pagination.total
          this.listLoading = false
        })
      },
      fetchVerifyUserData () {
        this.listLoading = true
        getVerifyUserList(this.postData).then( res => {
          this.userList = res.data
          this.listLoading = false
        })
      },
      changePage (page) {
        this.postData.page = page
        if (this.fetchType === '1') {
          this.fetchUserData()
        } else {
          this.fetchVerifyUserData()
        }
      }
    }
  }
</script>

<style scoped>
.button-line {
  display: flex;
  padding: 0 10px;
  flex-direction: row;
  align-items: center;
  height: 40px;
  margin: 10px 0;
}
  .table-content {
    position: relative;
    padding: 0 10px 60px 10px;
  }
  .page-wrap {
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 10px;
  }
</style>
