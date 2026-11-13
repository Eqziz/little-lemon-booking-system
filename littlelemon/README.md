# Little Lemon Booking System - Meta Full Stack Developer Capstone

Author: Mukhammedov Nodir Shavkatovich  
GitHub Repository: https://github.com/Eqziz/little-lemon-booking-system  

## Overview
This repository contains the complete solution for the Meta Back-End Developer course: "The Full Stack" final assessment.
It fulfills all grading criteria across the three exercises:
1. **Exercise 1: Connect the Little Lemon back-end to MySQL**
   - Configured MySQL database in `littlelemon/settings.py` (`reservations` database, `root` user).
   - Created `Booking` and `Menu` models with required schema in `restaurant/models.py`.
   - Generated and performed database migrations in `restaurant/migrations/`.

2. **Exercise 2: Set up a Little Lemon booking API**
   - Implemented `bookings` API endpoint in `restaurant/views.py` supporting `GET` (by date) and `POST` (create reservation).
   - Enforced duplicate booking prevention for identical reservation dates and time slots.
   - Configured routing in `restaurant/urls.py` and `littlelemon/urls.py`.

3. **Exercise 3: Display the Little Lemon available booking times**
   - Implemented dynamic frontend booking interface in `restaurant/templates/book.html`.
   - Utilized native JavaScript `fetch` API to query `/bookings?date=YYYY-MM-DD`.
   - Handled automatic date initialization to current date.
   - Disabled booked time slots dynamically and presented real-time reservations list / "No bookings" feedback.
   - Rendered all reservations in JSON format on `/reservations/` in `restaurant/templates/bookings.html`.

## Quick Start
```bash
pipenv shell
pipenv install
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
Visit `http://127.0.0.1:8000/book/` for the booking interface and `http://127.0.0.1:8000/reservations/` for the reservations JSON view.
