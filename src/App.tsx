import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { HomePage } from './pages/HomePage';
import { TestPage } from './pages/TestPage';
import { ResultPage } from './pages/ResultPage';
import { DetailPage } from './pages/DetailPage';
import { CommunityPage } from './pages/CommunityPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { MyPage } from './pages/MyPage';
import { CreatePostPage } from './pages/CreatePostPage';
import { BottomNav } from './components/Shared/Navigation';
export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Mobile App Container Wrapper */}
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
          <div className="w-full max-w-md h-[100dvh] bg-background shadow-2xl relative overflow-hidden flex flex-col sm:rounded-[2.5rem] sm:h-[90vh] sm:border-[8px] sm:border-gray-900">
            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto relative hide-scrollbar">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/result/:type" element={<ResultPage />} />
                <Route path="/place/:id" element={<DetailPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/my" element={<MyPage />} />
                <Route path="/create-post" element={<CreatePostPage />} />
              </Routes>
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>);

}