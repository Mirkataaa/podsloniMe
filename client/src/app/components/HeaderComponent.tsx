import { motion } from 'motion/react';
import LoginModalComponent from '../features/auth/components/LoginModalComponent';
import { useState } from 'react';
import { useAuthStore } from '../features/auth/store/auth.store';

export default function HeaderComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/70 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="bg-blue-600 text-white p-2 rounded-lg shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l9-9 9 9M4 10v10h16V10"
                />
              </svg>
            </div>
            <span className="text-2xl font-semibold bg-linear-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
              PodsloniMe
            </span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Начало
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Имоти
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Агенции
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Контакти
            </a>
          </nav>

          {/* Login Button */}

          {!user ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsOpen(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-blue-700 transition-all"
            >
              Вход
            </motion.button>
          ) : (
            <>
              <span className="text-gray-800 font-medium">{user?.email}</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={logout}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-blue-700 transition-all"
              >
                Изход
              </motion.button>
            </>
          )}
        </div>
      </motion.header>

      {/* MODAL */}
      <LoginModalComponent isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
