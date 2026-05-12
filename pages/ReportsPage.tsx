
import React from 'react';
import Card from '../components/shared/Card';
import { useLanguage } from '../context/LanguageContext';
import { mockProgressReports } from '../services/mockData';
import { ReportStatus, ProgressReport } from '../types';

const getStatusBadge = (status: ReportStatus) => {
  switch (status) {
    case ReportStatus.Approved:
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case ReportStatus.Submitted:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case ReportStatus.Rejected:
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case ReportStatus.NotSubmitted:
    default:
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
  }
};

const ReportRow: React.FC<{ report: ProgressReport }> = ({ report }) => {
    const { t } = useLanguage();

    return (
        <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{report.period}</td>
            <td className="px-6 py-4">
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadge(report.status)}`}>
                    {report.status.replace('_', ' ')}
                </span>
            </td>
            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{report.submissionDate?.toLocaleDateString() || 'N/A'}</td>
            <td className="px-6 py-4">
                {report.status === ReportStatus.NotSubmitted && (
                     <button className="font-medium text-primary-600 dark:text-primary-500 hover:underline">{t('submit_report')}</button>
                )}
                 {report.status === ReportStatus.Submitted && (
                     <a href="#" className="font-medium text-gray-600 dark:text-gray-400">View</a>
                )}
                 {report.status === ReportStatus.Approved && (
                     <a href="#" className="font-medium text-gray-600 dark:text-gray-400">View</a>
                )}
            </td>
        </tr>
    );
};


const ReportsPage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <Card title={t('progress_report_status')}>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t('period')}</th>
                            <th scope="col" className="px-6 py-3">{t('status')}</th>
                            <th scope="col" className="px-6 py-3">{t('submission_date')}</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockProgressReports.map(report => <ReportRow key={report.id} report={report}/>)}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default ReportsPage;
