// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';

// type Props = {
//   url: string;
//   alt: string;
// };

// export default function ImageZoom({ url, alt }: Props) {
//   const [zoom, setZoom] = useState(false);

//   return (

//     <div>
//     <div
//       onMouseEnter={() => setZoom(true)}
//       onMouseLeave={() => setZoom(false)}
//       className={`transition-transform duration-300 ${
//         zoom ? 'scale-110' : 'scale-100'
//       }`}
//     >
//       <Image src={url} alt={alt} width={300} height={300} className="object-containasdf w-full" />
//     </div>



// <div
//   onMouseEnter={() => setZoom(true)}
//   onMouseLeave={() => setZoom(false)}
//   className={`relative w-full h-[300px] transition-transform duration-300 ${
//     zoom ? 'scale-110' : 'scale-100'
//   }`}
// >
//   <Image
//     src={url}
//     alt={alt}
//     fill
//     className="object-contain"
//     priority
//     unoptimized={!url.startsWith('http')}
// />
// </div>

// </div>
//   );
// }

'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = {
  url: string;
  alt: string;
};

export default function ImageZoom({ url, alt }: Props) {
  const [zoom, setZoom] = useState(false);

  return (
    <div
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      className={`relative w-full max-w-[600px] h-[400px] mx-auto transition-transform duration-300 ${
        zoom ? 'scale-110' : 'scale-100'
      }`}
    >
      <Image
        src={url}
        alt={alt}
        fill
        className="object-contain"
        priority
        unoptimized={!url.startsWith('http')}
      />
    </div>
  );
}
