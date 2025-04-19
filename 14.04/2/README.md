Создание проекта Node.js

Откройте терминал или командную строку.
Перейдите в папку, где вы хотите создать проект.
Запустите команду `npm init -y`, чтобы создать новый проект Node.js. Это создаст файл `package.json`.

Настройка package.json

Настройте "type": "module"` в package.json для использования import.

Установка зависимостей

В том же терминале выполните команду `npm install express sequelize sequelize-cli mysql2`. Эта команда установит все необходимые пакеты:
Express для создания сервера.
Sequelize для работы с базой данных.
Sequelize CLI для автоматизации задач.
MySQL2 для подключения к базе данных MySQL.

Инициализация Sequelize

После установки зависимостей выполните команду `npx sequelize-cli init`.

Настройка Express

Создайте файл `app.js` в корне вашего проекта.
Внутри `app.js`:
Подключите Express.
Создайте простой сервер, который будет отвечать на запросы.
Убедитесь, что сервер запускается и работает корректно.

Настройка MySQL и config.

Откройте MySQL Workbench.

Откройте существующее подключение, либо же создайте новое.

Создайте "database_development"`, `"database_test"` и `"database_production"` базы данных.

Отредактируйте config.json файл в папке config в соответствии с вашими данными.


 создаем express сервер
7. Создаем подключение к бд - db.js
import { Sequelize } from 'sequelize'
import configData from './config.json' assert {type: 'json'} 
//явно указать что работает с json
const env = process.env.NODE_ENV || 'development'
const config = configData[env]
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect
    }
)
export default sequelize
8. Подключаем к серверу созданную БД
9. Создаем модель, например, пользователя
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define('User', {
    //Если хотите добавить какое то поле в таблицу, необходимо описать желаемое поле в данном объекте
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //Например, хотим добавить поле username, надо описать его тип, может ли он быть null и тд
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Users',
    timestamps: false
})

export default User

Создание модели `Product`

Создание файла для модели:

В папке `models`, которую вы создали ранее, создайте новый файл для модели. Назовите его, например, `product.js`. Этот файл будет содержать описание модели `Product`, представляющей товары или услуги в вашем приложении.

Импорт необходимых модулей:

В файле `product.js` импортируйте модули `DataTypes` из пакета `sequelize` и ваш экземпляр `sequelize` из файла `db.js`. Эти модули понадобятся для определения структуры модели и её подключения к базе данных.

Определение модели `Product`:

В файле `product.js` создайте модель `Product`, используя метод `sequelize.define`. Эта модель будет соответствовать таблице `Products` в базе данных.
Определите поля (столбцы) модели, например: `name` (название продукта), `price` (цена продукта) и `description` (описание продукта).
Укажите типы данных для каждого поля и установите, какие из них обязательны для заполнения, а какие могут быть уникальными или иметь значения по умолчанию.

10. Создаем миграцию 
npx sequelize-cli migration:generate --name create-user-table
11. Переименовываем расширение файла миграции с .js на .cjs в случае если вы используете type: module
12. Настраиваем миграционный файл, где функция queryInterface позволяет нам получить доступ к интерфейсу, с помощью которого мы создаем таблицу и мигрируем таблицу со всеми описанными полями в БД, к которой реализовано подключение
ПРИМЕР:
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
};

13. npx sequelize-cli db:migrate

