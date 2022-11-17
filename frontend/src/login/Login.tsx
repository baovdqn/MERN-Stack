import './Login.scss'
function Login() {
  return (
    <div className="login">
      <div className="signin">
        <h1 className="signin__title">Memories</h1>
        <form className="signin__form">
          <input className="user" type="text" name="username" placeholder="Your email"/>
          <input className="password" type="text" name="password" placeholder="Password"/>
          <input className="btn-submit" type="submit" value="Login" />
        </form>
        <p className="signin__forgot">Forgot password</p>
      </div>
      <div className="register">
        <span className="register__text">Don't have an account?</span>
        <span className="register__text--link">Sign up</span>
      </div>
      <div className="app">
        <p className="app__title">Get the app</p>
        <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="Google play"/>
        <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="Appstore"/>
      </div>
    </div>
  );
}

export default Login;
