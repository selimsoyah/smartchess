'use client';

import { useState } from 'react';

interface LichessEmbedProps {
  src: string;
  title: string;
  height?: number;
  className?: string;
}

export default function LichessEmbed({ 
  src, 
  title, 
  height = 500,
  className = '' 
}: LichessEmbedProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative w-full ${className}`} style={{ height: `${height}px` }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1d1a] rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c49e4e] mx-auto mb-4"></div>
            <p className="text-[#bac1bf]">Loading puzzle...</p>
          </div>
        </div>
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1d1a] rounded-lg">
          <div className="text-center p-6">
            <p className="text-[#bac1bf] mb-4">Unable to load the puzzle.</p>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c49e4e] hover:text-[#d4ae5e] underline"
            >
              Open in Lichess
            </a>
          </div>
        </div>
      ) : (
        <iframe
          src={src}
          title={title}
          className="w-full h-full border-0 rounded-lg"
          allowFullScreen
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      )}
    </div>
  );
}
