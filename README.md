# Customer Management System

This project is a **Customer Management System** built with **Node.js**, **Express**, and **React**. It allows businesses to manage customer information, including their contact details, purchase history, and more.

## Features

- **Client Side:**
  - User-friendly interface for adding, editing, and viewing customer details.
  - Real-time data updates.
  - Authentication and authorization for secure access.
  
- **Server Side:**
  - API endpoints for managing customer data.
  - Database management for storing customer records securely.
  - Admin role for managing customer data and user access.
  - 
### MongoDB Setup (MongoDB Atlas)

1. **Create an Account on MongoDB Atlas**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create an account if you don’t have one already.
   - After signing in, you will be directed to the Atlas dashboard.

2. **Create a Cluster**
   - From the dashboard, click on **Build a Cluster**.
   - Choose a cloud provider (AWS, Google Cloud, or Azure) and a region.
   - Select the **M0 Free Tier** cluster for free usage.
   - Click **Create Cluster** and wait for it to be created (this may take a few minutes).

3. **Set Up Database Access**
   - Go to the **Database Access** tab and click **Add New Database User**.
     - Create a username and password for the database user.
     - Assign `readWrite` permissions or other roles as required.
   - Click **Add User**.

4. **Whitelist Your IP Address**
   - Go to the **Network Access** tab and click **Add IP Address** to whitelist your IP.
     - You can whitelist your current IP or use `0.0.0.0/0` to allow all IPs (not recommended for production).

5. **Get Your MongoDB Connection String**
   - Go to the **Clusters** tab and click **Connect** on your cluster.
   - Select **Connect Your Application**.
   - Copy the connection string, which will look like:

     ```bash
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
     ```

   - Replace `<username>`, `<password>`, and `<dbname>` with your actual credentials.


## Getting Started

To run this project locally, follow the steps below:

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sameeksha1998/custom-management.git

Navigate to the server folder:
cd server
npm install

Navigate to the client folder:
cd ../client
npm install

####Start project
In the server folder:
run:  npm run dev

####In the client folder:
npm start

