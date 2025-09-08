import Image from 'next/image';
import { Atom, Github, Mail, Linkedin, Sparkles } from 'lucide-react';


const values = [
  {
    title: 'Github Collaboration',
    emoji: '🤝',
    description: 'Ali24 updated eesy.ir cart page',
    timestamp: 'Feb 2025',
  },
  {
    title: 'Zustand',
    emoji: '💻',
    description: 'Switched from Redux to Zustand',
    timestamp: 'Jan 2025',
  },
  {
    title: 'Next.js | TypeScript',
    emoji: '💻',
    description: 'Started building eesy.ir with Next.js & TypeScript',
    timestamp: 'Jan 2025',
  },
];

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto py-10 px-4 text-gray-700">




   <section className='bg-yellow-400 '>
        <h2 className="text-2xl font-semibold text-gray-800">📇 Contact</h2>
        <div className="space-y-2 text-gray-600">

          <div className='flex items-center gap-4'>
            <Image src={'/fav.ico'} alt="Me" width={60} height={60} className="rounded-full" />
          <p className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px]">
    Mahdi Keramati</p>
          </div>


   


          <div className="flex flex-wrap items-center justify-center gap-6 text-blue-600 text-sm ">

            <a href="mailto:youremail@example.com" className="hover:underline flex items-center gap-1">
              <Mail className="w-4 h-4" />
              Email
            </a>

            <a href="https://github.com/mettihew" target="_blank" className="hover:underline flex items-center gap-1">
              <Github className="w-4 h-4" />
              GitHub
            </a>

            <a href="https://linkedin.com/in/mettihew" target="_blank" className="hover:underline flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>

            <span className="flex items-center gap-1">
              <Atom className="w-4 h-4 text-cyan-500" />
              React
            </span>

            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-pink-400" />
              Zustand
            </span>
          </div>

        </div>
      </section>











      <section className="mb-12">
        <p>Next.js</p>
        <p></p>
            
      </section>











      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">📜 Recent Updates</h2>
        <div className="grid gap-2">
          {values.map((value) => (
            <div key={value.title} className="p-4 border rounded-lg shadow-sm bg-white text-center">
              <div className="flex items-center justify-center gap-4">
                <div className="text-3xl mb-2">{value.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{value.timestamp}</p>
              </div>
              <p className="text-sm text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

   







    </main>
  );
}
