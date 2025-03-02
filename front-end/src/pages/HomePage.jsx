// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronLeft, FaSearch, FaPlus } from 'react-icons/fa';

const Container = styled.div`
  max-width: 450px;
  margin: 0 auto;
  background-color: ${props => props.theme.colors.white};
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  flex: 1;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const SavingsCard = styled.div`
  background-color: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.white};
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

const SavingsLabel = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const SavingsAmount = styled.div`
  font-size: 36px;
  font-weight: 700;
`;

const OptimizeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${props => props.theme.colors.secondary};
  border: none;
  border-radius: 20px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 30px;
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const AccountCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: ${props => props.theme.shadows.card};
`;

const AccountLogo = styled.img`
  height: 30px;
  margin-bottom: 10px;
`;

const AccountName = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.black};
`;

const AddAccountButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${props => props.theme.colors.secondary};
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 30px;
`;

const BottomIndicator = styled.div`
  width: 50px;
  height: 5px;
  background-color: ${props => props.theme.colors.black};
  border-radius: 5px;
  margin: 0 auto;
`;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <IconButton>
          <FaChevronLeft />
        </IconButton>
        <Title>Home Page</Title>
        <IconButton>
          <FaSearch />
        </IconButton>
      </Header>

      <SavingsCard>
        <SavingsLabel>Savings so far:</SavingsLabel>
        <SavingsAmount>$56.33</SavingsAmount>
      </SavingsCard>

      <OptimizeButton onClick={() => navigate('/optimized-month')}>
        <span>Optimize your savings more</span>
        <span>→</span>
      </OptimizeButton>

      <SectionTitle>Current Accounts Connected:</SectionTitle>
      
      <AccountCard>
        <AccountLogo src="/images/chase-logo.png" alt="Chase" />
        <AccountName>Sapphire Card</AccountName>
      </AccountCard>

      <AccountCard>
        <AccountLogo src="/images/capital-one-logo.png" alt="Capital One" />
        <AccountName>Debit Card</AccountName>
      </AccountCard>

      <AddAccountButton onClick={() => navigate('/add-account')}>
        Add Account ( + )
      </AddAccountButton>

      <BottomIndicator />
    </Container>
  );
};

export default HomePage;