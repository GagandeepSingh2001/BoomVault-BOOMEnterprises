import React from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";
import cn from '@meltdownjs/cn';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <div id='footer' className="relative flex w-full items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white rounded-t-2xl">
          <div
            className={cn(
              "absolute inset-0 top-2",
              "[background-size:30px_30px]",
              "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
              "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
            )} />
          {/* Radial gradient for the container to give a faded look */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] rounded-t-2xl"></div>
          
          <div style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}} className='relative h-[300px] mt-10'>
        <div className='relative h-[calc(50vh+300px)] -top-[50vh] w-[97dvw]'>
            <div className='sticky h-fit top-[calc(100vh-300px)] grid sm:grid-cols-2 md:grid-cols-3 place-items-center'>
                <section className='w-fit h-fit'>
                  <img src={logo} className='w-40 h-20 relative left-1/2 -translate-x-1/2' alt='logo'></img>
                  <div className='flex space-x-5 font-bold text-[clamp(1.5rem,_4vw,_2.2rem)]'>
                    <a className='scale-100 hover:scale-110 duration-200' href = 'https://x.com/Azrael0p?t=pWkvQzHzF1k866HGOq5whg&s=09' target = '_blank'><FaXTwitter /></a>
                    <a className='scale-100 hover:scale-110 duration-200' href = 'https://github.com/GagandeepSingh2001' target = '_blank'><FaGithub /></a>
                    <a className='scale-100 hover:scale-110 duration-200' href = 'https://www.linkedin.com/in/gagandeep-singh-6b6985229?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' target = '_blank'><FaLinkedin /></a>
                  </div>
                </section>

                <section className='w-fit h-fit justify-evenly gap-10 hidden sm:flex'>
                  <ul className='w-fit my-5 text-nowrap'>
                  <h2 className='pointer-events-none'>Quick Links</h2>
                    <Link to="home" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1.5)' }} spy={true} smooth={true} duration={400} offset={0} activeClass="">
                    <li className="cursor-pointer p-1 transition-all w-fit duration-300 text-neutral-300 hover:text-white hover:rounded-lg hover:translate-x-0.5 activetranslate-x-0">Home</li>
                    </Link>
                    <Link to="uploads" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1.5)' }} spy={true} smooth={true} duration={400} offset={5} activeClass="">
                    <li className="cursor-pointer p-1 transition-all w-fit duration-300 text-neutral-300 hover:text-white hover:rounded-lg hover:translate-x-0.5 activetranslate-x-0">Uploads</li>
                    </Link>
                  </ul>

                  <div class="w-px bg-gray-300 h-auto my-5" />
                  
                  <ul className='my-5 text-nowrap'>
                  <h2 className='pointer-events-none'>Stack Used</h2>
                    <a href='https://react.dev/learn' target='_blank' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1.5)' }}>
                    <li className="cursor-pointer p-1 transition-all w-fit duration-300 text-neutral-300 hover:text-white hover:rounded-lg hover:translate-x-0.5 activetranslate-x-0">React JS</li>
                    </a>
                    <a href='https://tailwindcss.com/docs/installation/using-vite' target='_blank' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1.5)' }}>
                    <li className="cursor-pointer p-1 transition-all w-fit duration-300 text-neutral-300 hover:text-white hover:rounded-lg hover:translate-x-0.5 activetranslate-x-0">Tailwind CSS</li>
                    </a>
                    <a href='https://vite.dev/guide/' target='_blank' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1.5)' }} s>
                    <li className="cursor-pointer p-1 transition-all w-fit duration-300 text-neutral-300 hover:text-white hover:rounded-lg hover:translate-x-0.5 activetranslate-x-0">Vite</li>
                    </a>
                    <a href='https://docs.npmjs.com/' target='_blank' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1.5)' }}>
                    <li className="cursor-pointer p-1 transition-all w-fit duration-300 text-neutral-300 hover:text-white hover:rounded-lg hover:translate-x-0.5 activetranslate-x-0">NPM</li>
                    </a>
                  </ul>
                </section>
                <section className='w-[33vw] place-items-center overflow-clip hidden md:block'>
                  <img src={""} className='w-[18vw] min-w-[25vw] lg:min-w-0 hover:rotate-0 duration-200 rotate-1'></img>
                </section>
            </div>
            <div className='fixed bottom-5 w-full text-center text-[clamp(0.5rem,_4vw,_1rem)]'>
              Built and designed by Gagandeep Singh <br />
              &copy; {new Date().getFullYear()} All bytes reserved
              </div>

            <Link to="home" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1.5)' }} smooth={true} duration={500} offset={0} activeClass="" className='fixed bottom-10 right-10 cursor-pointer border border-neutral-500 rounded-lg p-1 bg-blue-900/20 text-[clamp(0.5rem,_4vw,_1rem)] hidden sm:block'>
              Back to top
            </Link>
        </div>
    </div>

        </div>

  )
}

export default Footer