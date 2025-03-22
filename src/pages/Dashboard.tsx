
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import TeacherDashboard from '../components/dashboard/TeacherDashboard';
import { Navigate } from 'react-router-dom';
import PageTransition from '../components/shared/PageTransition';

const Dashboard = () => {
  const { user, isLoading } = useAuth();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <PageTransition>
        <main className="flex-grow pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {user.role === 'student' ? <StudentDashboard /> : <TeacherDashboard />}
          </div>
        </main>
      </PageTransition>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
