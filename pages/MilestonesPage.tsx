import React, { useState } from 'react';
import Card from '../components/shared/Card';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { mockMilestones } from '../services/mockData';
import { Milestone, MilestoneStatus, Role } from '../types';
import { translations } from '../constants/translations';

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

const statusTextMap = {
    [MilestoneStatus.Pending]: 'pending',
    [MilestoneStatus.AwaitingEndorsement]: 'awaiting_endorsement',
    [MilestoneStatus.Completed]: 'completed',
    [MilestoneStatus.Returned]: 'returned',
    [MilestoneStatus.Overdue]: 'overdue',
} as const;


const MilestoneItem: React.FC<{ milestone: Milestone; onUpdate: (updatedMilestone: Milestone) => void; }> = ({ milestone, onUpdate }) => {
    const { t } = useLanguage();
    const { user } = useAuth();
    
    const statusKey = statusTextMap[milestone.status] || 'pending';

    const handleUpload = () => {
        onUpdate({ 
            ...milestone, 
            status: MilestoneStatus.AwaitingEndorsement,
            evidenceFile: { name: 'evidence_submission.pdf', url: '#' },
            history: [...milestone.history, { action: 'SUBMITTED', actorId: user.id, date: new Date() }]
        });
    }

    const handleEndorse = () => {
        onUpdate({ 
            ...milestone, 
            status: MilestoneStatus.Completed,
            actualCompletionDate: new Date(),
            history: [...milestone.history, { action: 'ENDORSED', actorId: user.id, date: new Date() }]
        });
    }
    
    const handleReturn = () => {
         onUpdate({ 
            ...milestone, 
            status: MilestoneStatus.Returned,
            history: [...milestone.history, { action: 'RETURNED', actorId: user.id, date: new Date() }]
        });
    }

    return (
        <Card className="mb-4">
             <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white font-serif">{milestone.title}</h3>
                <span className={`mt-2 sm:mt-0 text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadge(milestone.status)}`}>
                    {t(statusKey as keyof typeof translations.en)}
                </span>
            </div>
             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Due: {milestone.dueDate.toLocaleDateString()}</p>
             <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{milestone.description}</p>
             
             <div className="mt-4 pt-4 border-t dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                     <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t('evidence')}: </span>
                     {milestone.evidenceFile ? (
                        <a href={milestone.evidenceFile.url} className="text-sm text-primary-600 hover:underline">{milestone.evidenceFile.name}</a>
                     ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">Not submitted</span>
                     )}
                </div>
                 <div className="flex items-center space-x-2">
                    {user.role === Role.Student && (milestone.status === MilestoneStatus.Pending || milestone.status === MilestoneStatus.Returned) && (
                        <button onClick={handleUpload} className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm">{t('upload_evidence')}</button>
                    )}
                    {user.role === Role.Supervisor && milestone.status === MilestoneStatus.AwaitingEndorsement && (
                        <>
                             <button onClick={handleReturn} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">{t('return_for_changes')}</button>
                             <button onClick={handleEndorse} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">{t('endorse')}</button>
                        </>
                    )}
                 </div>
             </div>
        </Card>
    );
}

const MilestonesPage: React.FC = () => {
    const { t } = useLanguage();
    const [milestones, setMilestones] = useState<Milestone[]>(mockMilestones);
    
    const handleUpdateMilestone = (updatedMilestone: Milestone) => {
        setMilestones(currentMilestones => 
            currentMilestones.map(m => m.id === updatedMilestone.id ? updatedMilestone : m)
        );
    };

    return (
         <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif mb-6">{t('milestones')}</h1>
            <div>
                {milestones.sort((a,b) => a.order - b.order).map(milestone => (
                    <MilestoneItem key={milestone.id} milestone={milestone} onUpdate={handleUpdateMilestone} />
                ))}
            </div>
        </div>
    );
};

export default MilestonesPage;
