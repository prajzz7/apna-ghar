import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="container-custom flex items-center h-16">
                <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                    <Building2 className="w-6 h-6 text-blue-600" />
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Apna Ghar
                    </h1>
                </Link>
            </div>
        </header>
    );
}
