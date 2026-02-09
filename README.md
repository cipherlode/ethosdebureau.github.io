# Ethikos Bureau - Premium Fraud Recovery Website

A modern, multi-page website for Ethikos Bureau featuring advanced animations, live chat, WhatsApp integration, and backend API for form submissions.

## 🚀 Features

### Frontend Features
- ✅ **Modern Premium Design** - Sophisticated design with Playfair Display & DM Sans fonts
- ✅ **Multi-Page Architecture** - Home, Services, About, Case Studies, Blog, Contact
- ✅ **Advanced Animations** - Scroll-triggered reveals, fade effects, parallax
- ✅ **Live Chat Widget** - Interactive chat with bot responses
- ✅ **WhatsApp Integration** - Floating WhatsApp button
- ✅ **Animated Statistics** - Counter animations for recovery stats
- ✅ **Mobile Responsive** - Fully responsive design for all devices
- ✅ **Sticky Navigation** - Fixed header with dropdown menus
- ✅ **Smooth Scrolling** - Enhanced UX with smooth page transitions

### Backend Features
- ✅ **PHP API Endpoint** - Form submission handler
- ✅ **Email Notifications** - HTML email templates for admin & clients
- ✅ **Form Validation** - Server-side validation and sanitization
- ✅ **Database Ready** - Prepared statements for MySQL integration
- ✅ **Logging System** - File-based submission logging

## 📁 Project Structure

```
ethikos-website/
├── index.html              # Homepage
├── css/
│   ├── main.css           # Main stylesheet with design system
│   └── animations.css     # Advanced CSS animations
├── js/
│   ├── main.js           # Core JavaScript functionality
│   ├── animations.js     # Animation controllers
│   └── chat.js           # Live chat functionality
├── api/
│   └── submit-case.php   # Form submission endpoint
└── pages/
    ├── contact.html      # Contact page with form
    ├── services.html     # Services page (to be created)
    ├── about.html        # About page (to be created)
    ├── case-studies.html # Case studies (to be created)
    ├── blog.html         # Blog/Resources (to be created)
    └── login.html        # Client portal login (to be created)
```

## 🛠️ Installation

### Prerequisites
- Web server (Apache/Nginx)
- PHP 7.4+
- MySQL 5.7+ (optional, for database integration)

### Step 1: Upload Files
Upload all files to your web server's public directory (e.g., `public_html`).

### Step 2: Configure Email
Edit `api/submit-case.php` and update:
```php
$to_email = 'your-email@yourdomain.com'; // Change to your email
$from_email = 'noreply@yourdomain.com';  // Change to your domain
```

### Step 3: Set Permissions
```bash
chmod 755 api/
chmod 644 api/submit-case.php
```

### Step 4: Test the Contact Form
1. Visit: `https://yourdomain.com/pages/contact.html`
2. Fill out and submit the form
3. Check your email for notifications

## 📧 Email Configuration

The website uses PHP's `mail()` function. For better deliverability, configure SMTP:

### Option 1: Using PHPMailer (Recommended)
```php
// Install PHPMailer
composer require phpmailer/phpmailer

// In submit-case.php, replace mail() with:
use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'your-email@gmail.com';
$mail->Password = 'your-app-password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
$mail->setFrom('noreply@yourdomain.com', 'Ethikos Bureau');
$mail->addAddress($to_email);
$mail->isHTML(true);
$mail->Subject = $subject;
$mail->Body = $email_body;
$mail->send();
```

### Option 2: Using SendGrid
```php
// Install SendGrid SDK
composer require sendgrid/sendgrid

// Use SendGrid API
$sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));
$email = new \SendGrid\Mail\Mail();
$email->setFrom("noreply@yourdomain.com", "Ethikos Bureau");
$email->setSubject($subject);
$email->addTo($to_email);
$email->addContent("text/html", $email_body);
$sendgrid->send($email);
```

## 💾 Database Integration (Optional)

