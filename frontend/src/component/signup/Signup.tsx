import { Link } from 'react-router-dom';
import './Signup.scss'
function Signup() {
  return (
    <div className="register-container">
      <div className="signup">
        <h1 className="signup__title">Memories</h1>
        <p className='signup__description'>Sign up to see photos and videos from your friends.</p>
        <p className='signup__with-fb'> Login in with Facebook</p>
        <div className="signup__line-or-line">
          <div className="line"></div>
          <p className='or'>OR</p>
          <div className="line"></div>
        </div>
        
        <form className="signup__form">
          <input className="phoneemail" type="text" name="phoneemail" placeholder="Mobile Number or Email"/>
          <input className="fullname" type="text" name="fullname" placeholder="Full name"/>
          <input className="username" type="text" name="username" placeholder="Username"/>
          <input className="password" type="text" name="password" placeholder="Password"/>
          <div className="signup__policy">
            <p>People who use our service may have uploaded your contact information to Instagram.
            <a href='#/' className='link'>Learn More</a>
            </p>
            <br/>
            <p>By signing up, you agree to our
            <a href='#/' className='link'>Terms,</a>
            <a href='#/' className='link'>Privacy Policy</a>
            <span>and</span>
            <a href='#/' className='link'>Cookies Policy</a>
            </p>
          </div>

          <input className="btn-submit" type="submit" value="Sign up" />

        </form>
      </div>

      <div className="login">
        <span className="login__text">Have an account?</span>
        <Link to='/signin' className="login__text--link">Sign in</Link>
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

export default Signup;
