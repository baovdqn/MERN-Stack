<template>
  <div class="signin">
    <form class="signin-form" action="POST">
      <div class="form-user">
        <label for="email">Email:</label>
        <input type="text" name="email" />
      </div>
      <div class="form-password">
        <label for="password">Password:</label>
        <input type="password" name="password" />
      </div>
    </form>
    <button class="btn-submit">SignIn</button>
  </div>
</template>

<style lang="scss">
.signin {
  margin: auto;
  width: 300px;
  .signin-form {
    .form-user {
      margin-bottom: 1rem;
      label {
        display: block;
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
      }
    }

    .form-password {
      @extend .form-user;
    }
  }
  .btn-submit{
    display: block;
    margin: 0 auto;
  }
}
</style>
