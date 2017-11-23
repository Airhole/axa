
<!--********************************************************************
 * Author        : Geyan
 * Email         : geyan@zhongan.io
 * Create Date   : 2017-04-13 18:17
 * Filename      : table.vue
 * Description   : 业务表格组件

********************************************************************-->

<template>
<div class='table_content_sty'>
  <ul class='info-table' :class='{border:hasBorder}'>
    <li class='info-head'>
      <div v-for='item in head' class='info-td'><span>{{ item.name }}</span></div>
    </li>
    <li v-for='line in data' class='info-line'>
      <div v-for='(td,idx) in line' class='info-td' :style='{textAlign:tHeadList[idx].left ? "left" : "center"}'>
        <span :class='{figure:tHeadList[idx].figure}'>{{ td }}</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data: () => {
    return {
      tHeadList: [],
      tBodyList: [],
      hasBorder: false
    }
  },
  props: ['head', 'data', 'border'],
  methods: {},
  created () {
    this.tHeadList = this.head
    this.tBodyList = this.data
    this.hasBorder = this.border ? this.border : false
    console.log(this.data)
  }
}
</script>

<style lang=scss>
.table_content_sty {
    width: rem-calc(344px);
    margin-left: auto;
    margin-right: auto;
    font-weight: bold;
    .info-table {
        width: 100%;
        display: table;
        border-collapse: collapse;
        .info-head,
        .info-line {
            list-style: none;
            display: table-row;
            .info-td {
                display: table-cell;
                padding-top: rem-calc(8px);
                padding-bottom: rem-calc(8px);
                text-align: center;
                vertical-align: middle;
                span {
                  font-size:rem-calc(13px);
                  text-align:center;
                }
            }
        }
        .info-line {
          background-color:#f8f8f8;
          .info-td {
            color:#666;
            span {
              line-height: rem-calc(18px);
            }
          }
          .info-td .figure {
            color:#00aeff;
          }
          &:last-child span{
            word-break:keep-all;
          }
        }
        .info-head {
            background-color: #c3c3c3;
            .info-td {
                margin:0;
                font-size: rem-calc(13px);
                color: #fff;
                border:1px solid #c3c3c3;
                span {
                    word-break: keep-all;
                    line-height: rem-calc(18px);
                    box-sizing: border-box;
                }
            }
        }
    }
    .info-table.border {
      .info-head {
        .info-td {
          border:1px solid #f0f0f0;
        }
      }
      .info-line {
        border:1px solid #f0f0f0;
        .info-td {
          border:1px solid #f0f0f0;
        }
      }
    }
}

</style>
