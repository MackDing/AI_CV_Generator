import React, { useState, useEffect } from 'react';
import { ResumeForm as ResumeFormType } from '../types/resume';
import { TemplateSelector } from './TemplateSelector';
import toast from 'react-hot-toast';

interface Props {
  onSubmit: (form: ResumeFormType) => Promise<void>;
  isLoading: boolean;
  initialData: ResumeFormType | null;
}

export const ResumeForm: React.FC<Props> = ({ onSubmit, isLoading, initialData }) => {
  const [form, setForm] = useState<ResumeFormType>({
    name: '',
    targetPosition: '',
    workExperience: '',
    education: '',
    skills: '',
    additionalInfo: '',
    template: 'professional'
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.targetPosition || !form.workExperience || !form.education || !form.skills) {
      toast.error('请填写所有必填字段');
      return;
    }
    await onSubmit(form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleTemplateChange = (templateId: string) => {
    setForm(prev => ({
      ...prev,
      template: templateId
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TemplateSelector
        selectedTemplate={form.template}
        onChange={handleTemplateChange}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">姓名 *</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">目标职位 *</label>
        <input
          type="text"
          name="targetPosition"
          value={form.targetPosition}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">工作经验 *</label>
        <textarea
          name="workExperience"
          value={form.workExperience}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">教育背景 *</label>
        <textarea
          name="education"
          value={form.education}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">技能特长 *</label>
        <textarea
          name="skills"
          value={form.skills}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">补充信息</label>
        <textarea
          name="additionalInfo"
          value={form.additionalInfo}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? '生成中...' : '生成简历'}
      </button>
    </form>
  );
};