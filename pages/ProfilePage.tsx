import React, { useState, useMemo } from 'react';
import Card from '../components/shared/Card';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { UserStatus, Role, User } from '../types';
import EditSupervisorsModal from '../components/modals/EditSupervisorsModal';

const ProfileInfoRow: React.FC<{ label: string; value: React.ReactNode; fullWidth?: boolean }> = ({ label, value, fullWidth = false }) => (
    <div className={`py-3 sm:grid ${fullWidth ? 'sm:grid-cols-1' : 'sm:grid-cols-3'} sm:gap-4`}>
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
        <dd className={`mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 ${fullWidth ? '' : 'sm:col-span-2'}`}>{value}</dd>
    </div>
);

const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Suspended':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Completed':
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };


const ProfilePage: React.FC = () => {
    const { t } = useLanguage();
    const { user, allUsers } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const currentUser = allUsers.find(u => u.id === user.id) || user;
    const isStudentProfile = currentUser.role === Role.Student;

    const { hod, supervisors } = useMemo(() => {
        if (!isStudentProfile) return { hod: null, supervisors: [] };
        const hod = allUsers.find(u => u.id === currentUser.hodId);
        const supervisors = (currentUser.supervisors || []).map(assignment => {
            const supervisorUser = allUsers.find(u => u.id === assignment.userId);
            return { ...supervisorUser, assignmentRole: assignment.role };
        });
        return { hod, supervisors };
    }, [currentUser, allUsers, isStudentProfile]);

    return (
        <Card>
            <div className="flex justify-between items-start">
                 <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">{t('my_profile')}</h2>
                     {isStudentProfile && currentUser.lastUpdated && (
                        <p className="text-xs text-gray-400 mt-1">{t('last_updated')}: {new Date(currentUser.lastUpdated).toLocaleString()}</p>
                    )}
                 </div>
                 {user.role === Role.Admin && isStudentProfile && (
                     <button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="bg-primary-100 text-primary-700 font-bold py-2 px-4 rounded-lg hover:bg-primary-200 transition-colors text-sm dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-800"
                    >
                         {t('edit_supervisory_team')}
                     </button>
                 )}
            </div>

            <div className="flex items-center space-x-6 my-6">
                <img className="h-24 w-24 rounded-full object-cover" src={currentUser?.avatarUrl} alt="User avatar" />
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser?.name}</h3>
                    <p className="text-md text-gray-600 dark:text-gray-300 capitalize">{currentUser?.role.toLowerCase()}</p>
                </div>
            </div>

             <div className="border-t border-gray-200 dark:border-gray-700">
                <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                   <ProfileInfoRow label={t('matric_no')} value={currentUser?.id || ''} />
                   {isStudentProfile && (
                       <>
                        <ProfileInfoRow label={t('student_status')} value={
                            currentUser.status ? <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadge(currentUser.status)}`}>{currentUser.status}</span> : 'N/A'
                        } />
                        <ProfileInfoRow label={t('email')} value={currentUser?.email || ''} />
                        <ProfileInfoRow label={t('programme')} value={currentUser.programme} />
                        <ProfileInfoRow label={t('mode')} value={currentUser.mode} />
                        <ProfileInfoRow label={t('research_title')} value={currentUser.researchTitle} />
                        <ProfileInfoRow label={t('hod')} value={hod?.name || 'N/A'} />
                        <ProfileInfoRow label={t('supervisory_team')} value={
                             <div className="space-y-2">
                                {supervisors.map(s => s && (
                                    <div key={s.id} className="flex items-center space-x-3">
                                        <img src={s.avatarUrl} className="w-8 h-8 rounded-full" alt={s.name} />
                                        <div>
                                            <p className="font-semibold text-sm">{s.name}</p>
                                            <p className="text-xs text-gray-500">{s.assignmentRole}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        } />
                       </>
                   )}
                </dl>
            </div>
             {isEditModalOpen && isStudentProfile && (
                 <EditSupervisorsModal
                     student={currentUser}
                     isOpen={isEditModalOpen}
                     onClose={() => setIsEditModalOpen(false)}
                 />
             )}
        </Card>
    );
};

export default ProfilePage;