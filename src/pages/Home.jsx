import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

//icons
import { InfoIcon } from '../components/icons';


// Services
import { getUser } from "../services/userService";

// Components
import UserNavbar from '../components/UserNavbar';
import Navigation from '../components/Home/Navigation';
import WelcomeSection from '../components/Home/WelcomeSection';
import FeatureSection from '../components/Home/FeatureSection';
import CoursesGrid from '../components/Home/CoursesGrid';
import NewEnrollmentGrid from '../components/Home/NewEnrollmentGrid';
import StatsSection from '../components/Home/StatsSection';

const AppContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 40px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const HomeContainer = styled.div`
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  background: white;
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 20px 0;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
`;

const ViewAllLink = styled.a`
  color: #6366f1;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState('Home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: 'User' }); // default name

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = await getUser();
        console.log(user);
        setUserInfo(user);
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to fetch user information.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <HomeContainer>
      <UserNavbar userInfo={userInfo} />
      <AppContainer>
        <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />
        <WelcomeSection userName={userInfo.name} />

        <SectionHeader>
          <SectionTitle>
            New Courses <span><InfoIcon /></span>
          </SectionTitle>
          <ViewAllLink href="/learning">View all</ViewAllLink>
        </SectionHeader>

        <NewEnrollmentGrid />

      </AppContainer>
    </HomeContainer>
  );
};

export default Home;
