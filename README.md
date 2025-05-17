# Web-assignment
# Project Setup Instructions

Welcome to the team! Follow these steps to set up the project on your local machine and start contributing.

---

## Prerequisites

Before starting, ensure you have the following installed on your system:

* **Python 3.9+** (Check your version with `python --version`)
* **Git** (Check your version with `git --version`)
* A terminal or command prompt (e.g., Windows Terminal, macOS Terminal, or a Linux shell)

---

## Step 1: Clone the Repository

Clone the project repository from GitHub:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the URL of the repository you just uploaded. For example:

```bash
git clone https://github.com/your-username/your-repo-name.git
```

Navigate to the project folder:

```bash
cd your-repo-name
```

---

## Step 2: Create and Activate a Virtual Environment

### Windows:

1. Create the virtual environment:

   ```bash
   python -m venv venv
   ```
2. Activate it:

   ```bash
   venv\Scripts\activate
   ```

### macOS/Linux:

1. Create the virtual environment:

   ```bash
   python3 -m venv venv
   ```
2. Activate it:

   ```bash
   source venv/bin/activate
   ```

When the virtual environment is activated, your terminal prompt will show `(venv)` at the beginning.

---

## Step 3: Install Dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

This command reads the `requirements.txt` file and installs all necessary dependencies, such as Django, Pillow, and more.

---

## Step 4: Set Up the Django Project

1. Apply database migrations:

   ```bash
   python manage.py migrate
   ```

2. Create a superuser (admin account):

   ```bash
   python manage.py createsuperuser
   ```

   Follow the prompts to set up a username, email, and password.

3. Run the development server:

   ```bash
   python manage.py runserver
   ```

4. Open the server in your browser at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

---

## Step 5: Start Contributing

### Using Git for Collaboration

1. Pull the latest changes from the repository:

   ```bash
   git pull origin main
   ```

2. Create a new branch for your work:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. After making changes, add and commit them:

   ```bash
   git add .
   git commit -m "Description of changes"
   ```

4. Push your branch to the repository:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request (PR) on GitHub for review.

---

## Troubleshooting

* If you encounter any issues, ensure all prerequisites are installed correctly.
* For missing dependencies, rerun:

  ```bash
  pip install -r requirements.txt
  ```
* Contact a teammate for help if needed.

---

## Questions?

Reach out to \[Your Name] via email at \[[your-email@example.com](mailto:your-email@example.com)] or message on Slack/Discord.

Happy coding!
