import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

// Components
import UserNavbar from '../components/UserNavbar';
import Navigation from '../components/Home/Navigation';

// Services
import { getUser } from '../services/userService';

//utils
import { formatSummary } from '../utils/formatSummary';


const SummaryContainer = styled.div`
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  background: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AppContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 40px;
  box-sizing: border-box;
  flex-grow: 1;
`;

const FormWrapper = styled.form`
  margin: 60px auto;
  padding: 30px 25px;
  max-width: 550px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  background-color: #ffffff;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #111827;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #4B5563;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`;

const StyledInput = styled.input`
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #000;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const StyledSelect = styled.select`
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%236B7280" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 12px;

  &:focus {
    border-color: #000;
    box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
    outline: none;
  }
`;

const SelectRow = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;

  > * {
    flex: 1;
  }
`;

const GenerateButton = styled.button`
  background-color: #000;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  padding: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
  width: 100%;
  margin-top: 10px;

  &:hover:not(:disabled) {
    background-color: #1f2937;
  }

  &:disabled {
    background-color: #6b7280;
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  font-size: 13px;
  color: #ef4444;
  margin-top: 4px;
  text-align: left;
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px; /* Adjusted for potentially longer content */
  font-size: 18px;
  color: #374151;
  padding: 20px;
  text-align: center;
`;

const ProgressMessage = styled.p`
  font-size: 14px;
  color: #111827; /* Darker color for progress */
  margin-top: 15px;
  text-align: center;
`;

const SummaryDisplayContainer = styled.div`
  margin: 40px auto;
  padding: 30px 25px;
  max-width: 1000px; 
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  background-color: #ffffff;
`;

const SummaryTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #111827;
  text-align: center;
