<template>
    <div class="home">
      <div class="container">
        <div class="date-picker mx-auto">
          <MonthRangePicker
          :monthFormat="monthFormat"
          :startMonth="startMonth"
          :endMonth="endMonth"
          placeholder="請選擇月份範圍"
          @update:startMonth="startMonth = $event"
          @update:endMonth="endMonth = $event"/>
        </div>
      </div>
    </div>
  </template>
  <script>
  // import MonthRangePicker from '@/components/MonthRangePicker'
  import MonthRangePicker from 'vue2-month-range-picker'
  export default {
    name: 'MonthRangePage',
    components: {
      MonthRangePicker
    },
    data () {
      return {
        // monthFormat: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        monthFormat: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        startMonth: '',
        endMonth: ''
      }
    }
  }
  </script>
  <style lang="scss" scoped>
  @import '../assets/scss/app';
  .date-picker {
    max-width: 360px;
  }
  </style>
