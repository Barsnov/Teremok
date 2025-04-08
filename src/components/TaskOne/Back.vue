<template>
  <div ref="background_div" class="back">
    <h3 class="absolute text-2xl z-20 left-10 top-10 font-bold">Количество ошибок: {{falls}}</h3>
  </div>

  <div v-show="oneInstruction" class="flex absolute flex-col items-center left-0 top-0 z-20 justify-center" style="width: 1920px; height: 1080px;">
    <div class="bg-opacity-80 bg-cyan-50 flex flex-col gap-20 text-center px-20 py-12 rounded-2xl items-center" style="max-width: 50rem">
      <h2 class="font-bold text-emerald-700 text-6xl">Инструкция</h2>
      <p class="text-3xl">Вспомните героев сказки «Теремок» и переместите их в домик</p>
      <div @click="clickInstruction" class="rounded-2xl bg-emerald-700 text-white font-bold text-3xl w-full px-4 py-4 hover:cursor-pointer transition-all">Продолжить</div>
    </div>
  </div>

  <div v-show="twoInstruction" class="flex absolute flex-col items-center left-0 top-0 z-20 justify-center" style="width: 1920px; height: 1080px;">
    <div class="bg-opacity-80 bg-cyan-50 flex flex-col gap-20 text-center px-20 py-12 rounded-2xl items-center" style="max-width: 50rem">
      <h2 class="font-bold text-emerald-700 text-6xl">Поздравляем!</h2>
      <p class="text-3xl">Вы справились с заданием. <br>Количество ошибок: {{falls}}</p>
      <router-link to="/task-two" class="rounded-2xl bg-emerald-700 text-white font-bold text-3xl w-full px-4 py-4 hover:cursor-pointer transition-all">Перейти к следующему заданию</router-link>
    </div>
  </div>
</template>


