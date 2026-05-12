
import React from 'react';
import Card from '../../components/shared/Card';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockAdminStats } from '../../services/mockData';

const StatCard: React.FC<{ title: string, value: string | number, icon: React.ReactNode }> = ({ title, value, icon }) => (
    <Card>
        <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300">
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h4>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
            </div>
        </div>
    </Card>
);

const HODDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-serif">{t('welcome')}, {user?.name}!</h2>
      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-6 font-serif">Department Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
            title={t('total_students')} 
            value={mockAdminStats.totalStudents} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>}
        />
        <StatCard 
            title={t('total_supervisors')} 
            value={mockAdminStats.totalSupervisors} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>}
        />
         <StatCard 
            title={t('pending_reports')} 
            value={mockAdminStats.reportsPending} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>}
        />
        <StatCard 
            title={t('theses_submitted')} 
            value={mockAdminStats.thesesSubmitted} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>}
        />
      </div>
    </div>
  );
};

export default HODDashboard;