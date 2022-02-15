<template>
  <div class="page login">
    <form id="sheet">
      <label class="line"
        ><span class="left">用户名</span
        ><input
          v-model="username"
          type="text"
          class="right username"
          name="username"
      /></label>
      <label class="line"
        ><span class="left">密码</span
        ><input
          type="password"
          v-model="password1"
          class="right password"
          name="password"
          placeholder="6~15位数字、字符串"
          minlength="6"
          maxlength="15"
      /></label>
      <label class="line"
        ><span class="left">密码</span
        ><input
          type="password"
          v-model="password2"
          class="right password"
          name="password"
          placeholder="再次输入密码"
          minlength="6"
          maxlength="15"
      /></label>
      <my-button
        class="submit"
        :loading="loading"
        @click.stop.prevent="register"
        >注册</my-button
      >

      <my-button
        class="submit"
        :loading="loading"
        @click.stop.prevent="property"
        >读取属性</my-button
      >
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { PageNames } from '../constant'
import { sleep } from '../utils/index'
import * as HTTP from '../services/user'

@Options({
  name: PageNames.Register,
  components: {},
})
export default class Register extends Vue {
  loading = false

  /* 初始参数 */
  username = ''
  password1 = ''
  password2 = ''

  mounted() {
    Object.assign(window, {
      vm: this,
    })
  }

  /**
   * 注册
   */
  private async register() {
    const { username, password1, password2 } = this
    if (password1 !== password2) {
      return console.error('请检查密码是否一致')
    }

    this.loading = true
    const { code, msg, data } = await HTTP.register({
      username,
      password: password1,
    })
    console.log('* 注册', data)
    if (code === 0) {
      console.log('* ', msg)
      await sleep(2000)
      this.$router.replace(PageNames.Login)
    } else {
      console.error(msg)
    }
    this.loading = false
  }

  /**
   * 注册
   */
  private async property() {
    this.loading = true
    const { data } = await HTTP.property({
      key: 'id',
    })
    console.log('* 注册', data)
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.page.login {
  @include flex-row(center, center);

  form {
    @include flex-col(space-between, stretch);
    .line {
      margin: 15px 0;
      @include flex-row(space-between, center);
      background-color: white;
      border-radius: $border-radius-small;
      .left {
        width: 70px;
        color: darkgray;
      }
      .right {
        width: 240px;
        height: 48px;
        padding: 0 0.8em;
        background-color: transparent;
      }

      .username {
        font-size: $font-size-middle;
      }
      .password {
        font-size: $font-size-middle;
      }
    }

    .submit {
      width: 180px;
      height: 48px;
      align-self: center;
      margin-top: 40px;
      border-width: 0;
      outline: 0;
      border-radius: $border-radius-small;
    }
  }
}
</style>
