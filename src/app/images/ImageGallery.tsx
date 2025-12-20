// app/images/ImageGallery.tsx
'use client';
import Image from 'next/image';
import { useState } from 'react';

type ImageItem = {
  id: string;
  url: string;
  title: string;
  description?: string;
  uploadDate: string;
  tags?: string[];
  author?: string;
};

type ImageGalleryProps = {
  images: ImageItem[];
  onDelete: (id: string) => void;
};

export default function ImageGallery({ images, onDelete }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Image */}
            <div 
              className="relative h-64 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {image.title}
              </h3>
              
              {image.description && (
                <p className="text-gray-600 mb-3 line-clamp-3">
                  {image.description}
                </p>
              )}
              
              {/* Tags */}
              {image.tags && image.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {image.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
                <span>{formatDate(image.uploadDate)}</span>
                {image.author && <span>by {image.author}</span>}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setSelectedImage(image)}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex-1"
                >
                  View Details
                </button>
                <button
                  onClick={() => onDelete(image.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Image Details */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex">
              {/* Image */}
              <div className="w-2/3 relative h-[70vh]">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="70vw"
                />
              </div>
              
              {/* Details */}
              <div className="w-1/3 p-6 overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedImage.title}
                  </h2>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                {selectedImage.description && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedImage.description}</p>
                  </div>
                )}
                
                {selectedImage.tags && selectedImage.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-3 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Uploaded:</span>{' '}
                    {formatDate(selectedImage.uploadDate)}
                  </div>
                  {selectedImage.author && (
                    <div>
                      <span className="font-medium">Author:</span>{' '}
                      {selectedImage.author}
                    </div>
                  )}
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <button
                    onClick={() => onDelete(selectedImage.id)}
                    className="w-full py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Delete Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}