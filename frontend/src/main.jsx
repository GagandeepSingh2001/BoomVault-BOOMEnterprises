import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Hero from './components/Hero'
import NavBar from './components/NavBar'
import { Toaster } from 'sonner'
import VideoUpload from './components/VideoUpload'
import Footer from './components/Footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center" richColors closeButton />
    <Hero />
    <NavBar />
    <VideoUpload />
    <Footer />
  </StrictMode>,
)
