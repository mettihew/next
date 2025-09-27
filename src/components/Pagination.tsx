// components/Pagination.tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];
    
    // Show first page if we're far from it
    if (currentPage > 3) {
      pages.push(
        <button key={1} onClick={() => onPageChange(1)} className="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100">
          1
        </button>
      );
      if (currentPage > 4) {
        pages.push(<span key="dots-1" className="px-2">...</span>);
      }
    }
    
    // Show pages around current page
    const startPage = Math.max(1, Math.min(totalPages - 2, currentPage - 1));
    const endPage = Math.min(totalPages, startPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 border rounded ${
            i === currentPage 
              ? 'bg-blue-500 text-white' 
              : 'cursor-pointer hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    // Show last page if we're far from it
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pages.push(<span key="dots-2" className="px-2">...</span>);
      }
      pages.push(
        <button 
          key={totalPages}
          onClick={() => onPageChange(totalPages)} 
          className="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex flex-wrap">

    <div className="flex items-center gap-2">

      
      {/* First page */}
      {/* <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(1)}
        className={`px-3 py-1 border rounded ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
        }`}
      >
        First
      </button> */}

      {/* Previous */}
      <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-3 py-1 border rounded ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
        }`}
      >
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {renderPageNumbers()}
      </div>

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-3 py-1 border rounded ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
        }`}
      >
        Next
      </button>

      {/* Last page */}
      {/* <button 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(totalPages)}
        className={`px-3 py-1 border rounded ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
        }`}
      >
        Last
      </button> */}

   
    </div>

   {/* Page info */}
      <span className="ml-4 mt-2 text-sm text-gray-600 min-w-[75px]">
        Page {currentPage} of {totalPages}
      </span>

    </div>

  );
}