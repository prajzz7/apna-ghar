import React from 'react';
import { Header } from './Header';

export function Layout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-1 w-full">
                <div className="container-custom py-8 md:py-10">
                    {children}
                </div>
            </main>
            <footer className="bg-white border-t border-gray-200 py-6">
                <div className="container-custom text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Apna Ghar. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
