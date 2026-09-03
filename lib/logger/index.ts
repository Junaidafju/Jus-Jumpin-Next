import fs from 'fs';
import path from 'path';

const LOG_FILE = path.join(process.cwd(), 'logs', 'chat-logs.txt');

// Ensure logs directory exists
export function ensureLogDirectory() {
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
}

export function logUserQuery(
    question: string,
    answer: string,
    ipAddress: string,
    userAgent?: string
) {
    ensureLogDirectory();

    const timestamp = new Date().toISOString();
    const logEntry = `
================================================================================
📅 Date & Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
🕐 UTC: ${timestamp}
🌐 IP Address: ${ipAddress}
🖥️ User Agent: ${userAgent || 'Unknown'}
📝 User Question: ${question}
🤖 AI Response: ${answer}
--------------------------------------------------------------------------------
`;

    try {
        fs.appendFileSync(LOG_FILE, logEntry);
        console.log('✅ Query logged successfully');
    } catch (error) {
        console.error('❌ Failed to log query:', error);
    }
}

export function getLogs(limit: number = 100): string {
    ensureLogDirectory();

    try {
        const content = fs.readFileSync(LOG_FILE, 'utf-8');
        const entries = content.split('================================================================================');
        const recent = entries.slice(-limit);
        return recent.join('================================================================================');
    } catch (error) {
        return 'No logs found';
    }
}