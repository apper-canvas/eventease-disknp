import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function NotFound() {
  const navigate = useNavigate();
  const AlertTriangleIcon = getIcon('AlertTriangle');
  const HomeIcon = getIcon('Home');
  
  // Redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-secondary mb-6 inline-block"
          animate={{ 
            rotate: [0, 5, -5, 5, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatDelay: 1 
          }}
        >
          <AlertTriangleIcon size={80} />
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Page Not Found</h2>
        
        <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
          You'll be redirected to the home page in 5 seconds.
        </p>
        
        <motion.button
          className="btn btn-primary inline-flex items-center"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HomeIcon size={18} className="mr-2" />
          Go to Home
        </motion.button>
      </motion.div>
    </div>
  );
}