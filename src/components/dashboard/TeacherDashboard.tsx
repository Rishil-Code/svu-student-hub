
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import StudentCard, { StudentData } from './StudentCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  GraduationCap, 
  Search, 
  BookOpen,
  Edit,
  Check,
  Filter,
  SlidersHorizontal
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

// Mock data
const studentsData: StudentData[] = [
  {
    id: '1',
    studentId: 'SVU2023001',
    name: 'John Student',
    email: 'john.student@svu.ac.in',
    department: 'Computer Science',
    year: 3,
    photo: 'https://i.pravatar.cc/150?img=11',
    performance: {
      attendance: 92,
      averageGrade: 'A',
      averageScore: 86,
    },
  },
  {
    id: '2',
    studentId: 'SVU2023002',
    name: 'Alice Johnson',
    email: 'alice.johnson@svu.ac.in',
    department: 'Computer Science',
    year: 3,
    photo: 'https://i.pravatar.cc/150?img=5',
    performance: {
      attendance: 88,
      averageGrade: 'A-',
      averageScore: 82,
    },
  },
  {
    id: '3',
    studentId: 'SVU2023003',
    name: 'Robert Chen',
    email: 'robert.chen@svu.ac.in',
    department: 'Computer Science',
    year: 3,
    photo: 'https://i.pravatar.cc/150?img=12',
    performance: {
      attendance: 95,
      averageGrade: 'A+',
      averageScore: 91,
    },
  },
  {
    id: '4',
    studentId: 'SVU2023004',
    name: 'Emma Wilson',
    email: 'emma.wilson@svu.ac.in',
    department: 'Computer Science',
    year: 3,
    photo: 'https://i.pravatar.cc/150?img=9',
    performance: {
      attendance: 79,
      averageGrade: 'B+',
      averageScore: 76,
    },
  },
  {
    id: '5',
    studentId: 'SVU2023005',
    name: 'Michael Smith',
    email: 'michael.smith@svu.ac.in',
    department: 'Computer Science',
    year: 3,
    photo: 'https://i.pravatar.cc/150?img=15',
    performance: {
      attendance: 85,
      averageGrade: 'A-',
      averageScore: 84,
    },
  },
  {
    id: '6',
    studentId: 'SVU2023006',
    name: 'Sophia Patel',
    email: 'sophia.patel@svu.ac.in',
    department: 'Computer Science',
    year: 3,
    photo: 'https://i.pravatar.cc/150?img=24',
    performance: {
      attendance: 91,
      averageGrade: 'A',
      averageScore: 88,
    },
  },
];

const courseStats = [
  { name: 'Data Structures', students: 45, avgScore: 82 },
  { name: 'Database Systems', students: 38, avgScore: 78 },
  { name: 'Web Development', students: 42, avgScore: 85 },
];

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

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

  // Filter students
  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartment ? student.department === selectedDepartment : true;
    const matchesYear = selectedYear ? student.year.toString() === selectedYear : true;
    
    return matchesSearch && matchesDepartment && matchesYear;
  });

  const statsItems = [
    {
      title: 'Total Students',
      value: studentsData.length.toString(),
      icon: <Users size={20} className="text-blue-500" />,
      color: 'bg-blue-50',
    },
    {
      title: 'Courses',
      value: '3',
      icon: <BookOpen size={20} className="text-green-500" />,
      color: 'bg-green-50',
    },
    {
      title: 'Department',
      value: user?.department || 'Computer Science',
      icon: <GraduationCap size={20} className="text-purple-500" />,
      color: 'bg-purple-50',
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
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name || 'Teacher'}
          </p>
        </div>
        
        <div className="glass-panel px-4 py-2 rounded-lg flex items-center space-x-2">
          <GraduationCap size={18} className="text-primary" />
          <span className="font-medium text-sm">{user?.department || 'Computer Science'}</span>
          <span className="text-sm text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">Faculty ID: TF2023</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students">
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Departments</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Years</SelectItem>
                    <SelectItem value="1">Year 1</SelectItem>
                    <SelectItem value="2">Year 2</SelectItem>
                    <SelectItem value="3">Year 3</SelectItem>
                    <SelectItem value="4">Year 4</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" onClick={() => {
                  setSearchQuery('');
                  setSelectedDepartment('');
                  setSelectedYear('');
                }} className="flex items-center gap-1">
                  <Filter size={16} />
                  <span>Clear</span>
                </Button>
              </div>
            </div>
            
            {filteredStudents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((student, index) => (
                  <StudentCard key={student.id} student={student} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No students found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="courses">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Courses</h2>
                <Button variant="outline" className="flex items-center gap-1">
                  <SlidersHorizontal size={16} />
                  <span>Manage</span>
                </Button>
              </div>
              
              {courseStats.map((course, index) => (
                <Card key={index} className="p-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{course.name}</h3>
                      <div className="flex space-x-4 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users size={16} className="mr-1" />
                          <span>{course.students} students</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen size={16} className="mr-1" />
                          <span>CSE{index + 301}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Average Score</div>
                      <div className="text-2xl font-semibold">{course.avgScore}%</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <Button variant="outline" className="flex items-center gap-1">
                      <Edit size={16} />
                      <span>Update Marks</span>
                    </Button>
                    <Button className="flex items-center gap-1">
                      <Check size={16} />
                      <span>View Details</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default TeacherDashboard;
