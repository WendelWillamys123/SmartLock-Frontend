import React, {useState} from 'react';
import api from '../../services/api';
import './style.css';
import './styleSwitch.css';

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function createOrganization(e) {
    e.preventDefault();
    const response = await api.post('/app/register', {
        name,
        email,
        password, 
    });
    if(response.status === 200){
      sessionStorage.setItem("tokenLocal", JSON.stringify(response.data.token));
      window.location.replace("http://localhost:3000/home");
    }else{
      
    }
  }

  async function loginOrganization(e) {
    e.preventDefault();
    const response = await api.post('/app/authenticate', {
        email,
        password, 
    });
    if(response.status === 200){
      sessionStorage.setItem("source", JSON.stringify("None"));
    sessionStorage.setItem("tokenLocal", JSON.stringify(response.data.token));
    sessionStorage.setItem("myID", JSON.stringify(response.data.organization));
    window.location.replace("http://localhost:3000/home");
    }
}

return (
  <div className="container">
    
          <div className="content first-content">

            <div className="first-column">
              <h2 className="title title-primary">Welcome back!</h2>
              <div className="info-first-column">
              <p className="description description-primary">To keep connected with us</p>
              <p className="description description-primary">please login with your personal info</p>
              </div>
              <button id="signin" className="btn btn-primary" onClick={()=>{
                    var body = document.querySelector("body");
                    body.className = "sign-in-js";
                }}>sign in</button>
            </div>  

            <div className="second-column">
              <h2 className="title title-second">Create your organization</h2>
              <div className="info-second-column">
              <p className="description description-second">Use your email for registration</p>
             </div>
              <form className="form" onSubmit={e => createOrganization(e)}>
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
                  <div className="info-first-column">
                  <p className="description description-primary">Enter your personal data</p>
                  <p className="description description-primary">and join us</p>
                  </div>
                  <button id="signup" className="btn btn-primary" onClick={()=>{
                    var body = document.querySelector("body");
                    body.className = "sign-up-js";
                }}>sign up</button>
              </div>

              <div className="second-column">
                  <h2 className="title title-second">Sign in to organization</h2>
                  <div className="info-second-column">
                  <p className="description description-second">Use your email account</p>
                  </div>
              
                  <form className="form" onSubmit={e => loginOrganization(e)}>
                      <label className="label-input">
                        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                      </label>
                  
                      <label className="label-input">
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                      </label>
              
                      <button className="btn btn-second">sign in</button>
                  </form>
              </div>
          </div>
  </div>
);
}

export default Login;