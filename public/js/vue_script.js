'use strict';
var socket = io();
var vm = new Vue({
     el: "#burgerOrdering",
     data: {
     burgers:[
     {name: "Umami burger", kCal: "500 kCal", lactose: false, gluten: true, stock: 70, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTEEwenBuBCeAaFC-FptIF-NGBDCUoRF-FTeWR5fF_bdBaURmGH"},
     {name: "Bean burger", kCal: "300 kCal", lactose: true, gluten: true, stock: 2, image: "https://www.jessicagavin.com/wp-content/uploads/2018/05/vegan-black-bean-burgers-5-1200.jpg"},
     {name: "Canadian burger", kCal: "1000 kCal", lactose: false, gluten: true, stock: 20, image: "https://extremecouponingmom.ca/wp-content/uploads/2019/08/Great-Canadian-Turkey-Burger_7-720x720.jpg"}],
     orderInfo: [],
     name:null, e_mail:null, payment:null, gender:null,
     checkedBurgers:[],
     orders: {},
     myID: 0,

   },
      methods: {
        markDone: function() {
          vm.orderInfo = []
          var name = document.getElementById("name").value
          var e_mail = document.getElementById("E-Mail").value
          var payment = document.getElementById("payment").value
          var gender = document.getElementsByName("gender")
          var i
          for (i=0; i < gender.length; i++){
          if (gender[i].checked)
          gender: gender.value}

          this.orderInfo.push({name:name , e_mail:e_mail, payment:payment, gender:this.gender, checkedBurgers:this.checkedBurgers })
       },
      nextOrder: function() {
        vm.myID = vm.myID + 1
        return vm.myID

      },

       getNext: function () {
         var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
           return Math.max(last, next);
         }, 0);
         return lastOrder + 1;
       },
       addOrder: function (event) {
         socket.emit("addOrder", { orderId: this.nextOrder(),
                                   details: { x: vm.orders.details.x,
                                              y: vm.orders.details.y},
                                   orderItems: vm.checkedBurgers,
                                   personalInformation: vm.orderInfo
                                 });
       },
       displayOrder: function (event) {
         var offset = {x: event.currentTarget.getBoundingClientRect().left,
                       y: event.currentTarget.getBoundingClientRect().top};
                      vm.orders = ({
                                  details: { x: event.clientX - 10 - offset.x,
                                              y: event.clientY - 10 - offset.y}
                                            });

   }
 }
});
