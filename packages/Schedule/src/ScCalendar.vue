<script>
import moment from "moment";
export default {
  name: "ScCalendar",
  props: {
    // 初始月份
    month: {
      type: String,
      required: false
    },
    rows:{
      type: Array,
      required:false,
      default:_=>[]
    },
    cellRender:{
      type: Function,
      required:false
    }
  },
  data() {
    return {
      date: moment(),
      monthStr: ""
    };
  },
  watch: {
    month() {
      this.date = moment(this.month);
    },
    date() {
      this.monthStr = this.date.format("YYYY-MM");
    }
  },

  mounted() {
    if (this.month) {
      this.date = moment(this.month);
    } else {
      this.date = moment();
    }
  },
  methods: {
    setDate(date) {
      this.date = date;
      this.monthStr = this.date.format("YYYY-MM");
      this.$emit('change',this.monthStr)
    },
    prevMonth() {
      this.setDate(this.date.add(-1, "months"));
    },
    nextMonth() {
      this.setDate(this.date.add(1, "months"));
    }
  },
  render(h) {
    // 总天数
    const days = this.date.daysInMonth();

    const randerDays = () => {
      let tds = [];
      let day = 1;
      const date = this.date.date(1).clone();
      for (day; day <= days; day++) {
        const w=date.day();
        const d=date.date();
        const weekEnd= w===0 || w===6?'weekend':'';
        const today=moment().isSame(date, 'day')?'today':''
        tds.push(
          <th class={`${weekEnd} ${today}`} >
            <div class="cell">{d}</div>
          </th>
        );
        date.add(1, "d");
      }
      return tds;
    };
    const randerWeeks = () => {
      let tds = [];
      let day = 1;
      const date = this.date.date(1).clone();
      for (day; day <= days; day++) {
        const w=date.day();
        const str = ["日", "一", "二", "三", "四", "五", "六"][w];
        const weekEnd=w===0 || w===6?'weekend':'';
        tds.push(
          <th class={`${weekEnd}`}>
            <div class="cell">{str}</div>
          </th>
        );
        date.add(1, "d");
      }
      return tds;
    };

    // 渲染单元格
    const cellRender=(date,row)=>{
      if(this.cellRender && typeof(this.cellRender)=='function'){
        return this.cellRender(date,row)
      }
      return ''
    }
    
    // 渲染行
    const rowRender=(row)=>{
      const  cells=[];
      let day=1;
      const date = this.date.date(1).clone();
      for (day; day <= days; day++) {
          cells.push(<td><div class="cell">{cellRender(date,row)}</div></td>)
          date.add(1, "d");
      }
      return  <tr>{cells}</tr>;
    }

    return (
      <div class="sc-calendar">
        <div class="sc-calendar-header">
          <button onClick={this.prevMonth}>上个月</button>
          <span>{this.monthStr}</span>
          <button onClick={this.nextMonth}>下个月</button>
        </div>
        <div class="sc-calendar-table">
          <table cellpadding="0" cellspacing="0">
            <thead>
              <tr>{randerDays()}</tr>
              <tr>{randerWeeks()}</tr>
            </thead>
            <tbody>
                {this.rows && this.rows.map((row)=>{
                    return rowRender(row)
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};
</script>
<style>
.sc-calendar {
  position: relative;
}
.sc-calendar-header,
.sc-calendar-table {
  width: 100%;
}
.sc-calendar-header {
  height: 30px;
  background: #f3f3f3;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sc-calendar-header button{
  margin:2px 5px;
  font-size: 12px;
  padding: 3px 10px;;
}
.sc-calendar-table {
  min-height: 300px;
  overflow: auto;
  padding-bottom: 30px;
}

.sc-calendar-table table {
  table-layout: fixed;
  min-width: 840px;
  border-collapse: collapse;
}

.sc-calendar-table td,
.sc-calendar-table th {
  border: 1px solid rgba(0,0,0,.3);
  vertical-align: middle;
  transition: background-color 0.2s ease;
  overflow: hidden;
  max-height: 30px;
  max-width:30px;
  font-size: 0;
  padding:0;
  margin:0;
}

.sc-calendar-table tr td:first-child,
.sc-calendar-table tr th:first-child {
  border-left: 0;
}
.sc-calendar-table tr td:last-child,
.sc-calendar-table tr th:last-child {
  border-right: 0;
}

.sc-calendar-table table td > .cell,
.sc-calendar-table table th > .cell {
  display: block;
  width: 30px;
  height: 30px;
  text-align: center;
  overflow: hidden;
  text-align: center;
  word-break: keep-all;
  text-overflow: ellipsis;
}

.sc-calendar-table table thead th {
  color: #606266;
  background: #f3f3f3;
  font-size:12px;
  line-height: 30px;
}

.sc-calendar-table table thead .weekend{
  color: #2196F3;
}

.sc-calendar-table table thead  th.today{
    background: #FFEB3B;
    
}

.sc-calendar-table table tbody td,
.sc-calendar-table table tbody th{
  cursor: pointer;
  background: #fff;
}
</style>

