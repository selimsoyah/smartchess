'use client'

import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'

interface PGNChessboardProps {
  pgn: string
  caption?: string
}

export default function PGNChessboard({ pgn, caption }: PGNChessboardProps) {
  const [currentMove, setCurrentMove] = useState(0)
  const [position, setPosition] = useState('start')
  const [moves, setMoves] = useState<string[]>([])

  useEffect(() => {
    try {
      const chess = new Chess()
      chess.loadPgn(pgn)
      const history = chess.history()
      setMoves(history)
      
      // Reset to start position
      setPosition('start')
      setCurrentMove(0)
    } catch (error) {
      console.error('Invalid PGN:', error)
    }
  }, [pgn])

  const goToMove = (moveIndex: number) => {
    if (moves.length === 0) return

    const tempGame = new Chess()
    
    for (let i = 0; i < moveIndex; i++) {
      tempGame.move(moves[i])
    }
    
    setPosition(tempGame.fen())
    setCurrentMove(moveIndex)
  }

  const nextMove = () => {
    if (currentMove < moves.length) {
      goToMove(currentMove + 1)
    }
  }

  const prevMove = () => {
    if (currentMove > 0) {
      goToMove(currentMove - 1)
    }
  }

  const reset = () => {
    goToMove(0)
    setPosition('start')
  }

  const goToEnd = () => {
    goToMove(moves.length)
  }

  return (
    <div className="my-8">
      <div className="bg-white rounded-lg border border-[#bac1bf]/30 p-4 shadow-sm">
        <div className="max-w-2xl mx-auto">
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <Chessboard 
              options={{
                position,
                darkSquareStyle: { backgroundColor: '#745832' },
                lightSquareStyle: { backgroundColor: '#f0e6d2' },
                allowDragging: false,
                showNotation: true
              }}
            />
          </div>
          
          {/* Controls */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={reset}
              disabled={currentMove === 0}
              className="p-2 rounded bg-[#c49e4e] text-white hover:bg-[#9e7642] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Reset to start"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button
              onClick={prevMove}
              disabled={currentMove === 0}
              className="p-2 rounded bg-[#c49e4e] text-white hover:bg-[#9e7642] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Previous move"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="px-4 py-2 bg-[#faf9f7] rounded text-[#232829] font-medium min-w-[100px] text-center">
              Move {currentMove} / {moves.length}
            </span>
            <button
              onClick={nextMove}
              disabled={currentMove === moves.length}
              className="p-2 rounded bg-[#c49e4e] text-white hover:bg-[#9e7642] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Next move"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={goToEnd}
              disabled={currentMove === moves.length}
              className="p-2 rounded bg-[#c49e4e] text-white hover:bg-[#9e7642] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Go to end"
            >
              <ChevronRight className="h-5 w-5" />
              <ChevronRight className="h-5 w-5 -ml-3" />
            </button>
          </div>

          {/* Move list */}
          {moves.length > 0 && (
            <div className="mt-4 p-3 bg-[#faf9f7] rounded max-h-32 overflow-y-auto">
              <div className="text-sm text-[#232829] font-mono">
                {moves.map((move, index) => {
                  const moveNumber = Math.floor(index / 2) + 1
                  const isWhiteMove = index % 2 === 0
                  
                  return (
                    <span key={index}>
                      {isWhiteMove && <span className="font-semibold">{moveNumber}. </span>}
                      <button
                        onClick={() => goToMove(index + 1)}
                        className={`hover:text-[#c49e4e] transition-colors ${
                          currentMove === index + 1 ? 'text-[#c49e4e] font-bold' : ''
                        }`}
                      >
                        {move}
                      </button>
                      {!isWhiteMove && ' '}
                      {' '}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
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
