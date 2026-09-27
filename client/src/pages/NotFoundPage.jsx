import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Sparkles, Home } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-4">
      <div className="p-4 rounded-3xl bg-brand-500/10 text-brand-500">
        <Sparkles className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">
        404 - Page Lost in Orbit
      </h1>
      <p className="text-slate-400 max-w-md text-sm">
        The vibe you are searching for might have drifted away or does not exist.
      </p>
      <Button
        variant="gradient"
        size="md"
        leftIcon={<Home className="w-4 h-4" />}
        onClick={() => navigate('/')}
      >
        Return to Feed
      </Button>
    </div>
  );
};
