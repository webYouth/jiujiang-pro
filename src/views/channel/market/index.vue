<template>
  <div class="app-container">
    <div class="app-content">
      <div style="padding-bottom:5px;overflow:hidden;">
        <div style="float:left;">
          <el-button type="primary" style="margin-bottom: 10px;" @click="showAddMarket = true">添加超市</el-button>
        </div>
        <div style="float:right">
          <el-form ref="form" :inline="true" class="demo-form-inline" :model="postData">

            <el-form-item label="产品名称">
              <el-input v-model="postData.keyword">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>

            </el-form-item>

            <el-form-item label="上下架状态">
              <el-radio-group v-model="postData.state" @change="search">
                <el-radio-button label="all">全部</el-radio-button>
                <el-radio-button label="1">已上架</el-radio-button>
                <el-radio-button label="2">已下架</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>

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
        <el-table-column show-overflow-tooltip label="超市名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="描述说明" width="250">
          <template slot-scope="scope">
            <p style="white-space: normal;">{{ scope.row.description }}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip label="Logo" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.logo" width="80px" height="80px">
          </template>
        </el-table-column>
        <el-table-column label="额度">
          <template slot-scope="scope">
            {{ scope.row.amount }}
          </template>
        </el-table-column>
        <el-table-column label="费率">
          <template slot-scope="scope">
            {{ scope.row.cost }}
          </template>
        </el-table-column>

        <el-table-column label="注册量">
          <template slot-scope="scope">
            {{ scope.row.user }}
          </template>
        </el-table-column>
        <el-table-column label="链接">
          <template slot-scope="scope">
            <a :href="scope.row.url" target="_blank">{{ scope.row.url }}</a>
          </template>
        </el-table-column>
        <el-table-column label="是否热门">
          <template slot-scope="scope">
            <el-button v-if="scope.row.is_hot == 1" size="mini" type="success" @click="setHot(scope.row)">是</el-button>
            <el-button v-if="scope.row.is_hot == 2" size="mini" type="danger" @click="setHot(scope.row)">否</el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否推荐">
          <template slot-scope="scope">
            <el-button v-if="scope.row.is_recommend == 1" size="mini" type="success" @click="setRecommend(scope.row)">
              是
            </el-button>
            <el-button v-if="scope.row.is_recommend == 2" size="mini" type="danger" @click="setRecommend(scope.row)">否
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否上架">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state == 1" size="mini" type="success" @click="setState(scope.row)">
              是
            </el-button>
            <el-button v-if="scope.row.state == 2" size="mini" type="danger" @click="setState(scope.row)">否
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            {{ scope.row.sort }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
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
          @current-change="changePage"/>
      </div>
    </div>

    <el-dialog
      :visible.sync="showEditMarket"
      title="修改超市"
      width="50%">
      <div>
        <el-form ref="form" label-width="100px">
          <el-form-item label="超市名">
            <el-input v-model="editMarket.name"/>
          </el-form-item>
          <el-form-item label="超市说明">
            <el-input v-model="editMarket.description"/>
          </el-form-item>
          <el-form-item label="logo">
            <el-input v-model="editMarket.logo"/>
          </el-form-item>
          <el-form-item label="额度">
            <el-input v-model="editMarket.amount"/>
          </el-form-item>
          <el-form-item label="费率">
            <el-input v-model="editMarket.cost"/>
          </el-form-item>
          <el-form-item label="链接">
            <el-input v-model="editMarket.url"/>
          </el-form-item>
          <el-form-item label="申请人数">
            <el-input v-model="editMarket.user"/>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="editMarket.sort"/>
          </el-form-item>
          <el-form-item label="是否热门">
            <el-radio-group v-model="editMarket.is_hot">
              <el-radio-button label="1">是</el-radio-button>
              <el-radio-button label="2">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否推荐">
            <el-radio-group v-model="editMarket.is_recommend">
              <el-radio-button label="1">是</el-radio-button>
              <el-radio-button label="2">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditMarket = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="showAddMarket"
      title="添加超市"
      width="50%">
      <div>
        <el-form ref="form" label-width="100px">
          <el-form-item label="超市名">
            <el-input v-model="addMarket.name"/>
          </el-form-item>
          <el-form-item label="超市说明">
            <el-input v-model="addMarket.description"/>
          </el-form-item>
          <el-form-item label="logo">
            <el-input v-model="addMarket.logo"/>
          </el-form-item>
          <el-form-item label="额度">
            <el-input v-model="addMarket.amount"/>
          </el-form-item>
          <el-form-item label="费率">
            <el-input v-model="addMarket.cost"/>
          </el-form-item>
          <el-form-item label="链接">
            <el-input v-model="addMarket.url"/>
          </el-form-item>
          <el-form-item label="申请人数">
            <el-input v-model="addMarket.user"/>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="addMarket.sort"/>
          </el-form-item>
          <el-form-item label="是否热门">
            <el-radio-group v-model="addMarket.is_hot">
              <el-radio-button label="1">是</el-radio-button>
              <el-radio-button label="2">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否推荐">
            <el-radio-group v-model="addMarket.is_recommend">
              <el-radio-button label="1">是</el-radio-button>
              <el-radio-button label="2">否</el-radio-button>
            </el-radio-group>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddMarket = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script type="text/javascript">
  import { getMarketList, changeMarketInfo, addMarketInfo } from '@/api/market'
  import Clipboard from 'clipboard'

  export default {
    name: 'MarketView',
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

        isSuper: false,
        dateTitle: [],
        list: null,
        listLoading: true,
        showEditMarket: false,
        showAddMarket: false,
        total: 0,
        postData: {
          page: 1,
          keyword: '',
          state: 'all'
        },
        editMarket: {},
        addMarket: {
          is_hot: 1,
          is_recommend: 1
        }
      }
    },
    created() {
      if (localStorage.getItem('role') == 'super') {
        this.isSuper = true
      } else if (localStorage.getItem('role') == 'staff') {
        this.isStaff = true
      }
      this.fetchData()
    },
    methods: {
      search() {
        this.postData.page = 1
        this.fetchData()
      },
      fetchData() {
        this.listLoading = true
        getMarketList(this.postData).then(response => {
          this.list = response.data
          this.total = response.meta.pagination.total
          this.listLoading = false
          console.log(this.list)
        })
      },
      setState(e) {
        this.editMarket = e
        this.editMarket.state = e.state == 1 ? 2 : 1
        this.submitEdit()
      },
      setHot(e) {
        this.editMarket = e
        console.log(this.editMarket)
        this.editMarket.is_hot = e.is_hot == 1 ? 2 : 1
        this.submitEdit()
      },
      setRecommend(e) {
        this.editMarket = e
        this.editMarket.is_recommend = e.is_recommend == 1 ? 2 : 1
        this.submitEdit()
      },
      changePage(page) {
        this.postData.page = page
        this.fetchData()
      },
      handleEdit(idx, row) {
        this.editMarket = row
        this.showEditMarket = true
      },
      submitEdit() {
        changeMarketInfo(this.editMarket.id, this.editMarket).then(response => {
          if (response.id != undefined) {
            this.showEditMarket = false
            for (var p in this.list) {
              if (this.list[p].id == this.editMarket.id) {
                this.list[p] = this.editMarket
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
        console.log(this.addMarket)
        addMarketInfo(this.addMarket).then(response => {
          if (response.id != undefined) {
            this.showAddMarket = false
            this.addMarket.price = ''
            this.addMarket.id = null
            this.addMarket.user_name = ''
            this.addMarket.password = ''
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