`;

const SummaryText = styled.div`
  font-size: 16px;
  color: #374151;
  line-height: 1.7;
  margin-bottom: 36px;

  /* Markdown styling */
  h1, h2, h3, h4, h5, h6 {
    color: #111827;
    margin-top: 30px;
    margin-bottom: 16px;
    font-weight: 700;
    line-height: 1.3;
  }

  h1 { font-size: 24px; }
  h2 { font-size: 22px; }
  h3 { font-size: 20px; }
  h4 { font-size: 18px; }

  p {
    margin-bottom: 16px;
  }

  ul, ol {
    margin-bottom: 16px;
    padding-left: 24px;
  }

  li {
    margin-bottom: 8px;
  }

  ul li {
    list-style-type: disc;
  }

  ol li {
    list-style-type: decimal;
  }

  blockquote {
    border-left: 4px solid #e5e7eb;
    padding-left: 16px;
    margin-left: 0;
    color: #4b5563;
    font-style: italic;
  }

  code {
    font-family: monospace;
    background-color: #f3f4f6;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
  }

  pre {
    background-color: #f9fafb;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 16px;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }

  a {
    color: #2563eb;
    text-decoration: underline;
    transition: color 0.2s;
  }

  a:hover {
    color: #1d4ed8;
  }

  hr {
    border: 0;
    height: 1px;
    background-color: #e5e7eb;
    margin: 24px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
  }

  th, td {
    border: 1px solid #e5e7eb;
    padding: 8px 12px;
    text-align: left;
  }

  th {
    background-color: #f9fafb;
    font-weight: 600;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const BackButton = styled(GenerateButton)`
  background-color: #4B5563; /* A different color for back button */
  &:hover:not(:disabled) {
    background-color: #374151;
  }
  margin-top: 0; /* Remove top margin if it's the only button */
`;


const Summary = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Summary');
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    youtubeUrl: '',
    language: 'English',
    summaryType: 'Video Summary',
    aiModel: 'Google Gemini',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [progressMessage, setProgressMessage] = useState('');
  const [summaryContent, setSummaryContent] = useState('');
  const [showSummaryDisplay, setShowSummaryDisplay] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = await getUser();
        setUserInfo(user);
      } catch (err) {
        if (err.message.includes('Authentication')) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError(err.message || 'Failed to load user data.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(f => ({ ...f, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(f => ({ ...f, [name]: null }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.youtubeUrl.trim()) {
      errs.youtubeUrl = 'YouTube URL is required.';
    } else if (!/^(https?:\/\/)[^ "]+$/.test(formData.youtubeUrl)) {
      errs.youtubeUrl = 'Please enter a valid URL.';
    }
    setFormErrors(errs);
    return !Object.keys(errs).length;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError('');
    setProgressMessage(''); // Clear previous progress
    setSummaryContent(''); // Clear previous summary
    setShowSummaryDisplay(false); // Back to form view initially

    if (!validateForm()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:6009/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: formData.youtubeUrl,
          language: formData.language.toLowerCase().slice(0, 2),
          mode: formData.summaryType === 'Video Summary' ? 'video' : 'transcript',
          aiModel: formData.aiModel === 'Google Gemini' ? 'gemini' : 'gpt4'
        })
      });

      if (!response.ok) throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          if (buffer.trim().length > 0) {
            try {
              const parsedMessage = JSON.parse(buffer.trim());
              if (parsedMessage.type === 'complete' && parsedMessage.summary) {
                setSummaryContent(parsedMessage.summary);
                setProgressMessage(''); 
                setShowSummaryDisplay(true); 
              } else if (parsedMessage.type === 'progress' && parsedMessage.message) {
                setProgressMessage(parsedMessage.message);
              }
            } catch (parseError) {
              console.error('Error parsing final JSON from buffer:', parseError, "Buffer content:", buffer);
            }
          }
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex;
        while ((newlineIndex = buffer.indexOf('\n')) >= 0) {
          const line = buffer.substring(0, newlineIndex).trim();
          buffer = buffer.substring(newlineIndex + 1);

          if (line.length > 0) {
            try {
              const parsedMessage = JSON.parse(line);
              if (parsedMessage.type === 'progress' && parsedMessage.message) {
                setProgressMessage(parsedMessage.message);
              } else if (parsedMessage.type === 'complete' && parsedMessage.summary) {
                setSummaryContent(parsedMessage.summary);
                setProgressMessage(''); // Clear progress message
                setShowSummaryDisplay(true); // Show summary page

              }
            } catch (parseError) {
              console.error('Error parsing JSON line:', parseError, "Line content:", line);
            }
          }
        }
      }
      console.log('✅ Summary stream processing complete');

    } catch (err) {
      console.error(err);
      setSubmitError(`Failed to generate summary. ${err.message || 'Please try again.'}`);
      setProgressMessage(''); // Clear progress on error
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSummarizeAnother = () => {
    setShowSummaryDisplay(false);
    setSummaryContent('');
    setProgressMessage('');
    setFormData(prev => ({ ...prev, youtubeUrl: '' })); // Clear YouTube URL
    setFormErrors({});
    setSubmitError('');
  };

  if (loading) {
    return (
      <SummaryContainer>
        <UserNavbar userInfo={userInfo} />
        <AppContainer>
          <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />
          <StatusContainer>Loading user data...</StatusContainer>
        </AppContainer>
      </SummaryContainer>
    );
  }

  if (error) {
    return (
      <SummaryContainer>
        <UserNavbar userInfo={userInfo} />
        <AppContainer>
          <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />
          <StatusContainer>Error: {error}</StatusContainer>
        </AppContainer>
      </SummaryContainer>
    );
  }

  return (
    <SummaryContainer>
      <UserNavbar userInfo={userInfo} />
      <AppContainer>
        <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />

        {showSummaryDisplay ? (
          <SummaryDisplayContainer>
            <SummaryTitle>Generated Summary</SummaryTitle>
            <SummaryText>
              <ReactMarkdown>{summaryContent}</ReactMarkdown>
            </SummaryText>
            <BackButton onClick={handleSummarizeAnother}>
              Summarize Another Video
            </BackButton>
          </SummaryDisplayContainer>
        ) : (
          <FormWrapper onSubmit={handleSubmit}>
            <Title>YouTube AI Summarizer</Title>
            <Subtitle>Enter a YouTube URL to get an AI-generated summary</Subtitle>

            <FormGroup>
              <Label htmlFor="youtubeUrl">YouTube URL</Label>
              <StyledInput
                id="youtubeUrl"
                name="youtubeUrl"
                type="text"
                placeholder="e.g. https://www.youtube.com/watch?v=..."
                value={formData.youtubeUrl}
                onChange={handleChange}
                disabled={isGenerating}
              />
              {formErrors.youtubeUrl && <ErrorMessage>{formErrors.youtubeUrl}</ErrorMessage>}
            </FormGroup>

            <SelectRow>
              <FormGroup>
                <Label htmlFor="language">Language</Label>
                <StyledSelect
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  disabled={isGenerating}
                >
                  <option>English</option>
                </StyledSelect>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="summaryType">Summary Type</Label>
                <StyledSelect
                  id="summaryType"
                  name="summaryType"
                  value={formData.summaryType}
                  onChange={handleChange}
                  disabled={isGenerating}
                >
                  <option>Video Summary</option>
                </StyledSelect>
              </FormGroup>
            </SelectRow>

            <FormGroup>
              <Label htmlFor="aiModel">AI Model</Label>
              <StyledSelect
                id="aiModel"
                name="aiModel"
                value={formData.aiModel}
                onChange={handleChange}
                disabled={isGenerating}
              >
                <option>Google Gemini</option>
              </StyledSelect>
            </FormGroup>

            {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
            {isGenerating && progressMessage && <ProgressMessage>{progressMessage}</ProgressMessage>}

            <GenerateButton type="submit" disabled={isGenerating}>
              {isGenerating ? (progressMessage || 'Generating…') : 'Generate Summary'}
            </GenerateButton>
          </FormWrapper>
        )}
      </AppContainer>
    </SummaryContainer>
  );
};

export default Summary;