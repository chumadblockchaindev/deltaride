
const Contact = () => {
  return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-40"> 
        <div className="w-full max-w-2xl p-8 rounded-xl border border-cyan-500 shadow-xl bg-gradient-to-b from-gray-900 to-black relative"> 
        <h2 className="text-4xl font-bold mb-4 text-center neon-text">Contact Us</h2> 
        <p className="text-center text-cyan-300 mb-8">Got a glitch? Wanna report a rogue AI? We're listening.</p> 
        <form className="space-y-6"> <div> <label htmlFor="email" className="block text-sm font-medium text-cyan-400">Your Email</label> 
        <input type="email" id="email" name="email" required placeholder="neon@cybermail.net" className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-cyan-600 text-white placeholder-cyan-300 rounded-md shadow-md focus:ring-2 focus:ring-cyan-500 focus:outline-none" /> 
        </div> 
        <div> 
          <label htmlFor="subject" className="block text-sm font-medium text-cyan-400">Subject</label> 
        <input type="text" id="subject" name="subject" required placeholder="What's buzzing?" className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-cyan-600 text-white placeholder-cyan-300 rounded-md shadow-md focus:ring-2 focus:ring-cyan-500 focus:outline-none" /> 
        </div> 
        <div> 
          <label htmlFor="message" className="block text-sm font-medium text-cyan-400">Message</label> 
          <textarea id="message" name="message" rows={5} required placeholder="Drop your message in the net..." className="mt-1 block w-full px-4 py-2 bg-gray-800 border border-cyan-600 text-white placeholder-cyan-300 rounded-md shadow-md focus:ring-2 focus:ring-cyan-500 focus:outline-none" >
            </textarea> 
            </div> 
          <div className="text-center"> <button type="submit" className="inline-block px-6 py-3 bg-cyan-600 text-white font-semibold text-sm rounded-md shadow-lg transform transition-transform hover:scale-105 hover:bg-pink-700 focus:ring-4 focus:ring-pink-500 focus:outline-none" > 🚀 Send Message </button> 
          </div> 
          </form> 
          <div className="absolute top-0 left-0 w-full h-full border-2 border-pink-500 rounded-xl pointer-events-none animate-pulse opacity-10"></div> </div> 
        </section>
  )
}

export default Contact