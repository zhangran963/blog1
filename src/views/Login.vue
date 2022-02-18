<template>
  <div class="page login">
    <main>
      <label class="line"
        ><span class="left">用户名</span>
        <my-input
          class="right username"
          v-model="username.value"
          v-bind="username"
        ></my-input>
      </label>
      <label class="line"
        ><span class="left">密码</span>
        <my-input
          class="right passport"
          v-model="password.value"
          v-bind="password"
        ></my-input>
      </label>

      <my-button class="submit" type="primary" @click="login">登录</my-button>
      <my-button class="submit" @click="register">注册</my-button>
    </main>
  </div>
</template>

<script lang="ts">
import { token, useInputState } from '@/utils'
import { Options, Vue } from 'vue-class-component'
import { PageNames } from '@/constant'
import * as HTTP from '@/services/user'

@Options({
  name: PageNames.Login,
  components: {},
})
export default class Login extends Vue {
  loading = false

  /* 初始参数 */
  username = useInputState({
    type: 'text',
    value: '',
    name: 'username',
    placeholder: '用户名',
    minlength: 4,
    maxlength: 15,
  }).state
  password = useInputState({
    type: 'password',
    value: '',
    placeholder: '密码',
    name: 'password',
    minlength: 6,
    maxlength: 15,
  }).state

  mounted() {
    const { username } = this.$route.params
    this.username.value = username as string
  }
  /**
   * 登录
   */
  public async login() {
    {
      /* 用户名 */
      const { value: username } = this.username
      if (!username || username.length === 0) {
        return this.$toast('请填写用户名')
      }
    }
    {
      /* 密码 */
      const { value: password } = this.password
      if (!password || password.length === 0) {
        return this.$toast('请填写密码')
      }
    }
    this.loading = true
    HTTP.login({
      username: this.username.value,
      password: this.password.value,
    })
      .then(async (data) => {
        this.loading = false
        token.set(data.token)
        await this.$toast('登录成功')
        this.$router.replace('/')
      })
      .catch((err) => {
        this.loading = false
        this.$toast(err)
      })
  }

  /**
   * 注册
   */
  async register() {
    this.$router.replace(PageNames.Register)
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
