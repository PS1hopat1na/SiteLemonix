import Link from 'next/link';

export default function Policy() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 30, fontFamily: "'Segoe UI', Arial, sans-serif", lineHeight: 1.6, color: '#333' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <img src="/title.png" alt="Lemonix" style={{ height: 60 }} />
        <h1 style={{ color: '#ff9500', marginTop: 10 }}>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</h1>
      </div>

      {/* Version */}
      <div style={{ background: '#f8f9fa', padding: 12, borderRadius: 6, marginBottom: 25, textAlign: 'center', borderLeft: '4px solid #ff9500' }}>
        <strong>Версия 2.1 | Актуальна с 01.06.2025</strong>
      </div>

      {/* Contents */}
      <div style={{ background: '#fff4e6', padding: 20, borderRadius: 8, marginBottom: 35 }}>
        <h3 style={{ marginTop: 0, color: '#e67e00' }}>Содержание:</h3>
        <ul style={{ columns: 2, columnGap: 40, listStyleType: 'none', padding: 0 }}>
          {[1,2,3,4,5,6,7,8,9,10].map(i => (
            <li key={i} style={{ marginBottom: 6 }}>
              <a href={`#section${i}`} style={{ color: '#ff9500', textDecoration: 'none' }}>
                ► {i}. {[
                  'Основные термины',
                  'Объем собираемых данных',
                  'Цели обработки',
                  'Техническая защита',
                  'Cookies и метрики',
                  'Права субъектов данных',
                  'Третьи стороны',
                  'Хранение данных',
                  'Контакты DPO',
                  'Заключительные положения'
                ][i-1]}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Sections */}
      <section id="section1" style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#e67e00', borderBottom: '2px solid #ffe0b2', paddingBottom: 8 }}>1. Основные термины</h2>
        <p><strong>Lemonix</strong> (ООО "Лемоникс Технолоджи", ИНН 1234567890) — оператор персональных данных.</p>
        <p><strong>Персональные данные</strong> — любая информация, относящаяся к идентифицированному физическому лицу.</p>
        <p><strong>Обработка</strong> — любые действия с данными (сбор, хранение, анализ и т.д.).</p>
      </section>

      <section id="section2" style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#e67e00', borderBottom: '2px solid #ffe0b2', paddingBottom: 8 }}>2. Объем собираемых данных</h2>
        <p>При работе с нашим интернет-магазином мы можем обрабатывать:</p>
        <ul>
          <li><strong>Контактные данные:</strong> ФИО, телефон, email, адрес доставки</li>
          <li><strong>Платежная информация:</strong> данные карт (через защищенный шлюз CloudPayments)</li>
          <li><strong>Технические данные:</strong> IP-адрес, cookie, данные браузера</li>
          <li><strong>История покупок:</strong> заказы, просмотры товаров, возвраты</li>
        </ul>
      </section>

      <section id="section3" style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#e67e00', borderBottom: '2px solid #ffe0b2', paddingBottom: 8 }}>3. Цели обработки</h2>
        <p>Данные используются исключительно для:</p>
        <ul>
          <li>Оформления и выполнения договора купли-продажи</li>
          <li>Обеспечения гарантийного обслуживания</li>
          <li>Персонализации рекомендаций (на основе истории просмотров)</li>
          <li>Защиты от мошеннических действий</li>
        </ul>
      </section>

      <section id="section4" style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#e67e00', borderBottom: '2px solid #ffe0b2', paddingBottom: 8 }}>4. Техническая защита</h2>
        <p>Для защиты ваших данных Lemonix использует:</p>
        <ul>
          <li>SSL/TLS-шифрование для передачи информации</li>
          <li>Многоуровневую авторизацию доступа к базе данных</li>
          <li>Регулярные аудиты информационной безопасности</li>
          <li>Резервное копирование данных на защищённых серверах</li>
        </ul>
        <div style={{ background: '#fff8e1', padding: 15, borderRadius: 6, margin: '15px 0', borderLeft: '4px solid #ffc107' }}>
          <strong>Важно:</strong> Мы никогда не запрашиваем PIN-коды и пароли ваших карт.
        </div>
      </section>

      <section id="section5" style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#e67e00', borderBottom: '2px solid #ffe0b2', paddingBottom: 8 }}>5. Cookies и метрики</h2>
        <p>Мы используем cookies для:</p>
        <ul>
          <li>Авторизации и сохранения сессии пользователя</li>
          <li>Аналитики посещаемости через Яндекс.Метрику и Google Analytics</li>
          <li>Персонализации товаров и рекомендаций</li>
        </ul>
        <div style={{ background: '#fff8e1', padding: 15, borderRadius: 6, margin: '15px 0', borderLeft: '4px solid #ffc107' }}>
          <strong>Совет:</strong> Вы можете отключить cookies в настройках браузера, но часть функций сайта станет недоступна.
        </div>
      </section>

      <section id="section6" style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#e67e00', borderBottom: '2px solid #ffe0b2', paddingBottom: 8 }}>6. Права субъектов данных</h2>
        <ul>
          <li>Получать информацию о своих персональных данных</li>
          <li>Требовать их исправления или удаления</li>
          <li>Отозвать согласие на обработку (через <a href="mailto:dpo@lemonix.ru" style={{ color: '#ff9500' }}>dpo@lemonix.ru</a>)</li>
          <li>Обжаловать неправомерные действия Lemonix в Роскомнадзор</li>
        </ul>
        <div style={{ background: '#fff8e1', padding: 15, borderRadius: 6, margin: '15px 0', borderLeft: '4px solid #ffc107' }}>
          <strong>Внимание:</strong> После удаления аккаунта данные также удаляются из наших систем.
        </div>
      </section>

      <section id="section7" style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#e67e00', borderBottom: '2px solid #ffe0b2', paddingBottom: 8 }}>7. Третьи стороны</h2>
        <p>Мы не передаём ваши данные сторонним компаниям, кроме:</p>
        <ul>
          <li>Платёжных агрегаторов для обработки оплаты</li>
          <li>Курьерских служб для доставки заказов</li>
          <li>Государственных органов по закону</li>
        </ul>
        <p>Все партнеры подписывают соглашение о неразглашении и обязаны соблюдать нашу политику безопасности.</p>
      </section>

      <section id="section8" style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#e67e00', borderBottom: '2px solid #ffe0b2', paddingBottom: 8 }}>8. Хранение данных</h2>
        <p>Персональные данные хранятся на территории РФ не дольше, чем это требуется целями обработки и законом.</p>
        <ul>
          <li>Данные аккаунта — до удаления пользователем</li>
          <li>Данные по заказам — 5 лет согласно ФЗ-54</li>
          <li>Логи посещений — не более 12 месяцев</li>
        </ul>
        <div style={{ background: '#fff8e1', padding: 15, borderRadius: 6, margin: '15px 0', borderLeft: '4px solid #ffc107' }}>
          <strong>Пример:</strong> После удаления учётной записи ваши данные удаляются из наших серверов в течение 30 дней.
        </div>
      </section>

      <section id="section9" style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#e67e00', borderBottom: '2px solid #ffe0b2', paddingBottom: 8 }}>9. Контакты DPO (ответственного за данные)</h2>
        <p>По вопросам обработки данных обращайтесь:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:dpo@lemonix.ru" style={{ color: '#ff9500' }}>support@lemonix.ru</a></li>
          <li><strong>Телефон:</strong> +79501298861</li>
          <li><strong>Почтовый адрес:</strong> 115280, г. Иркутск, ул. Александра Невского, д. 6 ТЦ "Lemonix", 1 этаж</li>
        </ul>
      </section>

      <section id="section10" style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#e67e00', borderBottom: '2px solid #ffe0b2', paddingBottom: 8 }}>10. Заключительные положения</h2>
        <ul>
          <li>Политика может быть обновлена без предварительного уведомления</li>
          <li>Актуальная версия всегда доступна на сайте Lemonix</li>
          <li>Вопросы и предложения направляйте через форму обратной связи</li>
        </ul>
        <div style={{ background: '#fff8e1', padding: 15, borderRadius: 6, margin: '15px 0', borderLeft: '4px solid #ffc107' }}>
          <strong>Вступает в силу с 01.06.2025 и действует до публикации новой версии.</strong>
        </div>
      </section>

      {/* Signature */}
      <div style={{ marginTop: 50, textAlign: 'right', fontStyle: 'italic', position: 'relative' }}>
        <p>Генеральный директор ООО "Лемоникс Технолоджи"</p>
        <p>_________________ / А.И. Петров /</p>
        <div style={{ display: 'inline-block', position: 'relative', height: 70 }}>
          <span style={{ verticalAlign: 'top' }}>М.П.</span>
          <img src="/lemonix-stamp.png" alt="Печать Lemonix" style={{ height: 204, position: 'absolute', left: 30, top: -160, opacity: 0.75, pointerEvents: 'none' }} />
        </div>
      </div>
    </div>
  );
}
