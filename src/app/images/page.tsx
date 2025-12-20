// app/images/page.tsx
'use client';
import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import ImageGallery from './ImageGallery';

type ImageItem = {
  id: string;
  url: string;
  title: string;
  description?: string;
  uploadDate: string;
  tags?: string[];
  author?: string;
};

export default function ImagesPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch existing images
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/images');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (newImage: ImageItem) => {
    setImages(prev => [newImage, ...prev]);
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      await fetch(`/api/images/${id}`, { method: 'DELETE' });
      setImages(prev => prev.filter(img => img.id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Image Gallery</h1>
        <p className="text-gray-600">
          Upload and share your images with descriptions
        </p>
      </div>

      {/* Upload Section */}
      <div className="mb-12 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Upload New Image</h2>
        <ImageUpload onUploadSuccess={handleUploadSuccess} />
      </div>

      {/* Gallery Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <span className="text-gray-500">
            {images.length} {images.length === 1 ? 'image' : 'images'}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-500">Loading images...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No images yet
            </h3>
            <p className="text-gray-500 mb-6">
              Upload your first image to get started!
            </p>
          </div>
        ) : (
          <ImageGallery 
            images={images} 
            onDelete={handleDeleteImage}
          />
        )}
      </div>
    </main>
  );
}