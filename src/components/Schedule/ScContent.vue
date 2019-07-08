<script>
import moment from "moment";
export default {
  name: "ScContent",
  props: {
    title: {
      type: String,
      default: "名称"
    },
    rows: {
      type: Array,
      required: false,
      default: _ => []
    },
    month:{
      type: String,
      default:''
    }
  },
  data() {
    return {
      date:''
    }
  },
  watch:{
    month(){
      this.date=this.month;
    }
  },
  mounted(){
    this.date=this.month?this.month:moment().format("YYYY-MM")
    console.log(this.date)
  },
  methods:{
    onChange(date){
        this.date=date?moment(date).format("YYYY-MM"):''
        if(this.date){
          this.$emit('change',this.date)
        }
    }
  },
  render(h) {
    return (
      <div class="sc-content">
        <table cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th>
                <div class="cell" style="height:61px;padding: 15px;">
                  <el-date-picker
                    type="month"
                    placeholder="选择月份"
                    size="mini"
                    style="width:170px;"
                    clearable={false}
                    editable={false}
                    value={this.date}
                    onInput={this.onChange}
                  ></el-date-picker>
                </div>
              </th>
            </tr>
            <tr>
              <th>
                <div class="cell">{this.title}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.rows &&
              this.rows.map(row => {
                return (
                  <tr>
                    <td>
                      <div class="cell">{row.title}</div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
};
</script>
<style>
.sc-content {
  width: 200px;
  overflow: auto;
  flex-basis: 200px;
  flex-grow: 0;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.sc-content table {
  width: 100%;
  border-collapse: collapse;
}
.sc-content table th,
.sc-content table td {
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-width: 0;
  border-bottom-width: 1px;
  font-size: 0;
}
.sc-content table th > .cell,
.sc-content table td > .cell {
  display: block;
  height: 30px;
  overflow: hidden;
  text-align: left;
  word-break: keep-all;
  text-overflow: ellipsis;
  font-size: 12px;
  padding-left: 1em;
}

.sc-content table thead th .cell,
.sc-content table thead td .cell {
  background: #f3f3f3;
  line-height: 30px;
}

.sc-content table tbody th .cell,
.sc-content table tbody td .cell {
  background: #fff;
  line-height: 30px;
}
</style>

