import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { chatApi, ChatRequest, MethodicsItem } from '@/api/chatApi';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  methodics?: MethodicsItem[]; // Добавляем методички к сообщениям бота
}

const Bot = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [suggestedQuestions] = useState([
    'Как подать заявку на трудодостройство?',
    'Как поступить в МГПУ?',
    'Где можно найти учебный план?',
    'Как получить справку об обучении?',
    'График учебного процесса',
    'Стипендии и выплаты'
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: 'Привет! Я чат-бот ИИ помощник. Ты можешь задать мне любой вопрос, а я на него отвечу.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Удаляем старую функцию getBotResponse, теперь используем API

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Подготавливаем запрос к API
      const chatRequest: ChatRequest = {
        question: inputValue,
        max_results: 5,
        full: false
      };

      // Отправляем запрос на бэкенд
      const response = await chatApi.sendQuestion(chatRequest);

      const botMessage: Message = {
        id: messages.length + 2,
        sender: 'bot',
        text: response.answer,
        methodics: response.methodics,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Обработка ошибок API
      console.error('API Error:', error);
      
      const errorMessage: Message = {
        id: messages.length + 2,
        sender: 'bot',
        text: 'Извините, произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте позже или задайте вопрос по-другому.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

 /*  // Функция для ручного поиска методичек (например, для админ-панели)
  const searchMethodics = async (query: string) => {
    try {
      const response = await chatApi.searchMethodics(query, 10);
      console.log('Search results:', response);
      // Здесь можно обработать результаты поиска
      return response;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  };

  // Функция для получения деталей методички
  const getMethodicsDetails = async (id: number) => {
    try {
      const methodics = await chatApi.getMethodicsById(id);
      console.log('Methodics details:', methodics);
      // Здесь можно показать детали в модальном окне или отдельной странице
      return methodics;
    } catch (error) {
      console.error('Methodics details error:', error);
      throw error;
    }
  }; */

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleOpenAdminPanel = () => {
    setShowAdminLogin(true);
  };

  const handleAdminLogin = async () => {
    if (!adminCredentials.email || !adminCredentials.password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    setIsLoggingIn(true);
    
    // Имитация запроса на сервер
    setTimeout(() => {
      // Проверка email (должен содержать mgpu.ru)
      if (!adminCredentials.email.endsWith('@mgpu.ru')) {
        alert('Доступ разрешен только с корпоративной почты МГПУ');
        setIsLoggingIn(false);
        return;
      }

      // Проверка пароля (в реальном приложении проверка на сервере)
      if (adminCredentials.password.length < 6) {
        alert('Неверный логин или пароль');
        setIsLoggingIn(false);
        return;
      }

      // Успешный вход
      alert(`Вход выполнен успешно!\nДобро пожаловать, ${adminCredentials.email}`);
      setShowAdminLogin(false);
      setAdminCredentials({ email: '', password: '' });
      setIsLoggingIn(false);
      
      // В реальном приложении здесь будет редирект на админ-панель
      // navigate('/admin/dashboard');
    }, 1500);
  };

  const handleCloseAdminLogin = () => {
    setShowAdminLogin(false);
    setAdminCredentials({ email: '', password: '' });
  };

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateAccount = () => {
    alert('Функция создания учетной записи администратора доступна только через IT-отдел университета');
  };

  const handleRecoverAccount = () => {
    alert('Для восстановления доступа обратитесь в IT-отдел университета');
  };

  // Функция для отображения методичек под ответом
  const renderMethodicsList = (methodics: MethodicsItem[]) => {
    if (!methodics || methodics.length === 0) return null;

    return (
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="text-xs font-medium text-gray-600 mb-2">
          Использованные источники ({methodics.length}):
        </div>
        <div className="space-y-2">
          {methodics.map((item, index) => (
            <div 
              key={item.id || index} 
              className="text-xs p-2 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div className="font-medium text-gray-800">{item.title}</div>
              {item.fragment && (
                <div className="text-gray-600 mt-1 line-clamp-2">{item.fragment}</div>
              )}
              {item.relevance_score && (
                <div className="text-gray-500 text-[10px] mt-1">
                  Релевантность: {Math.round(item.relevance_score * 100)}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay с формой входа администратора - самый высокий z-index */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Вход для администратора</h2>
              <button
                onClick={handleCloseAdminLogin}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <span className="text-xl font-bold">×</span>
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleAdminLogin(); }}>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                    ЛОГИН *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@mgpu.ru"
                    value={adminCredentials.email}
                    onChange={handleCredentialsChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Используйте корпоративную почту МГПУ
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
                    ПАРОЛЬ *
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="**********"
                    value={adminCredentials.password}
                    onChange={handleCredentialsChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-colors"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Вход...
                    </div>
                  ) : 'Войти'}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleCreateAccount}
                  className="text-sm text-gray-600 hover:text-primary transition-colors text-center"
                >
                  Создать учетную запись
                </button>
                <button
                  onClick={handleRecoverAccount}
                  className="text-sm text-gray-600 hover:text-primary transition-colors text-center"
                >
                  Восстановить учетную запись
                </button>
              </div>
              
              <div className="mt-6 text-xs text-gray-500 text-center">
                <p>Доступ к панели администратора предоставляется</p>
                <p>сотрудникам МГПУ по запросу в IT-отдел</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 text-xs">
            <div className="flex items-center space-x-6 text-gray-700 font-medium">
              <a href="#" className="hover:text-gray-900 transition-colors">СТУДЕНТАМ</a>
              <a href="#" className="hover:text-gray-900 transition-colors">СОТРУДНИКАМ</a>
              <a href="#" className="hover:text-gray-900 transition-colors">ВЫПУСКНИКАМ</a>
              <button className="hover:text-gray-900 transition-colors">
                <Icon name="User" size={16} />
              </button>
            </div>
            <div className="flex items-center space-x-6 text-gray-700">
              <Icon name="Accessibility" size={18} />
              <a href="#" className="hover:text-gray-900 transition-colors font-medium">НОВОСТИ</a>
              <a href="#" className="hover:text-gray-900 transition-colors font-medium">СОБЫТИЯ</a>
              <button className="hover:text-gray-900 transition-colors font-medium">ENG</button>
              <button className="hover:text-gray-900 transition-colors font-medium">中文</button>
              <button className="hover:text-gray-900 transition-colors font-medium">ESP</button>
              <Icon name="Search" size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-5">
            <img src="src/image/МГПУ.svg" alt="МГПУ" className="h-20" />
            <nav className="flex space-x-8 text-sm font-bold text-gray-900">
              <a href="#" className="hover:text-primary transition-colors">АБИТУРИЕНТАМ</a>
              <a href="#" className="hover:text-primary transition-colors">ОБ УНИВЕРСИТЕТЕ</a>
              <a href="#" className="hover:text-primary transition-colors">ОБРАЗОВАНИЕ</a>
              <a href="#" className="hover:text-primary transition-colors">НАУКА</a>
              <a href="#" className="hover:text-primary transition-colors">КУЛЬТУРА</a>
              <a href="#" className="hover:text-primary transition-colors">СПОРТ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Bot Content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ИИ помощник ментора МГПУ</h1>
              <p className="text-gray-600">Задайте вопрос, я помогу с учебными вопросами</p>
            </div>
          </div>
          
          {/* Правая часть с крестиком и иконкой администратора */}
          <div className="flex items-center gap-3">
            {/* Крестик для возврата на главную */}
            <button
              onClick={handleBackToHome}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
              title="Вернуться на главную"
            >
              <span className="text-xl font-bold">×</span>
            </button>
            
            {/* Иконка личного кабинета администратора */}
            <button
              onClick={handleOpenAdminPanel}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
              title="Личный кабинет администратора"
            >
              <div className="relative w-5 h-5">
                <div className="absolute inset-0 border border-gray-600 rounded-[3px]"></div>
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-[1.5px] bg-gray-600 rounded-full"></div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-[1.5px] bg-gray-600 rounded-full"></div>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Chat Container - теперь на всю ширину */}
          <Card className="h-[600px] flex flex-col">
            <CardContent className="flex-1 overflow-hidden p-0">
              {/* Messages */}
              <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[440px] rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <div className="text-xs text-gray-600 mb-1 font-medium">ИИ Помощник</div>
                      )}
                      <div className="whitespace-pre-line text-sm">{message.text}</div>
                      
                      {/* Отображаем список методичек под ответом бота */}
                      {message.sender === 'bot' && message.methodics && 
                        renderMethodicsList(message.methodics)
                      }
                      
                      <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                        {message.time}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[440px] rounded-2xl px-4 py-3 bg-gray-100">
                      <div className="text-xs text-gray-600 mb-1 font-medium">ИИ Помощник</div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions - без заголовка */}
              <div className="border-t p-4">
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Введите ваш вопрос..."
                    className="w-full border border-gray-300 rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <Icon name="ArrowRight" size={20} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Нажмите Enter или стрелку для отправки
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Полезные ссылки</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">УСЛОВИЯ УЧЕБЫ ОБУЧЕНИЯ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">ПЕРСОНАЛЬНАЯ ИНФОРМАЦИЯ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">БАЗОВАЯ КАФЕДРА</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">ВЫБИРАЕМ СТРУКТУРУ СПОРТ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">ПЛАТФОРМА</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">РЕЕСТР УНИВЕРСИТЕТА</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Сотрудникам</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">УНИВЕРСИТЕТ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">ЦЕНТРЫ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">ДЕБЮТ СТУДИЯ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">ПРОФСОЮЗНАЯ ДЕЯТЕЛЬНОСТЬ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">СТУДЕНЧЕСКИЕ МЕРОПРИЯТИЯ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">СТУДЕНТ+МАГНАТ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Социальные сети</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">ОФИЦИАЛЬНЫЕ СОЦСЕТИ СТОЛБСТВО</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">ТЕЛЕГРАММ ВИД+</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">ДЕБЮТАНСКАЯ СТУДИЯ ВК</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">INSTAGRAM СТУДИЯ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">TELEGRAM КАНАЛ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">ВКОНТАКТЕ КАНАЛ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 flex items-center justify-between text-sm">
            <div className="text-gray-400">
              © МГПУ 2024 | <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Bot;