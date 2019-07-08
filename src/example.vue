<script>
import Schedule from "../../components/Schedule/index.vue";
import moment from "moment";

export default {
  name: "order-schedule",
  components: {
    Schedule
  },
  data() {
    return {
      month: "",
      rows: []
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
      console.log("获取数据:", date);
      // 从接口获取数据
      this.rows = [
        { key: 1, title: "01号广告位", 
          events:{
            20190701:{sn:'订单号1213121',type:'order'},
            20190702:{sn:'订单号1213122',type:'ssp'},
            20190703:{sn:'订单号1213123',type:'order'},
            20190720:{sn:'订单号1213155',type:'order'},
          }
        },
        { key: 2, title: "02号广告位",
          events:{
            20190710:{sn:'订单号1213121',type:'order'},
            20190711:{sn:'订单号1213122',type:'ssp'},
            20190712:{sn:'订单号1213123',type:'order'},
            20190713:{sn:'订单号1213155',type:'order'},
          }
        },
        { key: 3, title: "03号广告位",
          events:{
            20190701:{sn:'订单号1213121',type:'order'},
          }
        },
        { key: 4, title: "04号广告位", 
         events:{
            20190720:{sn:'订单号1213121',type:'review'},
            20190721:{sn:'订单号1213121',type:'review'},
            20190722:{sn:'订单号1213121',type:'review'},
            20190723:{sn:'订单号1213121',type:'review'},
            20190724:{sn:'订单号1213121',type:'review'},
            20190725:{sn:'订单号1213121',type:'review'},
          }
        },
        { key: 5, title: "05号广告位",
        events:{
            20190820:{sn:'订单号1213121',type:'ssp'},
            20190821:{sn:'订单号1213121',type:'ssp'},
            20190822:{sn:'订单号1213121',type:'ssp'},
            20190823:{sn:'订单号1213121',type:'ssp'},
            20190824:{sn:'订单号1213121',type:'ssp'},
            20190825:{sn:'订单号1213121',type:'ssp'},
          }
        },
        { key: 6, title: "06号广告位", 
          events:{
            20190805:{sn:'订单号1213121',type:'order'},
            20190806:{sn:'订单号1213121',type:'order'},
            20190807:{sn:'订单号1213121',type:'order'},
            20190808:{sn:'订单号1213121',type:'order'},
            20190809:{sn:'订单号1213121',type:'order'},
          }
        }
      ];
    },
    // 重写单元格内容,
    cellRender(date, row) {
      // 获取所有事件
      const {events}= row || {};
      
      // 获取当前单元格日期的事件
      const dKey=date.format('YYYYMMDD');
      
      const ev=events && dKey in events?events[dKey]:undefined;
      if (ev) {
        console.log(dKey,ev)
        const {type,sn}=ev || {};
        const typeName=type==='order'?'订单':'SSP';
        return (
          <el-popover
            placement="bottom"
            width="200"
            trigger="click"
            content={`${typeName}号:${sn}`}
          >
            <a slot="reference" class={`tag ${type}`} ></a>
          </el-popover>
        );
      }
      return <div class="tag"></div>;
    },
    onChange(date) {
      //console.log('选择了:',date);
      this.month = date;
      this.getData(this.month);
    }
  }
};
</script>
<template>
  <div class="order-schedule">
    <div class="example">
      图例: 
      <el-tag type="danger">预购</el-tag>
      <el-tag type="success">订单订购</el-tag>
      <el-tag type="warning">SSP占用</el-tag>
      <el-tag type="info">空闲</el-tag>
    </div>
    <Schedule title="广告位名称" :month="month" :rows="rows" :cellRender="cellRender" @change="onChange" />
  </div>
</template>
<style scoped>
.order-schedule{
  margin:25px;
}
.example{
  margin:15px;
  float: right;
  font-size: 12px;
}
.sc-schedule .cell .tag {
  display: inline-block;
  height: 100%;
  width: 100%;
}

.sc-schedule .cell .tag,
.example .tag
{
  background: #fff;
}

.sc-schedule .cell .tag.review{
  background-color: rgba(245,108,108,.4);
  border-color: rgba(245,108,108,.2);
}
.sc-schedule .cell .tag.order,
.example .tag.order
{
  background-color: rgba(103,194,58,.4);
  border-color: rgba(103,194,58,.2);
}

.sc-schedule .cell .tag.ssp,
.example .tag.ssp
{
    background-color: rgba(230,162,60,.4);
    border-color: rgba(230,162,60,.2);
}
</style>



