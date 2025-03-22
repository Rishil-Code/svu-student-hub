
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sri Venkateswara University</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Transforming lives through education and innovation since 1954.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Results
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Projects
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground">
              <p>Sri Venkateswara University</p>
              <p>Tirupati - 517502</p>
              <p>Andhra Pradesh, India</p>
              <p className="mt-2">Email: contact@svu.ac.in</p>
              <p>Phone: +91 877 2289482</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Sri Venkateswara University. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
