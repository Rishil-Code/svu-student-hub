
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import PageTransition from '../components/shared/PageTransition';
import ResultsTable, { ResultData } from '../components/dashboard/ResultsTable';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Download,
  Filter,
  FileText,
  Printer,
  Share2
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Mock data - same as in StudentDashboard
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

// Previous semesters data
const semesterOptions = [
  { value: 'current', label: 'Current Semester (2023-2024)' },
  { value: 'previous', label: 'Previous Semester (2022-2023)' },
  { value: 'first-year', label: 'First Year (2021-2022)' },
];

const Results = () => {
  const { user, isLoading } = useAuth();
  const [resultsType, setResultsType] = useState<'mid1' | 'mid2' | 'semester'>('semester');
  const [selectedSemester, setSelectedSemester] = useState('current');

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

  // Summary statistics
  const totalSubjects = resultsData.length;
  const passedSubjects = resultsData.filter(r => r.status === 'pass').length;
  const averageScore = Math.round(
    resultsData.reduce((sum, subject) => sum + subject[resultsType], 0) / totalSubjects
  );
  const highestScore = Math.max(...resultsData.map(subject => subject[resultsType]));

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
                  <h1 className="text-3xl font-bold">Academic Results</h1>
                  <p className="text-muted-foreground mt-1">
                    View and analyze your academic performance
                  </p>
                </div>
                
                <div className="glass-panel px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Calendar size={18} className="text-primary" />
                  <Select
                    value={selectedSemester}
                    onValueChange={setSelectedSemester}
                  >
                    <SelectTrigger className="border-0 bg-transparent min-w-[250px] p-0 h-auto focus:ring-0 shadow-none">
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesterOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Subjects</p>
                      <p className="text-2xl font-semibold mt-1">{totalSubjects}</p>
                    </div>
                    <div className="p-3 rounded-full bg-blue-50">
                      <FileText size={20} className="text-blue-500" />
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Passed</p>
                      <p className="text-2xl font-semibold mt-1">{passedSubjects}/{totalSubjects}</p>
                    </div>
                    <div className="p-3 rounded-full bg-green-50">
                      <Filter size={20} className="text-green-500" />
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Score</p>
                      <p className="text-2xl font-semibold mt-1">{averageScore}%</p>
                    </div>
                    <div className="p-3 rounded-full bg-purple-50">
                      <Calendar size={20} className="text-purple-500" />
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Highest Score</p>
                      <p className="text-2xl font-semibold mt-1">{highestScore}%</p>
                    </div>
                    <div className="p-3 rounded-full bg-orange-50">
                      <Share2 size={20} className="text-orange-500" />
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Detailed Results</h2>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Printer size={16} />
                        <span className="hidden sm:inline">Print</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download size={16} />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="semester">
                    <TabsList className="mb-4">
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
                  <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
                  <PerformanceChart data={performanceData} />
                  
                  <div className="mt-6">
                    <Card className="p-4 bg-primary/5 border-primary/10">
                      <h3 className="font-medium text-primary mb-2">GPA Calculation</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Your GPA is calculated based on credits and grades for each course.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-white p-2 rounded">
                          <p className="font-medium">Total Credits</p>
                          <p className="text-muted-foreground">22</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <p className="font-medium">GPA</p>
                          <p className="text-muted-foreground">8.6/10</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <p className="font-medium">CGPA</p>
                          <p className="text-muted-foreground">8.4/10</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <p className="font-medium">Percentile</p>
                          <p className="text-muted-foreground">87th</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
              
              {/* Grade Scale Reference */}
              <motion.div variants={itemVariants} className="mt-8">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Grade Scale Reference</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {[
                      { grade: 'O', range: '90-100', description: 'Outstanding' },
                      { grade: 'A+', range: '80-89', description: 'Excellent' },
                      { grade: 'A', range: '70-79', description: 'Very Good' },
                      { grade: 'B+', range: '60-69', description: 'Good' },
                      { grade: 'B', range: '50-59', description: 'Above Average' },
                      { grade: 'C', range: '40-49', description: 'Average' },
                      { grade: 'F', range: '< 40', description: 'Fail' },
                    ].map((item, i) => (
                      <div key={i} className="text-center p-3 rounded-lg border">
                        <div className={`text-lg font-bold ${
                          item.grade === 'F' ? 'text-red-500' : 
                          item.grade === 'O' ? 'text-green-600' : 
                          item.grade === 'A+' ? 'text-green-500' : 
                          'text-primary'
                        }`}>
                          {item.grade}
                        </div>
                        <div className="text-sm text-muted-foreground">{item.range}</div>
                        <div className="text-xs mt-1">{item.description}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </PageTransition>
      
      <Footer />
    </div>
  );
};

export default Results;
