import Chatbot from '../components/Chatbot';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Chat with JusJumpin AI Assistant',
    description: 'Ask JusJumpin AI about our locations, pricing, activities, and book your next party!',
};

export default function ChatPage() {
    return (
        <main className="min-h-screen bg-[#0d0d17] text-slate-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-sm px-6 py-2 rounded-full border border-violet-500/30 mb-4">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-300">
                            🤖 AI Assistant
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent mb-3 tracking-tight">
                        Chat with JusJumpin AI
                    </h1>
                    <p className="text-base text-slate-400 max-w-xl mx-auto">
                        Get instant details about all 20+ trampoline parks, ticket rates, timings, games, and plan your party celebrations!
                    </p>
                </div>

                {/* Chatbot Card - Modern Kaily Theme */}
                <div
                    data-lenis-prevent="true"
                    className="max-w-2xl mx-auto h-[650px] rounded-[28px] overflow-hidden shadow-[0_25px_80px_rgba(99,69,252,0.25)] border border-slate-700/60"
                >
                    <Chatbot />
                </div>

                {/* Quick Feature Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
                    <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-800/80 text-center">
                        <div className="text-2xl mb-1">📍</div>
                        <div className="text-xs font-semibold text-slate-300">20+ Locations</div>
                    </div>
                    <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-800/80 text-center">
                        <div className="text-2xl mb-1">🎮</div>
                        <div className="text-xs font-semibold text-slate-300">25+ Activities</div>
                    </div>
                    <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-800/80 text-center">
                        <div className="text-2xl mb-1">🎉</div>
                        <div className="text-xs font-semibold text-slate-300">Party Packages</div>
                    </div>
                    <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-800/80 text-center">
                        <div className="text-2xl mb-1">💬</div>
                        <div className="text-xs font-semibold text-slate-300">Instant Answers</div>
                    </div>
                </div>
            </div>
        </main>
    );
}