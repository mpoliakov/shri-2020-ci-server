## Адаптивная вёрстка

Итоговые html и css файлы находятся в папке [build](build).

> - правильное использование БЭМ-сущностей
>   - какие части макета являются одним и тем же блоком?
>   - какие стили относятся к блокам, а какие к элементам и модификаторам?
>   - где нужно использовать каскады и почему?

По макетам выделил следующие блоки:

Общая разметка стрницы:
- header
- main
- footer

Так же добавил блок container, который отвечает за внутренние отступы и максимальную ширину контента. Миксуется к другим блокам разметки страницы.

Контентные блоки:
- btn
- heading
- icon (+ icon-wrapper для текста с иконкой)

Блоки контента конкретных страниц:
- placeholder (start-screen.html)
- build-settings (settings.html), который содержит form
- build-history
- build details

Блок build-card отвечает за информацию по конкретному билду и используется в build-history и build-details.

Стили конкретных блоков можно посмотреть в папке [src/scss/blocks](src/scss/blocks).

Там же содержатся стили для элементов блоков. Элементы выделял по принцину: если объект не может существовать отдельно от блока - это элемент, а так же использовал элементы, чтобы задать стили в рамках блока (н-р, отступы и выравнивание).

Модификаторы использовал для состояний блоков (чаще внешний вид и оформление).

В общем случае, можно обойтись без каскадов. Считаю уместным использовать каскад, если состояние внешнего блока влияет на внутренние блоки. Н-р, задать стили для кнопок или иконок внутри блока. Хотя тоже самое можно сделать с помощью модификаторов (на те же кнопки/иконки). Здесь скорее вопрос вкуса, и как сделать код проще, главное оценить не вызовет ли это проблемы в будущем при развитии и поддержке.

> - консистентность
>    - какие видите базовые и семантические константы?
>    - какие видите закономерности в интерфейсе?
    
Объявленные переменные можно найти в файле [variables](src/scss/includes/variables.scss).

Для себя выделил общие стили:
- палитра цветов
- стили текста
- стили границ, теней и фона

Так же важно соблюдать общий стиль в элементах управления:
- кнопки
- ссылки
- поля ввода
- состояния (hovered, focused и др.)
- иконки

А так же отступы, брейкпоинт и др. значения, которые переиспользуются в различных блоках.

Всё это придают интерфейсу консистентность.

> - адаптивность
>    - где видите вариативность данных и как это обрабатываете?
>    - какие видите особенности, связанные с размером экрана?
>    - что еще повлияло на вашу вёрстку?
   
Вариативность данных связана с информация о билдах - карточка билда.

В зависимости от размера экрана, можно пожертвовать частью информации (скрыть или сделать её менее заметной) в пользу удобства основных функций. Н-р, на кнопках с иконками скрывается текст в мобильном режиме.

*Примечания:*

В качестве breakpoint выбрал 768px (ширина iPad), принял как стандарт для мобильного устройства. Максимальная ширина контейнера на десктопе = 1024px, чтобы на широких экранах интерфейс не расплывался.

Цвета и размеры иконок разные, поэтому подготовил в svg и склеил в один спрайт, который поместил на страницы. Это позволило переиспользовать иконки, а так же задавать цвета и размеры с помощью CSS.

В предоставленных макетах нашёл много несоответствий. Н-р, много оттенков серого (цвета текста, иконки, где-то серый цвет задаётся через opacity). Есть несоответствия размеров блоков и отступов. По-хорошему, надо сесть с дизайнеров и обсудить. В данном случае принимал решения самостоятельно, с учётом того, чтобы сделать код чище и не плодить переменные.

Так же считаю, что в рамках БЭМ уместно задать общие стили, н-р, для body, a, img (см. файл [global.scss](src/scss/includes/global.scss)). На страницах подключил normalize с CDN, чтобы эти стили не попали в результирующий style.css, и было удобнее читать.

