# 🔧 Email Not Working? Troubleshooting Guide

## ✅ Quick Checklist

### 1. **Verify EmailJS Setup**

Go to **https://dashboard.emailjs.com/** and check:

- [ ] ✅ Email Service is **connected** (Gmail/Outlook)
- [ ] ✅ Email Template exists with ID: `template_rlij7cs`
- [ ] ✅ Service ID is: `service_wl0n85r`
- [ ] ✅ Public Key is: `rGcPZYNBqKb4VoFsm`

---

## 📧 CRITICAL: Check Your Email Template

### **Your Template MUST Have These Variables:**

Go to EmailJS Dashboard → Email Templates → `template_rlij7cs`

**Template must include:**
```
{{from_name}}
{{from_email}}
{{phone_number}}
{{message}}
{{timestamp}}
```

**Example Template (Copy this if needed):**
```
Subject: New Message from {{from_name}}

You have a new message!

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone_number}}
Time: {{timestamp}}

Message:
{{message}}
```

---

## 🔌 Step 1: Connect Your Email Service

1. Go to **https://dashboard.emailjs.com/admin**
2. Click **"Email Services"**
3. Click **"Add New Service"**
4. Choose **Gmail** (recommended)
5. Click **"Connect Account"**
6. Login with your Google account
7. Allow permissions
8. **Copy the Service ID** (should be `service_wl0n85r`)

---

## 📝 Step 2: Verify Template Configuration

1. Go to **"Email Templates"**
2. Find your template: `template_rlij7cs`
3. Click **"Edit"**
4. **Important Settings:**
   - **From Name:** `{{from_name}}`
   - **From Email:** Use your verified email
   - **To Email:** `sreddy08840@gmail.com`
   - **Subject:** `New Message from {{from_name}}`
   - **Content:** Must include all variables above

**Click "Save" after changes!**

---

## 🔑 Step 3: Verify Public Key

1. Go to **"Account"** → **"General"**
2. Find **"Public Key"**
3. Should be: `rGcPZYNBqKb4VoFsm`
4. If different, update `ContactForm.jsx` line 109

---

## 🧪 Step 4: Test in Browser Console

1. Run: `npm run dev`
2. Open browser (http://localhost:3000)
3. Open Developer Tools (F12)
4. Go to **"Console"** tab
5. Fill out contact form and submit
6. Check console for:
   - ✅ `"Email sent successfully via EmailJS"`
   - ❌ `"EmailJS error:"` (shows the problem)

---

## 🐛 Common Errors & Solutions

### Error: "Service ID not found"
**Solution:** Check Service ID in EmailJS dashboard matches `service_wl0n85r`

### Error: "Template ID not found"
**Solution:** Check Template ID in EmailJS dashboard matches `template_rlij7cs`

### Error: "Public Key invalid"
**Solution:** Copy Public Key from EmailJS Account → General

### Error: "Template parameter missing"
**Solution:** Add all variables to your email template:
- `{{from_name}}`
- `{{from_email}}`
- `{{phone_number}}`
- `{{message}}`
- `{{timestamp}}`

### Email arrives but variables are empty
**Solution:** Variable names must match exactly (case-sensitive)

---

## 📬 Step 5: Check Email Logs

1. Go to **EmailJS Dashboard**
2. Click **"Email Log"** (left sidebar)
3. See all sent emails and their status
4. If email shows "Failed" - click to see error message

---

## 🎯 Step-by-Step Test

### Test 1: Verify Template Variables

**In EmailJS template, paste exactly this:**

```html
Subject: Test from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone_number}}
Date: {{timestamp}}
Message: {{message}}
```

**Save template**

### Test 2: Send Test Email

1. Run `npm run dev`
2. Fill form:
   - Name: Test User
   - Email: test@test.com
   - Phone: 1234567890
   - Message: Testing 123
3. Click "Send Message"
4. Check console (F12) for errors
5. Check `sreddy08840@gmail.com` inbox
6. **Also check SPAM folder!**

---

## ⚠️ Important Notes

### Gmail Users:
- EmailJS emails might go to **SPAM** first time
- Mark as "Not Spam" to receive future emails in inbox
- Check **"All Mail"** folder too

### Rate Limits:
- Free tier: 200 emails/month
- Max 1 email per second
- If exceeded, emails won't send

### Email Delivery Time:
- Usually instant (1-5 seconds)
- Can take up to 1 minute
- Check EmailJS logs if delayed

---

## 🔄 Fresh Start (If Nothing Works)

### Option 1: Recreate Template

1. Delete old template `template_rlij7cs`
2. Create NEW template
3. Copy NEW template ID
4. Update `ContactForm.jsx` line 108

### Option 2: Recreate Service

1. Disconnect current email service
2. Add new Gmail service
3. Copy NEW service ID
4. Update `ContactForm.jsx` line 107

### Option 3: Use Different Email

1. In EmailJS, change "To Email" to different address
2. Test if emails arrive there
3. If yes, problem is with Gmail delivery

---

## 📞 Still Not Working?

### Check These Files:

**1. `src/components/ContactForm.jsx` (Lines 107-109):**
```javascript
const EMAILJS_SERVICE_ID = 'service_wl0n85r'
const EMAILJS_TEMPLATE_ID = 'template_rlij7cs'
const EMAILJS_PUBLIC_KEY = 'rGcPZYNBqKb4VoFsm'
```

**2. `public/profile.json`:**
```json
"email": "sreddy08840@gmail.com"
```

**3. Browser Console Errors:**
- Open F12
- Submit form
- Copy any RED error messages

---

## ✅ Success Checklist

Once working, you should see:

- ✅ Form submits successfully
- ✅ Console shows "Email sent successfully"
- ✅ Email arrives at `sreddy08840@gmail.com`
- ✅ Email contains all form data
- ✅ No errors in browser console
- ✅ EmailJS logs show "Success"

---

## 🆘 Need Help?

**Send me:**
1. Screenshot of EmailJS dashboard (Services page)
2. Screenshot of EmailJS template
3. Screenshot of browser console after form submit
4. Screenshot of EmailJS Email Log

**EmailJS Support:**
- Dashboard: https://dashboard.emailjs.com/
- Docs: https://www.emailjs.com/docs/
- Support: support@emailjs.com

---

Good luck! 🚀
