# [↗](https://github.com/mrenigmatic19/eGAuth) eGAuth - Digital ID Generation and Verification

## Introduction:
**eGAuth** is a secure digital identity system built to prevent online impersonation, forgery, and misuse of high-ranking officials' identities. It provides a robust mechanism to generate and verify digital IDs through AES-encrypted QR codes that refresh every 5 minutes, ensuring high-level security and zero tolerance for replay attacks.

![eGAuth Demo](https://github.com/yourusername/eGAuth/assets/your-screenshot-id)

---

## Prerequisites:

To run this project locally, ensure the following are installed on your system:

- Node.js
- MongoDB
- RabbitMQ Server

---

## Getting Started:

1. **Clone the Repository:**
```bash
git clone https://github.com/ritikc186/eGAuth.git
cd eGAuth
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Start MongoDB and RabbitMQ servers** if not already running.

4. **Run the Application:**
```bash
npm run dev
```

5. **Access the App:**
Open your browser and go to:  
`http://localhost:3000`

---

## Features:

### 1. 🔐 **Secure Digital ID Generation**
- Generates AES-encrypted digital IDs for verified officials.
- AES keys are securely transferred using RSA encryption.

### 2. 🧰 **Proxy Server & Distributed Architecture**
- Delegates sensitive tasks to microservices via a secure proxy layer.
- Reduces exposure of the main server to potential threats.

### 3. 📡 **Microservices & Secure Communication**
- Uses **RabbitMQ** for asynchronous, encrypted message passing.
- Facilitates high-speed, secure AES key transfer without direct coupling.

### 4. 📲 **QR-Based Verification**
- AES-encrypted QR codes are refreshed every 5 minutes.
- Codes are single-use and expire upon validation.
- Instantly validates identity by scanning the QR.

### 5. 🚫 **Fraud Prevention**
- QR codes are rendered useless if intercepted due to expiration and one-time use.
- Unauthorized entities cannot impersonate verified individuals due to continual encryption and refresh logic.

---

## Architecture Overview:

- **Frontend:** React.js + QR Code Scanner Integration  
- **Backend:** Node.js, Express.js, REST APIs  
- **Security:** AES (ID Encryption) + RSA (Key Transfer)  
- **Queueing System:** RabbitMQ (asynchronous, encrypted communication)  
- **Infrastructure:** Proxy Server + Microservices + MongoDB

---

## Screenshots:

| Identity Dashboard | QR Verification |
|--------------------|-----------------|
| ![Dashboard](https://github.com/yourusername/eGAuth/assets/your-screenshot-id1) | ![QR Verify](https://github.com/yourusername/eGAuth/assets/your-screenshot-id2) |

---

## Deployment:

Deployment steps are in progress. Once deployed, the service will support secure authentication APIs and a user interface accessible for officials and verifiers.

---

## Tech Stack:

- **Frontend:** React.js, Bootstrap, Axios  
- **Backend:** Node.js, Express.js  
- **Messaging:** RabbitMQ  
- **Encryption:** AES (Symmetric), RSA (Asymmetric)  
- **Database:** MongoDB  
- **Others:** QR Code Generator, Proxy Server, REST APIs

---

## Conclusion:

**eGAuth** delivers a secure, decentralized, and tamper-proof solution for digital identity verification. With encryption at its core, the system is built to withstand common fraud scenarios in digital governance. Its dynamic QR system, secure communication via RabbitMQ, and layered server architecture provide robust protection against misuse.

> ✨ eGAuth ensures **only verified identities** can interact with secure services—reinventing trust in digital authentication.