<script>
  export default {
    data(){
      return{
        numberAnimals: 0,
        images: [],
        falls: 0,
        currentElement:{
          current: null,
          style_left: null,
          style_top: null
        },

        oneInstruction: true,
        twoInstruction: false,

        elemBelow: '',

        arrayClass: ['tiger', 'wolf', 'pig', 'mouse', 'lion', 'bear', 'elephant', 'goat', 'frog', 'hare', 'fox'],
        arrayPlace: ['teremok', 'balcony', 'window', 'window_top', 'house_mouse', 'window_top_frog', 'window_fox', 'window_hare', 'window_wolf']
      }
    },

    methods: {
      async getImages(){
        try{
          const response = await fetch('public/images/taskOne/imagesBackOne.txt');
          this.images = await response.json();
          this.startGame()
          if (!response.ok) new Error('Интернет подключи');
        } catch (error){
          console.error('Файл умер при извлечении...', error);
        }
      },

      clickInstruction(){
        this.oneInstruction = false;
        this.$refs.background_div.classList.remove("back")
      },

      endOneGame(){
        this.twoInstruction = true;
        this.$refs.background_div.classList.add("back")
      },

      nextGame(){
        this.$emit('startTwoGame')
      },

      // Функции по созданию картинок и управления пальчиками
      startGame(){
        this.images.forEach((item) => {
          this.element = this.createItem(item);
          this.$refs.background_div.appendChild(this.element);
        });
      },

      createItem(item){
        this.element = document.createElement("img")
        this.element.src = item.src
        this.element.alt = item.alt
        this.element.className = item.className
        this.element.style.zIndex = item.zIndex
        this.element.item_move = item.item_move
        this.element.style.position = "absolute"
        item.width ? this.element.style.width = item.width : '';
        this.element.style.left = item.style_left + "vh"
        this.element.style.top = item.style_top + "vh"
        this.element.style.transition = '.3s'

        if(item?.opacity){
          this.element.style.opacity = item?.opacity
        }

        if (this.arrayClass.indexOf(this.element.className) !== -1){
          this.element.addEventListener('touchstart', this.handleTouchStart)
          this.element.addEventListener('touchmove', this.handleTouchMove)
          this.element.addEventListener('touchend', this.handleTouchEnd)
        }
        return this.element
      },

      handleTouchStart(item){
        if (this.currentElement.current === null) {
          this.currentElement.current = item.targetTouches[0].target;
          this.currentElement.style_left = this.currentElement.current.style.left
          this.currentElement.style_top = this.currentElement.current.style.top
          this.currentElement.current.style.zIndex = String(100 + Number(this.currentElement.current.style.zIndex))
        }
      },

      handleTouchMove(event){
        if (this.currentElement.current !== null) { // --- ЕСЛИ ПЕРЕТАСКИВАЕМАЯ ЦЕЛЬ ОПРЕДЕЛЕНА
            this.item = this.currentElement.current
              // --- ЗАДАЕМ ЧЕРЕЗ JS-АНИМАЦИЮ КООРДИНАТЫ НАШЕГО КУРСОРА (ПАЛЬЦА) НА ЭКРАНЕ ---
              this.item.style.left = event.touches[0]?.pageX - this.item.offsetWidth / 2 + 'px';
              this.item.style.top = event.touches[0]?.pageY - this.item.offsetHeight / 2 + 'px';

            // --- ПРОВЕРЯЕМ, НЕ ВЫХОДИТ ЛИ НАШ ОБЪЕКТ ЗА ГРАНИЦЫ ЭКРАНА ---
            this.item_document(event, this.item)

            //проверка элемента под нашим объектом
            this.check_Class(event, this.item)
        }
      },

      handleTouchEnd() {
        if (this.currentElement.current !== null) {
          if (this.moveAnimals()){
            if (this.arrayClass.indexOf(this.currentElement.current?.className) !==-1 ){
              switch (this.currentElement.current.className){
                case 'wolf':
                  this.numberAnimals ++
                  document.getElementsByClassName('window')[2].style.opacity = '0'
                  document.getElementsByClassName('window_wolf')[0].style.opacity = '1'
                  this.currentElement.current.remove()
                  break;
                case 'frog':
                  this.numberAnimals ++
                  document.getElementsByClassName('window_top')[0].style.opacity = '0'
                  document.getElementsByClassName('window_top_frog')[0].style.opacity = '1'
                  this.currentElement.current.remove()
                  break;
                case 'bear':
                  this.numberAnimals ++
                  document.getElementsByClassName('balcony')[0].style.opacity = '0'
                  document.getElementsByClassName('balcony_bear')[0].style.opacity = '1'
                  this.currentElement.current.remove()
                  break;
                case 'fox':
                  this.numberAnimals ++
                  document.getElementsByClassName('window')[0].style.opacity = '0'
                  document.getElementsByClassName('window_fox')[0].style.opacity = '1'
                  this.currentElement.current.remove()
                  break;
                case 'hare':
                  this.numberAnimals ++
                  document.getElementsByClassName('window')[1].style.opacity = '0'
                  document.getElementsByClassName('window_hare')[0].style.opacity = '1'
                  this.currentElement.current.remove()
                  break;
                case 'mouse':
                  this.numberAnimals ++
                  this.currentElement.current.style.width = '6rem';
                  this.currentElement.style_left = '67vh';
                  this.currentElement.style_top = '26vh';
                  this.currentElement.current.removeEventListener('touchstart', this.handleTouchStart)
                  this.currentElement.current.removeEventListener('touchmove', this.handleTouchMove)
                  this.currentElement.current.removeEventListener('touchend', this.handleTouchEnd)
                  break;
                default:
                  this.falls ++
              }
            }
          }

          this.currentElement.current.style.zIndex = String(Number(this.currentElement.current.style.zIndex) - 100)
          this.currentElement.current.style.left = this.currentElement.style_left
          this.currentElement.current.style.top = this.currentElement.style_top
          this.currentElement.current = null;
          this.currentElement.style_left = null;
          this.currentElement.style_right = null;
          this.elemBelow = null;
        }
      },

      check_Class(event, item) {
        item.style.display = 'none';
        this.elemBelow = document.elementFromPoint(event.touches[0].pageX, event.touches[0].pageY);
        item.style.display = 'block';
      },

      item_document(event, item){
        if (event.touches[0].pageX < 40) {
          item.style.left = event.touches[0].pageX - item.offsetWidth / 2 + 50 + 'px';
        } else if (event.touches[0].pageX > window.screen.width - 30) {
          item.style.left = event.touches[0].pageX - item.offsetWidth / 2 - 50 + 'px';
        }
        if (event.touches[0].pageY < 40) {
          item.style.top = event.touches[0].pageY - item.offsetHeight / 2 + 50 + 'px';
        } else if (event.touches[0].pageY > window.screen.height - 30) {
          item.style.top = event.touches[0].pageY - item.offsetHeight / 2 - 50 + 'px';
        }
      },

      moveAnimals(){
        if(this.arrayPlace.indexOf(this.elemBelow.className) !== -1){
          return true
        }
      },
    },

    watch:{
      numberAnimals(newValue){
        if(newValue === 6){
          setTimeout(()=>{this.endOneGame()}, 1000)
        }
      }
    },

    mounted() {
      this.getImages()
    }
  }
</script>

<style>
  .back{
    filter: blur(5px);
  }
</style>