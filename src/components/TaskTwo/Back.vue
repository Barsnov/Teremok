<template>
  <div ref="background_div" class="w-full h-full">
    <h3 class="absolute text-2xl z-10 left-10 top-10 font-bold pointer-events-none">Количество ошибок: {{fallsItem}}</h3>
    <div class="flex flex-col gap-y-40 w-full h-screen" @touchstart.passive="handleTouchStart">
      <div class="flex">
        <div v-for="(item, index) in option" style="z-index: 15; transition: .1s"
             class="absolute rounded-2xl" :style="item.style">
          <img :src="item.src" :alt="item.alt" :key="index" :id='item.id' :class="item.needId + ' ' + item.name"
               class="w-40 h-40 bg-white p-3 rounded-2xl shadow-lg border-4 border-blue-500">
          <div :class="item.needId + ' ' + item.name" style="display: none" class="cardAction bg-blue-500 w-full h-40 rounded-2xl">
            <!--Сюда помещаем-->
          </div>
        </div>

      </div>
      <div class="flex">
        <div v-for="(item, index) in answer" style="z-index: 15; transition: .1s"
             class="absolute rounded-2xl" :style="item.style">
          <img :src="item.src" :alt="item.alt" :key="index" :id='item.id' :class="item.needId + ' ' + item.name"
               class="w-40 h-40 bg-white p-3 rounded-2xl shadow-lg border-4 border-yellow-300">
          <div :class="item.needId + ' ' + item.name" style="display: none" class="cardAction bg-yellow-300 w-full h-40 rounded-2xl">
            <!--Сюда помещаем-->
          </div>
        </div>
      </div>
    </div>

    <!--Подсказочку сюда-->
  </div>

  <div v-show="oneInstruction" class="flex absolute flex-col items-center left-0 top-0 z-50 justify-center" style="width: 1920px; height: 1080px;">
    <div class="bg-opacity-80 bg-cyan-50 flex flex-col gap-20 text-center px-20 py-12 rounded-2xl z-10 items-center" style="max-width: 50rem">
      <h2 class="font-bold text-emerald-700 text-6xl">Инструкция</h2>
      <p class="text-3xl">Распредели предложенные варианты инструментов шумового оркестра для озвучивания главных героев сказки и их действий. </p>
      <div @click="clickInstruction" class="rounded-2xl bg-emerald-700 text-white font-bold text-3xl w-full px-4 py-4 hover:cursor-pointer transition-all">Продолжить</div>
    </div>
  </div>

  <!--Сюда qr-код под конец игры-->
  <div v-show="endGame === 11" class="flex absolute flex-col items-center left-0 top-0 z-50 justify-center" style="width: 1920px; height: 1080px;">
    <div class="bg-opacity-80 bg-cyan-50 flex flex-col gap-10 text-center px-20 py-12 rounded-2xl z-10 items-center" style="max-width: 50rem">
      <h2 class="font-bold text-emerald-700 text-6xl">Поздравляем! </h2>
      <p class="text-3xl">Вы справились с заданием.<br> Ошибок: {{fallsItem}}</p>
      <p class="text-3xl font-bold" style="margin-bottom: -1.5rem">Продолжение в кинозале</p>

      <img :src="'../public/images/QR-Code.svg'" alt="qr_code" class="p-1 rounded-xl bg-black w-72">
    </div>
  </div>
</template>


