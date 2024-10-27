import { useState, useEffect } from 'react';
import { ResumeForm, ResumeHistory } from '../types/resume';

const STORAGE_KEY = 'resume_history';

export const useResumeHistory = () => {
  const [history, setHistory] = useState<ResumeHistory[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const addToHistory = (form: ResumeForm, content: string) => {
    const newEntry: ResumeHistory = {
      id: Date.now().toString(),
      form,
      content,
      createdAt: new Date().toISOString(),
    };

    const updatedHistory = [newEntry, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    history,
    addToHistory,
    clearHistory,
  };
};