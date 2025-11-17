# ⏱️ Pomodoro Timer

> **Focus redefined.**

Minimalistyczny timer Pomodoro z powiadomieniami push.

---

## 🎯 Features

### Core Functionality
- **25/5/15 Timer** - Klasyczny Pomodoro (25 min praca, 5 min krótka przerwa, 15 min długa przerwa)
- **Push Notifications** - Powiadomienia na pulpicie po zakończeniu sesji
- **Dynamic Theme** - Automatyczna zmiana tła (szary → czarny podczas pracy)
- **Session Counter** - Śledzenie liczby ukończonych sesji
- **Auto Mode Switch** - Inteligentne przełączanie między pracą a przerwami

### UI/UX
- Płynne animacje i przejścia
- Efekt glassmorphism na kartach
- Animacje hover i pulse
- Responsywny design
- Minimalistyczny interfejs

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Struktura semantyczna
- **Tailwind CSS** - Stylizacja oparta na użyteczności poprzez CDN
- **Vanilla JavaScript (ES6+)** - Logika timera i powiadomienia
- **Notifications API** - Desktop push notifications

### Architektura
- Tylko po stronie klienta - nie wymaga backendu
- Synchronizacja localStorage dla utrzymania sesji
- Obsługa timera w tle (przełączanie kart)

---

## 📁 Struktura projektu

```
pomodoro-timer/
├── index.html              # Główny HTML z Tailwind
├── script.js               # Logika timera i powiadomienia
└── README.md               # Czytasz to teraz
```

---

## 🚀 Installation & Setup

### Local Usage

1. **Clone or download the project**
   ```bash
   git clone <repo-url>
   cd pomodoro-timer
   ```

2. **Run locally**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js
     npx http-server
     ```

3. **Access the app**
   ```
   http://localhost:8000
   ```

4. **Allow notifications**
   - Click "Start" and accept browser notification permission
   - Notifications work even when tab is inactive

---

## 🎨 Design System

### Paleta kolorów
- **Default:** `#3f3f46` → `#52525b` - Zinc gradient (zinc-700/600)
- **Work Mode:** `#000000` → `#0a0a0a` - Deep black gradient
- **Glass Effect:** `rgba(255, 255, 255, 0.1)` with backdrop blur
- **Text:** White with varying opacity

### Animacje
- Efekt pulsującego pierścienia na okręgu timera
- Animacja unoszenia się tytułu
- Płynne pojawianie się podczas ładowania
- Przejścia po najechaniu kursorem na przyciski
- Przejścia tła z efektem ease-in-out trwające 0.8 s

### Zasady interfejsu użytkownika
- Domyślny tryb ciemny
- Minimalistyczny, nie rozpraszający uwagi wygląd
- Płynne mikroanimacje
- Podejście „najpierw komputer stacjonarny”

---

## 🎯 Przykłady zastosowań

**Dla programistów:**
- Zachowaj koncentrację podczas sesji kodowania
- Zapobiegaj wypaleniu zawodowemu dzięki regularnym przerwom
- Śledź dzienną produktywność (licznik sesji)

**Dla studentów:**
- Strukturyzuj sesje nauki
- Buduj konsekwentne nawyki pracy
- Zachowaj koncentrację podczas nauki

**Dla pracowników zdalnych:**
- Zarządzanie czasem przeznaczonym na zadania
- Regularne przypomnienia o przerwach
- Lepsza równowaga między życiem zawodowym a prywatnym

---

## 📄 License

© 2025. Wszelkie prawa zastrzeżone.

---

## 📞 Contact

- **Project:** Pomodoro Timer
- **Developer:** wavvocean
- **GitHub:** [github.com/wavvocean](https://github.com/wavvocean)
- **E-Mail:** wavvocean@icloud.com

---

**Built with ❤️ for better focus and productivity**