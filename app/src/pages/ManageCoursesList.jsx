import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeCourse } from '../store/redux/courseSlice';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import Button from '../components/ui/Button';
import { Pencil, Trash2, Plus } from 'lucide-react';

const ManageCoursesList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: courses, isLoading, error } = useSelector((state) => state.courses);

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus course ini?")) {
            dispatch(removeCourse(id));
        }
    };

    return (
        <div className="bg-surface text-slate-900 font-sans min-h-screen flex flex-col">
            <Navbar />
            
            <main className="flex-1 px-4 md:px-12 py-12 max-w-5xl mx-auto w-full">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Manajemen Course</h1>
                        <p className="text-slate-500">Kelola daftar course yang akan tampil di halaman utama.</p>
                    </div>
                    <Button 
                        onClick={() => navigate('/manage-courses/add')} 
                        className="bg-green-500 hover:bg-green-600 self-start sm:self-auto"
                    >
                        <Plus size={18} /> Tambah Course
                    </Button>
                </div>

                <div className="space-y-4">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <p className="text-slate-500 animate-pulse">Memuat data dari server...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center text-red-600">
                            Error: {error}
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
                            <p className="text-slate-500 mb-4">Belum ada course tersedia di sistem.</p>
                            <Button onClick={() => navigate('/manage-courses/add')} variant="outline" className="mx-auto">
                                Buat Course Pertama
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {courses.map((course) => (
                                <div key={course.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start justify-between hover:shadow-md transition-all">
                                    <div className="flex gap-4 items-center flex-1">
                                        <div className="w-24 h-16 sm:w-32 sm:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            {course.image ? (
                                                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-semibold bg-gray-100 text-slate-600 px-2 py-1 rounded-md">{course.category}</span>
                                                <span className="text-xs font-semibold text-primary">{course.price}</span>
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-900 line-clamp-1">{course.title}</h4>
                                            <p className="text-sm text-slate-500">{course.instructor} • {course.instructorRole}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto self-end sm:self-center">
                                        <Button 
                                            variant="outline" 
                                            onClick={() => navigate(`/manage-courses/edit/${course.id}`)}
                                            className="flex-1 sm:flex-none text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                                        >
                                            <Pencil size={16} /> Edit
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            onClick={() => handleDelete(course.id)}
                                            className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                        >
                                            <Trash2 size={16} /> Hapus
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ManageCoursesList;
