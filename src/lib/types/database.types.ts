export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          lichess_username: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          lichess_username?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          lichess_username?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: number
          email: string
          subscribed_at: string
        }
        Insert: {
          id?: number
          email: string
          subscribed_at?: string
        }
        Update: {
          id?: number
          email?: string
          subscribed_at?: string
        }
      }
      forum_posts: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          slug: string
          title: string
          author: string
          description: string | null
          content_json: ArticleContent
          published_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          author: string
          description?: string | null
          content_json: ArticleContent
          published_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          author?: string
          description?: string | null
          content_json?: ArticleContent
          published_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      news_facts: {
        Row: {
          id: string
          date: string
          title: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          date: string
          title: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date?: string
          title?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Article Content Block Types
export type ArticleBlockType = 'paragraph' | 'heading' | 'image' | 'chessboard' | 'embed' | 'lichess_study'

export interface ParagraphBlock {
  type: 'paragraph'
  text: string
}

export interface HeadingBlock {
  type: 'heading'
  level: 1 | 2 | 3 | 4 | 5 | 6
  text: string
}

export interface ImageBlock {
  type: 'image'
  url: string
  alt: string
  caption?: string
}

export interface ChessboardBlock {
  type: 'chessboard'
  pgn: string
  caption?: string
}

export interface EmbedBlock {
  type: 'embed'
  iframe_src: string
  title?: string
  caption?: string
}

export interface LichessStudyBlock {
  type: 'lichess_study'
  studyId: string
  chapterId?: string
  caption?: string
}

export type ArticleBlock = 
  | ParagraphBlock 
  | HeadingBlock 
  | ImageBlock 
  | ChessboardBlock 
  | EmbedBlock
  | LichessStudyBlock

export type ArticleContent = ArticleBlock[]

// Helper types for relations
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ForumPost = Database['public']['Tables']['forum_posts']['Row']
export type Article = Database['public']['Tables']['articles']['Row']
export type NewsFact = Database['public']['Tables']['news_facts']['Row']

export interface ForumPostWithProfile extends ForumPost {
  profiles: Profile
}