### Create Database Schema
```sql
CREATE DATABASE ethikos_bureau;

USE ethikos_bureau;

CREATE TABLE cases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    case_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    scam_type VARCHAR(50) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('new', 'reviewing', 'in_progress', 'resolved', 'closed') DEFAULT 'new',
    assigned_to INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created (created_at)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'agent', 'client') DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE case_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    case_id INT NOT NULL,
    user_id INT NOT NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Enable Database in API
Uncomment the database code in `api/submit-case.php`:
```php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=ethikos_bureau', 'username', 'password');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $case_id = 'CASE-' . uniqid();
    $stmt = $pdo->prepare("INSERT INTO cases (case_id, name, email, phone, scam_type, amount, description) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$case_id, $name, $email, $phone, $scamType, $amount, $description]);
} catch(PDOException $e) {
    error_log("Database error: " . $e->getMessage());
}
```

## 🎨 Customization

### Update Colors
Edit `css/main.css` and change CSS variables:
```css
:root {
    --primary: #0a2540;        /* Main brand color */
    --accent: #00d4ff;         /* Accent color */
    --gold: #ffd700;           /* Highlight color */
}
```

### Update Contact Information
Find and replace throughout the site:
- Phone: `+1 (888) 123-4567`
- Email: `info@ethikosbureau.org`
- WhatsApp: Update link in `index.html`

### Customize Chat Bot Responses
Edit `js/chat.js` and modify the `getBotResponse()` function:
```javascript
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Add your custom responses
    if (message.includes('your-keyword')) {
        return "Your custom response";
    }
    
    // ... existing responses
}
```

## 🔐 Security Best Practices

1. **Enable HTTPS** - Use SSL certificate (Let's Encrypt)
2. **Update PHP** - Keep PHP version up to date
3. **Sanitize Inputs** - Already implemented in API
4. **Rate Limiting** - Add rate limiting to prevent spam
5. **CSRF Protection** - Implement CSRF tokens for forms
6. **Environment Variables** - Store sensitive data in `.env` file

### Example: Add CSRF Protection
```php
// In form:
session_start();
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));

<input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">

// In API:
session_start();
if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    die('Invalid CSRF token');
}
```

## 📱 WhatsApp Integration

Update the WhatsApp link in `index.html`:
```html
<a href="https://wa.me/YOUR_COUNTRY_CODE_PHONE?text=Hi%2C%20I%20need%20help%20recovering%20my%20funds" 
   class="whatsapp-float" target="_blank">
```

Replace `YOUR_COUNTRY_CODE_PHONE` with your number (e.g., `18881234567`).

## 🌐 SEO Optimization

Add to each page's `<head>`:
```html
<meta name="description" content="Expert fraud recovery specialists. Get your money back from crypto scams, romance fraud, and investment schemes. Free consultation.">
<meta name="keywords" content="fraud recovery, scam recovery, crypto recovery, romance scam, investment fraud">
<meta property="og:title" content="Ethikos Bureau - Fraud Recovery Specialists">
<meta property="og:description" content="$47M+ recovered for victims worldwide">
<meta property="og:image" content="https://yourdomain.com/images/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">

<!-- Schema Markup -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ethikos Bureau",
  "url": "https://ethikosbureau.org",
  "logo": "https://ethikosbureau.org/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-888-123-4567",
    "contactType": "customer service"
  }
}
</script>
```

## 📊 Analytics Integration

### Google Analytics
Add before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel
```html
<!-- Facebook Pixel -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

## 🐛 Troubleshooting

### Form Not Sending Emails
1. Check PHP `mail()` is configured on server
2. Verify email addresses in `api/submit-case.php`
3. Check spam folders
4. Enable error logging:
```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

### Chat Not Working
1. Check browser console for JavaScript errors
2. Verify `js/chat.js` is loaded
3. Clear browser cache

### Animations Not Playing
1. Ensure `css/animations.css` is loaded
2. Check `js/animations.js` is included
3. Verify IntersectionObserver is supported (modern browsers only)

## 📞 Support

For issues or questions:
- Email: support@ethikosbureau.org
- Phone: +1 (888) 123-4567

## 📄 License

© 2024 Ethikos Bureau. All rights reserved.

---

**Built with ❤️ using modern web technologies**
