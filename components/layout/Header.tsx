
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockNotifications } from '../../services/mockData';
import { Notification } from '../../types';

const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

const Header: React.FC = () => {
  const { user, switchUser, allUsers } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifyDropdownOpen, setNotifyDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  const notifications = mockNotifications[user.role] || [];
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setProfileDropdownOpen(false);
      if (notifyRef.current && !notifyRef.current.contains(event.target as Node)) setNotifyDropdownOpen(false);
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) setRoleDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white capitalize font-serif">{user.role.toLowerCase().replace('_', ' ')} {t('dashboard')}</h1>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <button onClick={() => setLanguage(language === 'en' ? 'bm' : 'en')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
          <span className="font-bold text-sm">{language.toUpperCase()}</span>
        </button>

        <div className="relative" ref={notifyRef}>
          <button onClick={() => setNotifyDropdownOpen(!notifyDropdownOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 relative">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
            {unreadCount > 0 && <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-gray-800"></span>}
          </button>
          {notifyDropdownOpen && (
             <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-50 border dark:border-gray-700">
               <div className="px-4 py-2 font-bold text-gray-800 dark:text-white border-b dark:border-gray-700">{t('notifications')}</div>
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-96 overflow-y-auto">
                    {notifications.map((n: Notification) => (
                      <div key={n.id} className={`p-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${!n.read ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}>
                        <p className="text-sm text-gray-700 dark:text-gray-200">{n.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{timeSince(n.date)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="p-4 text-sm text-gray-500 dark:text-gray-400">{t('no_notifications')}</p>
                )}
             </div>
          )}
        </div>
        
        <div className="relative" ref={roleRef}>
            <button onClick={() => setRoleDropdownOpen(!roleDropdownOpen)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 flex items-center space-x-1 text-sm">
                <span>{t('switch_role')}</span>
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border dark:border-gray-700">
                    {allUsers.map(u => (
                        <button key={u.id} onClick={() => { switchUser(u.id); setRoleDropdownOpen(false);}} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" disabled={user.id === u.id}>
                            {u.name} <span className="text-xs text-gray-500">({u.role})</span>
                        </button>
                    ))}
                </div>
            )}
        </div>

        <div className="relative" ref={profileRef}>
          <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="flex items-center space-x-2">
            <img className="h-10 w-10 rounded-full object-cover" src={user?.avatarUrl} alt="User avatar" />
            <div className="hidden md:block text-left">
              <p className="font-semibold text-sm text-gray-800 dark:text-white">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role.toLowerCase()}</p>
            </div>
          </button>
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border dark:border-gray-700">
              <a href="#/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">{t('profile')}</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">{t('logout')}</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;