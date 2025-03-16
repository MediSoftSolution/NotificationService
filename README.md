# NotificationService - Hospital System Microservices

**NotificationService** is a microservice responsible for sending notifications via email, SMS, or push notifications in the **Hospital System Microservices** platform. It handles the delivery of **laboratory results**, **appointments**, and other relevant updates to users (patients, doctors, or hospital staff) through various communication channels.

## 📌 Overview

The **NotificationService** manages the following:

- **Email Notifications**: Sends emails to patients, doctors, or hospital staff regarding appointment confirmations, laboratory results, reminders, etc.
- **SMS and Push Notifications**: Can optionally send SMS or push notifications.
- **Notification Templates**: Allows admins to configure and manage notification templates.
- **Database Integration**: Stores logs of sent notifications for auditing purposes.

---

## 🔧 Technologies Used

- **Backend**: Node.js, Express.js
- **Email Service**: Nodemailer (for sending emails)
- **Database**: MongoDB (for storing notification logs, templates, etc.)
- **Service Discovery**: Consul (for service discovery)
- **API Gateway**: Ocelot (for routing requests to services)
- **Security**: JWT Token for authentication and authorization

---

## 🚀 Features

- **Email Notifications**: Sends emails to patients with **appointment confirmations**, **laboratory results**, and **reminders**.
- **SMS/Push Notifications**: Support for SMS and push notifications (can be configured).
- **Customizable Templates**: Allows admins to define the structure of emails and messages.
- **Notification Logging**: Logs all sent notifications for tracking and auditing purposes.

---

## 🛠️ Configuration

### 1. **Email Configuration**

The email service is configured using **Nodemailer**. You need to set up an email service provider (e.g., Gmail, SendGrid, or others) for sending emails.

**`config.js`** (or equivalent file):

```javascript
module.exports = {
  emailService: {
    host: 'smtp.gmail.com', // Use your SMTP server here
    port: 587,
    secure: false, 
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  },
  fromEmail: 'no-reply@yourhospital.com'  // Default "from" email address
};
