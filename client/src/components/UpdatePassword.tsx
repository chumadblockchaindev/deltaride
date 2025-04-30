import { useState } from 'react';
import api from '../api/api';
import { motion } from 'framer-motion';

function UpdatePassword() {
  const [formData, setFormData] = useState({ old_password: '', new_password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.patch('/api/user/password/change/', formData)
      .then(() => setMessage('Password updated successfully.'))
      .catch(() => setMessage('Update failed.'));
  };

  return (
    <motion.div className="p-8 max-w-md mx-auto"
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ duration: 0.5 }}
  >
      <h1 className="text-3xl font-bold mb-6">Change Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="password" 
          name="old_password" 
          placeholder="Old Password" 
          className="border p-2 w-full" 
          value={formData.old_password}
          onChange={handleChange}
        />
        <input 
          type="password" 
          name="new_password" 
          placeholder="New Password" 
          className="border p-2 w-full" 
          value={formData.new_password}
          onChange={handleChange}
        />
        <button type="submit" className="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded">
          Update Password
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </motion.div>
  );
}

export default UpdatePassword;
