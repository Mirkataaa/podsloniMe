import { useState } from 'react';
import { useAuthStore } from '../store/auth.store';
import { useForm } from 'react-hook-form';
import {
  loginUserSchema,
  type LoginUserDto,
} from '../schema/login-request.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { authApi } from '../api/authApi';
import { AnimatePresence, motion } from 'motion/react';

export default function LoginModalComponent({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [error, setError] = useState('');
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginUserDto>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (data: LoginUserDto) => {
    try {
      const res = await authApi.login(data);
      setAuth(res.accessToken, res.user);
      console.log(res.user);
      console.log(res.accessToken);
      setError('');
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Грешни данни!');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {/* Overlay */}
      <div key="login-modal">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-40"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed z-50 inset-0 flex items-center justify-center"
        >
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
              Вход в акаунта
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Имейл
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="your@email..."
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Парола
                </label>
                <input
                  type="password"
                  {...register('password')}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
              >
                {isSubmitting ? 'Изчаквай...' : 'Влез'}
              </button>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              Нямаш акаунт?{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Регистрация
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
