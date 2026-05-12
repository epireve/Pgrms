import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { useLanguage } from '../../context/LanguageContext';

interface AddLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (log: { discussionPoints: string; actionsAgreed: string; }) => void;
}

const AddLogModal: React.FC<AddLogModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useLanguage();
  const [discussionPoints, setDiscussionPoints] = useState('');
  const [actionsAgreed, setActionsAgreed] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (discussionPoints.trim() && actionsAgreed.trim()) {
      onSubmit({ discussionPoints, actionsAgreed });
      setDiscussionPoints('');
      setActionsAgreed('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('add_supervision_log')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="discussion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('discussion_points')}</label>
          <textarea
            id="discussion"
            rows={4}
            value={discussionPoints}
            onChange={(e) => setDiscussionPoints(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
        <div>
          <label htmlFor="actions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('actions_agreed')}</label>
          <textarea
            id="actions"
            rows={4}
            value={actionsAgreed}
            onChange={(e) => setActionsAgreed(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
            {t('cancel')}
          </button>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
            {t('save')}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddLogModal;
