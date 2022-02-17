<template>
  <main class="page home">
    <h3>根页面</h3>

    <ul>
      <li>用户信息</li>
      <li>用户名: {{ userInfo?.username }}</li>
    </ul>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { PageNames } from '../constant'
import * as HTTP from '../services/user'
import { IUserInfo } from '../services/user'

@Options({
  name: PageNames.Home,
  components: {},
})
export default class Home extends Vue {
  userInfo: IUserInfo | null = null
  mounted() {
    // this.$router.replace({ name: PageNames.Register })
    Object.assign(window, { vm: this })
    this.getUserInfo()
  }

  /**
   * name
   */
  private getUserInfo() {
    return HTTP.getUserInfo().then((res) => {
      if (res.code === 0) {
        this.userInfo = res.data
      }
      console.log('* 用户信息', res)
    })
  }
}
</script>
