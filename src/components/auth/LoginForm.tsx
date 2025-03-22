
import React, { useState } from 'react';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, School, ArrowRight, Loader2 } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password, role);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  // Demo credentials based on role
  const demoCredentials = {
    student: {
      email: 'student@svu.ac.in',
      password: 'password',
    },
    teacher: {
      email: 'teacher@svu.ac.in',
      password: 'password',
    },
  };

  const handleFillDemo = () => {
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass-card p-8">
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-2xl font-semibold">Login to SVU Student Hub</h2>
          <p className="text-muted-foreground mt-2">
            Enter your credentials to access your account
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-500 p-3 rounded-md mb-6 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <motion.div variants={itemVariants} className="mb-6">
            <label className="block text-sm font-medium mb-2">Role</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex items-center justify-center p-3 rounded-lg border transition-all ${
                  role === 'student'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <User size={18} className="mr-2" />
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`flex items-center justify-center p-3 rounded-lg border transition-all ${
                  role === 'teacher'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <School size={18} className="mr-2" />
                Teacher
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="subtle-input w-full"
              placeholder="your.email@svu.ac.in"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="subtle-input w-full"
              placeholder="••••••••"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
            <div className="text-sm">
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Use demo credentials
              </button>
            </div>
            <div className="text-sm">
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-primary text-white rounded-lg flex items-center justify-center transition-all hover:bg-primary/90 disabled:opacity-70 button-hover-effect"
            >
              {isSubmitting ? (
                <Loader2 size={20} className="animate-spin mr-2" />
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default LoginForm;
