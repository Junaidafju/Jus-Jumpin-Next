import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const BOOKING_LOG_FILE = path.join(process.cwd(), 'logs', 'bookings.txt');

function ensureLogDirectory() {
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
}

interface BookingRecord {
    name: string;
    phone: string;
    email?: string;
    people: string;
    location?: string;
    date?: string;
    time?: string;
    specialRequests?: string;
    childName?: string;
    childAge?: string;
    package?: string;
    bookingSource?: string;
    ipAddress: string;
}

function logBooking(data: BookingRecord) {
    ensureLogDirectory();

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const logEntry = `
========================================
📅 Timestamp: ${timestamp}
🏷️ Source: ${data.bookingSource || 'Website'}
👤 Contact Name: ${data.name}
📱 Phone: ${data.phone}
📧 Email: ${data.email || 'N/A'}
🎂 Child Name: ${data.childName || 'N/A'}
🎈 Turning Age: ${data.childAge ? `${data.childAge} years` : 'N/A'}
🎊 Package: ${data.package || 'N/A'}
👥 Guests: ${data.people}
📍 Location: ${data.location || 'Not Specified'}
📅 Preferred Date: ${data.date || 'N/A'}
⏰ Preferred Time: ${data.time || 'N/A'}
📝 Requests / Theme: ${data.specialRequests || 'None'}
🌐 IP: ${data.ipAddress}
----------------------------------------
`;

    try {
        fs.appendFileSync(BOOKING_LOG_FILE, logEntry);
        console.log('✅ Booking logged to file successfully');
    } catch (err) {
        console.error('❌ Failed to log booking to file:', err);
    }
}

