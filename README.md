# 🚀 3D Portfolio Starter

A modern, interactive developer portfolio built with React, Vite, React Three Fiber, Tailwind CSS, and Framer Motion. Features a stunning 3D hero section, project showcase, and an advanced contact system with email notifications.

## ✨ Features

- **3D Interactive Hero** - Animated 3D objects using React Three Fiber
- **Responsive Design** - Mobile-first, fully responsive layout
- **Smooth Animations** - Framer Motion transitions throughout
- **Advanced Contact System** - Multiple delivery methods
  - 📧 **Email notifications** via EmailJS (messages sent to your email)
  - 💾 Messages saved to localStorage as backup
  - 📥 Automatic JSON download for each submission
  - 🗂️ Bulk export all messages
  - 🔐 Admin panel to view/manage messages
- **Modern UI** - Dark theme with Tailwind CSS
- **Fast Development** - Vite for lightning-fast HMR
- **Production Ready** - Optimized build with lazy loading

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics library
- **EmailJS** - Client-side email service (no backend needed)

## 📦 Installation

1. **Clone or navigate to the project directory:**

```bash
cd portflio
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure EmailJS (Required for contact form):**

See detailed setup guide: **[EMAILJS_SETUP.md](./EMAILJS_SETUP.md)**

Quick steps:
- Create free account at [emailjs.com](https://www.emailjs.com/)
- Get your Service ID, Template ID, and Public Key
- Update `src/components/ContactForm.jsx` with your keys

4. **Start the development server:**

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 📁 Project Structure

```
portflio/
├── public/
│   └── profile.json          # Your profile data (EDIT THIS!)
├── src/
│   ├── components/
│   │   ├── Hero3D.jsx        # 3D animated hero component
│   │   ├── ProjectCard.jsx   # Project display card
│   │   ├── ContactForm.jsx   # Contact form with localStorage
│   │   └── AdminPanel.jsx    # Admin interface for messages
│   ├── styles/
│   │   └── index.css         # Global styles + Tailwind
│   ├── App.jsx               # Main application component
│   └── main.jsx              # React entry point
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
├── tailwind.config.cjs       # Tailwind CSS configuration
├── postcss.config.cjs        # PostCSS configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## ⚙️ Configuration

### Editing Your Profile

Edit `public/profile.json` to customize your portfolio:

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "location": "Your Location",
  "email": "your.email@example.com",
  "github": "https://github.com/yourusername",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "about": "Your bio...",
  "projects": [
    {
      "id": 1,
      "name": "Project Name",
      "desc": "Project description",
      "link": "https://github.com/yourusername/project"
    }
  ]
}
```

### Styling

- **Colors**: Edit `tailwind.config.cjs` to change the color scheme
- **Theme**: Modify `src/styles/index.css` for global styles
- **Components**: Each component has its own styling using Tailwind classes

## 📬 Contact Form Behavior

### How It Works

1. **User submits a message** → Validated (name, email required; phone & message required)
2. **📧 Email sent to you** → Via EmailJS to your email address (from profile.json)
   - Includes: Name, Email, Mobile Number, Message, Timestamp
3. **💾 Saved to localStorage** → Key: `portfolio_messages`, stored as JSON array (backup)
4. **📥 Auto-download** → Individual message downloaded as `message_<timestamp>.json`
5. **📁 Persistent storage** → Messages remain across page refreshes
6. **🗂️ Download all** → Button to export all messages as single JSON file

### Email Delivery

Messages are sent directly to your email (**sreddy08840@gmail.com** from profile.json) via EmailJS:
- ✅ No backend server required
- ✅ Free tier: 200 emails/month
- ✅ Instant delivery
- ✅ Works from any browser
- ✅ Secure & reliable

**Setup Required**: See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) for configuration

### Message Format

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "message": "Hello! I'd like to discuss a project.",
  "timestamp": "2024-10-21T12:00:00.000Z"
}
```

**Note:** Phone number is optional. If not provided, it will show as "Not provided".

### Accessing Messages Manually

Open browser DevTools Console and run:

```javascript
// View all messages
JSON.parse(localStorage.getItem('portfolio_messages'))

// Clear all messages
localStorage.removeItem('portfolio_messages')

// Count messages
JSON.parse(localStorage.getItem('portfolio_messages')).length
```

## 🔐 Admin Panel

### Access

1. Click **"Admin"** in the navigation (bottom-right corner on mobile)
2. Enter password: `admin123` (change this in `App.jsx` for security)
3. View, download, or clear all messages

### Features

- **View Messages** - Table display with name, email, message, timestamp
- **Download All** - Export all messages as JSON
- **Clear All** - Delete all messages (with confirmation)
- **Refresh** - Reload messages from localStorage

### Security Note

⚠️ This is a **client-side only** solution. The password is stored in the code and can be viewed by anyone. For production use with sensitive data, implement proper backend authentication.

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deploy to Netlify

1. Push your code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy.

## 🔧 Customization Tips

### Change 3D Object

Edit `src/components/Hero3D.jsx`:

```jsx
// Replace Sphere with other shapes:
import { Box, Torus, TorusKnot } from '@react-three/drei'

// Example: Use a rotating cube
<Box args={[2, 2, 2]}>
  <meshStandardMaterial color="#0ea5e9" />
</Box>
```

### Adjust Animations

Edit Framer Motion props in components:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
```

### Add More Sections

Add new sections in `App.jsx` following the pattern:

```jsx
<section id="skills" className="section-container">
  <h2 className="text-4xl font-bold mb-12 text-center">
    My <span className="text-primary">Skills</span>
  </h2>
  {/* Your content */}
</section>
```

## 🐛 Troubleshooting

### localStorage Issues

**Problem**: Contact form shows "localStorage not available"

**Solutions**:
- Check if browser allows localStorage (private browsing may disable it)
- Enable cookies and site data in browser settings
- Try a different browser

### 3D Scene Not Loading

**Problem**: Hero section shows loading placeholder forever

**Solutions**:
- Check browser console for errors
- Ensure WebGL is supported (visit https://get.webgl.org/)
- Update graphics drivers
- Try a different browser

### Build Errors

**Problem**: `npm run build` fails

**Solutions**:
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version is 16+ (`node -v`)

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Credits

- **React Three Fiber** - https://docs.pmnd.rs/react-three-fiber
- **Drei** - https://github.com/pmndrs/drei
- **Framer Motion** - https://www.framer.com/motion
- **Tailwind CSS** - https://tailwindcss.com

## 📞 Support

For issues or questions:
1. Check this README thoroughly
2. Review browser console for errors
3. Check that all dependencies installed correctly
4. Ensure `profile.json` is valid JSON

---

**Built with ❤️ using React, Three.js, and modern web technologies**
