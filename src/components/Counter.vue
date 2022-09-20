<template>
  <h2>{{ customTitle }}</h2>
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>

  <div class="buttons-container">
    <button @click="increase()"> +1 </button>
    <button @click="decrease()"> -1 </button>
  </div>

</template>

<script>

export default {
    props: {
        title: String,
        start: {
            type: Number,
            default: 100,
            //required: true
            validator(value){
                return value >= 0 
            }
        }
    },
    // name: 'Patito'
    data() {
        return {
            counter: this.start
        }
    },
    methods: {
        getSquareValue() {
            return this.counter * this.counter
        },
        increase() {
            this.counter++ // tambien this.counter = this.counter + 1
        },
        decrease() {
            this.counter-- // tambien this.counter = this.counter - 1
        }
    },
    computed: {
        squareCounter() {
            return this.counter * this.counter
        },
        customTitle() {
            return this.title || 'Counter'

            // return this.title ? this.title : 'Counter'

            // if (this.title !== undefined){
            //     return this.title
            // } else {
            //     return 'Counter'
            // }
        }
    }
}
</script>

<style>

button{
    background-color: #64BB87 ;
    border-radius:  5px;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 15px;
    transition: 0.3s ease-in-out;
}

button:hover {
    background-color: #5aa67b;
    transition: 0.3s ease-in-out;
}

</style>