import React, { useState } from 'react'
import Modal from './Modal.jsx'
import bg from '../assets/bg.png'
import { toast } from 'sonner'

const Hero = () => {

  const [open,  setOpen] = useState();
  const [open1,  setOpen1] = useState();
  const [upload, setUpload] = useState(false);

  // states for signup form
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');

  // states for login form
  const [identifier, setIdentifier] = useState("");

  // signup
  const handleSignup = async (e) => {
  e.preventDefault();
  const res = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  });
  const data = await res.json();
  toast.success(data.message);
};

  const [loggedIn, ] = useState(!!localStorage.getItem("authToken"));

  // login
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("username", data.username);
      toast.success("Login successful " + data.username);
      setTimeout(() => {
        window.location.reload(); // reload the page to display the username from localStorage
      }
      , 1000);
    } else {
      toast.warning(data.message);
    }
  };

  return (
    <>

    <div id='home' className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white flex flex-col items-center justify-center px-6 py-10 space-y-12">
        <img src={bg} alt="Background" className="absolute inset-0 w-screen h-screen object-cover opacity-30 z-0" />
      <div className="text-center space-y-4 z-1 mt-5">
        <h1 className="text-5xl font-extrabold">
          Welcome to <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">BoomVault</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
          A next-generation social streaming platform blending short-form and long-form video with robust community and monetization features.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">

          {loggedIn ? <>
          <button onClick={() => setUpload(true)} className="bg-black border border-white px-6 py-2 rounded-full font-semibold hover:bg-gray-900 transition">
            Upload Video
          </button>
          </> 
          : 
          <> 
          <button onClick={() => setOpen(true)} className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
            Get Started
          </button>
          <button onClick={() => setOpen1(true)} className="bg-black border border-white px-6 py-2 rounded-full font-semibold hover:bg-gray-900 transition">
            Sign In
          </button> 
          </>}

        </div>
      </div>

      {/* Card Data */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl z-1">
        <FeatureCard
          icon="🎬"
          title="Mixed Content"
          description="Enjoy both short-form videos and long-form content in one seamless feed"
        />
        <FeatureCard
          icon="💝"
          title="Support Creators"
          description="Gift your favorite creators and purchase premium content directly"
        />
        <FeatureCard
          icon="🚀"
          title="Start Creating"
          description="Upload your own videos and start earning from your content"
        />
      </div>
    </div>

    {/* Signup form */}
    <Modal open={ open } onClose={() => setOpen(false)}>
        <div className='backdrop-blur rounded-lg shadow p-5 overflow-auto w-screen place-items-center'>
 
            <div className="bg-black bg-opacity-70 text-white rounded-xl shadow-xl w-full max-w-md p-7">
                <h2 className="text-3xl font-bold text-center mb-2">Join BoomVault</h2>
                <p className="text-center text-gray-300 mb-6">
                Create your account to start discovering amazing videos.
                </p>

                <form className="space-y-5" onSubmit={handleSignup}>
                <div>
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Username</label>
                    <input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Choose a username"
                    className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Password</label>
                    <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Create a password"
                    className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Confirm Password</label>
                    <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <button type="submit" className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition">
                    Create Account
                </button>
                </form>

                <p className="text-center text-gray-400 text-sm mt-6">
                Already have an account?{" "}
                <a onClick={() => {setOpen(false); setOpen1(true);}} className="text-blue-400 hover:underline">
                    Sign in
                </a>
                </p>
            </div>
        </div>
      </Modal>

      {/* Login Form */}
      <Modal open={ open1 } onClose={() => setOpen1(false)}>

        <div className='backdrop-blur rounded-lg p-5 overflow-auto place-items-center w-screen'>
        
        <div className="bg-black bg-opacity-70 text-white rounded-xl shadow-xl w-full max-w-md p-8">
            <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
            <p className="text-center text-gray-300 mb-6">
            Sign in to continue watching amazing videos
            </p>

            <form className="space-y-5" onSubmit={handleLogin}>
            <div>
                <label className="block text-sm font-semibold mb-1">Email or Username</label>
                <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your email or username"
                className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold mb-1">Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>

            <button type="submit" className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition">
                Sign In
            </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account ? &nbsp;
            <a onClick={() => {setOpen1(false); setOpen(true);}} href="#" className="text-blue-400 hover:underline">
                Sign up
            </a>
            </p>
         </div>
         </div>
      </Modal>

      {/* Upload Modal */}
      <Modal open={upload} onClose={() => setUpload(false)}>
        <div className='backdrop-blur rounded-lg p-5 overflow-auto place-items-center w-screen h-screen grid'>
          <div className="bg-black bg-opacity-70 text-white rounded-xl shadow-xl w-full max-w-md p-8">
            <h2 className="text-3xl font-bold text-center mb-2">Upload Video</h2>
            <p className="text-center text-gray-300 mb-6">
              Coming soon! Stay tuned for this feature.
            </p>
            <button onClick={() => setUpload(false)} className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition">
              Close
            </button>
          </div>
        </div>
      </Modal>
      </>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-black bg-opacity-60 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition transform duration-300">
      <div className="text-3xl mb-3 pointer-events-none">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 pointer-events-none">{title}</h3>
      <p className="text-gray-300 text-sm pointer-events-none">{description}</p>
    </div>
  );
}

export default Hero