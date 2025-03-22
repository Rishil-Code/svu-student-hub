
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface PerformanceData {
  subject: string;
  score: number;
  maxScore: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  // Process data for the chart
  const chartData = data.map((item) => ({
    name: item.subject,
    value: (item.score / item.maxScore) * 100,
    actualScore: item.score,
    maxScore: item.maxScore,
  }));

  const COLORS = ['#4f46e5', '#3b82f6', '#06b6d4', '#0ea5e9', '#3b82f6', '#8b5cf6'];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-lg rounded-md border border-gray-100">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-500">
            Score: {data.actualScore}/{data.maxScore}
          </p>
          <p className="text-sm font-medium text-primary">
            {data.value.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
    >
      <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              labelLine={false}
              animationBegin={300}
              animationDuration={1500}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PerformanceChart;
