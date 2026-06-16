import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CourseCard from '../../courses/components/CourseCard';
import { Star } from 'lucide-react';

const tabs = ['Semua Kelas', 'Pemasaran', 'Desain', 'Pengembangan Diri', 'Bisnis'];

const CourseSection = () => {
    const { data: courses, isLoading, error } = useSelector((state) => state.courses);
    const [activeTab, setActiveTab] = useState('Semua Kelas');

    const filteredCourses = activeTab === 'Semua Kelas'
        ? courses
        : courses.filter(c => c.category === activeTab || (activeTab === 'Pengembangan Diri' && c.category === 'Pengembangan Diri'));

    return (
        <section className="px-4 md:px-12 py-12 max-w-7xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Koleksi Video Pembelajaran Unggulan</h2>
            <p className="text-slate-500 mb-8">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>

            <div className="flex md:flex-wrap overflow-x-auto hide-scrollbar gap-4 mb-8 border-b border-gray-100 pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 px-1 text-sm font-medium transition-colors relative ${activeTab === tab
                            ? 'text-red-600'
                            : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></span>
                        )}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="text-center py-12">
                    <p className="text-slate-500 animate-pulse">Memuat course dari server...</p>
                </div>
            ) : error ? (
                <div className="text-center py-12">
                    <p className="text-red-500 font-semibold">Error: {error}</p>
                    <p className="text-slate-500 text-sm mt-2">Pastikan VITE_API_URL pada .env sudah benar.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <CourseCard key={course.id} {...course} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-slate-500">
                            Tidak ada course ditemukan untuk kategori ini.
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default CourseSection;
