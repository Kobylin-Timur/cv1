import { useState, useEffect, useRef } from 'react';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="min-h-screen relative">
      <div className="bg-decoration"></div>

      <button
        className="theme-toggle no-print"
        onClick={() => setIsDark(!isDark)}
        title={isDark ? 'Светлая тема' : 'Тёмная тема'}
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <header
          id="header"
          ref={registerRef('header')}
          className={`text-center mb-12 ${isVisible('header') ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-4xl mb-4 animate-float shadow-lg shadow-blue-500/20">
              👋
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
            <span className="gradient-text">Тимур Кобылин</span>
          </h1>
          <p className="text-xl sm:text-2xl font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>
            🚀 Сетевой инженер | Системный администратор
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span className="badge">📍 Верхняя Пышма / Екатеринбург</span>
            <span className="badge">💼 Full-time / Hybrid / Remote</span>
            <span className="badge">💰 от 110 000 ₽</span>
          </div>
        </header>

        {/* Contacts */}
        <section id="contacts" ref={registerRef('contacts')} className={`mb-10 ${isVisible('contacts') ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          <div className="section-heading"><span className="icon">📞</span><span>Контакты</span></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="mailto:kobylin.timur@gmail.com" className="contact-link">
              <span className="text-xl">📧</span>
              <div><div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Email</div><div className="font-medium">kobylin.timur@gmail.com</div></div>
            </a>
            <a href="https://t.me/kobylin_t" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="text-xl">💬</span>
              <div><div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Telegram (предпочтительно)</div><div className="font-medium">@kobylin_t</div></div>
            </a>
            <a href="tel:+79655079377" className="contact-link">
              <span className="text-xl">📱</span>
              <div><div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Телефон</div><div className="font-medium">+7 (965) 507-93-77</div></div>
            </a>
            <div className="contact-link" style={{ cursor: 'default' }}>
              <span className="text-xl">🚗</span>
              <div><div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Авто</div><div className="font-medium">Права кат. B, личный авто</div></div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" ref={registerRef('about')} className={`mb-10 ${isVisible('about') ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <div className="section-heading"><span className="icon">📌</span><span>Обо мне</span></div>
          <div className="card">
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Опытный сетевой инженер с практическими навыками администрирования инфраструктуры и управления командами. 
              Имею успешный опыт развёртывания ЦОД, настройки сетевого оборудования L2–L3 и сопровождения монтажных работ. 
              Умею эффективно решать инциденты, оптимизировать процессы и координировать работу групп специалистов. 
              Стремлюсь к развитию в области сетевой инфраструктуры, готов применять знания для повышения надёжности 
              и производительности ИТ-систем.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" ref={registerRef('skills')} className={`mb-10 ${isVisible('skills') ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <div className="section-heading"><span className="icon">🛠</span><span>Технические навыки</span></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="card">
              <h3 className="font-semibold text-base mb-3 flex items-center gap-2"><span>🌐</span> Сети и инфраструктура</h3>
              <div className="flex flex-wrap gap-2">
                <span className="skill-badge">Маршрутизация L2-L3</span><span className="skill-badge">СКС</span>
                <span className="skill-badge">Wi-Fi / BYOD</span><span className="skill-badge">Тестирование ПО</span>
                <span className="skill-badge">Huawei</span><span className="skill-badge">Cisco</span>
              </div>
            </div>
            <div className="card">
              <h3 className="font-semibold text-base mb-3 flex items-center gap-2"><span>⚙️</span> Системное администрирование</h3>
              <div className="flex flex-wrap gap-2">
                <span className="skill-badge">Active Directory</span><span className="skill-badge">MS Exchange</span>
                <span className="skill-badge">Почтовые серверы</span><span className="skill-badge">Админ. ЛВС</span>
                <span className="skill-badge">Диагностика</span><span className="skill-badge">Логи</span>
              </div>
            </div>
            <div className="card">
              <h3 className="font-semibold text-base mb-3 flex items-center gap-2"><span>💻</span> Разработка и БД</h3>
              <div className="flex flex-wrap gap-2">
                <span className="skill-badge">Git</span><span className="skill-badge">SQL</span>
                <span className="skill-badge">HTML / CSS</span><span className="skill-badge">JavaScript</span>
                <span className="skill-badge">Автоматизация</span>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="font-semibold text-base mb-3 flex items-center gap-2"><span>🤝</span> Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              <span className="skill-badge">Управление командой</span><span className="skill-badge">Деловая коммуникация</span>
              <span className="skill-badge">Работа с подрядчиками</span><span className="skill-badge">Стрессоустойчивость</span>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" ref={registerRef('experience')} className={`mb-10 ${isVisible('experience') ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          <div className="section-heading"><span className="icon">💼</span><span>Опыт работы <span className="text-sm font-normal" style={{ color: 'var(--text-secondary)' }}>(5 лет 3 месяца)</span></span></div>
          <div className="space-y-6">
            <div className="timeline-item"><div className="card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-bold">🏢 РДП.РУ <span className="font-normal text-sm" style={{ color: 'var(--text-secondary)' }}>(Москва)</span></h3>
                <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-light)' }}>Март 2026 — Настоящее время</span>
              </div>
              <p className="font-semibold mb-3" style={{ color: 'var(--accent-light)' }}>Сетевой инженер-тестировщик</p>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span>Интеграционное тестирование программного обеспечения сетевого оборудования.</li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span>Выявление и документирование багов на ранних этапах разработки ПО.</li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span>Проведение тестирований по тестовым сценариям и тест-кейсам.</li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span>Составление подробных отчетов о результатах тестирования.</li>
              </ul>
            </div></div>

            <div className="timeline-item"><div className="card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-bold">🏢 ИТ-Элемент <span className="font-normal text-sm" style={{ color: 'var(--text-secondary)' }}>(Екатеринбург)</span></h3>
                <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-light)' }}>Март 2024 — Март 2026</span>
              </div>
              <p className="font-semibold mb-3" style={{ color: 'var(--accent-light)' }}>Ведущий специалист отдела ИТ</p>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span>Администрирование ЛВС, Active Directory и MS Exchange.</li>
              </ul>
              <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                <p className="text-sm font-medium" style={{ color: '#4ade80' }}>🏆 Достижения: Полностью актуализировал документацию по сетевой инфраструктуре организации. Организовал выделенные Wi-Fi сети для спецзадач, включая внедрение системы BYOD.</p>
              </div>
            </div></div>

            <div className="timeline-item"><div className="card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-bold">🏢 Сбер <span className="font-normal text-sm" style={{ color: 'var(--text-secondary)' }}>(Екатеринбург)</span></h3>
                <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-light)' }}>Март 2022 — Сентябрь 2023</span>
              </div>
              <p className="font-semibold mb-3" style={{ color: 'var(--accent-light)' }}>Старший инженер</p>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span>Настройка, диагностика и анализ работы сетевого оборудования L2–L3.</li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span>Устранение сетевых инцидентов, работа с логами и оборудованием.</li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span>Контроль подрядчиков, организация монтажных работ и замена оборудования.</li>
              </ul>
              <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                <p className="text-sm font-medium" style={{ color: '#4ade80' }}>🏆 Достижения: Успешно и в сжатые сроки развернул ЦОД. Участвовал в развёртывании сетевой инфраструктуры на стендах «Иннопрома». Провел модернизацию инфраструктуры (миграция с Cisco на Huawei).</p>
              </div>
            </div></div>

            <div className="timeline-item"><div className="card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-bold">🏢 ООО "Миралоджик СМ" <span className="font-normal text-sm" style={{ color: 'var(--text-secondary)' }}>(Екатеринбург)</span></h3>
                <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-light)' }}>Март 2021 — Март 2022</span>
              </div>
              <p className="font-semibold mb-3" style={{ color: 'var(--accent-light)' }}>Инженер технической поддержки</p>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span>Поддержка, диагностика и устранение неисправностей клиентских сервисов (интернет, ТВ, приложения, оборудование).</li>
              </ul>
            </div></div>
          </div>
        </section>

        {/* Education */}
        <section id="education" ref={registerRef('education')} className={`mb-10 ${isVisible('education') ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
          <div className="section-heading"><span className="icon">🎓</span><span>Образование</span></div>
          <div className="space-y-4">
            <div className="card"><div className="flex items-start gap-3">
              <span className="text-2xl">🎓</span>
              <div>
                <h3 className="font-bold text-base">Высшее (в процессе)</h3>
                <p className="font-medium text-sm" style={{ color: 'var(--accent-light)' }}>Уральский государственный экономический университет (УрГЭУ), Екатеринбург</p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>📌 Программное обеспечение вычислительной техники и автоматизированных систем</p>
                <p className="text-xs mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>Ожидаемый выпуск: 2027</p>
              </div>
            </div></div>
            <div className="card"><div className="flex items-start gap-3">
              <span className="text-2xl">🎓</span>
              <div>
                <h3 className="font-bold text-base">Среднее специальное</h3>
                <p className="font-medium text-sm" style={{ color: 'var(--accent-light)' }}>Екатеринбургский экономико-технологический колледж</p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>📌 Техник по компьютерным системам и комплексам</p>
                <p className="text-xs mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>Выпуск: 2020</p>
              </div>
            </div></div>
          </div>
        </section>

        {/* Current */}
        <section id="current" ref={registerRef('current')} className={`mb-10 ${isVisible('current') ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <div className="section-heading"><span className="icon">⚙️</span><span>Сейчас я работаю над</span></div>
          <div className="card">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}>1</span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Углублением знаний в области автоматизации сетевых процессов.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}>2</span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Изучением новых подходов к интеграционному тестированию сетевого ПО.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}>3</span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Оптимизацией архитектуры корпоративных ЛВС.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
            Спасибо, что заглянули в мой профиль! Открыт к интересным проектам и сотрудничеству. ✨
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="mailto:kobylin.timur@gmail.com" className="contact-link text-sm" style={{ padding: '0.5rem 1rem' }}>📧 Email</a>
            <a href="https://t.me/kobylin_t" target="_blank" rel="noopener noreferrer" className="contact-link text-sm" style={{ padding: '0.5rem 1rem' }}>💬 Telegram</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
