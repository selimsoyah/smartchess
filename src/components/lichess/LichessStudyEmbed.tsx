interface LichessStudyEmbedProps {
  studyId: string;
  chapterId?: string;
  caption?: string;
}

export default function LichessStudyEmbed({ 
  studyId, 
  chapterId, 
  caption 
}: LichessStudyEmbedProps) {
  const embedUrl = chapterId
    ? `https://lichess.org/study/embed/${studyId}/${chapterId}`
    : `https://lichess.org/study/embed/${studyId}`;

  return (
    <figure className="my-8">
      <div className="relative w-full" style={{ height: '600px' }}>
        <iframe
          src={embedUrl}
          className="w-full h-full border-0 rounded-lg shadow-lg"
          allowFullScreen
          loading="lazy"
          title={caption || 'Lichess Study'}
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-gray-600 text-center mt-3 italic">
          {caption}
        </figcaption>
      )}
      <div className="text-xs text-gray-500 text-center mt-2">
        <a
          href={`https://lichess.org/study/${studyId}${chapterId ? `/${chapterId}` : ''}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c49e4e] hover:text-[#9e7642]"
        >
          Open full study on Lichess →
        </a>
      </div>
    </figure>
  );
}
