import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate('/'); 
      })
      .catch((error) => {
        console.error('SignIn error:', error.code, error.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email"
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" 
        />
        <button type="submit">Sign In with Email</button>
      </form>
      <p>
        Don't have an account? 
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </p>
    </div>
  );
};

export default SignIn;
