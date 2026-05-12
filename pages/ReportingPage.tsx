
import React from 'react';
import Card from '../components/shared/Card';
import { useLanguage } from '../context/LanguageContext';

const ReportingPage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <Card title={t('reporting_module')}>
            <div className="text-center py-12">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
                    <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white font-serif">Coming Soon</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t('reporting_description')}</p>
            </div>
        </Card>
    );
};

export default ReportingPage;