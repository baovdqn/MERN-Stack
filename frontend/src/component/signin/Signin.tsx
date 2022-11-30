import { Link } from 'react-router-dom';
import './Signin.scss'
import { signIn } from '../../api/login.api'
import React, { ChangeEvent, FormEvent, useState } from 'react';
function Signin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const onUsernameChange = (evt:  ChangeEvent<HTMLInputElement>) => setUsername(evt.target.value)
  const onPasswordChange = (evt:  ChangeEvent<HTMLInputElement>) => setPassword(evt.target.value)
  const onSubmit = async (e: FormEvent) =>{
    e.preventDefault();
    const result = await signIn(username, password) as any;
    alert(result.data.msg);
    return result.msg;
  }
  return (
    <div className="login-container">
      <div className="signin">
        <h1 className="signin__title">Memories</h1>
        <form className="signin__form" onSubmit={onSubmit}>
          <input className="user" type="text" name="username" onChange={onUsernameChange} placeholder="Your email"/>
          <input className="password" type="password" name="password" onChange={onPasswordChange} placeholder="Password"/>
          <input className="btn-submit" type="submit" value="Login" />
        </form>
        <div className="signin__line-or-line">
          <div className="line"></div>
          <p className='or'>OR</p>
          <div className="line"></div>

        </div>
        <p className='signin__with-fb'> Login in with Facebook</p>
        <p className="signin__forgot">Forgot password</p>
      </div>
      <div className="register">
        <span className="register__text">Don't have an account?</span>
        <Link to='/signup' className="register__text--link">Sign up</Link>
      </div>
      <div className="app">
        <p className="app__title">Get the app</p>
        <div className="app__both">
        <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="Google play"/>
        <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="Appstore"/>
        </div>
      </div>
    </div>
  );
}

export default Signin;
