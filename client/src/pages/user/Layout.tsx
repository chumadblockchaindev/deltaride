import React, { useEffect, useState } from "react";
import { FiMenu, FiMessageSquare, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaBell } from 'react-icons/fa'; 
import api from "../../api/api";
import { motion } from 'framer-motion';

interface Notification { id: number; content: string; created_at: string; is_global: boolean; }

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth()
  const { pathname } = useLocation()
  const [unread, setUnread] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showMsg, setShowMsg] = useState(false);

      useEffect(() => { 
          api.get('/api/message/view/') 
          .then(res => { 
            if (res.data.length > 0){
              setUnread(true);
              setNotifications(res.data)  
            }}) 
          .catch(err => console.error(err)); 
          }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if(isLoading){
    return <>Loading...</>
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
            <button onClick={toggleSidebar} className="text-white">
              <FiMenu size={24} />
            </button>
            <div className="text-xl font-semibold">DeltaRide</div>
            <div className='flex items-center gap-x-5'>
              <div className="relative cursor-pointer" onClick={() => setShowMsg(!showMsg)} > 
                  <FaBell className="text-xl" color='white' /> 
                  {unread && ( <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 animate-ping" /> )} 
              </div>
            </div>
        </div>
              {/* Sidebar */}
          <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
            <div className="p-4">
              <button onClick={toggleSidebar} className="text-white">
                <FiX size={30} />
              </button>
            </div>
                <div className="flex flex-col p-6 space-y-4 text-white">
                  <Link to="/dashboard" 
                    className={`text-lg font-semibold ${pathname == '/dashboard/car-booking' && 'p-3 rounded-xl w-fit bg-red-600'} `} onClick={toggleSidebar}><p></p>Book Car</Link>
                  <Link to="booking-history" 
                    className={`text-lg font-semibold ${pathname == '/dashboard/booking-history' && 'p-3 rounded-xl w-fit bg-red-600'} `} onClick={toggleSidebar}>Booking History</Link>
                  <Link to="post-testimonials" 
                    className={`text-lg font-semibold ${pathname == '/dashboard/post-testimonials' && 'p-3 rounded-xl w-fit bg-red-600'} `} onClick={toggleSidebar}>Post Testimonials</Link>
                  <Link to="profile" 
                    className={`text-lg font-semibold ${pathname == '/dashboard/profile' && 'p-3 rounded-xl w-fit bg-red-600'} `} onClick={toggleSidebar}>Profile</Link>
                  <a href="/logout" className={`text-lg font-semibold ${pathname == '/logout' && 'p-3 rounded-xl w-fit bg-red-600'} `} >Logout</a>
            </div>
                </div>
        <div className={`transition-all duration-300 ml-0 flex-1 p-6 ${isSidebarOpen ? "ml-64" : ""}`}>
              {isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}
        </div>
        
        {/* Notifications Messages */}
        {
          showMsg && (
          <motion.div className="absolute right-0 top-10"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center gap-1">
              <FiMessageSquare/>
              <h2 className="text-xl font-semibold mb-4">Messages</h2> 
            </div>
            <ul className="divide-y"> 
            {notifications.map((notif: Notification) => ( 
              <li key={notif.id} className={`py-2 px-3 ${!notif.is_global ? 'bg-yellow-100' : 'bg-pink-200'}`}> 
                <p>{notif.content}</p> 
                <span className="text-xs text-gray-500">
                  {new Date(notif.created_at).toLocaleString()}
                </span>
              </li> ))} 
            </ul> 
          </motion.div>
          )
        }
      </div>
  );
};

export default DashboardLayout;
