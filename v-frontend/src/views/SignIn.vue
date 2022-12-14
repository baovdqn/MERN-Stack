
<script  lang="ts">
import type { ErrorMessage } from '@/common/interface/ErrorMessage';
import axios, { AxiosError, type AxiosResponse } from 'axios';
export default {

  name: 'sign-In',
  data() {

    return {
      email: '',
      password: '',
      evn: {
        host: 'http://10.0.11.132:3001',
      }
    }
  },
  methods: {
    async onSubmit(e: Event) {
      const responseLogin = await this.login(this.email, this.password);
      alert(responseLogin?.data.accessToken)
    },

    async login(email: string, password: string): Promise<AxiosResponse | null> {
      const path = this.evn.host + '/auth/signin'
      const body = {
        username: email,
        password: password
      }
      try {
        return await axios.post(path, body);
      } catch (error) {
        const err = error as AxiosError;
        console.log('Lỗi đăng nhập', err.response?.data)
        return null;
      }
    }
  }
}
</script>
<template>
  <div class="signin-container"></div>
  <div class="signin">
    <form id="formSignIn" class="signin-form" @submit.prevent='onSubmit($event)'>
      <h1 class="signin-title">SignIn</h1>
      <div class="form-user">
        <label for="email">Email <span class="require">(*)</span></label>
        <input autocomplete="off" type="text" name="email" placeholder="Email" v-model=email />
      </div>
      <div class="form-password">
        <label for="password">Password <span class="require">(*)</span></label>
        <input autocomplete="off" type="password" name="password" placeholder="Password" v-model="password" />
      </div>
      <p class="signin-forgot">Forgot password ?</p>
      <input class="btn-submit" type="submit" value="Sign in" />
    </form>
  </div>
</template>

<style lang="scss">
@import "../assets/base-color.scss";

.signin {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('src/assets/login.png');
  background-repeat: no-repeat;
  background-size: cover;

  .signin-form {
    width: 350px;

    .signin-title {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: 1rem;
      text-align: center;
    }

    .form-user {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
      }

      input {
        display: block;
        width: 100%;
        padding: 0.55rem 1rem;
        color: #85858a;
        font-size: 0.75rem;
        background-color: #fff;
        border: 1px solid #ededed;
        border-radius: 0.25rem;
        outline: none;
      }
    }

    .form-password {
      @extend .form-user;
    }
  }

  .signin-forgot {
    margin-bottom: 1rem;
    display: block;
    text-align: end;
    font-size: 0.75rem;

    &:hover {
      text-decoration: underline;
    }
  }

  .btn-submit {
    display: block;
    margin: 0 auto;
    outline: none;
    border: none;
    padding: 0.5rem 1.5rem;
    background-color: $button-primary;
    color: white;
  }

  .require {
    color: $require-color;
  }
}
</style>