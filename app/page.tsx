/* eslint-disable react/jsx-no-comment-textnodes */
import { cn } from '@/lib/utils';
import { Antonio } from 'next/font/google';
import Link from 'next/link';

const antionio = Antonio({
    weight: ['300', '400', '700'],
    subsets: ['latin'],
});

export default function FT3Home() {
    const features = [
        {
            id: '01',
            category: 'FRONTEND',
            title: 'Next.js Framework & shadcn/ui',
            desc: 'Pre-configured App Router with Tailwind CSS, TypeScript, and fully customizable shadcn/ui primitives out of the box.',
        },
        {
            id: '02',
            category: 'BACKEND',
            title: 'Opinionated NestJS Framework',
            desc: 'Strict, robust enterprise-level codebase structure. Layered architecture with built-in validation, filters, and guards.',
        },
        {
            id: '03',
            category: 'DATASTORE',
            title: 'Drizzle ORM + SQLite',
            desc: 'Type-safe SQL schemas with zero-overhead performance. Local SQLite datastore setup with automated migration generation.',
        },
        {
            id: '04',
            category: 'SECURITY',
            title: 'Highly Customizeable Authentication',
            desc: 'Secure production-ready authentication wrapper with strict JWT/Session validation and role-based route guard access.',
        },
    ];

    const initCommands = ['git clone https://github.com/aliefkhairul/ft3-starterkit.git', 'cd ft3-starterkit', 'npm run bootstrap // installs monorepo deps & generates drizzle schemas'];

    return (
        <div className="w-full min-h-screen bg-neutral-950 text-neutral-100 font-mono text-xs uppercase overflow-x-hidden selection:bg-neutral-100 selection:text-neutral-950">
            <div className="absolute inset-0 w-full h-full grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-900 pointer-events-none z-0">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <header className="w-full border-b border-neutral-800 p-4 md:p-6 flex justify-between items-center relative z-10 bg-neutral-950/80 backdrop-blur-xs">
                <div className="flex items-center gap-4">
                    <span className={cn('text-3xl font-bold tracking-tighter text-neutral-100', antionio.className)}>FT3</span>
                    <span className="text-[10px] text-neutral-600 border border-neutral-800 px-1.5 py-0.5 hidden sm:inline-block">V0.0.1_BETA</span>
                </div>
                <div className="flex items-center gap-6 text-[11px]">
                    <span className="text-neutral-600 hidden md:inline">// ARCH: MULTI-WORKSPACE</span>
                    <Link href="https://github.com/aliefkhairul" target="_blank" className="hover:text-neutral-400 transition-colors">
                        [ GET_SOURCE_CODE ]
                    </Link>
                </div>
            </header>

            <section className="w-full min-h-[80vh] flex flex-col justify-between p-4 sm:p-8 md:p-12 relative z-10 border-b border-neutral-800">
                <div className="text-neutral-600 text-[10px] tracking-widest mt-4">// PRODUCTION-READY MONOREPO ARCHITECTURE</div>

                <div className="my-12 max-w-5xl">
                    <div className="flex items-center gap-2">
                        <h2 className="text-neutral-500 text-lg sm:text-2xl tracking-widest font-light lowercase font-sans">fullstack</h2>
                        <span className="font-mono text-xs sm:text-sm uppercase bg-neutral-900 text-neutral-300 px-1.5 py-0.5 border border-neutral-800">with typescript</span>
                    </div>

                    <div className="flex flex-col gap-1 mb-6 -ml-2">
                        <h1 className={cn('text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-balance leading-[0.85] text-neutral-100', antionio.className)}>SCAFFOLD FAST</h1>
                        <h1 className={cn('text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-balance leading-[0.85] text-neutral-100', antionio.className)}>BUILD RUGGED.</h1>
                    </div>

                    <p className="max-w-xl text-neutral-400 normal-case font-sans text-sm sm:text-base leading-relaxed">
                        An elite TypeScript boiler-environment combining Next.js + shadcn/ui interactive speed with an opinionated, strict NestJS enterprise core. Backed by the blistering speed of
                        Drizzle ORM and localized SQLite. Isolated, type-safe, and ready for instant deployment.
                    </p>
                </div>

                <div className="w-full max-w-xl bg-neutral-950 border border-neutral-800 p-4 font-mono text-[11px] relative group mt-6">
                    <div className="absolute top-0 right-0 px-2 py-0.5 bg-neutral-900 text-neutral-500 border-l border-b border-neutral-800 text-[9px]">TERMINAL_INIT</div>
                    <div className="flex flex-col gap-1 text-neutral-400 select-all tracking-normal lowercase font-sans">
                        {initCommands.map((cmd, idx) => (
                            <div key={idx} className="flex gap-2">
                                <span className="text-neutral-600 font-mono uppercase select-none">$</span>
                                <span>{cmd}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full p-4 sm:p-8 md:p-12 relative z-10 border-b border-neutral-800 bg-neutral-950">
                <div className="w-full flex justify-between items-center border-b border-neutral-800 pb-4 mb-8">
                    <span className="text-neutral-500 tracking-widest">[ ENGINE COMPONENT SPECIFICATIONS ]</span>
                    <span className="text-neutral-700 text-[10px] hidden sm:block">04 // DRIZZLE_DRILL_SYSTEMS</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map(feat => (
                        <div
                            key={feat.id}
                            className="border border-neutral-900 bg-neutral-950 p-6 flex flex-col justify-between h-64 relative group hover:border-neutral-700 transition-colors duration-300"
                        >
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-800 group-hover:border-neutral-500"></div>

                            <div>
                                <div className="flex justify-between items-center text-neutral-600 mb-4 text-[10px]">
                                    <span>// {feat.category}</span>
                                    <span>[{feat.id}]</span>
                                </div>
                                <h4 className={cn('text-2xl font-bold tracking-tight text-neutral-200 group-hover:text-neutral-100 transition-colors', antionio.className)}>{feat.title}</h4>
                            </div>

                            <p className="mt-auto text-neutral-500 font-sans normal-case text-xs leading-relaxed pt-4 border-t border-neutral-900">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="w-full p-4 sm:p-8 md:p-12 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-neutral-500 bg-neutral-950">
                <div className="flex flex-col gap-1">
                    <span className="text-neutral-600 text-[10px]">// PRE-CONFIGURED STACK BUNDLE</span>
                    <div className="text-neutral-300 font-bold tracking-widest text-sm">NEXTJS + SHADCN / OPINIONATED NESTJS / DRIZZLE ORM / SQLITE / AUTH</div>
                </div>
                <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-2 text-neutral-200 text-[11px]">
                    <span className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full"></span>
                    READY FOR INITIALIZATION_
                </div>
            </section>

            <footer className="w-full bg-neutral-950 border-t border-neutral-900 p-6 md:p-12 text-[10px] text-neutral-600 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <span>FT3_MONOREPO_KIT ©2026</span>
                    <span>MIT_LICENSE</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/" className="hover:text-neutral-400 transition-colors">
                        [ RETURN_TO_CORE_WORKSPACE ]
                    </Link>
                </div>
            </footer>
        </div>
    );
}
