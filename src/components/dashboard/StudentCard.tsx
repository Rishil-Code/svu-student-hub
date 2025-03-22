
import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface StudentData {
  id: string;
  studentId: string;
  name: string;
  email: string;
  department: string;
  year: number;
  photo?: string;
  performance?: {
    attendance: number;
    averageGrade: string;
    averageScore: number;
  };
}

interface StudentCardProps {
  student: StudentData;
  index: number;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, index }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        delay: index * 0.05, // stagger effect
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-4">
            {student.photo ? (
              <img
                src={student.photo}
                alt={student.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User size={24} />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{student.name}</h3>
            <p className="text-sm text-muted-foreground">{student.studentId}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Mail size={16} className="text-muted-foreground mr-2" />
            <span>{student.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <Bookmark size={16} className="text-muted-foreground mr-2" />
            <span>{student.department}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar size={16} className="text-muted-foreground mr-2" />
            <span>Year {student.year}</span>
          </div>
        </div>

        {student.performance && (
          <div className="mt-5 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Attendance</p>
                <p className="text-lg font-medium">{student.performance.attendance}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg. Grade</p>
                <p className="text-lg font-medium">{student.performance.averageGrade}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg. Score</p>
                <p className="text-lg font-medium">{student.performance.averageScore}%</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <Link
            to={`/students/${student.id}`}
            className="block w-full py-2 text-center rounded-md bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentCard;
