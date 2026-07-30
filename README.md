# 🚀 Crackit - Internship Tracker (MERN Stack)

Welcome to the **Crackit** project! This guide will take you step-by-step through setting up and running the app on your computer. 

Even if you have never used the command line before, just follow the instructions and copy-paste the commands exactly as shown.

---

## 🛠️ Step 1: Prerequisites

Before opening the project, download and install the following free software on your computer:

1. **Node.js (LTS Version)**
   * **Download:** [nodejs.org](https://nodejs.org/) (Select the **LTS** version)
   * **Verification:** Open your Command Prompt (Windows) or Terminal (Mac) and type:
     ```bash
     node -v
     npm -v
     ```
     *(If a version number like `v20.x.x` appears for both, you are good to go!)*

2. **MongoDB Community Server & MongoDB Compass**
   * **Download Community Server:** [MongoDB Community Server Download](https://www.mongodb.com/try/download/community)
   * **Download Compass (GUI):** [MongoDB Compass Download](https://www.mongodb.com/try/download/compass) *(often included during Community Server setup)*
   * **Verification:** Open **MongoDB Compass**, leave the connection string as `mongodb://localhost:27017`, and click **Connect**. If it connects without errors, your database server is running properly!

3. **VS Code (Code Editor)**
   * **Download:** [code.visualstudio.com](https://code.visualstudio.com/)

---

## 📁 Step 2: Extracting the Folder

1. Unzip the project folder to a location on your computer (e.g., your Desktop or Documents folder).
2. Open the extracted `/Crackit` folder. Inside, you should see two main subfolders and this guide:
   * `/client` — Contains the React/Vite frontend UI.
   * `/server` — Contains the Express/Node backend API.
   * `Readme.md` — This setup guide.

---

## 🔄 Step 3: Proper Running Order

To run this app properly, always launch the services in this **exact order**:

1. **MongoDB** (Open Compass and verify connection to `localhost:27017`).
2. **Backend Server** (Runs in Terminal 1).
3. **Frontend Client** (Runs in Terminal 2).

> **Note:** Keep both terminal windows open while testing the app. Closing a terminal stops that part of the application!

---

## ⚙️ Step 4: Backend Setup

1. Open **VS Code**.
2. Go to `File` > `Open Folder...` and select the **root `/Crackit` folder**.
3. Open a new terminal in VS Code (`Terminal` > `New Terminal`).
4. Type the following command to move into the server directory:
   ```bash
   cd server