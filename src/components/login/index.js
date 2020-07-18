import React, {useState} from 'react';
import api from '../../services/api';
import './style.css';

function Login() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function createOrganization() {
            await api.post('/users', {
            name,
            email,
            password, 
        });
    }
  
  return (
    <div className="container">
      
            <div className="content first-content">

              <div className="first-column">
                <h2 className="title title-primary">Welcome back!</h2>
                <p className="description description-primary">To keep connected with us</p>
                <p className="description description-primary">please login with your personal info</p>
                <button id="signin" className="btn btn-primary" onClick={()=>{
                      var body = document.querySelector("body");
                      body.className = "sign-in-js";
                  }}>sign in</button>
              </div>  

              <div className="second-column">
                <h2 className="title title-second">Create account</h2>
                <p className="description description-second">Use your email for registration</p>
               
                <form className="form" onSubmit={createOrganization}>
                  <label className="label-input">
                    <input type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
                  </label>
                    
                  <label className="label-input">
                    <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                  </label>
                    
                  <label className="label-input">
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                  </label>
                    
                    
                  <button className="btn btn-second">sign up</button>        
                </form>
              </div>

            </div>

            <div className="content second-content">

                <div className="first-column">
                    <h2 className="title title-primary">Hello, friend!</h2>
                    <p className="description description-primary">Enter your personal data</p>
                    <p className="description description-primary">and join us</p>
                    <button id="signup" className="btn btn-primary" onClick={()=>{
                      var body = document.querySelector("body");
                      body.className = "sign-up-js";
                  }}>sign up</button>
                </div>

                <div className="second-column">
                    <h2 className="title title-second">Sign in to organization</h2>
                    <p className="description description-second">Use your email account</p>
                
                    <form className="form">
                        <label className="label-input">
                          <input type="email" placeholder="Email"/>
                        </label>
                    
                        <label className="label-input">
                          <input type="password" placeholder="Password"/>
                        </label>
                
                        <a className="password" href="#">forgot your password?</a>
                        <button className="btn btn-second">sign in</button>
                    </form>
                </div>
            </div>
    </div>
  );
}

export default Login;