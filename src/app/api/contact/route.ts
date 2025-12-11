import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Store the message in a database
    // 2. Send an email notification to the admin
    // 3. Send a confirmation email to the user
    
    // For now, we'll just log it and return success
    console.log('Contact form submission:', { name, email, subject, message })

    // TODO: Implement actual email sending or database storage
    // Example: await sendEmail({ to: 'admin@smartchess.com', ... })

    return NextResponse.json(
      { message: 'Message received successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}
