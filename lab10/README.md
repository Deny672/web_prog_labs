# Лабораторна 10 - React.js

Один і той самий додаток (текст про хоббі) зроблено двома способами.
У кожному є **класова** компонента (`HobbyTitle`) і **функціональна**
компонента (`HobbyDetails`), які рендеряться по центру сторінки.

## 1. Підключення через CDN (тека `cdn/`)

React і ReactDOM підключені тегами `<script>` з unpkg, без збірки.
Просто відкрити `cdn/index.html` у браузері (або через локальний сервер,
напр. `python -m http.server`).

## 2. Через утиліту create-react-app (тека `cra/`)

Проєкт створено командою `npx create-react-app cra`, компоненти у `cra/src/`.

```
cd cra
npm install
npm start      # запуск дев-сервера на http://localhost:3000
npm run build  # збірка у теку build
```
