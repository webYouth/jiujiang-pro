<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="渠道ID" >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="渠道名称" width="250" align="center">
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
          {{ scope.row.data[0].uv}}
        </template>
      </el-table-column>
      <el-table-column label="前天UV数">
        <template slot-scope="scope">
          {{ scope.row.data[1].uv}}
        </template>
      </el-table-column>
      <el-table-column label="大前天UV数">
        <template slot-scope="scope">
          {{ scope.row.data[2].uv}}
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
              size="mini"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)">复制渠道链接</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script type="text/javascript">
import {getChannelList} from '@/api/channel';

export default {
  name: 'ChannelView',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger',
        da:'riqi'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getChannelList({}).then(response => {
        this.list = response.data
        console.log(this.list)
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
