<template>
  <div v-show="!showGame" class="flex flex-col justify-center px-10 bg-violet-200" style="height: 100vh !important; width:100%; z-index:60;">
    <div class="progress-bar border border-violet-700">
      <div class="progress bg-violet-500"></div>
    </div>
  </div>

  <div v-show="showGame" class="bg-violet-200 w-screen h-screen overflow-y-scroll">
    <div class="w-full flex flex-wrap gap-3 p-5 justify-center">
      <div class="flex flex-col items-center rounded-2xl p-4 border-2 border-b-8 border-blue-50 hover:border-violet-500 hover:border-2" style="transition: .1s"
           v-for="instrument in instruments" :key="instrument.id">
        <img @click="playSound(instrument)" :src="instrument.image" :alt="instrument.name"
             class="w-32 h-32">
        <h2 class="font-medium mt-3 uppercase">{{ instrument.name }}</h2>
      </div>
      <div class="w-80 h-10"/>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        showGame: false,
        instruments:[
          {id: 1, name: 'Барабан', image: '../public/images/taskThree/Drum.svg', sound: '../public/sounds/taskThree/Drum/Drum_little.mp3'},
          {id: 2, name: 'Колокольчик', image: '../public/images/taskThree/Bell.svg', sound: '../public/sounds/taskThree/Bell/Bell_little.mp3'},
          {id: 3, name: 'Маракасы', image: '../public/images/taskThree/Maracas.svg', sound: '../public/sounds/taskThree/Maracas/Maracas.mp3'},
          {id: 4, name: 'Трещотка', image: '../public/images/taskThree/Ratchet.svg', sound: '../public/sounds/taskThree/Ratchet/Ratchet_little.mp3'},
          {id: 5, name: 'Ложки', image: '../public/images/taskThree/Spoons.svg', sound: '../public/sounds/taskThree/Spoons/Spoons.mp3'},
          {id: 6, name: 'Свистулька', image: '../public/images/taskThree/Whistle.svg', sound: '../public/sounds/taskThree/Whistle/Whistle.mp3'},
          {id: 7, name: 'Ксилофон', image: '../public/images/taskThree/Xylophone.svg', sound: '../public/sounds/taskThree/Xylophone/Xylophone.mp3'},
          {id: 8, name: 'Бубен', image: '../public/images/taskThree/Tambourine.svg', sound: '../public/sounds/taskThree/Tambourine/Tambourine.mp3'},
          {id: 9, name: 'Погремушка', image: '../public/images/taskThree/Clack.svg', sound: '../public/sounds/taskThree/Clack/Clack.mp3'},
          {id: 10, name: 'Треугольник', image: '../public/images/taskThree/Triangle.svg', sound: '../public/sounds/taskThree/Triangle/Triangle.mp3'},
          {id: 12, name: 'Кастаньеты', image: '../public/images/taskThree/Castanets.svg', sound: '../public/sounds/taskThree/Castanets/Castanets.mp3'},
          {id: 13, name: 'Расчёска', image: '../public/images/taskThree/Hairbrush.svg', sound: '../public/sounds/taskThree/Hairbrush/Hairbrush.mp3'},
          {id: 14, name: 'Тарелки', image: '../public/images/taskThree/Hi_hat.svg', sound: '../public/sounds/taskThree/Hi_hat/Hi_hat.mp3'},
          {id: 15, name: 'Бутылка', image: '../public/images/taskThree/Bottle.svg', sound: '../public/sounds/taskThree/Bottle/Bottle.mp3'},
          {id: 16, name: 'Пакет', image: '../public/images/taskThree/Package.svg', sound: '../public/sounds/taskThree/Package/Package.mp3'},
          {id: 17, name: 'Там-там', image: '../public/images/taskThree/Tam_tam.svg', sound: '../public/sounds/taskThree/Tam_tam/Tam_tam.mp3'},
        ],

        audio: null,
      }
    },

    methods:{
      playSound(instrument){
        this.audio = new Audio(instrument.sound);
        this.audio.play();
      },

      checkLocal() {
        setInterval(()=>{
          this.checkNetwork()
        }, 5000)
      },

      async checkNetwork() {
        try {
          await fetch("http://teremok.sfera.local/ping", {mode: "no-cors"})
          this.showGame = true
          console.log('Доступ в сети разрешён')
        }catch{
          alert("Сеть не та — доступ запрещён")
          this.showGame = false;
          console.log('Доступ к сети запрещён')
          window.location.href = "about:blank";
        }
      }
    },

    mounted(){
      this.checkLocal()
    }
  }
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 10px;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
}

.progress {
  width: 0;
  height: 100%;
  animation: loading 5s linear forwards;
}

@keyframes loading {
  0% { width: 0}
  25% { width: 0}
  100% { width: 100%}
}
</style>