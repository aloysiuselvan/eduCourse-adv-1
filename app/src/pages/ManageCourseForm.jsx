import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createCourse, editCourse } from '../store/redux/courseSlice';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Save, X, Image as ImageIcon, AlertCircle } from 'lucide-react';

const ManageCourseForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const isEditing = !!id;
    const { data: courses, isLoading, error: apiError } = useSelector((state) => state.courses);

    const [formData, setFormData] = useState({
        title: '',
        instructor: '',
        instructorRole: '',
        price: '',
        category: 'Bisnis',
        image: ''
    });

    const [imagePreview, setImagePreview] = useState('');
    const [localError, setLocalError] = useState('');

    useEffect(() => {
        if (isEditing) {
            // Because MockAPI might return id as string, use loose equality or convert
            const courseToEdit = courses.find(c => c.id == id);
            if (courseToEdit) {
                setFormData({
                    title: courseToEdit.title,
                    instructor: courseToEdit.instructor,
                    instructorRole: courseToEdit.instructorRole,
                    price: courseToEdit.price,
                    category: courseToEdit.category,
                    image: courseToEdit.image || ''
                });
                setImagePreview(courseToEdit.image || '');
            } else {
                navigate('/manage-courses');
            }
        }
    }, [id, courses, navigate, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImagePreview(base64String);
                setFormData({ ...formData, image: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        
        if (!formData.title || !formData.instructor || !formData.price) return;
        
        // MockAPI payload limit warning
        if (formData.image && formData.image.length > 50000) {
            setLocalError('Ukuran file gambar terlalu besar untuk MockAPI. Silakan gunakan gambar yang berukuran di bawah 30KB atau kosongkan saja.');
            return;
        }

        if (isEditing) {
            const res = await dispatch(editCourse({ id, updatedData: formData }));
            if (!res.error) navigate('/manage-courses');
        } else {
            const defaultAvatar = courses.length > 0 ? courses[0].avatar : '';

            const newCourse = {
                ...formData,
                rating: 5.0,
                ratingCount: 0,
                avatar: defaultAvatar,
            };
            const res = await dispatch(createCourse(newCourse));
            if (!res.error) navigate('/manage-courses');
        }
    };

    return (
        <div className="bg-surface text-slate-900 font-sans min-h-screen flex flex-col">
            <Navbar />
            
            <main className="flex-1 px-4 md:px-12 py-12 max-w-3xl mx-auto w-full">
                <div className="mb-8">
                    <button 
                        onClick={() => navigate('/manage-courses')}
                        className="text-slate-500 hover:text-slate-800 text-sm font-medium mb-4 flex items-center gap-1"
                    >
                        ← Kembali ke Daftar
                    </button>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        {isEditing ? 'Update Data Course' : 'Tambah Course Baru'}
                    </h1>
                    <p className="text-slate-500">Lengkapi formulir di bawah ini dengan detail yang sesuai.</p>
                </div>

                <div className="max-w-3xl mx-auto">
                {(apiError || localError) && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg flex items-start gap-3">
                        <AlertCircle className="text-red-500 w-5 h-5 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-red-800 font-medium">Gagal Menyimpan Data</h3>
                            <p className="text-red-600 text-sm mt-1">{localError || apiError}</p>
                        </div>
                    </div>
                )}
                
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Thumbnail Course</label>
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <div className="w-full sm:w-48 h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden flex items-center justify-center relative flex-shrink-0">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center text-slate-400">
                                            <ImageIcon size={32} className="mx-auto mb-2 opacity-50" />
                                            <span className="text-xs">No Image</span>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/png, image/jpeg, image/jpg, image/webp" 
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-600 mb-2">Unggah file gambar sebagai thumbnail. Mendukung JPG, PNG, atau WEBP.</p>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Course</label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Contoh: Digital Marketing 101"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                                <select 
                                    name="category" 
                                    value={formData.category} 
                                    onChange={handleChange}
                                    className="w-full py-2.5 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white"
                                >
                                    <option value="Bisnis">Bisnis</option>
                                    <option value="Pemasaran">Pemasaran</option>
                                    <option value="Desain">Desain</option>
                                    <option value="Digital & Teknologi">Digital & Teknologi</option>
                                    <option value="Pengembangan Diri">Pengembangan Diri</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Harga Course</label>
                                <Input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Contoh: Rp 300K"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Instruktur</label>
                                <Input
                                    name="instructor"
                                    value={formData.instructor}
                                    onChange={handleChange}
                                    placeholder="Nama kreator/instruktur..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Peran / Jabatan Instruktur</label>
                                <Input
                                    name="instructorRole"
                                    value={formData.instructorRole}
                                    onChange={handleChange}
                                    placeholder="Contoh: Senior Designer..."
                                />
                            </div>
                        </div>
                        
                        <div className="flex gap-4 pt-4 border-t border-gray-100">
                            <Button type="button" variant="outline" onClick={() => navigate('/manage-courses')} className="flex-1" disabled={isLoading}>
                                <X size={18} /> Batal
                            </Button>
                            <Button type="submit" variant="primary" className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50" disabled={isLoading}>
                                <Save size={18} /> {isLoading ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Course')}
                            </Button>
                        </div>
                    </form>
                </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ManageCourseForm;
