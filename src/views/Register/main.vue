<template>
  <div class="page register">
    <form id="sheet">
      <label class="line"
        ><span class="left">用户名</span
        ><my-input
          v-model="username.value"
          class="right username"
          v-bind="username"
      /></label>
      <label class="line"
        ><span class="left">密码</span
        ><my-input
          v-model="password1.value"
          class="right password"
          v-bind="password1"
      /></label>
      <label class="line"
        ><span class="left">密码</span
        ><my-input
          v-model="password2.value"
          class="right password"
          v-bind="password2"
      /></label>
      <my-button
        class="submit"
        type="primary"
        :loading="loading"
        @click.stop.prevent="register"
        >注册</my-button
      >
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { PageNames } from '../../constant'
import { sleep, useInputState } from '@/utils/index'
import * as HTTP from '@/services/user'

@Options({
  name: PageNames.Register,
  components: {},
})
export default class Register extends Vue {
  loading = false

  /* 初始参数 */
  username = useInputState({
    type: 'text',
    value: '',
    name: 'username',
    minlength: 4,
    maxlength: 15,
  }).state
  password1 = useInputState({
    type: 'password',
    value: '',
    placeholder: '6~15位数字、字符串',
    name: 'password1',
    minlength: 6,
    maxlength: 15,
  }).state
  password2 = useInputState({
    type: 'password',
    value: '',
    placeholder: '再次输入密码',
    name: 'password2',
    minlength: 6,
    maxlength: 15,
  }).state

  mounted() {
    /*  */
  }

  /**
   * 注册
   */
  async register() {
    {
      /* 用户名 */
      const { value: username, maxlength, minlength } = this.username
      if (!username || username.length === 0) {
        return this.$toast('请填写用户名')
      } else if (username.length < minlength || username.length > maxlength) {
        return this.$toast(`用户名长度在${minlength} ~ ${maxlength}位`)
      }
    }

    {
      /* 密码1 */
      const { value: passport, minlength, maxlength } = this.password1
      if (!passport) {
        return console.error('请检查密码')
      } else if (passport.length < minlength || passport.length > maxlength) {
        return this.$toast(`密码长度在${minlength} ~ ${maxlength}位`)
      }

      {
        /* 密码2 */
        const { value: nextPassword } = this.password2
        if (passport !== nextPassword) {
          return this.$toast('两次密码不一致, 请检查')
        }
      }
    }

    this.loading = true
    HTTP.register({
      username: this.username.value,
      password: this.password1.value,
    })
      .then(async (data) => {
        this.loading = false
        await this.$toast(`注册成功: ${data.username}`)
        this.$router.replace({
          name: PageNames.Login,
          params: {
            username: data.username,
          },
        })
      })
      .catch((errMsg) => {
        this.loading = false
        this.$toast(errMsg)
      })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.page.register {
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
      align-self: center;
      margin-top: 40px;
    }
  }
}
</style>
