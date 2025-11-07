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
import {
  createUserSchema,
  type CreateUserDto,
} from '../schema/register.schema';
import {
  Building,
  FileText,
  Globe,
  Lock,
  Mail,
  Percent,
  Phone,
  UserIcon,
} from 'lucide-react';

// zod

export default function LoginModalComponent({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // login form
  const setAuth = useAuthStore((state) => state.setAuth);
  const loginForm = useForm<LoginUserDto>({
    resolver: zodResolver(loginUserSchema),
  });

  // register form
  const registerForm = useForm({
    resolver: zodResolver(createUserSchema),
  });
  const [isBroker, setIsBroker] = useState(false);
  const [joinOrCreate, setJoinOrCreate] = useState<'join' | 'create' | null>(
    null,
  );

  const submitLogin = async (data: LoginUserDto) => {
    try {
      const res = await authApi.login(data);
      setAuth(res.accessToken, res.user);
      onClose();
    } catch (err: any) {
      loginForm.setError('email', {
        message: err.response?.data?.message || 'Грешни данни!',
      });
    }
  };

  const submitRegister = async (data: CreateUserDto) => {
    console.log('tova e datata: ', data);

    const payload: any = {
      email: data.email,
      username: data.username,
      password: data.password,
      role: isBroker ? 'broker' : 'user',
    };

    if (isBroker) {
      if (joinOrCreate === 'join') {
        payload.createNewAgency = false;
        payload.agencyId = data.agencyId;
      }
      if (joinOrCreate === 'create') {
        payload.createNewAgency = true;
        payload.agency = {
          name: data.agencyName,
          description: data.description,
          phone: data.phone,
          email: data.emailAgency,
          logo: data.logo,
          commissionCut: data.commissionCut,
        };
      }
    }

    try {
      console.log(payload);

      await authApi.register(payload);
      setMode('login');
    } catch (err: any) {
      registerForm.setError('email', {
        message: err.response?.data?.message || 'Грешка!',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div key="auth-modal">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 backdrop-blur-2xl bg-black/70"
          onClick={onClose}
        />

        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="relative w-[90%] max-w-md rounded-3xl border border-white/40 bg-white/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-10 text-gray-900">
            <button
              onClick={onClose}
              className="absolute top-4 right-5 text-gray-700 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-3xl font-semibold text-center mb-8">
              {mode === 'login' ? 'Вход' : 'Регистрация'}
            </h2>

            {/* LOGIN */}
            {mode === 'login' && (
              <form
                onSubmit={loginForm.handleSubmit(submitLogin)}
                className="space-y-4"
              >
                <div className="relative w-full">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="email"
                    {...loginForm.register('email')}
                    placeholder="Email"
                    className="input-icon"
                  />
                </div>
                <div className="relative w-full">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="password"
                    {...loginForm.register('password')}
                    placeholder="Password"
                    className="input-icon"
                  />
                </div>

                <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 mt-5">
                  Влез
                </button>
              </form>
            )}

            {/* REGISTER */}
            {mode === 'register' && (
              <form
                onSubmit={registerForm.handleSubmit(submitRegister)}
                className="space-y-4"
              >
                <div className="relative w-full">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="email"
                    {...registerForm.register('email')}
                    placeholder="Email"
                    className="input-icon"
                  />
                </div>

                <div className="relative w-full">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="text"
                    {...registerForm.register('username')}
                    placeholder="Username"
                    className="input-icon"
                  />
                </div>
                <div className="relative w-full">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="password"
                    {...registerForm.register('password')}
                    placeholder="Password"
                    className="input-icon"
                  />
                </div>

                <label className="flex items-center gap-2 mt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBroker}
                    onChange={() => {
                      setIsBroker(!isBroker);
                      setJoinOrCreate(null);
                    }}
                  />
                  <span className="font-medium">Искам да бъда брокер</span>
                </label>

                {isBroker && !joinOrCreate && (
                  <div className="flex gap-3 mt-3">
                    <button
                      type="button"
                      onClick={() => setJoinOrCreate('join')}
                      className="rounded-lg py-2 flex-1 bg-white/60 shadow border border-white/60 hover:bg-white"
                    >
                      Съществуваща
                    </button>
                    <button
                      type="button"
                      onClick={() => setJoinOrCreate('create')}
                      className="rounded-lg py-2 flex-1 bg-white/60 shadow border border-white/60 hover:bg-white"
                    >
                      Нова агенция
                    </button>
                  </div>
                )}

                {isBroker && joinOrCreate === 'join' && (
                  <div className="relative w-full">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <input
                      type="text"
                      {...registerForm.register('agencyId')}
                      placeholder="Agency-Id"
                      className="input-icon"
                    />
                  </div>
                )}

                {/* AGENCY CREATE GRID */}
                {isBroker && joinOrCreate === 'create' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative w-full col-span-2">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <input
                        type="text"
                        {...registerForm.register('agencyName')}
                        placeholder="Agency Name"
                        className="input-icon"
                      />
                    </div>

                    <div className="relative w-full">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <input
                        type="number"
                        {...registerForm.register('phone')}
                        placeholder="Phone"
                        className="input-icon"
                      />
                    </div>

                    <div className="relative w-full">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <input
                        type="email"
                        {...registerForm.register('emailAgency')}
                        placeholder="Agency Email"
                        className="input-icon"
                      />
                    </div>

                    <div className="relative w-full col-span-2">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <input
                        type="url"
                        {...registerForm.register('logo')}
                        placeholder="Logo URL"
                        className="input-icon"
                      />
                    </div>

                    <div className="relative w-full col-span-2">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <input
                        type="text"
                        {...registerForm.register('description')}
                        placeholder="Description"
                        className="input-icon"
                      />
                    </div>

                    <div className="relative w-full col-span-2">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <input
                        type="number"
                        {...registerForm.register('commissionCut')}
                        placeholder="Commission %"
                        className="input-icon"
                      />
                    </div>
                  </div>
                )}

                <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 mt-5">
                  Регистрация
                </button>
              </form>
            )}

            <p className="text-center text-sm text-gray-800 mt-6">
              {mode === 'login' ? 'Нямаш акаунт?' : 'Имаш акаунт?'}{' '}
              <button
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-blue-700 font-medium hover:underline"
              >
                {mode === 'login' ? 'Регистрация' : 'Влез'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
