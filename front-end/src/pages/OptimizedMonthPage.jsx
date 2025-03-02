// src/pages/OptimizedMonthPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTruck, FaPhone, FaCalendarAlt, FaCreditCard, FaDesktop } from 'react-icons/fa';

const Container = styled.div`
  max-width: 450px;
  margin: 0 auto;
  background-color: ${props => props.theme.colors.white};
  min-height: 100vh;
`;

const Header = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 15px 20px;
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  margin-right: 15px;
  cursor: pointer;
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 500;
  flex: 1;
`;

const Timeline = styled.div`
  background-color: ${props => props.theme.colors.darkGray};
  color: ${props => props.theme.colors.white};
  padding: 15px 20px;
  border-radius: 10px;
  margin: 15px;
`;

const TimelineMonth = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const TimelineGrid = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const TimelineLine = styled.div`
  height: 2px;
  background-color: ${props => props.theme.colors.white};
  flex: 1;
  position: relative;
`;

const TimelineMarker = styled.div`
  position: absolute;
  top: -8px;
  height: 15px;
  width: 1px;
  background-color: ${props => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & > span {
    position: absolute;
    top: -20px;
    font-size: 12px;
  }
`;

const TimelineDate = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 12px;
`;

const PaymentsContainer = styled.div`
  padding: 0 15px;
  margin-top: 20px;
  position: relative;
`;

const VerticalLine = styled.div`
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: ${props => props.theme.colors.black};
`;

const PaymentBar = styled.div`
  height: 20px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.blue[props.intensity || 'medium']};
  margin: 15px 0 15px 50px;
  width: ${props => props.width || '70%'};
`;

const PaymentCard = styled.div`
  background-color: ${props => props.theme.colors.blue.dark};
  color: ${props => props.theme.colors.white};
  border-radius: 10px;
  padding: 15px;
  margin: 15px 0 15px 50px;
`;

const PaymentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const PaymentIcon = styled.div`
  margin-right: 10px;
  font-size: 20px;
`;

const PaymentName = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const PaymentDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`;

const PaymentLabel = styled.div`
  color: ${props => props.theme.colors.white};
  opacity: 0.8;
`;

const SavedAmount = styled.div`
  color: ${props => props.theme.colors.white};
  font-weight: 500;
`;

const ProgressBar = styled.div`
  height: 20px;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 5px;
  margin-top: 30px;
  position: relative;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.progress || '50%'};
  background-color: ${props => props.theme.colors.lightSuccess};
`;

const OptimizedMonthPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <MenuButton>
          <FaBars />
        </MenuButton>
        <HeaderTitle>Optimized Month</HeaderTitle>
      </Header>

      <Timeline>
        <TimelineMonth>May</TimelineMonth>
        <TimelineGrid>
          <TimelineLine>
            <TimelineMarker style={{ left: '10%' }}>
              <span>4</span>
            </TimelineMarker>
            <TimelineMarker style={{ left: '20%' }}>
              <span>7</span>
            </TimelineMarker>
            <TimelineMarker style={{ left: '30%' }}>
              <span>10</span>
            </TimelineMarker>
            <TimelineMarker style={{ left: '50%' }}>
              <span>20</span>
            </TimelineMarker>
            <TimelineMarker style={{ left: '60%' }}>
              <span>24</span>
            </TimelineMarker>
            <TimelineMarker style={{ left: '70%' }}>
              <span>28</span>
            </TimelineMarker>
          </TimelineLine>
        </TimelineGrid>
        <TimelineDate>
          <span>1</span>
          <span>15</span>
          <span>31</span>
        </TimelineDate>
      </Timeline>

      <PaymentsContainer>
        <VerticalLine />

        <PaymentBar intensity="light" width="50%" />

        <PaymentBar intensity="medium" width="80%" />

        <PaymentCard>
          <PaymentHeader>
            <PaymentIcon>
              <FaTruck />
            </PaymentIcon>
            <PaymentName>Car Payment:</PaymentName>
          </PaymentHeader>
          <PaymentDetails>
            <div>
              <PaymentLabel>Due Date</PaymentLabel>
              <PaymentLabel>Last Paid:</PaymentLabel>
            </div>
            <SavedAmount>
              Amount Saved:
              <br />+ 1.50
            </SavedAmount>
          </PaymentDetails>
        </PaymentCard>

        <PaymentBar intensity="medium" width="70%" />

        <PaymentBar intensity="light" width="40%" />

        <ProgressBar>
          <Progress progress="30%" />
        </ProgressBar>
      </PaymentsContainer>
    </Container>
  );
};

export default OptimizedMonthPage;