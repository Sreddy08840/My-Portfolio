# 📧 EmailJS Setup Guide

This guide will help you configure EmailJS so visitors can send messages directly to your email through the contact form.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (it's FREE for up to 200 emails/month)
3. Create your account with email or Google

### Step 2: Add Email Service

1. After logging in, go to **"Email Services"** in the dashboard
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - Outlook
   - Yahoo
   - Or use SMTP for any email provider
4. Click **"Connect Account"** and follow the setup
5. **IMPORTANT**: Copy your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **"Email Templates"** in the dashboard
2. Click **"Create New Template"**
3. Use this template configuration:

**Template Settings:**
```
Template Name: Portfolio Contact Form
Template ID: (auto-generated, copy this!)
```

**Email Template:**
```
Subject: New Message from {{from_name}} - Portfolio Contact

Content:
---
You received a new message from your portfolio website!

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone_number}}
Date: {{timestamp}}

Message:
{{message}}
---

Reply to: {{from_email}}
```

4. Click **"Save"**
5. **IMPORTANT**: Copy your **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** in the dashboard
2. Find **"Public Key"** section
3. **IMPORTANT**: Copy your **Public Key** (e.g., `abcXYZ123_456`)

### Step 5: Configure Your Portfolio

1. Open `src/components/ContactForm.jsx`
2. Find these lines (around line 94-96):

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'  // Replace
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // Replace
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'  // Replace
```

3. Replace with your actual values:

```javascript
const EMAILJS_SERVICE_ID = 'service_abc123'  // Your Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789'  // Your Template ID
const EMAILJS_PUBLIC_KEY = 'abcXYZ123_456'  // Your Public Key
```

4. Save the file

### Step 6: Install Dependencies & Test

```bash
npm install
npm run dev
```

Visit your portfolio, fill out the contact form, and send a test message. You should receive an email!

---

## 📧 Email Template Variables

Your template can use these variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Visitor's name | John Doe |
| `{{from_email}}` | Visitor's email | john@example.com |
| `{{phone_number}}` | Visitor's phone number | +91 98765 43210 |
| `{{message}}` | Visitor's message | I'd like to collaborate... |
| `{{to_email}}` | Your email (from profile.json) | sreddy08840@gmail.com |
| `{{timestamp}}` | When message was sent | 10/21/2024, 5:30:00 PM |

---

## 🎨 Advanced Template Example

For a more professional email, use this template:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; }
    .content { background: #f4f4f4; padding: 20px; margin: 20px 0; }
    .footer { text-align: center; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Portfolio Message</h2>
    </div>
    <div class="content">
      <p><strong>From:</strong> {{from_name}}</p>
      <p><strong>Email:</strong> {{from_email}}</p>
      <p><strong>Phone:</strong> {{phone_number}}</p>
      <p><strong>Date:</strong> {{timestamp}}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>{{message}}</p>
    </div>
    <div class="footer">
      <p>Sent from your portfolio contact form</p>
    </div>
  </div>
</body>
</html>
```

---

## 🔒 Security Best Practices

### 1. **Protect Your Keys**
- ✅ Public Key is safe to expose (it's designed for client-side)
- ✅ Service ID and Template ID are safe in your code
- ❌ Never share your Account Private Key

### 2. **Enable reCAPTCHA (Optional)**
1. In EmailJS dashboard, go to **"Security"**
2. Enable reCAPTCHA v3
3. Add the site key to your form
4. This prevents spam/bot submissions

### 3. **Set Email Limits**
EmailJS free tier includes:
- 200 emails/month
- Rate limiting: 1 email per second
- If you need more, upgrade to paid plan

---

## 🐛 Troubleshooting

### Error: "Service ID not found"
- Double-check your Service ID matches exactly
- Make sure the service is active in your EmailJS dashboard

### Error: "Template ID not found"
- Verify your Template ID is correct
- Ensure template is published/active

### Emails not arriving
1. Check your spam folder
2. Verify the email address in `public/profile.json`
3. Check EmailJS dashboard → "Email Log" for delivery status
4. Ensure you haven't exceeded the monthly limit

### Form submits but no email
1. Open browser DevTools → Console
2. Look for error messages
3. Check if EmailJS keys are correctly configured
4. Verify your internet connection

---

## 💡 Tips

1. **Test First**: Send yourself a test email before going live
2. **Check Logs**: EmailJS dashboard shows all sent emails and errors
3. **Backup**: Messages are still saved to localStorage as backup
4. **Auto-Reply**: Create a second template to auto-reply to visitors
5. **Multiple Recipients**: Add multiple email addresses in the template

---

## 🆓 Free Tier Limits

EmailJS Free Plan:
- ✅ 200 emails per month
- ✅ 2 email services
- ✅ 2 email templates
- ✅ Email history (30 days)
- ✅ Basic support

Need more? Upgrade to paid plan starting at $7/month for 1,000 emails.

---

## 🔗 Useful Links

- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Template Variables Guide](https://www.emailjs.com/docs/user-guide/template-parameters/)
- [React Integration Guide](https://www.emailjs.com/docs/examples/reactjs/)

---

## ✅ Checklist

Before deploying your portfolio, make sure:

- [ ] EmailJS account created
- [ ] Email service connected (Gmail/Outlook/etc.)
- [ ] Email template created with all variables
- [ ] Service ID, Template ID, and Public Key copied
- [ ] Keys added to `ContactForm.jsx`
- [ ] Test email sent successfully
- [ ] Email received in your inbox
- [ ] Auto-reply template created (optional)
- [ ] reCAPTCHA enabled (optional)

---

**Need Help?** 
- EmailJS Support: [support@emailjs.com](mailto:support@emailjs.com)
- EmailJS Community: [GitHub Discussions](https://github.com/emailjs-com/emailjs-sdk/discussions)

Good luck! 🚀
