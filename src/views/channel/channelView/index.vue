<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 10px;" @click="showAddChannel = true">添加渠道</el-button>
    <div class="app-content">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        stripe
        border
        fit
        highlight-current-row>
        <el-table-column align="center" label="渠道ID" >
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="渠道名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.user_name }}
          </template>
        </el-table-column>
        <el-table-column label="合作价格">
          <template slot-scope="scope">
            {{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column label="今日UV数">
          <template slot-scope="scope">
            {{ scope.row.today_uv }}
          </template>
        </el-table-column>
        <el-table-column label="总UV数">
          <template slot-scope="scope">
            {{ scope.row.all_uv }}
          </template>
        </el-table-column>
        <el-table-column label="昨天UV数">
          <template slot-scope="scope">
            {{ scope.row.data[0].uv }}
          </template>
        </el-table-column>
        <el-table-column label="前天UV数">
          <template slot-scope="scope">
            {{ scope.row.data[1].uv }}
          </template>
        </el-table-column>
        <el-table-column label="大前天UV数">
          <template slot-scope="scope">
            {{ scope.row.data[2].uv }}
          </template>
        </el-table-column>



        <el-table-column label="今日收入">
          <template slot-scope="scope">
            {{ scope.row.today_amount }}
          </template>
        </el-table-column>
        <el-table-column label="总收入">
          <template slot-scope="scope">
            {{ scope.row.all_amount }}
          </template>
        </el-table-column>
        <el-table-column width="200" label="操作">
          <template slot-scope="scope" >
            <el-button-group>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button
                :data-clipboard-text="`http://d.bepei.com/index.html?channel_id=${scope.row.id}`"
                size="mini"
                type="primary"
                class="tag-read"
                @click="copy">复制渠道链接</el-button>
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
      :visible.sync="showEditChannel"
      title="修改渠道信息"
      width="30%">
      <div>
        <el-form ref="form" label-width="80px">
          <el-form-item label="渠道名">
            <el-input v-model="editChannel.user_name"></el-input>
          </el-form-item>
          <el-form-item label="渠道价格">
            <el-input v-model="editChannel.price"></el-input>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditChannel = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="showAddChannel"
      title="添加渠道"
      width="30%">
      <div>
        <el-form ref="form" label-width="200px">
          <el-form-item label="渠道名">
            <el-input v-model="addChannel.user_name"></el-input>
          </el-form-item>
          <el-form-item label="渠道登录账号">
            <el-input v-model="addChannel.account"></el-input>
          </el-form-item>
          <el-form-item label="渠道登录密码">
            <el-input v-model="addChannel.password"></el-input>
          </el-form-item>
          <el-form-item label="渠道价格">
            <el-input v-model="addChannel.price"></el-input>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddChannel = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script type="text/javascript">
import { getChannelList, changeChannelInfo, addChannelInfo } from '@/api/channel'
import Clipboard from 'clipboard'

export default {
  name: 'ChannelView',
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
      list: null,
      listLoading: true,
      showEditChannel: false,
      showAddChannel: false,
      total: 0,
      postData: {
        page: 1
      },
      editChannel: {
        user_name: '',
        price: '',
        id: 0
      },
      addChannel: {
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
      getChannelList(this.postData).then(response => {
        this.list = response.data
        this.total = response.meta.pagination.total
        this.listLoading = false
      })
    },
    changePage(page) {
      this.postData.page = page
      this.fetchData()
    },
    copy() {
      const clipboard = new Clipboard('.tag-read')
      clipboard.on( 'success', e =>{
        this.$notify({
          title: '成功',
          message: '复制成功！',
          type: 'success'
        })
        clipboard.destroy()
      })
      clipboard.on( 'error', err => {
        this.$notify({
          title: '失败',
          message: '该浏览器不支持自动复制！',
          type: 'error'
        })
        clipboard.destroy()
      })
    },
    handleEdit(idx, row) {

      this.editChannel.user_name = row.user_name
      this.editChannel.price = row.price
      this.editChannel.id = row.id
      this.showEditChannel = true

    },
    submitEdit() {
      console.log(this.editChannel)
      changeChannelInfo(this.editChannel).then(response => {
        if (response.id != undefined) {
          this.showEditChannel = false
          for (var p in this.list) {
            if (this.list[p].id == this.editChannel.id) {
              this.list[p].price = this.editChannel.price
              this.list[p].user_name = this.editChannel.user_name
            }
          }
          this.editChannel.price = ''
          this.editChannel.id = null
          this.editChannel.user_name = ''
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
      console.log(this.addChannel)
      addChannelInfo(this.addChannel).then(response => {
        if (response.id != undefined) {
          this.showAddChannel = false
          this.addChannel.price = ''
          this.addChannel.id = null
          this.addChannel.user_name = ''
          this.addChannel.password = ''
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
          });
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
