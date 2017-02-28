var testComponent = {
  name: 'myTab',
  template: '<div>{{myTxt}}</div>',
  data: function () {
    return {
      myName: '刘攀1'
    }
  },
  props: {
    myTxt: {
      type: [String, Number],
      default: '刘攀'
    }
  },
  created: function () {
    console.log(this.myTxt);
  },
  methods: {

  }
}
