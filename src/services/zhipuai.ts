import axios from 'axios';
import { ResumeForm, AIResponse } from '../types/resume';
import { templates } from '../data/templates';

const API_KEY = import.meta.env.VITE_ZHIPU_API_KEY || '';
const API_URL = 'https://open.bigmodel.cn/api/paas/v3/model-api/chatglm_turbo/invoke';

export const generateResume = async (form: ResumeForm): Promise<AIResponse> => {
  try {
    const template = templates.find(t => t.id === form.template);
    const prompt = `${template?.prompt || ''}
    
    请根据以下信息生成简历：
    姓名：${form.name}
    目标职位：${form.targetPosition}
    工作经验：${form.workExperience}
    教育背景：${form.education}
    技能特长：${form.skills}
    ${form.additionalInfo ? `补充信息：${form.additionalInfo}` : ''}
    
    要求：
    1. 使用专业的措辞和格式
    2. 突出与目标职位相关的经验和技能
    3. 使用简洁清晰的语言
    4. 按照标准简历格式组织内容
    5. 突出个人成就和贡献`;

    const response = await axios.post(API_URL, {
      prompt,
      temperature: 0.7,
      max_tokens: 2000,
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      success: true,
      data: response.data.choices[0].text
    };
  } catch (error) {
    console.error('AI generation failed:', error);
    return {
      success: false,
      error: '生成简历时出错，请稍后重试'
    };
  }
};