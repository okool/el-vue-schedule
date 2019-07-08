<script>
import ScCalendar from "./ScCalendar.vue";
import ScContent from "./ScContent.vue";
import moment from "moment";

export default {
  name: "AcSchedule",
  props: {
    title: {
      type: String,
      default: "名称"
    },
    month: {
      type: String,
      required: false
    },
    rows: {
      type: Array,
      required: false,
      default: _ => []
    },
    cellRender: {
      type: Function,
      required: false
    }
  },
  data() {
      return {
          date:''
      }
  },
  mounted(){
      this.date=this.month?this.month:moment().format('YYYY-MM')
  },
  methods: {
    onSelectDate(date) {
      this.date = date;
      this.$emit('change',date)
    }
  },
  render(h) {
    return (
      <div class="sc-schedule">
        <ScContent
          rows={this.rows}
          title={this.title}
          month={this.date}
          onChange={this.onSelectDate}
        />
        <ScCalendar
          rows={this.rows}
          cellRender={this.cellRender}
          month={this.date}
          onChange={this.onSelectDate}
        />
      </div>
    );
  }
};
</script>
<style>
.sc-content{
  border-radius: 4px 0px 0px 4px;
}
.sc-schedule {
  overflow: hidden;
  display: flex;
  min-width: 1000px;
}

.sc-calendar {
  overflow: auto;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0px 4px 4px 0px;
  border-left: 0;
}
</style>
