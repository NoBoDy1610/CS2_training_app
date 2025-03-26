# CS2 Training App

Witaj w **CS2 Training App** – aplikacji stworzonej z myślą o graczach Counter-Strike 2, którzy chcą poprawić swoje umiejętności i trenować jak profesjonaliści. Ten projekt ma na celu dostarczenie prostych, ale skutecznych narzędzi do treningu w CS2.

## O projekcie

**CS2 Training App** to aplikacja zaprojektowana, aby pomóc graczom w doskonaleniu ich umiejętności w grze Counter-Strike 2. Niezależnie od tego, czy jesteś początkującym, czy doświadczonym graczem, ta aplikacja oferuje funkcje wspierające Twój rozwój w grze.

### Główne funkcje
- **Tryb treningowy**: Ćwicz celność, refleks i strategie w kontrolowanym środowisku.
- **Personalizacja**: Dostosuj ustawienia do swojego stylu gry.
- **Statystyki**: Śledź swoje postępy i analizuj wyniki.
- **Wsparcie dla CS2**: Zoptymalizowane pod kątem najnowszej wersji gry.

## Instalacja

Aby rozpocząć korzystanie z aplikacji, postępuj zgodnie z poniższymi krokami. Aplikacja składa się z dwóch części: back-endu (serwer) i front-endu (interfejs użytkownika).

### Wymagania systemowe
1. **Back-end (część serwerowa)**:
   - Visual Studio Code w wersji co najmniej 1.96
   - Node.js w wersji co najmniej 22.11.0
2. **Front-end (część użytkownika)**:
   - Node.js w wersji co najmniej 20.11.0
3. **Przeglądarka internetowa**:
   - Dowolna nowoczesna przeglądarka obsługująca ECMAScript 6 i Fetch API, np. Chrome (80+), Edge (80+), Firefox (75+), Opera (67+), Safari (13+)

### Krok 1: Uruchomienie części back-endowej
1. Otwórz Visual Studio Code i załaduj projekt back-endowy.
2. Otwórz terminal w Visual Studio Code (Ctrl + ~ w Windows).
3. Przejdź do folderu projektu back-endowego:
   ```bash
   cd sciezka/do/folderu/backend

4. Zainstaluj wszystkie wymagane zależności:
   ```bash
   npm install
   ```
5. Uruchom aplikację back-endową:
   ```bash
   nodemon server.js
   ```
   Domyślnie back-end zacznie nasłuchiwać na porcie, np. `http://localhost:5000`. Informację o porcie znajdziesz w pliku konfiguracyjnym projektu (`.env` lub `server.js`).

### Krok 2: Uruchomienie części front-endowej
1. Otwórz terminal systemowy (np. Terminal, PowerShell, cmd).
2. Przejdź do folderu z kodem front-endowym:
   ```bash
   cd sciezka/do/folderu/frontend
   ```
3. Zainstaluj wszystkie wymagane zależności:
   ```bash
   npm install
   ```
4. Uruchom aplikację front-endową:
   ```bash
   npm start
   ```
   Domyślnie front-end zostanie uruchomiony na porcie `http://localhost:3000`.

### Krok 3: Użycie aplikacji
1. Otwórz przeglądarkę internetową.
2. Wpisz w pasku adresu:
   ```
   http://localhost:3000
   ```
3. Aplikacja front-endowa powinna komunikować się z back-endem za pomocą API pod adresem `http://localhost:5000`.

### Dodatkowe uwagi
- **Konfiguracja portów**: Jeśli back-end i front-end korzystają z różnych portów, upewnij się, że front-end wie, gdzie znajduje się back-end. W tym celu zaktualizuj adres URL back-endu w pliku `.env` lub w kodzie front-endu.
- **Debugowanie**:
  - Problemy z back-endem: Sprawdź logi wyświetlane w terminalu, w którym uruchamiasz serwer.
  - Problemy z front-endem: Sprawdź konsolę przeglądarki (DevTools > Console).
- **Współpraca back-endu i front-endu**: W przypadku problemów z komunikacją między back-endem a front-endem upewnij się, że:
  - Serwer back-endu jest uruchomiony i dostępny.
  - Adres API back-endu został poprawnie skonfigurowany w front-endzie.

## Contributing

Chcesz pomóc w rozwoju projektu? Wszystkie wkłady są mile widziane! Oto jak możesz się zaangażować:

1. **Sforkuj repozytorium**, wprowadź zmiany i wyślij Pull Request.

Prosimy o kontakt w razie pytań dotyczących współpracy.

## Kontakt

Masz pytania lub sugestie? Skontaktuj się ze mną:
- GitHub: [NoBoDy1610](https://github.com/NoBoDy1610)
- E-mail: nikodem_czubak@wp.pl

---

Dziękuję za zainteresowanie **CS2 Training App**! Trenuj ciężko i baw się dobrze w Counter-Strike 2!
```
