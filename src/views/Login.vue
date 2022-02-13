<template>
  <div class="page login">
    <main>
      <label class="line"
        ><span class="left">用户名</span
        ><input
          type="text"
          class="right username"
          name="username"
          placeholder="用户名"
      /></label>
      <label class="line"
        ><span class="left">密码</span
        ><input
          type="password"
          class="right password"
          name="password"
          placeholder="密码"
          minlength="6"
          maxlength="15"
      /></label>
      <my-button class="submit" @click="login">登录</my-button>
    </main>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { PageNames } from '../constant'

@Options({
  name: PageNames.Login,
  components: {},
})
export default class Login extends Vue {
  /**
   * 登录
   */
  public login() {
    console.log('* login')
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.page.login {
  @include flex-row(center, center);

  main {
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
