<?php
/**
 * Template Name: Privacy Policy
 * 
 * The template for displaying the Privacy Policy page.
 *
 * @package NewJusJumpin
 */

get_header();
?>

<main id="primary" class="site-main">
    <section class="privacy-hero">
        <div class="container">
            <h1>Privacy Policy</h1>
            <p>Your privacy matters to us. Learn how we protect your information.</p>
        </div>
    </section>

    <section class="privacy-content">
        <div class="container">
            <div class="privacy-wrapper">
                <div class="privacy-intro">
                    <p>At Jus Jumpin, we value your trust and are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our premises, website, or engage with our services.</p>
                    <p><strong>By accessing or using Jus Jumpin services, you agree to the terms of this Privacy Policy.</strong></p>
                </div>

                <div class="privacy-section">
                    <h2>1. Information We Collect</h2>
                    <p>We may collect the following types of information:</p>
                    
                    <h3>a) Personal Information</h3>
                    <ul>
                        <li>Name, phone number, email address</li>
                        <li>Child's name and age (for bookings, safety, and party coordination)</li>
                        <li>Billing and payment-related details</li>
                    </ul>

                    <h3>b) Non-Personal Information</h3>
                    <ul>
                        <li>Website usage data</li>
                        <li>Device, browser, and IP address</li>
                        <li>Cookies and analytics data</li>
                    </ul>
                </div>

                <div class="privacy-section">
                    <h2>2. How We Use Your Information</h2>
                    <p>Your information may be used to:</p>
                    <ul>
                        <li>Process bookings, registrations, and payments</li>
                        <li>Communicate booking confirmations, updates, or offers</li>
                        <li>Ensure safety, age verification, and compliance with play rules</li>
                        <li>Improve our services, website, and customer experience</li>
                        <li>Comply with legal or regulatory obligations</li>
                    </ul>
                </div>

                <div class="privacy-section">
                    <h2>3. Children's Privacy</h2>
                    <p>Jus Jumpin primarily serves children; however, personal information is collected only from parents or legal guardians.</p>
                    <p>We do not knowingly collect personal data directly from children without parental consent.</p>
                </div>

                <div class="privacy-section">
                    <h2>4. Sharing of Information</h2>
                    <p>We do not sell, trade, or rent your personal information.</p>
                    <p>Information may be shared only with:</p>
                    <ul>
                        <li>Authorized service providers (payment processors, booking tools)</li>
                        <li>Legal authorities if required by law or safety obligations</li>
                    </ul>
                    <p>All third parties are required to maintain confidentiality and data security.</p>
                </div>

                <div class="privacy-section">
                    <h2>5. Data Security</h2>
                    <p>We implement reasonable administrative, technical, and physical safeguards to protect your information against unauthorized access, loss, misuse, or disclosure.</p>
                    <p>While we strive to protect your data, no system can guarantee 100% security.</p>
                </div>

                <div class="privacy-section">
                    <h2>6. Cookies & Tracking Technologies</h2>
                    <p>Our website may use cookies and similar technologies to:</p>
                    <ul>
                        <li>Improve website functionality</li>
                        <li>Understand user behavior</li>
                        <li>Enhance browsing experience</li>
                    </ul>
                    <p>You may choose to disable cookies through your browser settings.</p>
                </div>

                <div class="privacy-section">
                    <h2>7. Photography & Media Usage</h2>
                    <p>Photos or videos captured at Jus Jumpin premises may be used for promotional purposes unless explicitly declined by the parent or guardian at the time of visit or booking.</p>
                </div>

                <div class="privacy-section">
                    <h2>8. Your Rights</h2>
                    <p>You may:</p>
                    <ul>
                        <li>Request access to your personal information</li>
                        <li>Request correction or deletion of your data</li>
                        <li>Opt out of promotional communications</li>
                    </ul>
                    <p>Requests can be made using the contact details below.</p>
                </div>

                <div class="privacy-section">
                    <h2>9. Policy Updates</h2>
                    <p>Jus Jumpin may update this Privacy Policy at any time.</p>
                    <p>Changes will be effective immediately upon posting on our website or premises.</p>
                </div>

                <div class="privacy-section">
                    <h2>10. Contact Us</h2>
                    <p>For any questions or concerns regarding this Privacy Policy, please contact:</p>
                    <div class="contact-details">
                        <p><strong>Jus Jumpin</strong></p>
                        <p>📧 Email: <a href="mailto:info@jusjumpin.com">info@jusjumpin.com</a></p>
                        <p>📞 Phone: <a href="tel:+919874206206">+91 9874206206</a></p>
                        <p>🌐 Website: <a href="https://www.jusjumpin.com/" target="_blank" rel="noopener">https://www.jusjumpin.com/</a></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<style>
/* Privacy Policy Page Styles */
.privacy-hero {
    background: linear-gradient(rgba(46, 125, 50, 0.9), rgba(46, 125, 50, 0.95));
    color: white;
    padding: 100px 0 80px;
    text-align: center;
    position: relative;
}

.privacy-hero h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 20px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.privacy-hero p {
    font-size: 1.3rem;
    max-width: 700px;
    margin: 0 auto;
    opacity: 0.95;
}

.privacy-content {
    padding: 80px 0;
    background: #f8f9fa;
}

.privacy-wrapper {
    max-width: 900px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    padding: 50px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.privacy-intro {
    margin-bottom: 40px;
    padding-bottom: 30px;
    border-bottom: 2px solid #2e7d32;
}

.privacy-intro p {
    color: #555;
    line-height: 1.8;
    font-size: 1.05rem;
    margin-bottom: 15px;
}

.privacy-intro p:last-child {
    margin-bottom: 0;
}

.privacy-section {
    margin-bottom: 40px;
    padding-bottom: 30px;
    border-bottom: 1px solid #eee;
}

.privacy-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.privacy-section h2 {
    color: #2e7d32;
    font-size: 1.5rem;
    margin-bottom: 15px;
    font-weight: 700;
}

.privacy-section h3 {
    color: #333;
    font-size: 1.2rem;
    margin-top: 20px;
    margin-bottom: 12px;
    font-weight: 600;
}

.privacy-section p {
    color: #555;
    line-height: 1.8;
    font-size: 1.05rem;
    margin-bottom: 15px;
}

.privacy-section p:last-child {
    margin-bottom: 0;
}

.privacy-section ul {
    margin: 15px 0;
    padding-left: 30px;
}

.privacy-section ul li {
    color: #555;
    line-height: 1.8;
    font-size: 1.05rem;
    margin-bottom: 10px;
}

.privacy-section a {
    color: #2e7d32;
    text-decoration: none;
    font-weight: 600;
}

.privacy-section a:hover {
    text-decoration: underline;
}

.contact-details {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 10px;
    margin-top: 20px;
    border-left: 4px solid #2e7d32;
}

.contact-details p {
    margin-bottom: 10px;
}

.contact-details p:last-child {
    margin-bottom: 0;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .privacy-hero {
        padding: 80px 0 60px;
    }
    
    .privacy-hero h1 {
        font-size: 2.2rem;
    }
    
    .privacy-hero p {
        font-size: 1.1rem;
    }
    
    .privacy-wrapper {
        padding: 30px 25px;
    }
    
    .privacy-section h2 {
        font-size: 1.3rem;
    }

    .privacy-section h3 {
        font-size: 1.1rem;
    }
    
    .privacy-section ul {
        padding-left: 20px;
    }
}
</style>

<?php
get_footer();
?>