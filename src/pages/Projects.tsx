
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import PageTransition from '../components/shared/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Briefcase, 
  Award, 
  Plus,
  ExternalLink,
  Clock,
  Code,
  Building,
  PenTool,
  FileText,
  ArrowUpRight,
  Star,
  Link as LinkIcon,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Mock data
const projectsData = [
  {
    id: 1,
    title: 'Machine Learning for Predictive Analysis',
    description: 'A project on using machine learning algorithms for predictive analysis of student performance.',
    status: 'Completed',
    grade: 'A',
    date: '2023-05-15',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow'],
    link: 'https://github.com/sample/ml-project',
    thumbnail: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRhdGElMjBzY2llbmNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 2,
    title: 'Web-based Student Management System',
    description: 'Development of a web-based student management system for academic tracking.',
    status: 'In Progress',
    grade: 'Pending',
    date: '2023-10-10',
    skills: ['React', 'Node.js', 'Express', 'MongoDB'],
    link: 'https://github.com/sample/student-mgmt',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    title: 'IoT-based Smart Campus Solution',
    description: 'A smart campus prototype using IoT sensors to monitor various environmental parameters.',
    status: 'Completed',
    grade: 'A+',
    date: '2023-07-20',
    skills: ['IoT', 'Arduino', 'C++', 'Sensors', 'Cloud Computing'],
    link: 'https://github.com/sample/iot-campus',
    thumbnail: 'https://images.unsplash.com/photo-1563770557593-8f6f6bb430f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW90fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
];

const internshipsData = [
  {
    id: 1,
    company: 'Tech Innovations Inc.',
    logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaCUyMGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=200&q=60',
    role: 'Web Development Intern',
    period: 'May 2023 - July 2023',
    status: 'Completed',
    skills: ['React', 'Node.js', 'MongoDB'],
    description: 'Assisted in developing and maintaining web applications for clients. Worked on responsive design and implemented new features.',
    location: 'Hyderabad, India',
  },
  {
    id: 2,
    company: 'DataSoft Solutions',
    logo: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dGVjaCUyMGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=200&q=60',
    role: 'Data Science Intern',
    period: 'Dec 2023 - Feb 2024',
    status: 'In Progress',
    skills: ['Python', 'TensorFlow', 'Data Analysis'],
    description: 'Working on data analysis and visualization for business intelligence. Developing predictive models for customer behavior.',
    location: 'Remote',
  },
];

const achievementsData = [
  {
    id: 1,
    title: 'Best Student Project Award',
    organization: 'Sri Venkateswara University',
    date: 'May 2023',
    description: 'Awarded for the Machine Learning for Predictive Analysis project in the annual technical showcase.',
    icon: <Award className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: 2,
    title: 'Certificate in Advanced React Development',
    organization: 'React Academy',
    date: 'August 2023',
    description: 'Completed a 12-week intensive course on advanced React patterns and state management.',
    icon: <FileText className="h-6 w-6 text-blue-500" />,
  },
  {
    id: 3,
    title: '3rd Place in Hackathon',
    organization: 'TechFest 2023',
    date: 'November 2023',
    description: 'Won 3rd place for developing an innovative solution for healthcare management during a 48-hour hackathon.',
    icon: <Star className="h-6 w-6 text-purple-500" />,
  },
];

const Projects = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');

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

  const handleAdd = (type: string) => {
    toast.success(`You can add a new ${type} here. This feature will be available soon.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <PageTransition>
        <main className="flex-grow pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold">Projects & Achievements</h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your projects, internships, and achievements
                  </p>
                </div>
                
                <div className="glass-panel px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Calendar size={18} className="text-primary" />
                  <span className="font-medium text-sm">Academic Year 2023-2024</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="flex justify-between items-center mb-6">
                    <TabsList>
                      <TabsTrigger value="projects">Projects</TabsTrigger>
                      <TabsTrigger value="internships">Internships</TabsTrigger>
                      <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    </TabsList>
                    
                    <Button onClick={() => handleAdd(activeTab)} className="flex items-center gap-1">
                      <Plus size={16} />
                      <span>Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)}</span>
                    </Button>
                  </div>
                  
                  <TabsContent value="projects">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projectsData.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="overflow-hidden h-full flex flex-col">
                            <div className="relative h-48">
                              <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-3 right-3">
                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                  project.status === 'Completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {project.status}
                                </span>
                              </div>
                            </div>
                            
                            <div className="p-5 flex-grow">
                              <div className="flex items-start justify-between">
                                <h3 className="text-lg font-semibold">{project.title}</h3>
                                {project.grade && (
                                  <span className={`text-sm font-medium ${
                                    project.grade === 'Pending' 
                                      ? 'text-yellow-500' 
                                      : 'text-green-600'
                                  }`}>
                                    {project.grade}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Calendar size={14} className="mr-1" />
                                <span>{new Date(project.date).toLocaleDateString()}</span>
                              </div>
                              
                              <p className="text-sm mt-3 text-muted-foreground">
                                {project.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-1 mt-4">
                                {project.skills.slice(0, 3).map((skill, i) => (
                                  <span key={i} className="text-xs px-2 py-1 bg-secondary rounded-full">
                                    {skill}
                                  </span>
                                ))}
                                {project.skills.length > 3 && (
                                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                                    +{project.skills.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="p-5 pt-0 mt-auto">
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full py-2 rounded-md bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                              >
                                <ExternalLink size={14} className="mr-1" />
                                View Project
                              </a>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="internships">
                    <div className="space-y-6">
                      {internshipsData.map((internship, index) => (
                        <motion.div
                          key={internship.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="h-14 w-14 rounded-md overflow-hidden flex-shrink-0 bg-secondary flex items-center justify-center">
                                {internship.logo ? (
                                  <img
                                    src={internship.logo}
                                    alt={internship.company}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Building size={24} className="text-primary" />
                                )}
                              </div>
                              
                              <div className="flex-grow">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                  <div>
                                    <h3 className="text-lg font-semibold">{internship.role}</h3>
                                    <p className="text-primary font-medium">{internship.company}</p>
                                  </div>
                                  
                                  <div className="mt-2 sm:mt-0 space-y-1">
                                    <span className={`text-xs px-3 py-1 rounded-full inline-flex items-center ${
                                      internship.status === 'Completed' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-blue-100 text-blue-800'
                                    }`}>
                                      {internship.status === 'Completed' ? (
                                        <Check size={12} className="mr-1" />
                                      ) : (
                                        <Clock size={12} className="mr-1" />
                                      )}
                                      {internship.status}
                                    </span>
                                    
                                    <div className="text-sm flex items-center text-muted-foreground">
                                      <Calendar size={14} className="mr-1" />
                                      <span>{internship.period}</span>
                                    </div>
                                    
                                    <div className="text-sm flex items-center text-muted-foreground">
                                      <Building size={14} className="mr-1" />
                                      <span>{internship.location}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <p className="text-muted-foreground text-sm mt-3">
                                  {internship.description}
                                </p>
                                
                                <div className="mt-4 flex flex-wrap gap-2">
                                  {internship.skills.map((skill, i) => (
                                    <span key={i} className="text-xs px-2 py-1 bg-secondary rounded-full flex items-center">
                                      <Code size={12} className="mr-1" />
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="achievements">
                    <div className="space-y-6">
                      {achievementsData.map((achievement, index) => (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="h-12 w-12 rounded-full bg-secondary/50 flex items-center justify-center flex-shrink-0">
                                {achievement.icon || <Award className="h-6 w-6 text-primary" />}
                              </div>
                              
                              <div className="flex-grow">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                  <div>
                                    <h3 className="text-lg font-semibold">{achievement.title}</h3>
                                    <p className="text-primary font-medium">{achievement.organization}</p>
                                  </div>
                                  
                                  <div className="mt-2 sm:mt-0">
                                    <div className="text-sm flex items-center text-muted-foreground">
                                      <Calendar size={14} className="mr-1" />
                                      <span>{achievement.date}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <p className="text-muted-foreground text-sm mt-3">
                                  {achievement.description}
                                </p>
                                
                                <div className="mt-4">
                                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <FileText size={14} />
                                    <span>View Certificate</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
              
              {/* Helpful Resources */}
              <motion.div variants={itemVariants} className="mt-12">
                <h2 className="text-xl font-semibold mb-6">Helpful Resources</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Project Submission Guidelines',
                      description: 'Learn about the format and requirements for submitting your projects.',
                      icon: <FileText className="h-8 w-8 text-primary" />,
                      link: '#',
                    },
                    {
                      title: 'Internship Opportunities',
                      description: 'Explore available internship opportunities with university partners.',
                      icon: <Briefcase className="h-8 w-8 text-primary" />,
                      link: '#',
                    },
                    {
                      title: 'Certificate Verification',
                      description: 'Get your certificates and achievements verified for your portfolio.',
                      icon: <Award className="h-8 w-8 text-primary" />,
                      link: '#',
                    },
                  ].map((resource, i) => (
                    <Card key={i} className="p-6">
                      <div className="mb-4">{resource.icon}</div>
                      <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                      <a
                        href={resource.link}
                        className="text-primary font-medium inline-flex items-center hover:underline"
                      >
                        Learn more
                        <ArrowUpRight size={16} className="ml-1" />
                      </a>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </PageTransition>
      
      <Footer />
    </div>
  );
};

export default Projects;