<script>
  export default {
    data(){
      return{
        images: [],
        oneInstruction: true,

        option: [
          {id: 0, name: 'o', className: 'fox', src: '../../public/images/taskTwo/Fox.svg', needId: 5, alt: 'лиса', style: ''},
          {id: 1, name: 'o', className: 'wolf', src: '../../public/images/taskTwo/Wolf.svg', needId: 6, alt: 'волк', style: ''},
          {id: 2, name: 'o', className: 'hare', src: '../../public/images/taskTwo/Hare.svg', needId: 4, alt: 'заяц', style: ''},
          {id: 3, name: 'o', className: 'teremok_full', src: '../../public/images/taskTwo/Teremok_full.svg', needId: 1, alt: 'теремок', style: ''},
          {id: 4, name: 'o', className: 'bear', src: '../../public/images/taskTwo/Bear.svg', needId: 7, alt: 'медведь', style: ''},
          {id: 5, name: 'o', className: 'frog', src: '../../public/images/taskTwo/Frog.svg', needId: 3, alt: 'лягушка', style: ''},
          {id: 6, name: 'o', className: 'mouse', src: '../../public/images/taskTwo/Mouse.svg', needId: 2, alt: 'мышь', style: ''},
          {id: 7, name: 'o', className: 'knock', src: '../../public/images/taskTwo/Knock.svg', needId: 0, alt: 'стук', style: ''},
          {id: 8, name: 'o', className: 'songs', src: '../../public/images/taskTwo/Songs.svg', needId: 8, alt: 'песни', style: ''},
          {id: 9, name: 'o', className: 'saw', src: '../../public/images/taskTwo/Saw.svg', needId: 9, alt: 'пилить', style: ''},
        ],

        answer: [
          {id: 0, name: 'a', className: 'spoons', src: '../../public/images/taskTwo/Spoons.svg', needId: 7, alt: 'ложки', style: ''},
          {id: 1, name: 'a', className: 'xylophone', src: '../../public/images/taskTwo/Xylophone.svg', needId: 3, alt: 'ксилофон', style: ''},
          {id: 2, name: 'a', className: 'bell', src: '../../public/images/taskTwo/Bell.svg', needId: 6, alt: 'колокольчик', style: ''},
          {id: 3, name: 'a', className: 'ratchet', src: '../../public/images/taskTwo/Ratchet.svg', needId: 5, alt: 'трещотка', style: ''},
          {id: 4, name: 'a', className: 'tambourine', src: '../../public/images/taskTwo/Tambourine.svg', needId: 2, alt: 'бубен', style: ''},
          {id: 5, name: 'a', className: 'package', src: '../../public/images/taskTwo/Package.svg', needId: 0, alt: 'пакет', style: ''},
          {id: 6, name: 'a', className: 'maracas', src: '../../public/images/taskTwo/Maracas.svg', needId: 1, alt: 'маракасы', style: ''},
          {id: 7, name: 'a', className: 'drum', src: '../../public/images/taskTwo/Drum.svg', needId: 4, alt: 'барабан', style: ''},
          {id: 8, name: 'a', className: 'whistle', src: '../../public/images/taskTwo/Whistle.svg', needId: 8, alt: 'свистулька', style: ''},
          {id: 9, name: 'a', className: 'hairbrush', src: '../../public/images/taskTwo/Hairbrush.svg', needId: 9, alt: 'расческа', style: ''},
        ],

        fallsItem: 0,

        elementsGame: [
          {x: '130', y: '50'}
        ],

        currentElement:{
          current: null,
          left: null,
          top: null
        },

        elemBelow: '',

        animationFrame: '',
        endGame: 0,
      }
    },

    methods: {
      async getImages(){
        try{
          const response = await fetch('public/images/taskTwo/imagesBackTwo.txt');
          this.$refs.background_div.classList.add("back")
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

      // Функции по созданию картинок и управления пальчиками
      startGame(){
        this.images.forEach((item) => {
          this.element = this.createItem(item);
          this.$refs.background_div.appendChild(this.element);
        });
        this.option.forEach((item)=>{
          this.replaceElements(item)
        });
        this.answer.forEach((item)=>{
          this.replaceElements(item)
        })
      },

      getRandomPosition(elements) {
        let position;
        let overlap;

        do {
          // Генерируем случайные координаты в пределах экрана
          position = {
            x: (Math.random() * (1920 - 170)).toFixed(3),
            y: (Math.random() * (1080 - 200)).toFixed(3),
          };

          // Проверяем, пересекается ли с другими элементами
          overlap = elements.some(el => {
            return Math.abs(el.x - position.x) < 170 &&
                Math.abs(el.y - position.y) < 200;
          });

        } while (overlap);
        return position;
      },

      replaceElements(item){
        let pos = this.getRandomPosition(this.elementsGame);
        item.style = `left: ${pos.x}px; top: ${pos.y}px`;
        this.elementsGame.push(pos)
      },

      createItem(item){
        this.element = document.createElement("img")
        this.element.src = item.src
        this.element.alt = item.alt
        this.element.className = item.className
        this.element.style.zIndex = item.zIndex
        this.element.style.position = "absolute"
        item.width ? this.element.style.width = item.width : '';
        this.element.style.left = item.style_left + "vh"
        this.element.style.top = item.style_top + "vh"
        this.element.style.transition = '.3s'

        if(item?.opacity){
          this.element.style.opacity = item?.opacity
        }
        return this.element
      },

      handleTouchStart(item){
        if (this.currentElement.current === null) {
          this.currentElement.current = item.targetTouches[0].target.offsetParent;
          this.currentElement.current.children[0].style.borderRadius = '1rem';
          this.currentElement.left = this.currentElement.current.style.left
          this.currentElement.top = this.currentElement.current.style.top
          this.currentElement.current.style.zIndex = String(20 + Number(this.currentElement.current.style.zIndex))
          this.currentElement.current.addEventListener('touchmove', this.handleTouchMove);
          this.currentElement.current.addEventListener('touchend', this.handleTouchEnd);
        }
      },

      handleTouchMove(event){
        if (this.animationFrame) return;
        this.animationFrame = requestAnimationFrame(()=>{
          if (this.currentElement.current !== null) { // --- ЕСЛИ ПЕРЕТАСКИВАЕМАЯ ЦЕЛЬ ОПРЕДЕЛЕНА
            this.item = this.currentElement.current
            // --- ЗАДАЕМ ЧЕРЕЗ JS-АНИМАЦИЮ КООРДИНАТЫ НАШЕГО КУРСОРА (ПАЛЬЦА) НА ЭКРАНЕ ---
            this.item.style.left = event.touches[0]?.pageX - this.item.offsetWidth / 2 + 'px';
            this.item.style.top = event.touches[0]?.pageY - this.item.offsetHeight / 2 + 'px';

            //проверка элемента под нашим объектом
            this.check_Class(event, this.item)
          }
          this.animationFrame = null;
        });
      },

      handleTouchEnd() {
        if (this.currentElement.current !== null) {
          //Условие из этого сделать, чтобы совпадали
          if(this.elemBelow){
            if(this.elemBelow.className !== 'back_img'){
              if(this.elemBelow.className[0] === this.currentElement.current.children[0].id
                  && this.elemBelow.className[2] !== this.currentElement.current.children[0].className[2]){
                this.elemBelow.offsetParent.children[1].appendChild(this.currentElement.current.children[0])
                this.currentElement.current.remove();
                this.currentElement.current = null;
                this.elemBelow.offsetParent.children[1].classList.remove('cardAction')
                this.elemBelow.offsetParent.children[1].style.backgroundColor = 'transparent';

                this.elemBelow.offsetParent.children[1].children[0].style.borderColor = 'green'
                // this.elemBelow.offsetParent.children[1].children[0].classList.remove(this.currentElement.current?.children[0].className[2] + '')

                // this.elemBelow.offsetParent.children[0].classList.remove(this.elemBelow?.className[2] + '')
                this.elemBelow.offsetParent.children[0].style.borderColor = 'green'

                this.elemBelow.offsetParent.style.backgroundColor = 'green';
                this.elemBelow.offsetParent.classList.add('collected');
                this.endGame ++
              }else{
                if(this.elemBelow.className[2] !== this.currentElement.current.children[0].className[2]){
                  Array.from(document.getElementsByClassName('cardAction')).forEach((item)=>{item.style.display = 'none';});
                  if (this.currentElement.current){
                    this.currentElement.current.style.left = this.currentElement.left
                    this.currentElement.current.style.top = this.currentElement.top
                  }
                  if (this.currentElement.current.className.indexOf('collected') === -1){
                    this.fallsItem ++;
                  }
                }
              }
            }else{
              this.currentElement.left = null;
              this.currentElement.top = null;
            }
          }


          if(this.currentElement.current !== null){
            if(this.currentElement.current.children[0].classList[1] === 'o'){
              this.option[this.currentElement.current.children[0].id].style = `left: ${this.currentElement.left}; top: ${this.currentElement.top};`
            }else if(this.currentElement.current.children[0].classList[1] === 'a'){
              this.answer[this.currentElement.current.children[0].id].style = `left: ${this.currentElement.left}; top: ${this.currentElement.top};`
            }

            this.currentElement.current.style.zIndex = String(Number(this.currentElement.current.style.zIndex) - 20)
          }

          this.currentElement.current?.removeEventListener('touchmove', this.handleTouchMove);
          this.currentElement.current?.removeEventListener('touchend', this.handleTouchEnd);
          this.currentElement.current = null;
          this.currentElement.left = null;
          this.currentElement.top = null;
          this.elemBelow = null;
          this.taskTwoEnd()
        }
      },

      taskTwoEnd(){
        if (this.endGame === 10){
          setTimeout(()=>{
            this.endGame ++
            this.$refs.background_div.classList.add("back")
          }, 1000);
        }
      },

      check_Class(event, item) {
        item.style.display = 'none';
        this.elemBelow = document.elementFromPoint(event.touches[0].pageX, event.touches[0].pageY);

        if(this.elemBelow){
          Array.from(this.elemBelow.offsetParent.children).forEach((item)=>{
            if (item.className?.indexOf('cardAction') !== -1 && (this.elemBelow.className[2] !== this.currentElement.current.children[0].className[2]) && (this.currentElement.current.className?.indexOf('collected') === -1)){
              item.style.display = 'block';
            }else{
              Array.from(document.getElementsByClassName('cardAction')).forEach((item)=>{item.style.display = 'none';});
            }
          })
        }
        item.style.display = 'block';
      },
    },

    mounted() {
      this.getImages()
    }
  }
</script>

<style scoped>
</style>