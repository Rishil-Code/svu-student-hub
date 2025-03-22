
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import { ChevronRight, User, School, Award, BarChart4, CheckCircle } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if user is already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const features = [
    {
      icon: <User className="h-6 w-6 text-primary" />,
      title: 'User-Friendly Interface',
      description: 'Intuitive design for both students and teachers with role-based access.',
    },
    {
      icon: <School className="h-6 w-6 text-primary" />,
      title: 'Academic Tracking',
      description: 'Comprehensive monitoring of academic progress, grades, and performance metrics.',
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: 'Projects & Achievements',
      description: 'Record and showcase projects, internships, and personal achievements.',
    },
    {
      icon: <BarChart4 className="h-6 w-6 text-primary" />,
      title: 'Performance Analytics',
      description: 'Visual representations of performance data for better decision making.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 z-0" />
          <div className="absolute inset-0 bg-grid z-0" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="text-center lg:text-left"
              >
                <motion.div variants={itemVariants}>
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
                    Sri Venkateswara University
                  </span>
                </motion.div>
                
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6"
                >
                  Student Management System
                </motion.h1>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
                >
                  A comprehensive platform designed for students and teachers to manage and track academic progress.
                </motion.p>
                
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a 
                    href="#login" 
                    className="px-6 py-3 bg-primary text-white rounded-lg flex items-center justify-center text-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </a>
                  <a 
                    href="#features" 
                    className="px-6 py-3 bg-secondary text-foreground rounded-lg flex items-center justify-center text-lg font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Learn More
                  </a>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden lg:block relative"
              >
                <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent -z-10 rounded-full blur-2xl" />
                <img 
                  src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c3R1ZGVudHMlMjBjb21wdXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" 
                  alt="Students using the platform" 
                  className="rounded-xl object-cover shadow-xl shadow-primary/10 w-full h-[500px]"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our student management system provides powerful tools for both students and teachers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="p-3 bg-primary/10 inline-block rounded-lg mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6">Benefits for Students and Teachers</h2>
                <div className="space-y-4">
                  {[
                    'Real-time access to academic performance and results',
                    'Comprehensive tracking of projects and internships',
                    'Efficient communication between students and teachers',
                    'Analytical tools for monitoring progress and growth',
                    'Secure storage of academic records and achievements',
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="text-primary mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                      <p className="text-lg">{benefit}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="aspect-video rounded-xl overflow-hidden bg-gray-100"
              >
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHN0dWRlbnRzJTIwc3R1ZHlpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" 
                  alt="Students studying together" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Login Section */}
        <section id="login" className="py-20 bg-gradient-to-b from-white to-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Login to Your Account</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Access your student or teacher dashboard to manage your academic information.
              </p>
            </div>
            
            <LoginForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
