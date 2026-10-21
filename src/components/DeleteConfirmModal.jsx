import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { useFootball } from '../context/FootballContext';

export default function DeleteConfirmModal() {
  const { deleteConfirm, closeDeleteConfirm } = useFootball();

  if (!deleteConfirm.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={closeDeleteConfirm}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity" 
      />

      {/* Confirmation Dialog */}
      <div className="relative w-full max-w-md bg-slate-900 border border-red-500/40 rounded-2xl p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={closeDeleteConfirm}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {deleteConfirm.title || "O‘chirishni tasdiqlang"}
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {deleteConfirm.message || "Haqiqatan ham ushbu ma’lumotni o‘chirmoqchimisiz? Bu amalni ortga qaytarib bo‘lmaydi."}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={closeDeleteConfirm}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors"
          >
            Bekor qilish
          </button>
          <button
            onClick={deleteConfirm.onConfirm}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold shadow-lg shadow-red-600/30 transition-all flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>O‘chirish</span>
          </button>
        </div>
      </div>
    </div>
  );
}
