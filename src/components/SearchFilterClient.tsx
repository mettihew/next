// 'use client';
// import { useState, useRef } from 'react';
// import { motion, AnimatePresence, PanInfo } from 'framer-motion';

// interface FilterClientProps {
//   query?: string;
//   brandList?: string[];
//   uniqueBrands: string[];
//   min?: number;
//   max?: number;
// }

// export default function FilterClient({
//   query = '',
//   brandList = [],
//   uniqueBrands,
//   min = 0,
//   max = Infinity,
// }: FilterClientProps) {
//   const [showFilters, setShowFilters] = useState(false);
//   const edgeRef = useRef<HTMLDivElement>(null);

//   const fieldVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: 0.2 + i * 0.05 } }),
//   };

//   const panelVariants = {
//     hidden: { x: '-100%', scale: 0.95, boxShadow: '0px 0px 0px rgba(0,0,0,0)' },
//     visible: {
//       x: 0,
//       scale: 1,
//       boxShadow: '4px 0px 20px rgba(0,0,0,0.2)',
//       transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.6 },
//     },
//   };

//   const backdropVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.25 } },
//   };

//   // const handleDragEnd = (_: any, info: PanInfo) => {
//   //   if (info.offset.x < -100) setShowFilters(false);
//   // };

//   const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
//   if (info.offset.x < -100) setShowFilters(false);
// };

//   const handleTouchStart = (e: React.TouchEvent) => {
//     if (e.touches[0].clientX < 20) setShowFilters(true);
//   };

//   return (
//     <>
//       {/* Edge swipe area */}
//       <div
//         ref={edgeRef}
//         className="fixed top-0 left-0 h-full w-5 z-30 md:hidden"
//         onTouchStart={handleTouchStart}
//       />

//       {/* Toggle button */}
//       <button
//         className="md:hidden mb-2 px-4 py-2 bg-black text-white rounded"
//         onClick={() => setShowFilters(true)}
//       >
//         See Filters
//       </button>

//       <AnimatePresence>
//         {showFilters && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
//               onClick={() => setShowFilters(false)}
//               variants={backdropVariants}
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//             />

//             {/* Swipeable + springy panel */}
//             <motion.aside
//               className="fixed top-0 left-0 h-full w-72 bg-white z-50 p-4 md:relative md:block rounded-r shadow-md"
//               variants={panelVariants}
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//               drag="x"
//               dragConstraints={{ left: -300, right: 0 }}
//               onDragEnd={handleDragEnd}
//             >
//               {/* Close button */}
//               <motion.button
//                 className="md:hidden mb-4 px-3 py-1 bg-gray-200 rounded"
//                 onClick={() => setShowFilters(false)}
//                 variants={fieldVariants}
//                 initial="hidden"
//                 animate="visible"
//                 custom={0}
//               >
//                 Close
//               </motion.button>

//               <form className="space-y-4" method="GET">
//                 <motion.input
//                   name="q"
//                   placeholder="Search..."
//                   defaultValue={query}
//                   className="w-full px-3 py-2 border rounded"
//                   variants={fieldVariants}
//                   initial="hidden"
//                   animate="visible"
//                   custom={1}
//                 />

//                 <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={2}>
//                   <label className="font-semibold block mb-1">Brand</label>
//                   <select
//                     name="brand"
//                     defaultValue={brandList}
//                     multiple
//                     className="w-full border px-2 py-1 rounded h-32"
//                   >
//                     {uniqueBrands.map((b) => (
//                       <option key={b} value={b}>
//                         {b}
//                       </option>
//                     ))}
//                   </select>
//                   <p className="text-xs text-gray-500">
//                     Hold Ctrl (or ⌘) to select multiple
//                   </p>
//                 </motion.div>

//                 <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={3}>
//                   <label className="font-semibold block mb-1">Price Range</label>
//                   <div className="flex gap-2">
//                     <input
//                       type="number"
//                       name="min"
//                       placeholder="Min"
//                       defaultValue={min}
//                       className="w-full px-2 py-1 border rounded"
//                     />
//                     <input
//                       type="number"
//                       name="max"
//                       placeholder="Max"
//                       defaultValue={max}
//                       className="w-full px-2 py-1 border rounded"
//                     />
//                   </div>
//                 </motion.div>

//                 <motion.button
//                   type="submit"
//                   className="bg-black text-white px-4 py-2 rounded w-full"
//                   variants={fieldVariants}
//                   initial="hidden"
//                   animate="visible"
//                   custom={4}
//                 >
//                   Apply Filters
//                 </motion.button>
//               </form>
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo, Variants } from 'framer-motion';

interface FilterClientProps {
  query?: string;
  brandList?: string[];
  uniqueBrands: string[];
  min?: number;
  max?: number;
}

export default function FilterClient({
  query = '',
  brandList = [],
  uniqueBrands,
  min = 0,
  max = Infinity,
}: FilterClientProps) {
  const [showFilters, setShowFilters] = useState(false);
  const edgeRef = useRef<HTMLDivElement>(null);

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: 0.2 + i * 0.05 } }),
  };

  const panelVariants: Variants = {
    hidden: { x: '-100%', scale: 0.95, boxShadow: '0px 0px 0px rgba(0,0,0,0)' },
    visible: {
      x: 0,
      scale: 1,
      boxShadow: '4px 0px 20px rgba(0,0,0,0.2)',
      transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.6 },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -100) setShowFilters(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0].clientX < 20) setShowFilters(true);
  };

  return (
    <>
      {/* Edge swipe area */}
      <div
        ref={edgeRef}
        className="fixed top-0 left-0 h-full w-5 z-30 md:hidden"
        onTouchStart={handleTouchStart}
      />

      {/* Toggle button */}
      <button
        className="md:hidden mb-2 px-4 py-2 bg-black text-white rounded"
        onClick={() => setShowFilters(true)}
      >
        See Filters
      </button>

      <AnimatePresence>
        {showFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
              onClick={() => setShowFilters(false)}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />

            {/* Swipeable + springy panel */}
            <motion.aside
              className="fixed top-0 left-0 h-full w-72 bg-white z-50 p-4 md:relative md:block rounded-r shadow-md"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              drag="x"
              dragConstraints={{ left: -300, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              {/* Close button */}
              <motion.button
                className="md:hidden mb-4 px-3 py-1 bg-gray-200 rounded"
                onClick={() => setShowFilters(false)}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                Close
              </motion.button>

              <form className="space-y-4" method="GET">
                <motion.input
                  name="q"
                  placeholder="Search..."
                  defaultValue={query}
                  className="w-full px-3 py-2 border rounded"
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                />

                <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={2}>
                  <label className="font-semibold block mb-1">Brand</label>
                  <select
                    name="brand"
                    defaultValue={brandList}
                    multiple
                    className="w-full border px-2 py-1 rounded h-32"
                  >
                    {uniqueBrands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500">
                    Hold Ctrl (or ⌘) to select multiple
                  </p>
                </motion.div>

                <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={3}>
                  <label className="font-semibold block mb-1">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="min"
                      placeholder="Min"
                      defaultValue={min}
                      className="w-full px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      name="max"
                      placeholder="Max"
                      defaultValue={max}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded w-full"
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  Apply Filters
                </motion.button>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
