import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('demo_creator');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login demo for Phase 1
    setTimeout(() => {
      setUser({
        _id: 'mock-user-1',
        username: emailOrUsername || 'creator',
        fullName: 'Creative Explorer',
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
            Welcome back to VibeStream
          </h1>
          <p className="text-sm text-slate-400">
            Enter your credentials to continue sharing your visual stories
          </p>
        </div>

        <Card className="p-6 sm:p-8 text-left shadow-xl border border-slate-200/80 dark:border-slate-800/80">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email or Username"
              leftIcon={<Mail className="w-4 h-4" />}
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="e.g. alex or alex@vibestream.app"
              required
            />

            <Input
              label="Password"
              type="password"
              leftIcon={<Lock className="w-4 h-4" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Create one now
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
