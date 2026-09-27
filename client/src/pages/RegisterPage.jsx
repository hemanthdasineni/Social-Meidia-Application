import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: 'Jane Doe',
    username: 'janedoe',
    email: 'jane@example.com',
    password: 'password123',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setUser({
        _id: 'mock-user-reg',
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        avatar: {
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        },
      });
      setLoading(false);
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#08090d]">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-purple-600 to-cyan-400 text-white shadow-xl shadow-brand-500/30">
          <Sparkles className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Join the VibeStream Community
          </h1>
          <p className="text-sm text-slate-400">
            Showcase your visual aesthetics and build your creative vibe
          </p>
        </div>

        <Card className="p-6 sm:p-8 text-left shadow-xl border border-slate-200/80 dark:border-slate-800/80">
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Full Name"
              leftIcon={<User className="w-4 h-4" />}
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              placeholder="e.g. Jane Doe"
              required
            />

            <Input
              label="Username"
              leftIcon={<Sparkles className="w-4 h-4" />}
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="e.g. janedoe"
              required
            />

            <Input
              label="Email"
              type="email"
              leftIcon={<Mail className="w-4 h-4" />}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="e.g. jane@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              leftIcon={<Lock className="w-4 h-4" />}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              required
            />

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full justify-center mt-2 shadow-lg shadow-brand-600/30"
              isLoading={loading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Log in here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
