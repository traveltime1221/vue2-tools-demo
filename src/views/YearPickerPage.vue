<template>
  <div class="d-flex justify-center items-center h-full pt-50">
    <div class="container">
      <div class="date-picker mx-auto mb-20">
          <YearPicker :year="year" :icon="icon" />
      </div>
      <!-- <div class="form-control">
        <div class="form-control py-10 px-4 text-left"> javascript </div>
        <pre class="text-left">
          import YearPicker from 'vue2-year-picker'
          export default {
            name: 'YearPickerPage',
            components: {
                YearPicker
            },
            data () {
              return {
                year: 114,
                icon: {
                    prev: require('../assets/image/icon-left.png'),
                    next: require('../assets/image/icon-right.png')
                }
              }
            }
          }
        </pre>
      </div> -->
    </div>
  </div>
</template>
<script>
import YearPicker from 'vue2-year-picker'
export default {
  name: 'YearPickerPage',
  components: {
      YearPicker
  },
  data () {
    return {
      year: 114,
      icon: {
          prev: require('../assets/image/icon-left.png'),
          next: require('../assets/image/icon-right.png')
      }
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
