
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import PerformanceChart from './PerformanceChart';
import ResultsTable, { ResultData } from './ResultsTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { 
  BookOpen, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  BarChart
} from 'lucide-react';

// Mock data
const performanceData = [
  { subject: 'Mathematics', score: 85, maxScore: 100 },
  { subject: 'Computer Science', score: 92, maxScore: 100 },
  { subject: 'Physics', score: 78, maxScore: 100 },
  { subject: 'English', score: 88, maxScore: 100 },
  { subject: 'Chemistry', score: 75, maxScore: 100 },
];

const resultsData: ResultData[] = [
  {
    subject: 'Mathematics',
    mid1: 42,
    mid2: 45,
    semester: 86,
    grade: 'A+',
    status: 'pass',
  },
  {
    subject: 'Computer Science',
    mid1: 46,
    mid2: 48,
    semester: 92,
    grade: 'O',
    status: 'pass',
  },
  {
    subject: 'Physics',
    mid1: 38,
    mid2: 41,
    semester: 78,
    grade: 'A',
    status: 'pass',
  },
  {
    subject: 'English',
    mid1: 44,
    mid2: 43,
    semester: 88,
    grade: 'A+',
    status: 'pass',
  },
  {
    subject: 'Chemistry',
    mid1: 36,
    mid2: 39,
    semester: 75,
    grade: 'B+',
    status: 'pass',
  },
];

const projectsData = [
  {
    id: 1,
    title: 'Machine Learning for Predictive Analysis',
    description: 'A project on using machine learning algorithms for predictive analysis of student performance.',
    status: 'Completed',
    grade: 'A',
    date: '2023-05-15',
  },
  {
    id: 2,
    title: 'Web-based Student Management System',
    description: 'Development of a web-based student management system for academic tracking.',
    status: 'In Progress',
    grade: 'Pending',
    date: '2023-10-10',
  },
];

const internshipsData = [
  {
    id: 1,
    company: 'Tech Innovations Inc.',
    role: 'Web Development Intern',
    period: 'May 2023 - July 2023',
    status: 'Completed',
    skills: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    company: 'DataSoft Solutions',
    role: 'Data Science Intern',
    period: 'Dec 2023 - Feb 2024',
    status: 'In Progress',
    skills: ['Python', 'TensorFlow', 'Data Analysis'],
  },
];

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [resultsType, setResultsType] = useState<'mid1' | 'mid2' | 'semester'>('semester');

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

  const statsItems = [
    {
      title: 'Courses',
      value: '5',
      icon: <BookOpen size={20} className="text-blue-500" />,
      color: 'bg-blue-50',
    },
    {
      title: 'Attendance',
      value: '92%',
      icon: <Clock size={20} className="text-green-500" />,
      color: 'bg-green-50',
    },
    {
      title: 'GPA',
      value: '8.6',
      icon: <BarChart size={20} className="text-purple-500" />,
      color: 'bg-purple-50',
    },
    {
      title: 'Projects',
      value: '2',
      icon: <Briefcase size={20} className="text-orange-500" />,
      color: 'bg-orange-50',
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name || 'Student'}
          </p>
        </div>
        
        <div className="glass-panel px-4 py-2 rounded-lg flex items-center space-x-2">
          <GraduationCap size={18} className="text-primary" />
          <span className="font-medium text-sm">{user?.studentId || 'SVU2023001'}</span>
          <span className="text-sm text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">{user?.department || 'Computer Science'}</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsItems.map((item, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="text-2xl font-semibold mt-1">{item.value}</p>
              </div>
              <div className={`p-3 rounded-full ${item.color}`}>{item.icon}</div>
            </div>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="semester" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Academic Results</h2>
              <TabsList>
                <TabsTrigger 
                  value="mid1" 
                  onClick={() => setResultsType('mid1')}
                >
                  Mid-Term 1
                </TabsTrigger>
                <TabsTrigger 
                  value="mid2" 
                  onClick={() => setResultsType('mid2')}
                >
                  Mid-Term 2
                </TabsTrigger>
                <TabsTrigger 
                  value="semester" 
                  onClick={() => setResultsType('semester')}
                >
                  Semester
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="mid1">
              <ResultsTable results={resultsData} type="mid1" />
            </TabsContent>
            <TabsContent value="mid2">
              <ResultsTable results={resultsData} type="mid2" />
            </TabsContent>
            <TabsContent value="semester">
              <ResultsTable results={resultsData} type="semester" />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Performance</h2>
          <PerformanceChart data={performanceData} />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-4">Projects & Internships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Briefcase className="text-primary mr-2" />
              <h3 className="text-lg font-medium">Recent Projects</h3>
            </div>
            <div className="space-y-4">
              {projectsData.map((project) => (
                <div key={project.id} className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{project.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                  <div className="flex justify-between mt-3 text-sm text-muted-foreground">
                    <span>Grade: {project.grade}</span>
                    <span>{new Date(project.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Award className="text-primary mr-2" />
              <h3 className="text-lg font-medium">Internships</h3>
            </div>
            <div className="space-y-4">
              {internshipsData.map((internship) => (
                <div key={internship.id} className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{internship.company}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      internship.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {internship.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium mt-1">{internship.role}</p>
                  <p className="text-sm text-muted-foreground mt-1">{internship.period}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {internship.skills.map((skill, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StudentDashboard;
