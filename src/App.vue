<template>
  <div class="bg-container" v-if="showBg">
    <transition-group name="fade" mode="out-in">
      <img
        v-for="(src, index) of bgImgs"
        :key="index"
        :src="src"
        v-show="index === bgIndex"
      />
    </transition-group>
  </div>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import bgImg1 from './assets/bg-1.jpg'
import bgImg2 from './assets/bg-2.jpg'
import bgImg3 from './assets/bg-3.jpg'
import { sleep } from './utils/index'

@Options({
  components: {},
  computed: {},
})
export default class App extends Vue {
  showBg = false
  bgImgs: string[] = []
  bgIndex = 0

  async mounted() {
    this.startBgImg()
  }

  /**
   * 背景图
   */
  private async startBgImg() {
    this.bgImgs.push(bgImg1)
    await sleep(700)
    this.showBg = true
    setInterval(() => {
      this.bgIndex = this.calcNextIndex()
    }, 7000)
    await sleep(1000)
    this.bgImgs.push(bgImg2)
    await sleep(1000)
    this.bgImgs.push(bgImg3)
  }

  private calcNextIndex() {
    const nextIndex = this.bgIndex + 1
    if (nextIndex >= this.bgImgs.length) {
      return 0
    } else {
      return nextIndex
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/reset.scss';
@import '@/styles/index.scss';

html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: whitesmoke;

  background-color: #000;

  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  position: relative;

  .bg-container {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100vh;

    opacity: 0.5;
    > img {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.page {
  position: relative;
  z-index: 2;
  width: 100%;
  min-height: 100vh;
  font-size: $font-size-middle;
  @include inline-flex-row();
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
