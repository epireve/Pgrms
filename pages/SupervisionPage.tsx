
import React, { useState } from 'react';
import Card from '../components/shared/Card';
import { useLanguage } from '../context/LanguageContext';
import { mockSupervisionLogs, mockSupervisor } from '../services/mockData';
import type { SupervisionLog } from '../types';
import AddLogModal from '../components/modals/AddLogModal';

const LogItem: React.FC<{log: SupervisionLog}> = ({ log }) => {
    return (
        <Card className="mb-4">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="font-bold text-lg text-gray-800 dark:text-white">{log.supervisor}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{log.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <button className="text-sm font-medium text-primary-600 hover:underline">Edit</button>
            </div>
            <div className="space-y-3 mt-4">
                <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">Discussion Points</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{log.discussionPoints}</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">Actions Agreed</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{log.actionsAgreed}</p>
                </div>
            </div>
        </Card>
    );
}

const SupervisionPage: React.FC = () => {
    const { t } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [logs, setLogs] = useState(mockSupervisionLogs);

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
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">{t('supervision_logs')}</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                >
                    {t('add_new_log')}
                </button>
            </div>
            <div>
                {logs.map(log => <LogItem key={log.id} log={log} />)}
            </div>
            <AddLogModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddLog}
            />
        </div>
    );
};

export default SupervisionPage;