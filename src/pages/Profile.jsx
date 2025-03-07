import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Components
import UserNavbar from "../components/UserNavbar"
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfilePhotoSection from '../components/Profile/ProfilePhotoSection';
import BioSection from '../components/Profile/BioSection';
import PersonalInfoSection from '../components/Profile/PersonalInfoSection';
import OnboardingSection from '../components/Profile/OnboardingSection';
import InterestsSection from '../components/Profile/InterestsSection';

// Service
import { getUser } from "../services/userService";

// Styled Components for Loading Spinner
const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: #f5f5f5;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileContainer = styled.div`
  width: 100%;
  margin: auto;
  padding: 20px;
  color: #f5f5f5;
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('');
  const [onboardingResponses, setOnboardingResponses] = useState({
    confidenceLevel: '',
    untouchedTopics: [],
    challengingTopic: '',
    dailyStudyTime: '',
    preferredLearningMethod: '',
  });
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const fetchedUser = await getUser();
        setUser(fetchedUser);
        setBio(fetchedUser.bio || '');
        setName(fetchedUser.name || '');
        setEmail(fetchedUser.email || '');
        setMobile(fetchedUser.mobile || '');
        setRole(fetchedUser.role || '');
        setOnboardingResponses(fetchedUser.onboardingResponses || {});
        setInterests(fetchedUser.targetTopics || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSubmitBio = () => {
    // Save bio changes
    updateUser({ bio })
      .then(() => alert('Bio updated successfully!'))
      .catch((error) => alert('Error updating bio.'));
  };

  const handleSubmitPersonalInfo = () => {
    // Save personal info changes
    updateUser({ name, email, mobile, role })
      .then(() => alert('Personal information updated successfully!'))
      .catch((error) => alert('Error updating personal info.'));
  };

  const handleSubmitOnboarding = () => {
    // Save onboarding responses changes
    updateUser({ onboardingResponses })
      .then(() => alert('Onboarding responses updated successfully!'))
      .catch((error) => alert('Error updating onboarding responses.'));
  };

  const handleAddInterest = (topic) => {
    setInterests((prev) => [...prev, topic]);
  };

  const handleRemoveInterest = (topic) => {
    setInterests((prev) => prev.filter((interest) => interest !== topic));
  };

  return (
    <Container>
      <UserNavbar userInfo={user}/>
      {loading ? (
        <LoadingSpinner>Loading...</LoadingSpinner>
      ) : (
        <ProfileContainer>
          <ProfileHeader />
          <ProfileContent>
            <ProfilePhotoSection user={user} />
            <BioSection bio={bio} setBio={setBio} handleSubmitBio={handleSubmitBio} />
            <PersonalInfoSection 
              name={name} setName={setName} 
              email={email} setEmail={setEmail} 
              mobile={mobile} setMobile={setMobile} 
              role={role} setRole={setRole} 
              handleSubmitPersonalInfo={handleSubmitPersonalInfo}
            />
            <OnboardingSection 
              onboardingResponses={onboardingResponses} 
              setOnboardingResponses={setOnboardingResponses}
              handleSubmitOnboarding={handleSubmitOnboarding}
            />
            <InterestsSection 
              interests={interests} 
            />
          </ProfileContent>
        </ProfileContainer>
      )}
    </Container>
  );
};

export default Profile;
