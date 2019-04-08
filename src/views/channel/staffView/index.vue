<template>
  <div class="app-container">
    <div class="app-content">
      <div style="padding-bottom:5px;overflow:hidden;">
        <div style="float:left;">
          <el-button type="primary" style="margin-bottom: 10px;" @click="showAddStaff = true">添加员工</el-button>
        </div>
        <div style="float:right;color:gray;font-size:0.9rem;">
        </div>
      </div>


      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        stripe
        border
        fit
        highlight-current-row>
        <el-table-column align="center" label="ID" width="50">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>

        <el-table-column show-overflow-tooltip label="登录账号" align="center">
          <template slot-scope="scope">
            {{ scope.row.account }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="员工姓名" align="center">
          <template slot-scope="scope">
            {{ scope.row.user_name }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="最后登录时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.last_login_time }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="状态" align="center">
          <template slot-scope="scope">

              <el-button v-if="scope.row.state == 1" size="mini" type="success"  @click="disenable(scope.$index, scope.row)">已启用</el-button>
              <el-button v-if="scope.row.state == 2" size="mini" type="danger" @click="disenable(scope.$index, scope.row)">已禁用</el-button>

          </template>
        </el-table-column>

        <el-table-column width="200" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
            </el-button-group>


          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrap">
        <el-pagination
          :total="total"
          :current-page.sync="postData.page"
          background
          layout="prev, pager, next, jumper"
          @current-change="changePage">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :visible.sync="showEditStaff"
      title="修改元信息"
      width="30%">
      <div>
        <el-form ref="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="editStaff.user_name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="editStaff.password"></el-input>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditStaff = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="showAddStaff"
      title="添加员工账号"
      width="30%">
      <div>
        <el-form ref="form" label-width="100px">
          <el-form-item label="员工姓名">
            <el-input v-model="addStaff.user_name"></el-input>
          </el-form-item>
          <el-form-item label="登录账号">
            <el-input v-model="addStaff.account"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input v-model="addStaff.password"></el-input>
          </el-form-item>

        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddStaff = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script type="text/javascript">
  import { getStaffList, changeStaffInfo, addStaffInfo,disenableStaff } from '@/api/staff'
  import Clipboard from 'clipboard'

  export default {
    name: 'StaffView',
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger',
          da: 'riqi'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        dateTitle: [],
        list: null,
        listLoading: true,
        showEditStaff: false,
        showAddStaff: false,
        total: 0,
        postData: {
          page: 1
        },
        editStaff: {
          user_name: '',
          price: '',
          id: 0
        },
        addStaff: {
          user_name: '',
          price: '',
          account: '',
          password: ''
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getStaffList(this.postData).then(response => {
          this.list = response.data
          this.total = response.meta.pagination.total
          this.listLoading = false

        })
      },
      changePage(page) {
        this.postData.page = page
        this.fetchData()
      },
      handleEdit(idx, row) {

        this.editStaff.user_name = row.user_name
        this.editStaff.price = row.price
        this.editStaff.id = row.id
        this.showEditStaff = true
      },
      disenable(idx, row) {
        disenableStaff(row.id).then(response => {
          console.log(response.id);
          for(var p in this.list)
          {
            if(this.list[p].id == response.id)
            {
              this.list[p].state = response.state;
            }
          }
        });
      },
      submitEdit() {
        changeStaffInfo(this.editStaff.id, this.editStaff).then(response => {
          if (response.id != undefined) {
            this.showEditStaff = false
            this.editStaff.id = null
            this.editStaff.user_name = ''
            for(var p in this.list)
            {
              if(this.list[p].id == response.id)
              {
                this.list[p].user_name = response.user_name;
              }
            }
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '修改失败'
            })
          }
        })
      },
      submitAdd() {
        addStaffInfo(this.addStaff).then(response => {
          if (response.id != undefined) {
            this.showAddStaff = false
            this.addStaff.price = ''
            this.addStaff.id = null
            this.addStaff.user_name = ''
            this.addStaff.password = ''
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$notify.error({
              title: '错误',
              message: '添加失败'
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .app-content {
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
