import { useState } from 'react';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { ResumeHistoryList } from './components/ResumeHistory';
import { generateResume } from './services/zhipuai';
import { ResumeForm as ResumeFormType, ResumeHistory } from './types/resume';
import { useResumeHistory } from './hooks/useResumeHistory';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<string>('');
  const { history, addToHistory, clearHistory } = useResumeHistory();
  const [currentForm, setCurrentForm] = useState<ResumeFormType | null>(null);

  const handleSubmit = async (form: ResumeFormType) => {
    setIsLoading(true);
    try {
      const response = await generateResume(form);
      if (response.success && response.data) {
        setGeneratedResume(response.data);
        addToHistory(form, response.data);
        toast.success('简历生成成功！');
      } else {
        toast.error(response.error || '生成失败，请重试');
      }
    } catch (error) {
      toast.error('发生错误，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = (entry: ResumeHistory) => {
    setCurrentForm(entry.form);
    setGeneratedResume(entry.content);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          AI 简历生成器
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">填写信息</h2>
              <ResumeForm 
                onSubmit={handleSubmit} 
                isLoading={isLoading}
                initialData={currentForm}
              />
            </div>
            <ResumeHistoryList
              history={history}
              onSelect={handleHistorySelect}
              onClear={clearHistory}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <ResumePreview content={generatedResume} />
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;