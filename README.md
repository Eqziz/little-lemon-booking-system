# Meta Back-End Developer Capstone - Little Lemon Web Application

**Author**: Mukhammedov Nodir Shavkatovich  
**GitHub**: [@Eqziz](https://github.com/Eqziz)  
**Course**: Meta Back-End Developer Specialization — Capstone Project  

---

## 🍋 Little Lemon Restaurant Web Application

A full-stack restaurant management and table reservation web application built with **Django**, **Django REST Framework (DRF)**, **MySQL**, and dynamic **JavaScript (Fetch API)**.

### 📁 Project Structure
```text
coursera/
├── littlelemon/
│   ├── manage.py                   # Django management script
│   ├── Pipfile & Pipfile.lock      # Dependency management
│   ├── littlelemon/                # Project configuration
│   │   ├── settings.py             # MySQL database, apps, auth config
│   │   ├── urls.py                 # Root URL routing
│   │   ├── wsgi.py & asgi.py
│   └── restaurant/                 # Restaurant application
│       ├── models.py               # Booking and Menu models
│       ├── views.py                # Template views and API endpoints
│       ├── urls.py                 # App URL configurations
│       ├── forms.py                # BookingForm & MenuForm
│       ├── migrations/             # Database migrations
│       ├── templates/              # HTML templates (book.html, bookings.html, menu.html)
│       └── static/                 # Static assets (CSS, JS, images)
```

---

## 🚀 Key Features

1. **MySQL Database Connection & Models**:
   - `Booking` model: stores reservation details (`first_name`, `reservation_date`, `reservation_slot`).
   - `Menu` model: stores restaurant menu items (`name`, `price`, `menu_item_description`).
   - Fully migrated with Django ORM to MySQL database.

2. **REST API Endpoints**:
   - `/bookings`: Supports `GET` queries filtered by date (`?date=YYYY-MM-DD`) and `POST` requests to create new reservations.
   - Built-in validation preventing double-booking on identical dates and time slots.
   - `/reservations/`: Renders all current reservations serialized in JSON format.

3. **Dynamic Frontend Interface**:
   - Built with responsive HTML5, CSS3, and native JavaScript.
   - Automatically initializes with the current date.
   - Uses `fetch()` to dynamically retrieve available slots for the selected date.
   - Displays booked slots as disabled and shows "No bookings" when none exist.

---

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Eqziz/coursera.git
   cd coursera/littlelemon
   ```

2. **Set up the virtual environment**:
   ```bash
   pipenv install
   pipenv shell
   ```

3. **Apply database migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Run the development server**:
   ```bash
   python manage.py runserver
   ```

5. **Access the application**:
   - Booking Form: [http://127.0.0.1:8000/book/](http://127.0.0.1:8000/book/)
   - Reservations (JSON view): [http://127.0.0.1:8000/reservations/](http://127.0.0.1:8000/reservations/)
   - API Endpoint: [http://127.0.0.1:8000/bookings](http://127.0.0.1:8000/bookings)
