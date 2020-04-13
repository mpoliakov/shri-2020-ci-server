## School CI Server

### Запуск приложения

1) Версия `node.js` - 12.16.2, `npm` - 6.14.4
2) Cоздать файл `.env` в корневой папке и добавить значение `AUTH_TOKEN` (пример - [.env.example](.env.example)). JWT токен необходим для доступа к Backend API, получить его можно по адресу [https://hw.shri.yandex/](https://hw.shri.yandex/).
3) `npm i`
4) `npm start`
5) Открыть http://localhost:5000

### Запуск тестов

`npm test`

### Детали реализации:

#### Unit-тесты

Для тестирования использовал `jest`.

**Клиент:**

- Покрыл тестами редьюсеры: папка [reducer](src/client/reducer)

**Сервер:**

- [Backend API](src/server/backend/backend-api.test.js)
- Контроллер [buildController](src/server/controllers/build-controller.test.js)
- Контроллер [settingsController](src/server/controllers/settings-controller.test.js)

#### Snapshot-тесты

В дополнение к `jest` использовал `react-test-renderer`, `redux-mock-store`.

Компоненты, покрытые тестами:

- [BuildCard](src/client/components/Build/BuildCard/BuildCard.test.js)
- [PageBuildHistory](src/client/components/Pages/PageBuildHistory/PageBuildHistory.test.js)

#### Интеграционные тесты

Ещё в работе... Возникли проблемы с развёртыванием hermione для e2e-тестов.

