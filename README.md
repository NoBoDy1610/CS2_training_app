# CS2 Training App

Welcome to **CS2 Training App** – an application designed for Counter-Strike 2 players who want to sharpen their skills and train like professionals. Whether you’re a beginner or a seasoned CS2 player, this platform provides straightforward and effective training tools to help you elevate your game.

## About the Project

**CS2 Training App** is a training tool built to assist Counter-Strike 2 players in mastering their gameplay skills. Powered by a robust back-end and an intuitive front-end, this app offers a variety of training modes to improve aim, reaction time, map knowledge, and tactical awareness. Created out of a passion for CS2, the goal is to provide players with a focused environment to practice and grow, bridging the gap between casual play and competitive excellence.

## Features

### Training
- **Aim Training**: Practice your accuracy with exercises designed to improve headshot precision and weapon control.
- **Reaction Time Training**: Boost your reflexes with drills that test and enhance your response speed.
- **Map Knowledge**: Learn key positions, callouts, and layouts of popular CS2 maps to gain a strategic edge.
- **Tactics Training**: Study and practice team strategies, grenade lineups, and situational decision-making.

### Analysis
- **Stats Tables**: Analyze your performance with detailed tables displaying statistics like accuracy percentage, reaction time averages, and training session results.

### For Visitors (Not Logged In)
- **Full App Access**: Use all training modes (aim, reaction time, map knowledge, tactics) without restrictions.
- **No Progress Tracking**: Explore the app freely, but progress and stats cannot be saved or monitored.

### For Registered Users (Logged In)
- **Progress Tracking**: Save and monitor your training stats over time using the stats tables.
- **Training Plans**: Access personalized training plans tailored to your skill level and goals, helping you structure your practice effectively.
- **Account Management**: View and update your account details or delete your account.
- **Logout**: Securely log out to protect your account.

## Installation

To run this project locally, clone the repository:  
`https://github.com/NoBoDy1610/CS2_training_app.git`

### System Requirements
1. **Back-end (Server Side)**:
   - Visual Studio Code (version 1.96 or higher)
   - Node.js (version 22.11.0 or higher)
2. **Front-end (User Interface)**:
   - Node.js (version 20.11.0 or higher)
3. **Web Browser**:
   - Any modern browser supporting ECMAScript 6 and Fetch API, e.g., Chrome (80+), Edge (80+), Firefox (75+), Opera (67+), Safari (13+)

### Step 1: Setting Up the Back-end
1. Open Visual Studio Code and load the back-end project.
2. Open the terminal in Visual Studio Code (Ctrl + ~ on Windows).
3. Navigate to the back-end project folder:
   ```bash
   cd path/to/backend/folder
 
4. Install all required dependencies:
   ```bash
   npm install
   ```
5. Start the back-end application:
   ```bash
   nodemon server.js
   ```
   By default, the back-end listens on a port like `http://localhost:5000`. Check the port details in the project’s configuration file (`.env` or `server.js`).

### Step 2: Setting Up the Front-end
1. Open a system terminal (e.g., Terminal, PowerShell, cmd).
2. Navigate to the front-end code folder:
   ```bash
   cd path/to/frontend/folder
   ```
3. Install all required dependencies:
   ```bash
   npm install
   ```
4. Start the front-end application:
   ```bash
   npm start
   ```
   By default, the front-end runs on `http://localhost:3000`.

### Step 3: Using the Application
1. Open your web browser.
2. Enter in the address bar:
   ```
   http://localhost:3000
   ```
3. The front-end should connect to the back-end via the API at `http://localhost:5000`.

### Additional Notes
- **Port Configuration**: Ensure the front-end knows the back-end’s address. Update the URL in the `.env` file or front-end code if needed.
- **Debugging**:
  - Back-end issues: Check logs in the server terminal.
  - Front-end issues: Use the browser console (DevTools > Console).
- **Back-end/Front-end Communication**: If there’s a connection issue, verify that:
  - The back-end server is running and accessible.
  - The API address is correctly configured in the front-end.

## Contributing

Want to contribute to the project? All help is welcome! Here’s how you can get involved:
1. Clone the repository to your GitHub account (fork).
2. Make changes and submit a Pull Request with your suggestions.

Feel free to contact me with any questions about contributing.

## Contact

Have questions or suggestions? Reach out to me:
- GitHub: [NoBoDy1610](https://github.com/NoBoDy1610)
- Email: nikodem_czubak@wp.pl

## License

MIT License

Copyright (c) 2025 NoBoDy1610

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

Thank you for checking out **CS2 Training App**! Train smart and dominate the servers in Counter-Strike 2!
```
