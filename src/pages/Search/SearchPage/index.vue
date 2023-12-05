<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPage',pageNo - 1)">上一页</button>
    <button v-if="startAndEnd.start > 1" @click="$emit('getPage',1)">1</button>
    <button v-if="startAndEnd.start > 2">···</button>
    <!-- 分页中部结构 -->
    <button
      v-if="page >= startAndEnd.start"
      v-for="(page, index) in startAndEnd.end"
      :key="index"
      @click="getNo(page)"
      :class="{btn:pageNo == page}"
    >
      {{ page }}
    </button>

    <button v-if="startAndEnd.end < total - 1">···</button>
    <button v-if="startAndEnd.end < total" @click="$emit('getPage',total)">{{total}}</button>
    <button @click="$emit('getPage',pageNo + 1)" :disabled="pageNo == total">下一页</button>

    <button style="margin-left: 30px">共 60 条</button>
  </div>
</template>

<script>
export default {
  props: ["pageNo", "pageSize", "total", "coutinues"],
  name: "SearchPage",
  computed: {
    startAndEnd() {
      let start = 0,
        end = 0;
      const { pageNo, pageSize, total, coutinues } = this;
      if (coutinues > total) {
        start = 1;
        end = total;
      } else {
        start = pageNo - parseInt(coutinues / 2);
        end = pageNo + parseInt(coutinues / 2);
      }
      if (start < 1) {
        start = 1;
        end = coutinues;
      }
      if (end > total) {
        end = total;
        start = total - coutinues + 1;
      }
      return { start, end };
    },
  },
  methods: {
    getNo(page){
      this.$emit("getPage",page)
    }
  },
};
</script>

<style lang="less" scope>
.pagination {
  text-align: center;
  .btn{
    background-color: #ff8000;
    color: white;
  }
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>