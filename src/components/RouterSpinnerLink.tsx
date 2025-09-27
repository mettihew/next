"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function RouterSpinnerLink({ href, children, className }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push(href);
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full z-50 bg-green text-white text-center py-1 text-xs shadow">
          {/* Loading... */}
          shit
        </div>
      )}
      <div onClick={handleClick} className={className} role="button" tabIndex={0}>
        {children}
      </div>
    </>
  );
}
