'use client'

interface LichessEmbedProps {
  iframe_src: string
  title?: string
  caption?: string
}

export default function LichessEmbed({ iframe_src, title, caption }: LichessEmbedProps) {
  return (
    <div className="my-8">
      <div className="bg-white rounded-lg border border-[#bac1bf]/30 p-4 shadow-sm">
        <div className="aspect-video w-full max-w-4xl mx-auto">
          <iframe
            src={iframe_src}
            title={title || 'Lichess Study'}
            className="w-full h-full rounded"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        
        {caption && (
          <p className="mt-4 text-center text-sm text-[#5a605a] italic">
            {caption}
          </p>
        )}
      </div>
    </div>
  )
}
