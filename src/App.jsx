import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

//styles
import "./index.css"


//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Course from './pages/Course';
import Quiz from './pages/Quiz';
import QuizAttemptPage from './pages/QuizAttemptPage';
import Learning from "./pages/Learning"


//components
import PrivateRoute from "./components/PrivateRoute";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />

        <Route
          path="/course/:courseId"
          element={
            <PrivateRoute>
              <Course />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        />

        <Route
          path="/quiz/:quizId"
          element={
            <PrivateRoute>
              <QuizAttemptPage />
            </PrivateRoute>
          }
          />

          <Route
            path="/learning"
            element={
              <PrivateRoute>
                <Learning />
              </PrivateRoute>
            }
          />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
