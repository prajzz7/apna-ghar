import React from 'react';
import { X, FileText, CheckCircle, Calendar, IndianRupee, Ruler, Phone } from 'lucide-react';

export function DetailModal({ apartment, onClose }) {
    if (!apartment) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl animate-in zoom-in-95 duration-200">

                {/* Header Image */}
                <div className="relative h-64">
                    <img
                        src={apartment.images[0]}
                        alt={apartment.name}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md">
                            {apartment.status}
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{apartment.name}</h2>
                            <p className="text-slate-500">{apartment.location}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-500">Quoted Price</p>
                            <p className="text-xl font-bold text-blue-600">{apartment.priceQuote}</p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                            <Ruler size={20} className="mx-auto mb-1 text-slate-400" />
                            <p className="text-xs text-slate-500">Size</p>
                            <p className="font-semibold">{apartment.details.size}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                            <Calendar size={20} className="mx-auto mb-1 text-slate-400" />
                            <p className="text-xs text-slate-500">Possession</p>
                            <p className="font-semibold">{apartment.details.possession}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                            <span className="block mx-auto mb-1 text-slate-400 text-lg font-bold">TYPE</span>
                            <p className="text-xs text-slate-500">Unit Type</p>
                            <p className="font-semibold">{apartment.details.type}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center border border-green-100">
                            <p className="text-xs text-green-600 font-medium">Negotiated</p>
                            <p className="font-bold text-green-700">{apartment.negotiatedPrice}</p>
                        </div>
                    </div>

                    {/* Tabs/Sections */}
                    <div className="space-y-6">

                        {/* Notes */}
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                            <h3 className="text-sm font-semibold text-amber-900 mb-2">Your Notes</h3>
                            <p className="text-amber-800 text-sm italic">"{apartment.notes}"</p>
                        </div>

                        {/* Documents */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <FileText size={20} className="text-slate-400" />
                                Documents
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {apartment.documents.map((doc, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                                        <div className="p-2 bg-red-50 rounded text-red-500">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{doc.name}</p>
                                            <p className="text-xs text-slate-500 uppercase">{doc.type}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <CheckCircle size={20} className="text-slate-400" />
                                Amenities
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {apartment.details.amenities.map((amenity, index) => (
                                    <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                        <button onClick={onClose} className="btn bg-slate-900 text-white hover:bg-slate-800 w-full sm:w-auto">
                            Close Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