async function sendBookingEmail(data: BookingRecord) {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;
    const to = process.env.BOOKING_EMAIL || user;

    if (!host || !user || !pass || !to) {
        console.log('ℹ️ SMTP configuration not complete in environment variables. Email notification skipped.');
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: process.env.SMTP_SECURE === 'true' || port === 465,
            auth: { user, pass }
        });

        // 1. Notification to Jus Jumpin Management / Events Team
        const adminSubject = `🎉 New Party Booking: ${data.childName ? `${data.childName}'s Birthday - ` : ''}${data.name} (${data.location || 'General'})`;

        const adminHtml = `
            <div style="font-family: Arial, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px;">
                <div style="background: linear-gradient(135deg, #FE5000 0%, #1b3a5c 100%); padding: 20px; border-radius: 12px; text-align: center; color: #ffffff;">
                    <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">📸 JUS JUMPIN BOOKING REQUEST</h1>
                    <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9;">Source: ${data.bookingSource || 'Website Form'}</p>
                </div>

                <div style="background: #ffffff; padding: 20px; margin-top: 16px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                    <h2 style="color: #1b3a5c; font-size: 16px; border-bottom: 2px solid #FE5000; padding-bottom: 8px; margin-top: 0;">👤 Contact Details</h2>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
                        <tr><td style="padding: 8px 0; color: #64748b; width: 35%;">Contact Name:</td><td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${data.name}</td></tr>
                        <tr><td style="padding: 8px 0; color: #64748b;">Phone Number:</td><td style="padding: 8px 0; font-weight: bold; color: #0f172a;"><a href="tel:${data.phone}" style="color: #FE5000; text-decoration: none;">+91 ${data.phone}</a></td></tr>
                        <tr><td style="padding: 8px 0; color: #64748b;">Email Address:</td><td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${data.email ? `<a href="mailto:${data.email}" style="color: #3080c0; text-decoration: none;">${data.email}</a>` : 'N/A'}</td></tr>
                        <tr><td style="padding: 8px 0; color: #64748b;">IP Address:</td><td style="padding: 8px 0; color: #64748b; font-size: 12px;">${data.ipAddress}</td></tr>
                    </table>

                    <h2 style="color: #1b3a5c; font-size: 16px; border-bottom: 2px solid #3080c0; padding-bottom: 8px; margin-top: 16px;">🎂 Party & Event Details</h2>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                        ${data.childName ? `<tr><td style="padding: 8px 0; color: #64748b; width: 35%;">Birthday Child:</td><td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${data.childName} ${data.childAge ? `(Turning ${data.childAge})` : ''}</td></tr>` : ''}
                        ${data.package ? `<tr><td style="padding: 8px 0; color: #64748b;">Selected Package:</td><td style="padding: 8px 0; font-weight: bold; color: #FE5000;">${data.package}</td></tr>` : ''}
                        <tr><td style="padding: 8px 0; color: #64748b;">Preferred Location:</td><td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${data.location || 'Not Specified'}</td></tr>
                        <tr><td style="padding: 8px 0; color: #64748b;">Preferred Date:</td><td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${data.date || 'To be decided'}</td></tr>
                        <tr><td style="padding: 8px 0; color: #64748b;">Preferred Time:</td><td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${data.time || 'Flexible'}</td></tr>
                        <tr><td style="padding: 8px 0; color: #64748b;">Number of Guests:</td><td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${data.people}</td></tr>
                        <tr><td style="padding: 8px 0; color: #64748b; vertical-align: top;">Special Requests / Theme:</td><td style="padding: 8px 0; color: #334155; font-style: italic;">${data.specialRequests || 'None provided'}</td></tr>
                    </table>
                </div>

                <div style="margin-top: 20px; text-align: center; color: #64748b; font-size: 12px;">
                    <p style="margin: 0;">Please follow up with the customer within 24 hours at <strong style="color: #0f172a;">+91 ${data.phone}</strong>.</p>
                </div>
            </div>
        `;

        await transporter.sendMail({
            from: `"Jus Jumpin Bookings" <${from}>`,
            to,
            subject: adminSubject,
            html: adminHtml,
        });
        console.log('✅ Admin booking notification email dispatched successfully');

        // 2. Customer Acknowledgment Email (If email provided)
        if (data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
            const customerHtml = `
                <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px;">
                    <div style="background: linear-gradient(135deg, #FE5000 0%, #3080c0 100%); padding: 24px; border-radius: 12px; text-align: center; color: #ffffff;">
                        <h1 style="margin: 0; font-size: 24px; font-weight: 800;">🎉 We've Received Your Booking Request!</h1>
                        <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.95;">Get ready for an unforgettable celebration at Jus Jumpin!</p>
                    </div>

                    <div style="background: #ffffff; padding: 20px; margin-top: 16px; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <p style="font-size: 15px; color: #334155; margin-top: 0;">Hi <strong>${data.name}</strong>,</p>
                        <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                            Thank you for choosing Jus Jumpin! We have received your party booking request ${data.childName ? `for <strong>${data.childName}'s Birthday</strong>` : ''}.
                        </p>
                        
                        <div style="background: #e7f4ff; border: 2px solid #b4d4f0; border-radius: 10px; padding: 16px; margin: 16px 0;">
                            <h3 style="color: #1b3a5c; margin: 0 0 10px; font-size: 15px;">📋 Booking Summary</h3>
                            <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 13px; line-height: 1.8;">
                                <li><strong>Location:</strong> ${data.location || 'General'}</li>
                                <li><strong>Date & Time:</strong> ${data.date || 'To be confirmed'} ${data.time ? `at ${data.time}` : ''}</li>
                                <li><strong>Guests:</strong> ${data.people}</li>
                                ${data.package ? `<li><strong>Package:</strong> ${data.package}</li>` : ''}
                            </ul>
                        </div>

                        <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                            Our event coordinator will contact you at <strong>+91 ${data.phone}</strong> within 24 hours to confirm your party details, decorations, and schedule!
                        </p>

                        <div style="border-top: 1px solid #e2e8f0; margin-top: 20px; padding-top: 16px; text-align: center;">
                            <p style="font-size: 13px; color: #64748b; margin: 0;">Have urgent questions? Call our team directly at <a href="tel:+919836229922" style="color: #FE5000; font-weight: bold; text-decoration: none;">+91 98362 29922</a>.</p>
                        </div>
                    </div>
                </div>
            `;

            await transporter.sendMail({
                from: `"Jus Jumpin Celebrations" <${from}>`,
                to: data.email.trim(),
                subject: `🎉 Booking Request Received: Jus Jumpin Celebration!`,
                html: customerHtml,
            }).catch(err => console.warn('Customer confirmation email failed:', err));
        }

    } catch (err) {
        console.warn('⚠️ Could not send booking notification email (logged locally to file):', err);
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Harmonize field naming between Birthday Modal and Chatbot Booking
        const name = (body.name || body.parentName || '').trim();
        const rawPhone = (body.phone || '').toString().trim();
        const email = (body.email || '').trim();
        const location = (body.location || '').trim();
        const people = (body.people || body.guestCount || '10').toString().trim();
        const date = (body.date || body.partyDate || '').trim();
        const time = (body.time || body.partyTime || '').trim();
        const specialRequests = (body.specialRequests || body.message || '').trim();
        const childName = (body.childName || '').trim();
        const childAge = body.childAge ? body.childAge.toString().trim() : '';
        const selectedPackage = (body.package || '').trim();
        const bookingSource = (body.bookingSource || (childName ? 'Birthday Celebration Page' : 'Website Booking')).trim();

        // 1. Full Name Validation
        if (!name || name.length < 2) {
            return NextResponse.json({ error: 'Please provide a valid full name (at least 2 characters).' }, { status: 400 });
        }

        // 2. Phone Number Validation (Standardize Indian 10-digit mobile)
        const cleanDigits = rawPhone.replace(/\D/g, '');
        let normalizedPhone = cleanDigits;
        if (cleanDigits.length === 12 && cleanDigits.startsWith('91')) {
            normalizedPhone = cleanDigits.slice(2);
        } else if (cleanDigits.length === 11 && cleanDigits.startsWith('0')) {
            normalizedPhone = cleanDigits.slice(1);
        }

        if (!/^[6-9]\d{9}$/.test(normalizedPhone) && cleanDigits.length < 10) {
            return NextResponse.json(
                { error: 'Please enter a valid 10-digit mobile number (e.g. 9876543210).' },
                { status: 400 }
            );
        }

        // 3. Email Validation (if provided)
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Please enter a valid email address.' },
                { status: 400 }
            );
        }

        // 4. IP extraction
        const forwardedFor = req.headers.get('x-forwarded-for');
        const realIp = req.headers.get('x-real-ip');
        const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || '::1');

        const bookingData: BookingRecord = {
            name,
            phone: normalizedPhone || rawPhone,
            email,
            people,
            location,
            date,
            time,
            specialRequests,
            childName,
            childAge,
            package: selectedPackage,
            bookingSource,
            ipAddress
        };

        // 1. Log to server file
        logBooking(bookingData);

        // 2. Dispatch email notification in background (non-blocking)
        sendBookingEmail(bookingData).catch(err => console.error('Email dispatch error:', err));

        return NextResponse.json({
            success: true,
            message: '🎉 Booking request submitted successfully! Our events coordinator will contact you within 24 hours.'
        });

    } catch (error: any) {
        console.error('❌ Bookings API Error:', error);
        return NextResponse.json(
            { error: 'An error occurred while processing your booking. Please try again or call +91 98362 29922.' },
            { status: 500 }
        );
    }
}