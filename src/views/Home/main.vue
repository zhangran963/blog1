<template>
  <main class="page home">
    <template v-if="userInfo">
      <header class="header">
        <h2>
          欢迎回来 <span>{{ userInfo?.username }}</span
          ><my-button class="exit" @click="onExit">退出</my-button>
        </h2>
      </header>

      <com-list></com-list>
    </template>
  </main>
</template>

<script lang="ts">
import { sleep, token } from '@/utils'
import { Options, Vue } from 'vue-class-component'
import ComList from './List.vue'
import { PageNames } from '@/constant'
import * as HTTP from '@/services/user'
import { IUserInfo } from '@/services/user'

@Options({
  name: PageNames.Home,
  components: {
    ComList,
  },
})
export default class Home extends Vue {
  userInfo: IUserInfo | null = null

  mounted() {
    this.getUserInfo()
  }

  /* 获取用户信息 */
  private getUserInfo() {
    return HTTP.getUserInfo()
      .then((userInfo) => {
        this.userInfo = userInfo
      })
      .catch(async (errMsg) => {
        await this.$toast(errMsg)
        await this.$router.replace(PageNames.Login)
      })
  }

  /* 退出 */
  private async onExit() {
    token.remove()
    await this.$toast('已退出')
    this.$router.replace(PageNames.Login)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.page.home {
  .header {
    @include inline-flex-row(center);
    margin-top: 10vh;
    .exit {
      margin-left: 2em;
    }
  }
}
</style>
