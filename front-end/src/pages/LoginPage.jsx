// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 450px;
  margin: 0 auto;
  background-color: #FEF9F9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  font-size: 16px;
  &::placeholder {
    color: #AAAAAA;
  }
`;

const ForgotPassword = styled.a`
  color: #6366F1;
  text-decoration: none;
  font-size: 14px;
  margin-top: 5px;
  align-self: flex-start;
  cursor: pointer;
`;

const TermsText = styled.p`
  font-size: 14px;
  color: #333333;
  margin: 20px 0;
`;

const TermsLink = styled.a`
  color: #6366F1;
  text-decoration: none;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #002147;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // In LoginPage.jsx, update the handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle authentication with an API
    console.log('Login attempt with:', email, password);
    
    // For demo purposes, set a flag in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    
    // Navigate to home page after login
    navigate('/');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Input 
          type="password" 
          placeholder="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <ForgotPassword>Forgot password?</ForgotPassword>
        
        <TermsText>
          By continuing, you agree to our <TermsLink href="/terms">Terms of Service</TermsLink> and <TermsLink href="/privacy">Privacy Policy</TermsLink>.
        </TermsText>
        
        <LoginButton type="submit">Log in</LoginButton>
      </Form>
    </Container>
  );
};

export default LoginPage;