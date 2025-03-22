
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ResultData {
  subject: string;
  mid1: number;
  mid2: number;
  semester: number;
  grade: string;
  status: 'pass' | 'fail' | 'pending';
}

interface ResultsTableProps {
  results: ResultData[];
  type: 'mid1' | 'mid2' | 'semester';
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results, type }) => {
  const [sortField, setSortField] = useState<keyof ResultData>('subject');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortResults = (a: ResultData, b: ResultData) => {
    if (typeof a[sortField] === 'string' && typeof b[sortField] === 'string') {
      return sortDirection === 'asc'
        ? (a[sortField] as string).localeCompare(b[sortField] as string)
        : (b[sortField] as string).localeCompare(a[sortField] as string);
    } else {
      return sortDirection === 'asc'
        ? (a[sortField] as number) - (b[sortField] as number)
        : (b[sortField] as number) - (a[sortField] as number);
    }
  };

  const handleSort = (field: keyof ResultData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof ResultData) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  // Animation variants
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const getScoreForType = (result: ResultData) => {
    switch (type) {
      case 'mid1':
        return result.mid1;
      case 'mid2':
        return result.mid2;
      case 'semester':
        return result.semester;
      default:
        return 0;
    }
  };

  return (
    <motion.div
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold">
          {type === 'mid1' && 'Mid-Term 1 Results'}
          {type === 'mid2' && 'Mid-Term 2 Results'}
          {type === 'semester' && 'Semester Final Results'}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th
                className="px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('subject')}
              >
                <div className="flex items-center">
                  <span>Subject</span>
                  {getSortIcon('subject')}
                </div>
              </th>
              <th
                className="px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort(type)}
              >
                <div className="flex items-center">
                  <span>Marks</span>
                  {getSortIcon(type as keyof ResultData)}
                </div>
              </th>
              {type === 'semester' && (
                <th
                  className="px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('grade')}
                >
                  <div className="flex items-center">
                    <span>Grade</span>
                    {getSortIcon('grade')}
                  </div>
                </th>
              )}
              <th
                className="px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  <span>Status</span>
                  {getSortIcon('status')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {results.sort(sortResults).map((result, index) => (
              <motion.tr
                key={result.subject}
                variants={rowVariants}
                className={cn(
                  'border-t border-gray-100 hover:bg-gray-50 transition-colors',
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                )}
              >
                <td className="px-6 py-4">{result.subject}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="font-medium">{getScoreForType(result)}</span>
                    <span className="text-gray-500 ml-1">/100</span>
                  </div>
                </td>
                {type === 'semester' && (
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span
                        className={cn(
                          'font-medium',
                          result.grade === 'A' || result.grade === 'A+' || result.grade === 'O'
                            ? 'text-green-600'
                            : result.grade === 'F'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        )}
                      >
                        {result.grade}
                      </span>
                      <HelpCircle
                        size={14}
                        className="ml-1 text-gray-400 cursor-help"
                        title="Grade Range: O (90-100), A+ (80-89), A (70-79), B+ (60-69), B (50-59), C (40-49), F (<40)"
                      />
                    </div>
                  </td>
                )}
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      result.status === 'pass'
                        ? 'bg-green-100 text-green-800'
                        : result.status === 'fail'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    )}
                  >
                    {result.status === 'pass'
                      ? 'Pass'
                      : result.status === 'fail'
                      ? 'Fail'
                      : 'Pending'}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ResultsTable;
