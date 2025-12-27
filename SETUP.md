# calendar-site
Project to integrate with Google Calendar
# 🛠️ Detailed Setup Guide

This guide will walk you through setting up your calendar site step-by-step.

## Table of Contents

1. [Getting Your Google Calendar Embed URL](#getting-your-google-calendar-embed-url)

2. [Configuring the Site](#configuring-the-site)

3. [Customizing the Design](#customizing-the-design)

4. [Testing Locally](#testing-locally)

5. [Deploying to Production](#deploying-to-production)

6. [Advanced Configuration](#advanced-configuration)

---

## Getting Your Google Calendar Embed URL

### Step 1: Access Google Calendar Settings

1. Go to [Google Calendar](https://calendar.google.com)

2. Sign in with your Google account

3. On the left sidebar, find **"My calendars"**

4. Hover over the calendar you want to embed

5. Click the **three vertical dots (⋮)** that appear

6. Select **"Settings and sharing"**

### Step 2: Configure Calendar Sharing

#### For Public Calendars:

1. Scroll to **"Access permissions for events"**

2. Check the box: **"Make available to public"**

3. ⚠️ **Warning**: This makes ALL events visible to anyone with the link

#### For Private/Limited Sharing:

1. Scroll to **"Share with specific people or groups"**

2. Click **"Add people and groups"**

3. Enter email addresses of people who should have access

4. Choose permission level (See all event details, etc.)

5. Click **"Send"**

### Step 3: Get the Embed Code

1. Scroll down to **"Integrate calendar"** section

2. Find the **"Embed code"** field

3. You'll see something like:

```html
<iframe src="https://calendar.google.com/calendar/embed?src=abc123%40group.calendar.google.com&ctz=America%2FNew_York" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
```

1. **Copy only the URL** from `src="..."` (between the quotes)

**Example URL:**

```
https://calendar.google.com/calendar/embed?src=abc123%40group.calendar.google.com&ctz=America%2FNew_York
```

### Step 4: Customize Embed Settings (Optional)

Before copying the URL, you can click **"Customize"** to adjust:

* Calendar title visibility

* Navigation buttons

* Date display

* Print icon

* Tabs (Month, Week, Agenda)

* Calendar list

These settings will be reflected in the embed URL.

---

## Configuring the Site

### Step 1: Open Configuration File

Navigate to your project folder and open:

```
js/calendar-config.js
```

### Step 2: Paste Your Calendar URL

Find this line:

```javascript
embedUrl: 'YOUR_GOOGLE_CALENDAR_EMBED_URL_HERE',
```

Replace it with your copied URL:

```javascript
embedUrl: 'https://calendar.google.com/calendar/embed?src=abc123%40group.calendar.google.com&ctz=America%2FNew_York',
```

### Step 3: Configure Other Options

```javascript
const CALENDAR_CONFIG = {
  // Your calendar URL
  embedUrl: 'YOUR_URL_HERE',
  
  // Default view when page loads
  defaultView: 'MONTH',  // Options: 'MONTH', 'WEEK', 'AGENDA'
  
  // Show/hide calendar title
  showTitle: true,
  
  // Show/hide navigation buttons (< >)
  showNav: true,
  
  // Show/hide current date
  showDate: true,
  
  // Show/hide print icon
  showPrint: false,
  
  // Show/hide view tabs (Month/Week/Agenda)
  showTabs: true,
  
  // Show/hide calendar list (if multiple calendars)
  showCalendars: false,
  
  // Show/hide timezone
  showTz: false,
  
  // Timezone (leave empty for auto-detect)
  // Examples: 'America/New_York', 'Europe/London', 'Asia/Tokyo'
  timezone: ''
};
```

### Step 4: Save the File

Save `calendar-config.js` and you're done with basic configuration!

---

## Customizing the Design

### Changing Colors

Open `css/style.css` and find the `:root` section at the top:

```css
:root {
  --bg: #0f172a;              /* Main background */
  --bg-elevated: #020617;     /* Elevated surfaces */
  --accent: #38bdf8;          /* Primary accent (buttons, links) */
  --accent-soft: rgba(56, 189, 248, 0.12);
  --text-main: #e5e7eb;       /* Main text color */
  --text-muted: #9ca3af;      /* Secondary text */
  --border-subtle: #1f2937;   /* Border colors */
  --shadow-soft: 0 18px 45px rgba(0, 0, 0, 0.45);
  --radius-lg: 16px;          /* Border radius */
  --radius-full: 999px;       /* Pill-shaped elements */
}
```

**Example: Blue to Purple Theme**

```css
:root {
  --accent: #a855f7;  /* Purple accent */
}
```

### Changing Brand Name

Open `index.html` and find:

```html
<span class="brand-title">My Schedule Hub</span>
<span class="brand-subtitle">Calendar • Booking • Events</span>
```

Replace with your brand name:

```html
<span class="brand-title">Acme Corp Calendar</span>
<span class="brand-subtitle">Team Schedule</span>
```

### Changing Hero Text

Find the hero section:

```html
<h1 class="hero-title">
  Plan, share, and
  <span class="hero-highlight">stay on top of your time.</span>
</h1>
<p class="hero-subtitle">
  Your custom description here.
</p>
```

### Adding Your Logo

Replace the `.brand-logo` div with an image:

```html
<img src="assets/images/logo.png" alt="Logo" class="brand-logo" />
```

Then adjust CSS:

```css
.brand-logo {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: none;
}
```

---

## Testing Locally

### Option 1: Direct File Opening

Simply double-click `index.html` to open in your browser.

⚠️ **Note**: Some features may not work due to CORS restrictions.

### Option 2: Local Web Server (Recommended)

#### Using Python 3:

```bash
cd calendar-site
python -m http.server 8000
```

Visit: `http://localhost:8000`

#### Using Node.js:

```bash
npx http-server
```

Visit: `http://localhost:8080`

#### Using PHP:

```bash
php -S localhost:8000
```

Visit: `http://localhost:8000`

#### Using VS Code:

Install "Live Server" extension, then right-click `index.html` → "Open with Live Server"

---

## Deploying to Production

### GitHub Pages (Free)

1. **Create GitHub Repository**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/calendar-site.git
git push -u origin main
```

1. **Enable GitHub Pages**

* Go to repository **Settings**

* Click **Pages** in sidebar

* Under "Source", select branch: `main`

* Click **Save**

* Your site will be live at: `https://yourusername.github.io/calendar-site/`

### Netlify (Free)

#### Method 1: Drag & Drop

1. Go to [Netlify Drop](https://app.netlify.com/drop)

2. Drag your `calendar-site` folder

3. Done! You'll get a URL like `https://random-name.netlify.app`

#### Method 2: Git Integration

1. Push code to GitHub (see above)

2. Go to [Netlify](https://app.netlify.com)

3. Click **"Add new site"** → **"Import an existing project"**

4. Connect to GitHub and select your repository

5. Click **"Deploy site"**

### Vercel (Free)

```bash
npm i -g vercel
cd calendar-site
vercel
```

Follow the prompts, and you'll get a URL like `https://calendar-site.vercel.app`

### Traditional Web Hosting

1. Connect via FTP (FileZilla, Cyberduck, etc.)

2. Upload all files to `public_html/` or `www/` directory

3. Visit your domain

---

## Advanced Configuration

### Multiple Calendars

To show multiple calendars:

1. In Google Calendar, go to each calendar's settings

2. Make them all public or shared appropriately

3. In the main calendar's embed settings, you can add other calendars

4. Or, overlay them in Google Calendar first, then embed

### Custom Domain

#### GitHub Pages:

1. Buy a domain (Namecheap, Google Domains, etc.)

2. In repository settings → Pages → Custom domain

3. Enter your domain and save

4. Update DNS records at your domain registrar:

```
Type: CNAME
Name: www
Value: yourusername.github.io
```

#### Netlify/Vercel:

1. Go to site settings → Domain management

2. Add custom domain

3. Follow DNS configuration instructions

### Adding Google Analytics

Add before closing `</head>` tag in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your tracking ID.

### SEO Optimization

Update meta tags in `index.html`:

```html
<head>
  <meta name="description" content="Your calendar description for search engines" />
  <meta name="keywords" content="calendar, schedule, booking, your keywords" />
  <meta property="og:title" content="Your Calendar Site" />
  <meta property="og:description" content="Description for social media" />
  <meta property="og:image" content="https://yoursite.com/preview-image.jpg" />
  <meta property="og:url" content="https://yoursite.com" />
  <meta name="twitter:card" content="summary_large_image" />
</head>
```

### Adding Favicon

Replace the inline SVG favicon with a real image:

```html
<link rel="icon" type="image/png" href="assets/images/favicon.png" />
<link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png" />
```

---

## Troubleshooting

### Calendar Not Showing

**Problem**: Blank space where calendar should be

**Solutions**:

1. Check browser console (F12) for errors

2. Verify calendar is public/shared correctly

3. Confirm embed URL is correct in `calendar-config.js`

4. Try opening the embed URL directly in browser

5. Check for ad blockers or privacy extensions blocking iframe

### Authentication Errors

**Problem**: "Calendar not found" or authentication errors

**Solutions**:

1. Make sure calendar is set to public

2. If private, ensure you're logged into Google

3. Try using an incognito window to test public access

### Styling Issues

**Problem**: Layout broken or styles not applying

**Solutions**:

1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

2. Check that CSS files are loading (Network tab in DevTools)

3. Verify file paths are correct

4. Check for CSS syntax errors

### Mobile Display Issues

**Problem**: Site doesn't look good on mobile

**Solutions**:

1. Ensure `responsive.css` is loading

2. Check viewport meta tag is present

3. Test on actual device, not just browser resize

4. Use Chrome DevTools device emulation

---

## Need More Help?

* Check the main [README.md](../README.md)

* Open an issue on GitHub

* Review Google Calendar's [official embed documentation](https://support.google.com/calendar/answer/41207)

---

**Happy scheduling! 📅**
