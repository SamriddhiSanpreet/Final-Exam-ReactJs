import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebaseConfig'; 

const Authentication = () => {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsActive(!isActive);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/products'); 
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/products'); 
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <section>
        <div className={`container ${isActive ? 'active' : ''}`}>
          <div className="user signinBx">
            <div className="imgBx">
              <img src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg" alt=""/>
            </div>
            <div className="formBx">
              <form onSubmit={handleLogin}>
                <h2>Sign In</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Login" />
                <p className="signup">
                  Don't have an account? <a href="#" onClick={toggleForm}>Sign Up.</a>
                </p>
              </form>
            </div>
          </div>
          <div className="user signupBx">
            <div className="formBx">
              <form onSubmit={handleRegister}>
                <h2>Create an account</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Sign Up" />
                <p className="signup">
                  Already have an account? <a href="#" onClick={toggleForm}>Sign in.</a>
                </p>
              </form>
            </div>
            <div className="imgBx">
              <img src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg" alt=""/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Authentication;
