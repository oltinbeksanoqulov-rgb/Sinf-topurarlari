import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useFootball } from '../context/FootballContext';

export default function Toast() {
  const { toast } = useFootball();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md ${
        isSuccess
          ? 'bg-slate-900/95 border-emerald-500/50 text-white shadow-[0_0_25px_rgba(0,245,118,0.25)]'
          : isError
          ? 'bg-slate-900/95 border-red-500/50 text-white shadow-[0_0_25px_rgba(239,68,68,0.25)]'
          : 'bg-slate-900/95 border-blue-500/50 text-white shadow-[0_0_25px_rgba(59,130,246,0.25)]'
      }`}>
        <div className="flex-shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertCircle className="w-5 h-5 text-red-400" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-400" />}
        </div>
        <p className="text-sm font-medium pr-2">
          {toast.message}
        </p>
      </div>
    </div>
  );
}
