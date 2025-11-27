import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AppRoutes from './AppRoutes';

// Layout wrapper component to access location
const AppLayout = () => {
  const location = useLocation();
  
  // Debug logs removed
  
  // Check if current route is admin or auth related
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';
  const isAdminLogin = location.pathname === '/admin' || location.pathname === '/admin/login';
  const isHomePage = location.pathname === '/';
  
  // Don't show layout components on auth pages and landing home
  if (isAuthRoute || isAdminLogin || isHomePage) {
    return <AppRoutes />;
  }

  return (
    <div className="h-screen bg-dark-gray text-white flex flex-col">
      {/* Navigation */}
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - only show for user routes */}
        {!isAdminRoute && <Sidebar />}
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <AppRoutes />
        </main>
      </div>
      
      {/* Bottom Player removed */}
    </div>
  );
};

function App() {
  // Debug: Check if Tailwind CSS is loaded
  console.log('App component loaded');
  console.log('Document body classes:', document.body.className);
  console.log('Computed styles for body:', window.getComputedStyle(document.body));
  
  return (
    <Router 
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AppLayout />
    </Router>
  );
}

export default App;
