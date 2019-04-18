<template>
  <div class="app-container">
    <div class="app-content">

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
        <el-table-column align="center" :label="dateTitle[0]">
          <template slot-scope="scope">
            {{ scope.row.analysis[0].count }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="dateTitle[1]">
          <template slot-scope="scope">
            {{ scope.row.analysis[1].count }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="dateTitle[2]">
          <template slot-scope="scope">
            {{ scope.row.analysis[2].count }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="dateTitle[3]">
          <template slot-scope="scope">
            {{ scope.row.analysis[3].count }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="dateTitle[4]">
          <template slot-scope="scope">
            {{ scope.row.analysis[4].count }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="dateTitle[5]">
          <template slot-scope="scope">
            {{ scope.row.analysis[5].count }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="dateTitle[6]">
          <template slot-scope="scope">
            {{ scope.row.analysis[6].count }}
          </template>
        </el-table-column>

      </el-table>

    </div>


  </div>
</template>
<script type="text/javascript">
  import { analysis } from '@/api/market'

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
        list: null,
        listLoading: true,
        total: 0,
        dateTitle: [],
        postData: {
          page: 1
        }
      }
    },
    created() {
      if (localStorage.getItem('role') == 'super') {
        this.isSuper = true
      } else if (localStorage.getItem('role') == 'staff') {
        this.isStaff = true
      }
      var dateObject = new Date()
      //今天
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
    },
    methods: {
      fetchData() {
        this.listLoading = true
        analysis(this.postData).then(response => {
          this.list = response
          this.listLoading = false

        })

        // ,
        // changePage(page) {
        //   this.postData.page = page
        //   this.fetchData()
        // }
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
