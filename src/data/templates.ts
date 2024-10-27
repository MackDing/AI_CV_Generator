import { Template } from '../types/resume';

export const templates: Template[] = [
  {
    id: 'professional',
    name: '专业简约',
    prompt: `请生成一份专业简约风格的简历，要求：
1. 清晰的层次结构
2. 简洁的表达方式
3. 突出关键成就
4. 使用专业术语`
  },
  {
    id: 'detailed',
    name: '详细展开',
    prompt: `请生成一份详细的简历，要求：
1. 深入描述工作职责
2. 量化工作成果
3. 展示项目细节
4. 突出技能应用场景`
  },
  {
    id: 'creative',
    name: '创意特色',
    prompt: `请生成一份富有创意的简历，要求：
1. 独特的表达方式
2. 突出个人特色
3. 强调创新思维
4. 展现个性化描述`
  }
];