import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import StudyPlanPage from './pages/StudyPlanPage';
import ReportsPage from './pages/ReportsPage';
import ProfilePage from './pages/ProfilePage';
import SupervisionPage from './pages/SupervisionPage';
import ReportingPage from './pages/ReportingPage';
import ThesisPage from './pages/ThesisPage';
import MilestonesPage from './pages/MilestonesPage';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <HashRouter>
          <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/study-plan" element={<StudyPlanPage />} />
                  <Route path="/milestones" element={<MilestonesPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/supervision" element={<SupervisionPage />} />
                  <Route path="/thesis" element={<ThesisPage />} />
                  <Route path="/reporting" element={<ReportingPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </main>
            </div>
          </div>
        </HashRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;