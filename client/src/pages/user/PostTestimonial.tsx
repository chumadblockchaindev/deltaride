import { useState } from 'react';
import api from '../../api/api';
import { motion } from 'framer-motion';

function PostTestimonial() {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.post('/api/testimonials/post/', { content })
      .then(() => setMessage('Testimonial submitted!'))
      .catch(() => setMessage('Submission failed.'));
    setContent('')
  };

  return (
    <motion.div className="p-8 max-w-lg mx-auto"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-6">Post Testimonial</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea 
          rows={5} 
          className="border p-2 w-full" 
          placeholder="Your experience..." 
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button type="submit" className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </motion.div>
  );
}

export default PostTestimonial;
