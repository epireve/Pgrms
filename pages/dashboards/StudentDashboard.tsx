
import React, { useState } from 'react';
import Card from '../../components/shared/Card';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockMilestones, mockSupervisionLogs, mockSupervisor } from '../../services/mockData';
import { Milestone, MilestoneStatus, SupervisionLog } from '../../types';
import AddLogModal from '../../components/modals/AddLogModal';

// FIX: Replaced MilestoneStatus.InProgress with existing statuses for correctness and consistency.
const getStatusBadge = (status: MilestoneStatus) => {
  switch (status) {
    case MilestoneStatus.Completed:
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case MilestoneStatus.AwaitingEndorsement:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case MilestoneStatus.Returned:
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case MilestoneStatus.Overdue:
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case MilestoneStatus.Pending:
    default:
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
  }
};

const MilestoneItem: React.FC<{ milestone: Milestone }> = ({ milestone }) => {
    const { t } = useLanguage();
    // FIX: Replaced MilestoneStatus.InProgress with existing statuses for correctness and consistency.
    const statusText = {
        [MilestoneStatus.Completed]: t('completed'),
        [MilestoneStatus.AwaitingEndorsement]: t('awaiting_endorsement'),
        [MilestoneStatus.Overdue]: t('overdue'),
        [MilestoneStatus.Pending]: t('pending'),
        [MilestoneStatus.Returned]: t('returned'),
    };
    return (
        <div className="flex items-start space-x-4 py-3">
            <div className={`w-3 h-3 rounded-full mt-1.5 ${getStatusBadge(milestone.status)}`}></div>
            <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-white">{milestone.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Due: {milestone.dueDate.toLocaleDateString()}</p>
            </div>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadge(milestone.status)}`}>
                {statusText[milestone.status]}
            </span>
        </div>
    );
};

const SupervisionLogItem: React.FC<{ log: SupervisionLog }> = ({ log }) => (
    <div className="py-3">
        <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-gray-800 dark:text-white">{log.supervisor}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{log.date.toLocaleDateString()}</p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{log.discussionPoints}</p>
    </div>
);

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs, setLogs] = useState(mockSupervisionLogs);

  const completedCount = mockMilestones.filter(m => m.status === MilestoneStatus.Completed).length;
  const totalCount = mockMilestones.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  const handleAddLog = (newLog: { discussionPoints: string; actionsAgreed: string; }) => {
      const logToAdd: SupervisionLog = {
          id: `l${logs.length + 1}`,
          date: new Date(),
          supervisor: mockSupervisor.name,
          ...newLog
      };
      setLogs([logToAdd, ...logs]);
      setIsModalOpen(false);
  };


  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-serif">{t('welcome')}, {user?.name}!</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('programme_milestones')}</h4>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{completedCount}/{totalCount}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card 
            title={t('programme_milestones')} 
            className="lg:col-span-2"
            action={<a href="#/reports" className="text-sm font-medium text-primary-600 hover:underline">{t('view_all')}</a>}
        >
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockMilestones.slice(0, 5).map(m => <MilestoneItem key={m.id} milestone={m} />)}
            </div>
        </Card>
        <Card 
            title={t('recent_supervision_logs')}
            action={<a href="#/supervision" className="text-sm font-medium text-primary-600 hover:underline">{t('view_all')}</a>}
        >
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {logs.slice(0, 4).map(log => <SupervisionLogItem key={log.id} log={log} />)}
            </div>
             <button onClick={() => setIsModalOpen(true)} className="mt-4 w-full bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                {t('add_new_log')}
            </button>
        </Card>
      </div>
      <AddLogModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddLog}
      />
    </div>
  );
};

export default StudentDashboard;
