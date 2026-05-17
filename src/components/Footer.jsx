import { FiGithub , FiLinkedin , FiInstagram } from 'react-icons/fi';
import { BsTwitterX } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
                {/* Logo and description */}
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-200 bg-clip-text text-transparent">Rahul</h2>
                {/* Scroll Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-purple-200">
                        Connect
                    </h3>
                    <div className="flex space-x-4">
                        <a href="https://linkedin.com/in/rahulgoyal83789" className="text-gray-400 hover:text-violet-400 transition-colors">
                            <FiLinkedin className='w-5 h-5'/>
                        </a>
                        <a href="https://github.com/rahulgoyal83789" className="text-gray-400 hover:text-violet-400 transition-colors">
                            <FiGithub  className='w-5 h-5'/>
                        </a>
                        <a href="https://instagram.com/rahulgoyal83789" className="text-gray-400 hover:text-violet-400 transition-colors">
                            <FiInstagram className='w-5 h-5'/>
                        </a>
                        <a href="https://x.com/rahulgoyal83789" className="text-gray-400 hover:text-violet-400 transition-colors">
                            <BsTwitterX className='w-5 h-5'/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Rahul Goyal. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
  )
}
export default Footer