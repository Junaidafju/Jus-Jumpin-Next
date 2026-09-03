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

function logBooking(data: {
    name: string;
    phone: string;
    email?: string;
    people: string;
    location?: string;
    date?: string;
    time?: string;
    specialRequests?: string;
    ipAddress: string;
}) {
    ensureLogDirectory();

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const logEntry = `
========================================
📅 Date: ${timestamp}
👤 Name: ${data.name}
📱 Phone: ${data.phone}
📧 Email: ${data.email || 'N/A'}
👥 People: ${data.people}
📍 Location: ${data.location || 'Not Specified'}
📅 Preferred Date: ${data.date || 'N/A'}
⏰ Preferred Time: ${data.time || 'N/A'}
📝 Requests: ${data.specialRequests || 'None'}
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

async function sendBookingEmail(data: {
    name: string;
    phone: string;
    email?: string;
    people: string;
    location?: string;
    date?: string;
    time?: string;
    specialRequests?: string;
}) {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;
    const to = process.env.BOOKING_EMAIL || user;

    if (!host || !user || !pass || !to) {
        console.log('ℹ️ SMTP configuration not complete, skipping email dispatch.');
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: process.env.SMTP_SECURE === 'true',
            auth: { user, pass }
        });

        const mailOptions = {
            from,
            to,
            subject: `🎉 New Party Booking Request: ${data.name} (${data.location || 'General'})`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
                    <h2 style="color: #7c3aed;">🎉 New Jus Jumpin Party Booking</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${data.name}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${data.phone}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${data.email || 'N/A'}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Guests:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${data.people}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Location:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${data.location || 'Not Specified'}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Preferred Date:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${data.date || 'N/A'}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Preferred Time:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${data.time || 'N/A'}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9;">Special Requests:</td><td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${data.specialRequests || 'None'}</td></tr>
                    </table>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Booking notification email sent successfully');
    } catch (err) {
        console.warn('⚠️ Could not send booking notification email (logged locally):', err);
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, email, people, location, date, time, specialRequests } = body;

        // Validation
        if (!name || name.trim().length < 2) {
            return NextResponse.json({ error: 'Please provide a valid full name.' }, { status: 400 });
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phone || !phoneRegex.test(phone.trim())) {
            return NextResponse.json(
                { error: 'Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9.' },
                { status: 400 }
            );
        }

        if (!people || parseInt(people) < 1) {
            return NextResponse.json({ error: 'Please enter number of guests (minimum 1).' }, { status: 400 });
        }

        // IP extraction
        const forwardedFor = req.headers.get('x-forwarded-for');
        const realIp = req.headers.get('x-real-ip');
        const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || '::1');

        const bookingData = {
            name: name.trim(),
            phone: phone.trim(),
            email: (email || '').trim(),
            people: people.toString().trim(),
            location: (location || '').trim(),
            date: (date || '').trim(),
            time: (time || '').trim(),
            specialRequests: (specialRequests || '').trim(),
            ipAddress
        };

        // 1. Log to file
        logBooking(bookingData);

        // 2. Dispatch email in background (non-blocking)
        sendBookingEmail(bookingData).catch(err => console.error('Email dispatch error:', err));

        return NextResponse.json({
            success: true,
            message: '🎉 Booking request submitted successfully! We will contact you within 24 hours.'
        });

    } catch (error: any) {
        console.error('❌ Bookings API Error:', error);
        return NextResponse.json(
            { error: 'An error occurred while processing your booking. Please call +91 98362 29922.' },
            { status: 500 }
        );
    }
}