import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { searchKnowledge, resolveLocationFromText, SearchKnowledgeResult } from '@/lib/knowledge/search';
import { logUserQuery } from '@/lib/logger';
import { LocationData } from '@/types/location';

interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface ChatRequestBody {
    question: string;
    history?: ChatMessage[];
    location?: string;
}

/**
 * Distinguishes explicit booking intent from informational inquiries.
 */
export function isBookingIntent(query: string): boolean {
    const q = query.toLowerCase().trim();

    // Purely exploratory or informational questions without booking action
    const isInformational =
        /\b(what (are|is|do)|how much|what's the (price|cost|rate)|pricing of|ticket prices?|package details?|what is included|tell me about packages|do you offer packages)\b/i.test(q);

    // Explicit command / intent to directly book
    const hasExplicitBookingAction =
        /\b(i (need|want|would like|'d like) to book|need to book|want to book|book now|start booking|open (the )?booking|please book (a |the )?(party|slot|ticket)|let's book|help me book|book (a |the )?(party|birthday|slot|session)|reserve (a |the )?(party|slot|table))\b/i.test(q);

    if (hasExplicitBookingAction) {
        return true;
    }

    if (isInformational) {
        return false;
    }

    // Direct single booking command
    if (/^(book|booking|reserve|reservation|book now|start booking|open booking|book party|book party now|book slot now)$/i.test(q)) {
        return true;
    }

    return false;
}

/**
 * Scans conversation history backwards to retain resolved location across turns.
 */
function extractLocationFromHistory(
    history?: ChatMessage[],
    clientLocation?: string
): LocationData | undefined {
    if (clientLocation) {
        const fromClient = resolveLocationFromText(clientLocation);
        if (fromClient) return fromClient;
    }

    if (!history || !Array.isArray(history) || history.length === 0) {
        return undefined;
    }

    for (let i = history.length - 1; i >= 0; i--) {
        const msg = history[i];
        if (msg && msg.content) {
            const loc = resolveLocationFromText(msg.content);
            if (loc) {
                return loc;
            }
        }
    }

    return undefined;
}

export async function POST(req: Request) {
    let question = '';
    let ipAddress = '::1';
    let userAgent = 'Unknown';

    try {
        const body: ChatRequestBody = await req.json();
        question = (body.question || '').trim();
        const history: ChatMessage[] = body.history || [];
        const clientLocation: string | undefined = body.location;

        // Extract IP & User Agent for logging
        const forwardedFor = req.headers.get('x-forwarded-for');
        const realIp = req.headers.get('x-real-ip');
        ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || '::1');
        userAgent = req.headers.get('user-agent') || 'Unknown';

        if (!question) {
            return NextResponse.json({
                answer: '👋 How can I help you today? Ask me about our locations, ticket prices, timings, activities, or party bookings!'
            });
        }

        // -------------------------------------------------------------
        // Step 1: Multi-Turn Location Resolution
        // -------------------------------------------------------------
        const locationInQuery = resolveLocationFromText(question);
        const contextLocation = locationInQuery || extractLocationFromHistory(history, clientLocation);

        // -------------------------------------------------------------
        // Step 2: Explicit Booking Intent Detection
        // -------------------------------------------------------------
        if (isBookingIntent(question)) {
            const locationLabel = contextLocation ? `${contextLocation.city} - ${contextLocation.mall}` : undefined;
            const bookingResponse = `🎉 **Let's plan your celebration!**\n\nI've opened the booking card below${locationLabel ? ` for **${locationLabel}**` : ''}. Please enter your name, contact details, date, and party size.\n\nOur team will confirm your booking within 24 hours. You can also reach us directly at **${contextLocation?.phone || '+91 98362 29922'}**!`;

            logUserQuery(question, bookingResponse, ipAddress, userAgent);

            return NextResponse.json({
                answer: bookingResponse,
                showBookingForm: true,
                locationFound: locationLabel,
                knowledgeUsed: true
            });
        }

        // -------------------------------------------------------------
        // Step 3: Knowledge Search & Deterministic Facts
        // -------------------------------------------------------------
        const knowledgeResult: SearchKnowledgeResult = searchKnowledge(question, contextLocation);

        // If knowledge search produced a deterministic answer
        if (knowledgeResult.isDeterministicFact) {
            logUserQuery(question, knowledgeResult.results, ipAddress, userAgent);

            return NextResponse.json({
                answer: knowledgeResult.results,
                locationFound: knowledgeResult.locationFound,
                knowledgeUsed: true,
                showBookingForm: false
            });
        }

        // -------------------------------------------------------------
        // Step 4: Small Talk / Greetings (Deterministic)
        // -------------------------------------------------------------
        const qLower = question.toLowerCase();
        if (/^(hi|hello|hey|hy|greetings|hola|namaste|good (morning|afternoon|evening))\b/i.test(qLower)) {
            const greeting = `👋 **Hello! Welcome to Jus Jumpin!**\n\nI'm your AI assistant. How can I help you today?\n\n• 💰 **Ticket Pricing & Packages**\n• ⏰ **Operating Hours & Timings**\n• 🎮 **Activities & Play Zones**\n• 📍 **Location Addresses & Directions**\n• 🎉 **Birthday Party & Event Booking**`;
            logUserQuery(question, greeting, ipAddress, userAgent);

            return NextResponse.json({
                answer: greeting,
                locationFound: knowledgeResult.locationFound,
                knowledgeUsed: false,
                showBookingForm: false
            });
        }

        if (/^(who are you|what is your name|tell me your name|your name)\b/i.test(qLower)) {
            const identity = `🤖 I'm **JusJumpin's AI Assistant**!\n\nI'm here to provide real-time information about all our 20+ trampoline and adventure parks across India, tickets, hours, activities, and party bookings.`;
            logUserQuery(question, identity, ipAddress, userAgent);

            return NextResponse.json({
                answer: identity,
                locationFound: knowledgeResult.locationFound,
                knowledgeUsed: false,
                showBookingForm: false
            });
        }

        // -------------------------------------------------------------
        // Step 5: LLM Call for Nuanced Queries with Full Context
        // -------------------------------------------------------------
        let aiAnswer: string | null = null;
        const openRouterApiKey = process.env.OPENROUTER_API_KEY;

        if (openRouterApiKey && openRouterApiKey.trim() !== '') {
            try {
                const openrouter = new OpenAI({
                    apiKey: openRouterApiKey,
                    baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
                    timeout: 7000
                });

                const systemPrompt = `You are the friendly, energetic, and professional AI Assistant for Jus Jumpin (India's premier indoor trampoline and adventure parks).
Answer the user's question accurately using ONLY the provided Jus Jumpin Knowledge Base context.

Rules:
1. Always base facts (locations, timings, prices, activities, contact info) strictly on the Knowledge Base. Do NOT make up information.
2. If the user asks about prices or hours and no location is specified, ask which city or mall they are visiting.
3. Keep responses clean, engaging, concise, and formatted in clear markdown.
4. If asked about booking, direct them to tap the "Book Party" button or contact +91 98362 29922.

--- JUS JUMPIN KNOWLEDGE BASE ---
${knowledgeResult.results}
---------------------------------`;

                const messagesForLLM: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
                    { role: 'system', content: systemPrompt },
                    ...history.slice(-4).map(m => ({
                        role: m.role as 'user' | 'assistant',
                        content: m.content
                    })),
                    { role: 'user', content: question }
                ];

                const completion = await openrouter.chat.completions.create({
                    model: 'openai/gpt-4o-mini',
                    messages: messagesForLLM,
                    max_tokens: 350,
                    temperature: 0.3
                });

                aiAnswer = completion.choices[0]?.message?.content || null;
            } catch (llmError) {
                console.warn('⚠️ LLM call failed or timed out, falling back to structured knowledge:', llmError);
            }
        }

        // -------------------------------------------------------------
        // Step 6: Fallback to Structured Knowledge (Zero Hallucination)
        // -------------------------------------------------------------
        const finalAnswer = aiAnswer && aiAnswer.trim() ? aiAnswer : knowledgeResult.results;

        logUserQuery(question, finalAnswer, ipAddress, userAgent);

        return NextResponse.json({
            answer: finalAnswer,
            locationFound: knowledgeResult.locationFound,
            knowledgeUsed: true,
            showBookingForm: false
        });

    } catch (error: any) {
        console.error('❌ Chat API Error:', error);
        const fallbackAnswer = `I'm here to help! Please ask me about our locations (Kolkata, Bengaluru, Hyderabad, Noida, Mumbai, Pune, etc.), ticket pricing, or call us at +91 98362 29922.`;

        logUserQuery(question || 'Error Request', fallbackAnswer, ipAddress, userAgent);

        return NextResponse.json({
            answer: fallbackAnswer,
            knowledgeUsed: false,
            showBookingForm: false
        });
    }
}