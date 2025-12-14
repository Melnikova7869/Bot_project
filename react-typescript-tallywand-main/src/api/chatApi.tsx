import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Или ваш реальный URL бэкенда

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ChatRequest {
  question: string;
  max_results?: number;
  full?: boolean;
}

export interface MethodicsItem {
  id: number;
  title: string;
  content: string;
  fragment?: string;
  relevance_score?: number;
}

export interface ChatResponse {
  answer: string;
  methodics: MethodicsItem[];
  sources_count: number;
}

export interface SearchResponse {
  methodics: MethodicsItem[];
  total: number;
}

export interface MethodicsDetails extends MethodicsItem {
  created_at?: string;
  updated_at?: string;
  file_url?: string;
  author?: string;
  tags?: string[];
}

export const chatApi = {
  // POST /chat - Основной метод для получения ответа на вопрос
  async sendQuestion(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await api.post<ChatResponse>('/chat', request);
      return response.data;
    } catch (error) {
      console.error('Error sending question:', error);
      throw error;
    }
  },

  // GET /search - Поиск методичек без участия AI
  async searchMethodics(query: string, limit: number = 5): Promise<SearchResponse> {
    try {
      const response = await api.get<SearchResponse>('/search', {
        params: { query, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching methodics:', error);
      throw error;
    }
  },

  // GET /methodics/{id} - Полная информация по конкретной методичке
  async getMethodicsById(id: number): Promise<MethodicsDetails> {
    try {
      const response = await api.get<MethodicsDetails>(`/methodics/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting methodics ${id}:`, error);
      throw error;
    }
  }
};