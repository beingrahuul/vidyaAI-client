import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// services
import { registerUser } from "../services/authService"; 

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #121212;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1440 320"%3E%3Cpath fill="%23212a2d" d="M0,128L30,117.3C60,107,120,85,180,96C240,107,300,149,360,144C420,139,480,85,540,85.3C600,85,660,139,720,160C780,181,840,171,900,165.3C960,160,1020,160,1080,170.7C1140,181,1200,203,1260,218.7C1320,235,1380,245,1410,250L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"%3E%3C/path%3E%3C/svg%3E');
    background-size: cover;
    z-index: 1;
    opacity: 0.1;
  }
`;

const FormContainer = styled.div`
  background: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  padding: 50px;
  width: 90%;
  max-width: 450px;
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  margin: 0 0 40px 0px;
  font-size: 38px;
  color: #ffffff;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #444;
  border-radius: 5px;
  font-size: 16px;
  color: #ffffff;
  background: #282828;
  box-sizing: border-box;

  &::placeholder {
    color: #bbb;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #e6195e;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #d11a4e;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  font-size: 14px;
  color: #e0e0e0;
`;

const StyledLink = styled.span`
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #f3f3f3;
  }
`;

const LoadingMessage = styled.div`
  color: #ffffff;
  text-align: center;
  margin-top: 15px;
`;

const ErrorMessage = styled.div`
  color: #e6195e;
  text-align: center;
  margin-top: 15px;
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/chat');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, username, email, password, confirmPassword } = formData;
    if (!name || !username || !email || !password || !confirmPassword) {
      return "All fields are required.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false); // Reset loading state on validation error
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log("User registered:", response);
      
      // Reset form data after successful registration
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Reset loading state when done
    }
  };
  
  return (
    <Container>
      <FormContainer>
        <Title>Sign Up</Title>
        <form 
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "inherit"
          }}
        >
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        {loading && <LoadingMessage>Please wait...</LoadingMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <LinkContainer>
          <StyledLink onClick={() => navigate("/login")}>
            Already have an account? Login
          </StyledLink>
        </LinkContainer>
      </FormContainer>
    </Container>
  );
};

export default Signup;
