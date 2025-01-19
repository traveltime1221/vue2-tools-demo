<template>
  <div id="app">
    <div class="container">
      <!-- <nav>
        <router-link :to="item.path" v-for="(item, index) of lists" :key="index">
          |{{item.name}}|
        </router-link>
      </nav> -->
      <div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lists: [
        {
          path: '/YearPickerPage',
          name: 'Vue2-Year-Picker'
        },
        {
          path: '/MonthRangePage',
          name: 'Vue2-month-range-picker'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.container {
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
}
</style>
