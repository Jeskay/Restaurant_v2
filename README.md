# Restaurant_v2
### Порядок установки
В основной директории создать файл .env со следующим содежимым
```
DATABASE_URL="АДРЕС_БАЗЫ_ДАННЫХ_POSTGRESQL"
SECRET_KEY="СЕКРЕТНЫЙ_КЛЮЧ_ДЛЯ_ХЕШИРОВАНИЯ"
CLOUD_NAME="ИМЯ_ОБЛАКА_CLOUDINARY"
CLOUDINARY_API_KEY="API_КЛЮЧ_ОБЛАКА_CLOUDINARY"
CLOUDINARY_API_SECRET="СЕКРЕТНЫЙ_КЛЮЧ_ОБЛАКА_CLOUDINARY"
```
Выполнить команды `yarn install` и `yarn migrate` для установки зависимостей и миграции базы данных.

Для запуска API выполнить команду `yarn start:watch` или последовательно `yarn build` и `yarn start`

Для запуска клиентского сервера в папке `client` выполнить команду `npm install` и `npm dev`

Приложение будет находится по адресу
http://127.0.0.1:8080/
