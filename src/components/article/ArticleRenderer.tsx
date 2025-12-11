'use client'

import { ArticleBlock } from '@/lib/types/database.types'
import PGNChessboard from './PGNChessboard'
import LichessEmbed from './LichessEmbed'
import LichessStudyEmbed from '../lichess/LichessStudyEmbed'
import Image from 'next/image'

interface ArticleRendererProps {
  content: ArticleBlock[]
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
  return (
    <div className="article-content">
      {content.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className="mb-4 text-[#232829] leading-relaxed">
                {block.text}
              </p>
            )

          case 'heading':
            const headingClasses = {
              1: 'text-3xl font-bold text-[#232829] mb-6 mt-8',
              2: 'text-2xl font-bold text-[#232829] mb-4 mt-6',
              3: 'text-xl font-semibold text-[#745832] mb-3 mt-5',
              4: 'text-lg font-semibold text-[#745832] mb-2 mt-4',
              5: 'text-base font-semibold text-[#745832] mb-2 mt-3',
              6: 'text-sm font-semibold text-[#745832] mb-2 mt-3'
            }
            const HeadingClass = headingClasses[block.level]
            
            if (block.level === 1) return <h1 key={index} className={HeadingClass}>{block.text}</h1>
            if (block.level === 2) return <h2 key={index} className={HeadingClass}>{block.text}</h2>
            if (block.level === 3) return <h3 key={index} className={HeadingClass}>{block.text}</h3>
            if (block.level === 4) return <h4 key={index} className={HeadingClass}>{block.text}</h4>
            if (block.level === 5) return <h5 key={index} className={HeadingClass}>{block.text}</h5>
            return <h6 key={index} className={HeadingClass}>{block.text}</h6>

          case 'image':
            return (
              <div key={index} className="my-8">
                <div className="relative w-full h-96 rounded-lg overflow-hidden border border-[#bac1bf]/30">
                  <Image
                    src={block.url}
                    alt={block.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <p className="mt-2 text-center text-sm text-[#5a605a] italic">
                    {block.caption}
                  </p>
                )}
              </div>
            )

          case 'chessboard':
            return (
              <PGNChessboard
                key={index}
                pgn={block.pgn}
                caption={block.caption}
              />
            )

          case 'embed':
            return (
              <LichessEmbed
                key={index}
                iframe_src={block.iframe_src}
                title={block.title}
                caption={block.caption}
              />
            )

          case 'lichess_study':
            return (
              <LichessStudyEmbed
                key={index}
                studyId={block.studyId}
                chapterId={block.chapterId}
                caption={block.caption}
              />
            )

          default:
            return null
        }
      })}
    </div>
  )
}
