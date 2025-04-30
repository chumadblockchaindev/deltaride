import { useState } from 'react';
import api from '../../api/api';
import UpdatePassword from '../../components/UpdatePassword';
import { motion } from 'framer-motion';

function UpdateProfile() {
  const [formData, setFormData] = useState({ full_name: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.patch('/api/user/profile/update/', formData)
      .then(() => setMessage('Profile updated successfully.'))
      .catch(() => setMessage('Update failed.'));
  };

  return (
    <motion.div className="p-8 max-w-md mx-auto"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="full_name" 
          placeholder="Full Name" 
          className="border p-2 w-full" 
          value={formData.full_name}
          onChange={handleChange}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className="border p-2 w-full" 
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit" className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
          Save Changes
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
      <div>
        <UpdatePassword />
      </div>
    </motion.div>
  );
}

export default UpdateProfile;
