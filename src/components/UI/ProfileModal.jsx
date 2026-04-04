import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useStore } from '../../store/useStore';

export const ProfileModal = ({ isOpen, onClose }) => {
  const { userProfile, updateUserProfile } = useStore();
  const [formData, setFormData] = useState({ name: '', initials: '' });

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: userProfile.name,
        initials: userProfile.initials
      });
    }
  }, [isOpen, userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const autoGenerateInitials = () => {
    if (!formData.name) return;
    const parts = formData.name.trim().split(' ');
    let init = '';
    if (parts.length >= 2) {
      init = (parts[0][0] + parts[1][0]).toUpperCase();
    } else if (parts.length === 1 && parts[0].length > 0) {
      init = parts[0].substring(0, 2).toUpperCase();
    }
    setFormData(prev => ({ ...prev, initials: init }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.initials.trim()) return;
    
    updateUserProfile({
      name: formData.name.trim(),
      initials: formData.initials.trim().substring(0, 2).toUpperCase()
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="space-y-5 pt-2">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-blue-50 dark:ring-slate-800">
            {formData.initials || '?'}
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Display Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoFocus
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-shadow"
            placeholder="e.g. John Doe"
            required
            maxLength={40}
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Avatar Initials
            </label>
            <button 
              type="button" 
              onClick={autoGenerateInitials}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Auto-generate
            </button>
          </div>
          <input
            type="text"
            name="initials"
            value={formData.initials}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white uppercase transition-shadow"
            placeholder="JD"
            required
            maxLength={2}
          />
          <p className="text-xs text-slate-500 mt-1">Maximum 2 characters.</p>
        </div>

        <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-slate-200 dark:border-slate-700">
          <Button type="button" variant="ghost" onClick={onClose} className="px-5 py-2.5">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="px-5 py-2.5 shadow-md hover:shadow-lg shadow-blue-500/20">
            Save Profile
          </Button>
        </div>
      </form>
    </Modal>
  );
};
