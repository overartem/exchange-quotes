### Зібрано на Vite
------------------
## Available Scripts

In the project directory, you can run:

### `npm run dev` :tada:
or
### `npm run build`
or but before you have to run build || **Це команда для старту проекту на продукт білді** :exclamation:

### `npm run preview` 
# ТЗ

За натисканням кнопки Старт React Веб-інтерфейс підключається до емулятора котирувань за адресою
вебсокету wss://ваш сервер для отримання котирувань онлайн.
Після отримання кількості котирувань вказаного в полі потрібно розраховувати статистичні
значення: арифметичне середнє, стандартне відхилення, моду (при мультимодності
достатньо тільки одну моду), мінімальне значення, максимальне значення, кількість
втрачених котирувань якщо такі є, дата/час запуску розрахунків, час витрачений на
розрахунки, відправляє статистичні параметри на php бек для додавання запису до бд.
Інтерфейс продовжує розрахунки по ВСІМ отриманими даними тобто, дані НЕ обнуляються при
записі в бд, розрахунки ведуться за даними отриманими з моменту старту.
При натисканні кнопки "Статистика" відображає записи статистики з бд в веб-інтерфейс і останнім записом
додає поточні значення на момент натискання кнопки.
Отримані котирування не потрібно відображати, тільки статистичні величини.
Формат котирування json, поля : {id : id_котировки, value : значение_котировки}

## App Screenshots :eyes:

![Іллюстрація до проєкту](https://i.imgur.com/iFBQOGV.png)
![Іллюстрація до проєкту](https://i.imgur.com/QcGIb10.png)

