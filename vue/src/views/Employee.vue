<!-- <template>
    <h1>Hello Employee</h1>
    <button @click="incrementCount()">Increment</button>
    {{ count }}

     <EmpComponent title="ASN" class="text-gray-100"></EmpComponent>
</template>

 <script> 
export default{
    data(){
        return{
            count:0


        }
    },
    methods:{
        incrementCount(){ 
            this.count = this.count+1; 
        }
    }
    
}
</script>  

 
 <script setup>
import { ref ,onMounted }  from 'vue';
import EmpComponent from '../components/EmpComponent.vue';
 
const count = ref(0);
function incrementCount(){
    this.count++;
}
// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>   -->


<template>
  <div>
    <button >Insert/Remove</button>
    <div v-if="show" ref="content">I am an element</div>


  <button @click="handleClick" id="myButton" class="dropdown-item"  :data-id="test_1" >Insert/Remove2</button>

  <input id="myId" ref="myId_0"/>

  <input id="myId_1" ref="myId_1"  />

  <button @click="myFunctionClick()">Click Here</button>



  </div>
</template>
<script>
 import { nextTick } from "vue";
import { ref } from "vue";

 export default {
  data() {
   
    return {
      show: true,
      message:"Welcome",
    };
  },
  methods: {
    handleClick() {
      this.show = !this.show;
      nextTick(() => {
        console.log(this.show, this.$refs.content);
        alert('hello next Tick');

        const button = document.querySelector('#myButton')
        console.log('your id:', button.dataset.id)

      });
    },

    myFunctionClick: function () {  
      var my="myId_"+1;
        
        //   var re=this.$refs;
        // var tt=re.my;
        // alert(tt);
     var t=   document.getElementById('MyId_1').value;
alert('321123321'+t);
//this.$refs.myId.innerText = 'Hello Bro';
            }
  },
};
</script>