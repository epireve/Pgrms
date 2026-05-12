import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { User, Role, SupervisorAssignment, SupervisorRole } from '../../types';

interface EditSupervisorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: User;
}

const EditSupervisorsModal: React.FC<EditSupervisorsModalProps> = ({ isOpen, onClose, student }) => {
  const { t } = useLanguage();
  const { allUsers, updateUser } = useAuth();
  const [team, setTeam] = useState<SupervisorAssignment[]>(student.supervisors || []);
  
  const potentialSupervisors = allUsers.filter(u => u.role === Role.Supervisor && !team.some(s => s.userId === u.id));
  
  const handleRemove = (userId: string) => {
      setTeam(currentTeam => currentTeam.filter(s => s.userId !== userId));
  }
  
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const userId = formData.get('supervisorId') as string;
      const role = formData.get('role') as SupervisorRole;
      if (userId && role) {
          setTeam(currentTeam => [...currentTeam, { userId, role }]);
      }
      e.currentTarget.reset();
  }

  const handleSave = () => {
    updateUser({ ...student, supervisors: team, lastUpdated: new Date() });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('edit_supervisory_team')}>
        <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">Current Team</h3>
            <div className="space-y-2">
                {team.map(assignment => {
                    const supervisor = allUsers.find(u => u.id === assignment.userId);
                    if (!supervisor) return null;
                    return (
                        <div key={supervisor.id} className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                            <div className="flex items-center space-x-3">
                                <img src={supervisor.avatarUrl} className="w-8 h-8 rounded-full" alt={supervisor.name} />
                                <div>
                                    <p className="font-medium text-sm">{supervisor.name}</p>
                                    <p className="text-xs text-gray-500">{assignment.role}</p>
                                </div>
                            </div>
                            <button onClick={() => handleRemove(supervisor.id)} className="text-red-500 hover:text-red-700">
                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    );
                })}
                 {team.length === 0 && <p className="text-sm text-gray-500">No supervisors assigned.</p>}
            </div>

            <form onSubmit={handleAdd} className="pt-4 border-t dark:border-gray-600 space-y-2">
                 <h3 className="font-semibold text-gray-700 dark:text-gray-300">Add Supervisor</h3>
                 <div className="flex gap-2">
                    <select name="supervisorId" required className="flex-grow w-full px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                         <option value="">Select a supervisor</option>
                         {potentialSupervisors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    <select name="role" required className="w-auto px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Main Supervisor</option>
                        <option>Co-supervisor</option>
                        <option>Assistant Supervisor</option>
                    </select>
                 </div>
                 <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">Add to Team</button>
            </form>

        </div>
      <div className="flex justify-end space-x-3 pt-6 mt-4 border-t dark:border-gray-600">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
          {t('cancel')}
        </button>
        <button type="button" onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
          {t('save')}
        </button>
      </div>
    </Modal>
  );
};

export default EditSupervisorsModal;
