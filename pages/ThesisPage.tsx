import React, { useState } from 'react';
import Card from '../components/shared/Card';
import { useLanguage } from '../context/LanguageContext';
import { mockThesisSubmission, allThesisSteps } from '../services/mockData';
import { ThesisStatus, ThesisSubmission } from '../types';
import { translations } from '../constants/translations';
import UploadThesisModal from '../components/modals/UploadThesisModal';

const ThesisTracker: React.FC<{ submission: ThesisSubmission }> = ({ submission }) => {
    const { t } = useLanguage();
    const currentStatusIndex = allThesisSteps.indexOf(submission.status);
    
    const getStatusInfo = (status: ThesisStatus) => {
        return submission.statusHistory.find(h => h.status === status);
    }

    return (
        <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-4">
            {allThesisSteps.map((step, index) => {
                const isCompleted = index < currentStatusIndex;
                const isCurrent = index === currentStatusIndex;
                const statusInfo = getStatusInfo(step);

                return (
                     <li key={step} className="mb-10 ml-8">
                        <span className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-8 ring-white dark:ring-gray-900 
                            ${isCompleted ? 'bg-green-500' : ''}
                            ${isCurrent ? 'bg-primary-500' : ''}
                            ${!isCompleted && !isCurrent ? 'bg-gray-300 dark:bg-gray-600' : ''}
                        `}>
                           {isCompleted ? (
                             <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                           ) : (
                             <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                           )}
                        </span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                            {t(step as keyof typeof translations.en)}
                            {isCurrent && <span className="bg-primary-100 text-primary-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300 ml-3">Current</span>}
                        </h3>
                        {statusInfo && (
                             <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                Completed on {statusInfo.date.toLocaleDateString()}
                            </time>
                        )}
                       {statusInfo?.notes && <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">{statusInfo.notes}</p>}
                    </li>
                );
            })}
        </ol>
    );
};


const ThesisPage: React.FC = () => {
    const { t } = useLanguage();
    const [submission, setSubmission] = useState(mockThesisSubmission);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUploadVersion = (notes: string) => {
        const newDate = new Date();
        const newStatus = ThesisStatus.Resubmission;
        const updatedSubmission = {
            ...submission,
            version: submission.version + 1,
            submittedAt: newDate,
            status: newStatus,
            statusHistory: [
                ...submission.statusHistory,
                { status: newStatus, date: newDate, notes: notes || 'New version uploaded.' }
            ]
        };
        setSubmission(updatedSubmission);
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif mb-6">{t('thesis_submission')}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title={t('thesis_tracking')} className="lg:col-span-2">
                    <ThesisTracker submission={submission} />
                </Card>
                 <Card title="Submission Details">
                    <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                        <div className="py-2 grid grid-cols-2">
                            <dt className="text-sm font-medium text-gray-500">Version</dt>
                            <dd className="text-sm text-gray-900 dark:text-white">{submission.version}</dd>
                        </div>
                        <div className="py-2 grid grid-cols-2">
                            <dt className="text-sm font-medium text-gray-500">Submission Date</dt>
                            <dd className="text-sm text-gray-900 dark:text-white">{submission.submittedAt.toLocaleDateString()}</dd>
                        </div>
                        <div className="py-2 grid grid-cols-2">
                            <dt className="text-sm font-medium text-gray-500">Current Status</dt>
                            <dd className="text-sm text-gray-900 dark:text-white">{t(submission.status as keyof typeof translations.en)}</dd>
                        </div>
                    </dl>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="mt-6 w-full bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                        {t('upload_new_version')}
                    </button>
                </Card>
            </div>
            <UploadThesisModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleUploadVersion}
            />
        </div>
    );
};

export default ThesisPage;