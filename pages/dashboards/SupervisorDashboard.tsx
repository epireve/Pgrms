import React, { useState, useMemo } from 'react';
import Card from '../../components/shared/Card';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockSupervisorStudents, mockProgressReports, mockMilestones } from '../../services/mockData';
import { ReportStatus, MilestoneStatus } from '../../types';

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

const SupervisorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'progress'>('name');

  const pendingReports = mockProgressReports.filter(r => r.status === ReportStatus.Submitted);
  const pendingMilestones = mockMilestones.filter(m => m.status === MilestoneStatus.AwaitingEndorsement).length;

  const filteredAndSortedStudents = useMemo(() => {
      return mockSupervisorStudents
        .filter(student => student.name.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => {
            if (sortKey === 'progress') return b.progress - a.progress;
            return a.name.localeCompare(b.name);
        });
  }, [filter, sortKey]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-serif">{t('welcome')}, {user?.name}!</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
            title={t('pending_actions')} 
            value={pendingMilestones} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title={t('my_students')} className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <input
                    type="text"
                    placeholder={t('filter_by_name')}
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <select 
                    value={sortKey} 
                    onChange={e => setSortKey(e.target.value as 'name' | 'progress')}
                    className="w-full sm:w-auto px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                    <option value="name">Sort by Name</option>
                    <option value="progress">Sort by Progress</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t('student')}</th>
                            <th scope="col" className="px-6 py-3">{t('progress')}</th>
                            <th scope="col" className="px-6 py-3">{t('status')}</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">View</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedStudents.map(student => (
                            <tr key={student.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center space-x-3">
                                    <img className="h-10 w-10 rounded-full object-cover" src={student.avatarUrl} alt={student.name} />
                                    <span>{student.name}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                            <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
                                        </div>
                                        <span className="text-xs font-medium">{student.progress}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${student.status === 'On Track' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>{student.status}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">View</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default SupervisorDashboard;