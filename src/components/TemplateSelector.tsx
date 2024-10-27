import React from 'react';
import { templates } from '../data/templates';

interface Props {
  selectedTemplate: string;
  onChange: (templateId: string) => void;
}

export const TemplateSelector: React.FC<Props> = ({ selectedTemplate, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">选择模板</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onChange(template.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <h3 className="font-medium text-gray-900">{template.name}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};