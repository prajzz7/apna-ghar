import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apartments } from '../data/apartments';
import { resolveAsset } from '../utils/assetResolver';
import {
    ArrowLeft, MapPin, Calendar, Ruler, CheckCircle,
    FileText, Image as ImageIcon, Video, Share2, Heart, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ApartmentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const apartment = apartments.find(a => a.id === parseInt(id));
    const [activeTab, setActiveTab] = useState('overview');
    const [preview, setPreview] = useState(null);

    const images = Array.isArray(apartment?.images) ? apartment.images : [];
    const documents = Array.isArray(apartment?.documents) ? apartment.documents : [];

    const videos = Array.isArray(apartment?.videos) && apartment.videos.length
        ? apartment.videos
        : (apartment?.video ? [apartment.video] : []);

    const hasMedia = images.length > 0 || videos.length > 0;
    const hasDocuments = documents.length > 0;
    const tabs = [
        'overview',
        ...(hasMedia ? ['media'] : []),
        ...(hasDocuments ? ['documents'] : []),
    ];

    useEffect(() => {
        if (activeTab === 'media' && !hasMedia) setActiveTab('overview');
        if (activeTab === 'documents' && !hasDocuments) setActiveTab('overview');
    }, [activeTab, hasDocuments, hasMedia, id]);

    useEffect(() => {
        if (!preview) return;

        const onKeyDown = (e) => {
            if (e.key === 'Escape') setPreview(null);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [preview]);

    if (!apartment) return <div>Apartment not found</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-20"
        >
            <button
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium"
            >
                <ArrowLeft size={20} /> Back to Listings
            </button>

            {/* Hero Section */}
            <div className="relative h-[40vh] md:h-[50vh] rounded-3xl overflow-hidden shadow-2xl mb-8 group">
                {apartment.banner || images[0] ? (
                    <motion.img
                        layoutId={`image-${apartment.id}`}
                        src={resolveAsset(apartment.banner || images[0])}
                        alt={apartment.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <ImageIcon size={44} className="text-slate-300" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-end">
                        <div className="min-w-0">
                            <motion.h1 layoutId={`title-${apartment.id}`} className="text-3xl md:text-5xl font-bold text-white mb-2 shadow-sm">
                                {apartment.name}
                            </motion.h1>
                            <div className="flex flex-wrap items-center text-white/90 gap-3 text-sm md:text-base">
                                <span className="flex items-center gap-1 min-w-0">
                                    <MapPin size={18} className="flex-shrink-0" />
                                    <span className="truncate">{apartment.location}</span>
                                </span>
                                <span className="flex-shrink-0 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                    {apartment.status}
                                </span>
                            </div>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-white/80 text-sm">Quote</p>
                            <p className="text-3xl font-bold text-white">{apartment.priceQuote}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Price Block */}
            <div className="md:hidden bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex justify-between items-center">
                <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Price Quote</p>
                    <p className="text-2xl font-bold text-blue-600">{apartment.priceQuote}</p>
                </div>
                <button className="btn-icon text-pink-500 border-pink-100 bg-pink-50">
                    <Heart size={20} />
                </button>
            </div>

            {/* Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content Info */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Tabs */}
                    <div className="flex gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 font-medium capitalize whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode='wait'>
                        {activeTab === 'overview' && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8"
                            >
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {apartment.details?.type && <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <p className="text-slate-400 text-xs uppercase font-bold mb-1">Configuration</p>
                                        <p className="text-lg font-semibold text-slate-800">{apartment.details.type}</p>
                                    </div>}
                                    {apartment.details?.size && <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <p className="text-slate-400 text-xs uppercase font-bold mb-1">Carpet Area</p>
                                        <p className="text-lg font-semibold text-slate-800">{apartment.details.size}</p>
                                    </div>}
                                    {apartment.details?.possession && <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <p className="text-slate-400 text-xs uppercase font-bold mb-1">Possession</p>
                                        <p className="text-lg font-semibold text-slate-800">{apartment.details.possession}</p>
                                    </div>}
                                    {apartment.details?.floors && (
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <p className="text-slate-400 text-xs uppercase font-bold mb-1">Floors</p>
                                            <p className="text-lg font-semibold text-slate-800">{apartment.details.floors}</p>
                                        </div>
                                    )}
                                </div>

                                {Array.isArray(apartment.details?.availableSizes) && apartment.details.availableSizes.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-4 text-slate-900">Available Sizes</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {apartment.details.availableSizes.map((s) => (
                                                <span
                                                    key={s}
                                                    className="px-4 py-2 bg-slate-50 text-slate-800 rounded-full text-sm font-medium border border-slate-200"
                                                >
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {Array.isArray(apartment.details?.highlights) && apartment.details.highlights.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-4 text-slate-900">Project Highlights</h3>
                                        <div className="grid gap-3">
                                            {apartment.details.highlights.map((h) => (
                                                <div
                                                    key={h}
                                                    className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl"
                                                >
                                                    <CheckCircle size={18} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                                                    <p className="text-slate-800 font-medium">{h}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {(apartment.details?.address || apartment.details?.mapsLink || apartment.details?.contact) && (
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200">
                                        <h3 className="text-xl font-bold mb-4 text-slate-900">Visit / Contact</h3>

                                        {apartment.details?.address && (
                                            <div className="mb-4">
                                                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Address</p>
                                                <p className="text-slate-800">{apartment.details.address}</p>
                                            </div>
                                        )}

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            {apartment.details?.mapsLink && (
                                                <a
                                                    className="btn-outline text-sm inline-flex items-center justify-center"
                                                    href={apartment.details.mapsLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Open in Maps
                                                </a>
                                            )}

                                            {apartment.details?.contact?.phone && (
                                                <a
                                                    className="btn-primary text-sm inline-flex items-center justify-center"
                                                    href={`tel:${apartment.details.contact.phone}`}
                                                >
                                                    Call {apartment.details.contact.name || 'Sales'}
                                                </a>
                                            )}
                                        </div>

                                        {apartment.details?.contact && (
                                            <div className="mt-4 text-sm text-slate-600">
                                                <p className="font-semibold text-slate-900">
                                                    {apartment.details.contact.name}
                                                </p>
                                                {apartment.details.contact.role && (
                                                    <p>{apartment.details.contact.role}</p>
                                                )}
                                                {apartment.details.contact.phone && (
                                                    <p className="mt-1">{apartment.details.contact.phone}</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {(Array.isArray(apartment.details?.partners?.developers) || Array.isArray(apartment.details?.partners?.architects)) && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-4 text-slate-900">Project Team</h3>
                                        <div className="grid gap-3">
                                            {Array.isArray(apartment.details?.partners?.developers) && apartment.details.partners.developers.length > 0 && (
                                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                    <p className="text-slate-400 text-xs uppercase font-bold mb-1">Developers</p>
                                                    <p className="text-slate-800 font-semibold">{apartment.details.partners.developers.join(', ')}</p>
                                                </div>
                                            )}

                                            {Array.isArray(apartment.details?.partners?.architects) && apartment.details.partners.architects.length > 0 && (
                                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                    <p className="text-slate-400 text-xs uppercase font-bold mb-1">Architects</p>
                                                    <p className="text-slate-800 font-semibold">{apartment.details.partners.architects.join(', ')}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Amenities */}
                                {Array.isArray(apartment.details?.amenities) && apartment.details.amenities.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-slate-900">Amenities</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {apartment.details.amenities.map(item => (
                                            <span key={item} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100 flex items-center gap-2">
                                                <CheckCircle size={14} className="text-indigo-500" /> {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                )}

                                {/* Notes */}
                                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                                    <h3 className="text-lg font-bold text-amber-900 mb-2">My Notes</h3>
                                    <p className="text-amber-800 italic">"{apartment.notes}"</p>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'media' && (
                            <motion.div
                                key="media"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                {images.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-4">Photos</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {images.map((img, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    className="group rounded-xl overflow-hidden focus:outline-none"
                                                    onClick={() => setPreview({ kind: 'image', src: img, title: `Photo ${i + 1}` })}
                                                >
                                                    <img
                                                        src={resolveAsset(img)}
                                                        alt=""
                                                        className="rounded-xl w-full h-48 object-cover shadow-sm group-hover:shadow-md transition-shadow"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {videos.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Video /> Video Tour</h3>

                                        <div className="grid gap-4">
                                            {videos.map((src, index) => (
                                                <button
                                                    key={src}
                                                    type="button"
                                                    className="w-full rounded-xl overflow-hidden shadow-lg bg-black focus:outline-none"
                                                    onClick={() => setPreview({ kind: 'video', src, title: videos.length > 1 ? `Video Tour ${index + 1}` : 'Video Tour' })}
                                                >
                                                    <div className="relative">
                                                        <video controls className="w-full bg-black">
                                                            <source src={resolveAsset(src)} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'documents' && (
                            <motion.div
                                key="documents"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                <div className="grid gap-3">
                                    {documents.map((doc, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl transition-all group ${doc.url ? 'hover:border-blue-400 hover:shadow-md cursor-pointer' : 'opacity-70 cursor-default'}`}
                                            onClick={() => {
                                                if (!doc.url) return;
                                                setPreview({ kind: 'pdf', src: doc.url, title: doc.name });
                                            }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{doc.name}</p>
                                                    <p className="text-xs text-slate-500 uppercase">{doc.type} • {doc.size}</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className={`text-blue-600 text-sm font-medium px-4 py-2 bg-blue-50 rounded-lg transition-opacity ${doc.url ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (!doc.url) return;
                                                    setPreview({ kind: 'pdf', src: doc.url, title: doc.name });
                                                }}
                                            >
                                                Preview
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:sticky lg:top-24">
                        <h3 className="text-lg font-bold mb-4">Pricing Details</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                <span className="text-slate-500 text-sm">Quoted Price</span>
                                <span className="font-semibold text-slate-900 line-through decoration-slate-400 decoration-2">{apartment.priceQuote}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 bg-green-50 p-2 rounded-lg -mx-2">
                                <span className="text-green-700 font-medium text-sm">Negotiated Price</span>
                                <span className="font-bold text-green-700 text-lg">{apartment.negotiatedPrice}</span>
                            </div>
                        </div>

                        <button className="w-full btn-primary mb-3 flex items-center justify-center gap-2">
                            <Share2 size={18} /> Share Details
                        </button>
                        <button className="w-full btn-outline text-sm">
                            Contact Builder
                        </button>
                    </div>
                </div>

            </div>

            <AnimatePresence>
                {preview && (
                    <motion.div
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm p-4 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPreview(null)}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[80vh] overflow-hidden flex flex-col"
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.98, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                                <div className="min-w-0">
                                    <p className="font-semibold text-slate-900 truncate">{preview.title}</p>
                                </div>
                                <button
                                    type="button"
                                    className="btn-icon"
                                    onClick={() => setPreview(null)}
                                    aria-label="Close preview"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="flex-1 bg-slate-50">
                                {preview.kind === 'image' && (
                                    <div className="h-full w-full flex items-center justify-center p-4">
                                        <img
                                            src={resolveAsset(preview.src)}
                                            alt=""
                                            className="max-h-full max-w-full object-contain rounded-xl shadow-sm"
                                        />
                                    </div>
                                )}

                                {preview.kind === 'video' && (
                                    <div className="h-full w-full bg-black">
                                        <video controls autoPlay className="w-full h-full">
                                            <source src={resolveAsset(preview.src)} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )}

                                {preview.kind === 'pdf' && (
                                    <iframe
                                        src={resolveAsset(preview.src)}
                                        title={preview.title}
                                        className="w-full h-full"
                                    />
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
