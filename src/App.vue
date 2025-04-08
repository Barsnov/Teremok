<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script>
export default {
  data(){
    return {
      taskOne: false,
      taskTwo: true,
    }
  },

  methods: {
    startTwoGame(){
      this.taskOne = false;
      this.taskTwo = true;
    }
  },
}
</script>

<style>
</style>