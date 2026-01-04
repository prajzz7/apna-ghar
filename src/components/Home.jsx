import React from 'react';
import { ListingCard } from './ListingCard';
import { apartments } from '../data/apartments';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                        Your Visits
                    </h1>
                    <p className="text-slate-500 mt-1">Track and compare your potential dream homes</p>
                </div>
                <span className="self-start sm:self-auto bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
                    {apartments.length} Properties
                </span>
            </div>

            <div className="grid-responsive">
                {apartments.map((apt) => (
                    <ListingCard
                        key={apt.id}
                        apartment={apt}
                        onClick={(apt) => navigate(`/apartment/${apt.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
