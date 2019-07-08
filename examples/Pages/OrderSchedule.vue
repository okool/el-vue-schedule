<script>
// import Schedule from "../../plugins/Schedule";

import moment from "moment";
import Schedule from '../../packages/index.js'
//import Schedule from '../../lib/main.common.js'

export default {
  name: "OrderSchedule",
  components:{
      [Schedule.name]:Schedule
  },
  data() {
    return {
      month: "",
      rows: [],
      selectId: undefined,
      startDate: undefined,
      endDate: undefined
    };
  },
  mounted() {
    // 初始化月份
    this.month = moment().format("YYYY-MM");
    this.getData(this.month);
  },
  methods: {
    // 获取数据
    getData(date) {
      // console.log("获取数据:", date);
      // 从接口获取数据
      this.rows = [
        {
          key: 1,
          title: "01号广告位",
          events: {
            20190701: { sn: "订单号1213121", type: "order" },
            20190702: { sn: "订单号1213122", type: "ssp" },
            20190703: { sn: "订单号1213123", type: "order" },
            20190720: { sn: "订单号1213155", type: "order" }
          }
        },
        {
          key: 2,
          title: "02号广告位",
          events: {
            20190710: { sn: "订单号1213121", type: "order" },
            20190711: { sn: "订单号1213122", type: "ssp" },
            20190712: { sn: "订单号1213123", type: "order" },
            20190713: { sn: "订单号1213155", type: "order" }
          }
        },
        {
          key: 3,
          title: "03号广告位",
          events: {
            20190701: { sn: "订单号1213121", type: "order" }
          }
        },
        {
          key: 4,
          title: "04号广告位",
          events: {
            20190720: { sn: "订单号1213121", type: "review" },
            20190721: { sn: "订单号1213121", type: "review" },
            20190722: { sn: "订单号1213121", type: "review" },
            20190723: { sn: "订单号1213121", type: "review" },
            20190724: { sn: "订单号1213121", type: "review" },
            20190725: { sn: "订单号1213121", type: "review" }
          }
        },
        {
          key: 5,
          title: "05号广告位",
          events: {
            20190820: { sn: "订单号1213121", type: "ssp" },
            20190821: { sn: "订单号1213121", type: "ssp" },
            20190822: { sn: "订单号1213121", type: "ssp" },
            20190823: { sn: "订单号1213121", type: "ssp" },
            20190824: { sn: "订单号1213121", type: "ssp" },
            20190825: { sn: "订单号1213121", type: "ssp" }
          }
        },
        {
          key: 6,
          title: "06号广告位",
          events: {
            20190805: { sn: "订单号1213121", type: "order" },
            20190806: { sn: "订单号1213121", type: "order" },
            20190807: { sn: "订单号1213121", type: "order" },
            20190808: { sn: "订单号1213121", type: "order" },
            20190809: { sn: "订单号1213121", type: "order" }
          }
        }
      ];
    },
    // 重写单元格内容,
    cellRender(date, row) {
      const _this = this;
      // 获取所有事件
      const { key, events } = row || {};

      // 获取当前单元格日期的事件
      const dKey = date.format("YYYYMMDD");

      const ev = events && dKey in events ? events[dKey] : undefined;
      const { type = "", sn } = ev || {};

      
      // 过期
      let disable = "";
      if (moment().isAfter(date)) {
        disable = "disabled";
      }

      // 选中判断
      let active = "";
      if (key === _this.selectId && !type && !disable) {
        active =
          date.isSame(_this.startDate, "day") ||
          date.isSame(_this.endDate, "day") ||
          date.isBetween(_this.startDate, _this.endDate, "day")
            ? "active"
            : "";
      }

      const thisDate = date.format("YYYY-MM-DD");
      return (
        <div
          class={`tag ${type} ${active} ${disable}`}
          onClick={_ => {
            (!type && !disable) && _this.onSelect(thisDate, row);
          }}
        >
          {dKey}
        </div>
      );
    },
    onChange(date) {
      //console.log('选择了:',date);
      this.month = date;
      this.getData(this.month);
    },
    // 当选择
    onSelect(date, row) {
      const { key } = row || {};
      // 禁此选择
      if (moment().isAfter(date)) {
        return;
      }
      // first click
      if (!this.startDate || this.selectId !== key) {
        this.startDate = date;
        this.endDate = date;
        this.selectId = key;
      } else {
        if (date > this.startDate) {
          this.endDate = date;
        } else {
          this.endDate = this.startDate;
          this.startDate = date;
        }
      }
      console.log(this.selectId, this.startDate, this.endDate);
    }
  }
};
</script>
<template>
  <div class="order-schedule">
    <div >
      <span class="example">图例:
      <i class="el-icon-star-on" /> 已选择
      <el-tag type="danger">预购</el-tag>
      <el-tag type="success">订单订购</el-tag>
      <el-tag type="warning">SSP占用</el-tag>
      <el-tag type="info">空闲</el-tag>
      </span>
    </div>
    <div>
    <ac-schedule
      title="广告位名称"
      :month="month"
      :rows="rows"
      :cellRender="cellRender"
      @change="onChange"
    />
    </div>
  </div>
</template>
<style scoped>
.order-schedule {
  margin: 25px;
}
.example {
  margin: 15px;
  float: right;
  font-size: 12px;
  clear: both;
}
.sc-schedule .cell .tag {
  display: inline-block;
  height: 100%;
  width: 100%;
}

.sc-schedule .cell .tag,
.example .tag {
  background: #fff;
  font-size:0;
}

.sc-schedule .cell .tag.active {
  background: rgb(3, 117, 247);
  line-height: 30px;
}

.sc-schedule .cell .tag.active::after {
  font-size: 14px;
  line-height: 30px;
  font-family: "element-icons" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  content: "\e797";
  color: #fff;
}

.sc-schedule .cell .tag.disabled {
  background: #ccc;
}

.sc-schedule .cell .tag.review {
  background-color: rgba(245, 108, 108, 0.4) !important;
  border-color: rgba(245, 108, 108, 0.2);
}
.sc-schedule .cell .tag.order,
.example .tag.order {
  background-color: rgba(103, 194, 58, 0.4) !important;
  border-color: rgba(103, 194, 58, 0.2);
}

.sc-schedule .cell .tag.ssp,
.example .tag.ssp {
  background-color: rgba(230, 162, 60, 0.4) !important;
  border-color: rgba(230, 162, 60, 0.2);
}
</style>



