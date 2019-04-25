<template>
  <div class="app-container">
    <div class="app-content">
      <div style="padding-bottom:5px;overflow:hidden;">

        <div style="float:right">
          <el-form ref="form" :inline="true" :model="postData" class="demo-form-inline">

            <el-form-item label="产品名称">
              <el-input v-model="postData.keyword">
                <el-button slot="append" icon="el-icon-search" @click="search"/>
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
        <el-table-column align="center" label="ID">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>

        </el-table-column>
        <el-table-column align="center" label="产品名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>

        </el-table-column>
        <el-table-column :label="dateTitle[0]" align="center">
          <template slot-scope="scope">
            {{ scope.row.analysis[0].count }}
          </template>
        </el-table-column>
        <el-table-column :label="dateTitle[1]" align="center">
          <template slot-scope="scope">
            {{ scope.row.analysis[1].count }}
          </template>
        </el-table-column>
        <el-table-column :label="dateTitle[2]" align="center">
          <template slot-scope="scope">
            {{ scope.row.analysis[2].count }}
          </template>
        </el-table-column>
        <el-table-column :label="dateTitle[3]" align="center">
          <template slot-scope="scope">
            {{ scope.row.analysis[3].count }}
          </template>
        </el-table-column>
        <el-table-column :label="dateTitle[4]" align="center">
          <template slot-scope="scope">
            {{ scope.row.analysis[4].count }}
          </template>
        </el-table-column>
        <el-table-column :label="dateTitle[5]" align="center">
          <template slot-scope="scope">
            {{ scope.row.analysis[5].count }}
          </template>
        </el-table-column>
        <el-table-column :label="dateTitle[6]" align="center">
          <template slot-scope="scope">
            {{ scope.row.analysis[6].count }}
          </template>
        </el-table-column>

        <el-table-column label="二维码" align="center" width="400">
          <template slot-scope="scope">
            <qrcode
              :value="`http://www.qingbiandai.com/api/redirect?id=${scope.row.qrCodeId}`"
              :options="{ size: 100 }"
              tag="img"
              style="margin: 10px 59px;">
            </qrcode>
          </template>
        </el-table-column>

        <el-table-column v-if="isStaff || isSuper" width="200" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                :data-clipboard-text="`http://www.qingbiandai.com/api/redirect?id=${scope.row.id}`"
                size="mini"
                type="primary"
                class="tag-read"
                @click="copy">复制链接
              </el-button>

            </el-button-group>
          </template>
        </el-table-column>

      </el-table>

    </div>
    <img id="canvas" style="display:none;"></img>
  </div>
</template>
<script type="text/javascript">
import { analysis } from '@/api/market'
import Clipboard from 'clipboard'
import Qrcode from '@chenfengyuan/vue-qrcode'
export default {
  name: 'MarketView',
  components: {
    Qrcode
  },
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
      isStaff: true,
      list: [],
      listLoading: true,
      total: 0,
      dateTitle: [],
      postData: {
        page: 1,
        keyword: '',
        state: 'all'
      }
    }
  },
  watch: {
    // list:function(){
    //   for(var p in this.list)
    //   {
    //     console.log(this.list[p].logo);
    //     var logo = this.list[p].logo;
    //     var url = 'http://www.qingbiandai.com/api/redirect?id='+this.list[p].id;
    //     // QrCodeWithLogo.toImage({
    //     //   image: this.list[p].qrCodeId,
    //     //   content: url,
    //     //   width: 380,
    //     //   logo: {
    //     //     src: logo,
    //     //     radius: 8
    //     //   }
    //     // });
    //   }
    // }
  },
  created() {
    if (localStorage.getItem('role') == 'super') {
      this.isSuper = true
    } else if (localStorage.getItem('role') == 'staff') {
      this.isStaff = true
    }
    var dateObject = new Date()
    // 今天
    dateObject.setDate(dateObject.getDate())
    this.dateTitle.push((dateObject.getMonth() + 1) + '月' + (dateObject.getDate()) + '日')

    // 昨天
    dateObject.setDate(dateObject.getDate() - 1)
    this.dateTitle.push((dateObject.getMonth() + 1) + '月' + (dateObject.getDate()) + '日')
    // 前天
    dateObject.setDate(dateObject.getDate() - 1)
    this.dateTitle.push((dateObject.getMonth() + 1) + '月' + (dateObject.getDate()) + '日')
    // 大前天
    dateObject.setDate(dateObject.getDate() - 1)
    this.dateTitle.push((dateObject.getMonth() + 1) + '月' + (dateObject.getDate()) + '日')
    dateObject.setDate(dateObject.getDate() - 1)
    this.dateTitle.push((dateObject.getMonth() + 1) + '月' + (dateObject.getDate()) + '日')
    dateObject.setDate(dateObject.getDate() - 1)
    this.dateTitle.push((dateObject.getMonth() + 1) + '月' + (dateObject.getDate()) + '日')
    dateObject.setDate(dateObject.getDate() - 1)
    this.dateTitle.push((dateObject.getMonth() + 1) + '月' + (dateObject.getDate()) + '日')

    this.fetchData()

    // const myCanvas = document.createElement('canvas')
    // document.body.appendChild(myCanvas)
    //
    // QrCodeWithLogo.toCanvas({
    //   canvas: canvas,
    //   content: 'https://cdn.blog.cloudself.cn',
    //   width: 380,
    //   logo: {
    //     src: 'http://mweb.aoxiang.me/Fpapf1EhFql0m1iEyMLAdgoBfnkQ',
    //     radius: 8
    //   }
    // })
  },
  methods: {
    search() {
      this.postData.page = 1
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      analysis(this.postData).then(response => {
        for (var p in response) {
          response[p].qrCodeId = 'qrcode_' + response[p].id
        }
        this.list = response
        this.listLoading = false
        const _this = this
        setTimeout(function() {
          _this.createQrCode()
        }, 1000)
      })

      // ,
      // changePage(page) {
      //   this.postData.page = page
      //   this.fetchData()
      // }
    }, copy() {
      const clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$notify({
          title: '成功',
          message: '复制成功！',
          type: 'success'
        })
        clipboard.destroy()
      })
      clipboard.on('error', err => {
        this.$notify({
          title: '失败',
          message: '该浏览器不支持自动复制！',
          type: 'error'
        })
        clipboard.destroy()
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
