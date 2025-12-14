import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'admin';
  time: string;
}

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const heroSlides = [
    {
      id: 1,
      image: 'src/image/ред брик 2025.png',
      title: 'РЕД БРИК 2025',
      subtitle: 'Посвят для новеньких, вечеринка для всех',
      buttonText: '9 октября, VK Stadium'
    }
  ];

  const newsItems = [
    {
      id: 1,
      title: 'Роман Комаров рассказал о применении ИИ в образовании и преподавательской практике',
      excerpt: '24 сентября на сайте Социоцентра было опубликовано интервью с проректором МГПУ Романом Комаровым на тему применения ИИ в образовании и преподавательской практике',
      image: 'src/image/новости1.jpg',
      badge: 'Приоритеты-2030'
    },
    {
      id: 2,
      title: 'МГПУ вошел в число организаторов IX сезона Олимпиады «Я — профессионал»',
      excerpt: 'Университет вновь станет организатором направлений «Педагогическое образование (основное)», «Специальное (дефектологическое) образование» и «Классный руководитель»',
      image: 'src/image/новости2.jpg',
      badge: 'Университет'
    },
    {
      id: 3,
      title: 'Алина Апарина стала модераторомна Всемирном фестивале молодежи',
      excerpt: 'Преподаватель ИППО МГПУ провела 13 сессий на самом важном событии года среди молодежи со всего мира',
      image: 'src/image/новости3.jpg',
      badge: 'Город'
    },
    {
      id: 4,
      title: 'Именные стипендии Правительства Москвы для первокурсников',
      excerpt: 'До 29 сентября включительно принимаются заявки от студентов первого курса на участие в программе именных стипендиатов Правительства Москвы',
      image: 'src/image/новости4.jpg',
      badge: 'Конкурсы и стипендии'
    },
    {
      id: 5,
      title: 'МГПУ принял делегацию из Педагогического университета Шанцю',
      excerpt: 'В МГПУ состоялась встреча с представителями Педагогического университета Шанцю (КНР), в ходе которой стороны обсудили перспективы сотрудничества',
      image: 'src/image/новости5.jpg',
      badge: 'Международная деятельность'
    },
    {
      id: 6,
      title: 'Студентка МГПУ приняла участие в летней школе Академии «Меганом»',
      excerpt: 'Диана Пояркова руководила командой,разрабатывавшей визуальную концепцию для проекта «Кот в сапогах». Мероприятие в арт-кластере «Таврида» было посвящено 105-летию со дня рождения легендарного художника-мультипликатора Леонида Шварцмана',
      image: 'src/image/новости6.jpg',
      badge: 'Город'
    }
  ];

  const calendarEvents = [
    {
      id: 1,
      title: 'Спектакль студентов мастерской Олега Малахова «У лысой певицы все та же прическа»',
      date: '28.08.2024',
      time: '19:00',
      description: 'Приглашаем всех желающих в Театр-студию "Малахит" на открытый показ спектакля студентов 4 курса программы "Артист драматического театра и кино"',
      image: 'src/image/календарь1.jpg'
    },
    {
      id: 2,
      title: 'Мастер-класс по работе с Obsidian',
      date: '05.09.2024',
      time: '16:00',
      description: 'Онлайн мастер-класс по использованию Obsidian в организации научной работы, хобби и развлечениях',
      image: 'src/image/календарь2.jpg'
    },
    {
      id: 3,
      title: 'Открытый показ спектакля «Пир мудрецов» студентов мастерской Олега Малахова',
      date: '07.09.2024',
      time: '18:00',
      description: 'Приглашаем всех желающих в Театр-студию "Малахит" 27 сентября в 18:00 на открытый показ спектакля студентов 4 курса программы "Артист драматического театра и кино" мастерской Олега Малахова',
      image: 'src/image/календарь3.jpg'
    },
    {
      id: 4,
      title: 'Всероссийская акция «СТУДзаБЕГ — 2025»',
      date: '23.09.2024',
      time: '10:00',
      description: 'Соревнования в формате массовых забегов на дистанциях 3 и 5 км пройдут 27 сентября в Измайловском парке',
      image: 'src/image/календарь4.jpg'
    },
    {
      id: 5,
      title: 'Поездка ветеранов в г. Боровск',
      date: '05.10.2024',
      time: '12:00',
      description: '27 сентября состоится поездка представителей ветеранской организации, активных участников благотворительных сборов и патриотических акций в г.Боровск',
      image: 'src/image/календарь5.jpg'
    }
  ];

  const galleryItems = [
    {
      id: 1,
      image: 'src/image/фотогал1.jpg',
      title: 'Фотогалерея 1'
    },
    {
      id: 2,
      image: 'src/image/фотогал2.jpg',
      title: 'Фотогалерея 2'
    },
    {
      id: 3,
      image: 'src/image/фотогал3.jpg',
      title: 'Фотогалерея 3'
    },
    {
      id: 4,
      image: 'src/image/фотогал4.jpg',
      title: 'Фотогалерея 4'
    },
    {
      id: 5,
      image: 'src/image/фотогал5.jpg',
      title: 'Фотогалерея 5'
    }
  ];

  const videoItems = [
    {
      id: 1,
      thumbnail: 'src/image/видеоблог1.jpg',
      title: 'КЛТМС ФЕСТ',
    },
    {
      id: 2,
      thumbnail: 'src/image/видеоблог2.jpg',
      title: 'Образовательный форум МГПУ в центре знаний "Машук"',
    },
    {
      id: 3,
      thumbnail: 'src/image/видеоблог3.jpg',
      title: 'Яна Чурикова о Тотальном диктанте 2025',
    },
    {
      id: 4,
      thumbnail: 'src/image/видеоблог4.png',
      title: 'День открытых дверей',
    },
    {
      id: 5,
      thumbnail: 'src/image/видеоблог5.png',
      title: 'Церемония объявление ларуиатов примии "Люди МГПУ"',
    }
  ];

  const partners = [
    'src/image/герб1.png',
    'src/image/герб2.png',
    'src/image/герб3.png',
    'src/image/герб4.png',
    'src/image/герб5.png'
  ];

  const getBadgeStyle = (badgeText: string) => {
    switch (badgeText) {
      case 'Приоритеты-2030':
        return 'bg-priority-red text-white';
      case 'Университет':
        return 'bg-university-red2 text-white';
      case 'Город':
        return 'bg-city-grey text-white';
      case 'Конкурсы и стипендии':
        return 'bg-contest-blue text-white';
      case 'Международная деятельность':
        return 'bg-international-green text-white';
      default:
        return 'bg-primary text-white';
    }
  };

  // Функция для перехода в бота
  const goToBot = () => {
    navigate('/bot');
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      <section className="relative">
        <div className="relative h-[700px] bg-cover bg-center" style={{ backgroundImage: `url('${heroSlides[currentSlide].image}')` }}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{heroSlides[currentSlide].title}</h1>
            <p className="text-xl mb-4">{heroSlides[currentSlide].subtitle}</p>
            <p className="text-lg mb-8">9 октября. VK Stadium</p>
            <Button size="lg" className="bg-transparent text-white hover:bg-white/20 border-2 border-white">
              Узнать подробнее
            </Button>
          </div>
        </div>

        {/* Логотип для перехода в бота - простой img с вашей SVG */}
        <button
          onClick={goToBot}
          className="absolute bottom-8 left-8 p-0 border-0 bg-transparent cursor-pointer hover:opacity-90 transition-opacity"
          title="Перейти в ИИ-помощника"
        >
          <img 
            src="src/image/logo.svg" 
            alt="ИИ-помощник" 
            className="w-26 h-26"
          />
        </button>

        <div className="bg-white py-6">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="flex space-x-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">ГЛАВНЫЕ НОВОСТИ</h2>
            <a href="#" className="text-primary hover:underline text-sm font-medium flex items-center">
              ВСЕ НОВОСТИ <Icon name="ChevronRight" size={16} className="ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  {item.badge && (
                    <div className={`absolute top-3 left-3 px-3 py-1 ${getBadgeStyle(item.badge)} rounded-none text-xs font-medium`}>
                      {item.badge}
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{item.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Календарь событий</h2>
            <a href="#" className="text-primary hover:underline text-sm font-medium flex items-center">
              ВСЕ СОБЫТИЯ <Icon name="ChevronRight" size={16} className="ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {calendarEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-bold text-sm mb-2 line-clamp-2">{event.title}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Icon name="Calendar" size={12} className="mr-1" />
                    {event.date}
                    <Icon name="Clock" size={12} className="ml-2 mr-1" />
                    {event.time}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-200 rounded">
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded">
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Фотогалерея</h2>
            <a href="#" className="text-primary hover:underline text-sm font-medium flex items-center">
              ВСЕ ФОТО <Icon name="ChevronRight" size={16} className="ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {galleryItems.map((item) => (
              <div key={item.id} className="relative aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-200 rounded">
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded">
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Видеоблог</h2>
            <a href="#" className="text-primary hover:underline text-sm font-medium flex items-center">
              ВСЕ ВИДЕО <Icon name="ChevronRight" size={16} className="ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Icon name="Play" size={28} className="text-primary ml-1" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-200 rounded">
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded">
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-12">
            {partners.map((partner, index) => (
              <img key={index} src={partner} alt={`Partner ${index + 1}`} className="h-20 object-contain" />
            ))}
          </div>
        </div>
      </section>

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
              © РЕД БРИК 2025 | <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
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

export default Index;