import React from 'react';
import { ResumeHistory } from '../types/resume';

interface Props {
  history: ResumeHistory[];
  onSelect: (entry: ResumeHistory) => void;
  onClear: () => void;
}

export const ResumeHistoryList: React.FC<Props> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">历史记录</h3>
        <button
          onClick={onClear}
          className="text-sm text-red-600 hover:text-red-800"
        >
          清除历史
        </button>
      </div>
      <div className="space-y-2">
        {history.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelect(entry)}
            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{entry.form.name} - {entry.form.targetPosition}</span>
              <span className="text-sm text-gray-500">
                {new Date(entry.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1 truncate">
              {entry.form.workExperience}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};