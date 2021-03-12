const app = new Vue({
  el: '#app',
  data: {
    list: [
      1,
      2,
      3
    ]
  },
  render(h) {
    let list = this.list
    return h('ul', {}, list.map(v => h('li', { key: v }, v)))
  },
  mounted() {
    this.list = [3, 2, 1]
  }
})
