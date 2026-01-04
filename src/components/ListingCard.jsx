import React from 'react';
import { MapPin, ArrowRight, Home, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { resolveAsset } from '../utils/assetResolver';

export function ListingCard({ apartment, onClick }) {
    const coverSrc = apartment?.banner || (Array.isArray(apartment?.images) ? apartment.images[0] : null);

    return (
        <motion.div
            layoutId={`card-${apartment.id}`}
            className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 cursor-pointer"
            onClick={() => onClick(apartment)}
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                
                {/* Placeholder for image */}
                {coverSrc ? (
                    <img
                        src={resolveAsset(coverSrc)}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <Home size={32} className="text-slate-300" />
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 right-3 z-20">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm ${
                        apartment.status === 'Visited' ? 'bg-blue-500/90' :
                        apartment.status === 'Shortlisted' ? 'bg-green-500/90' :
                        'bg-purple-500/90'
                    } text-white`}>
                        {apartment.status}
                    </span>
                </div>

                {/* Hover Details */}
                <div className="absolute bottom-3 left-3 right-3 z-20">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-medium bg-black/70 text-white backdrop-blur-sm px-3 py-1.5 rounded-full inline-flex items-center gap-1">
                                <Home size={12} /> {apartment.details.type}
                            </span>
                            <span className="text-xs font-medium bg-black/70 text-white backdrop-blur-sm px-3 py-1.5 rounded-full">
                                {apartment.details.size}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex-1">
                    <div className="flex justify-between items-start gap-3 mb-2">
                        <motion.h3 
                            layoutId={`title-${apartment.id}`} 
                            className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight"
                        >
                            {apartment.name}
                        </motion.h3>
                        <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg text-sm whitespace-nowrap flex-shrink-0">
                            {apartment.priceQuote}
                        </span>
                    </div>
                    
                    <div className="flex items-center text-slate-500 text-sm mb-3">
                        <MapPin size={14} className="mr-1.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{apartment.location}</span>
                    </div>
                    
                    {apartment.rating && (
                        <div className="flex items-center text-amber-500 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    size={14} 
                                    fill={i < apartment.rating ? 'currentColor' : 'none'} 
                                    className={i < apartment.rating ? 'text-amber-400' : 'text-slate-200'} 
                                />
                            ))}
                            <span className="ml-2 text-xs text-slate-500">
                                ({apartment.reviewCount || 'No'} reviews)
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-100">
                    <span className="text-xs font-medium text-slate-500">
                        {apartment.details.possession}
                    </span>
                    <button 
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick(apartment);
                        }}
                    >
                        View Details
                        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
