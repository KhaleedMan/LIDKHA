import { useState } from 'react'
import './ChatSection.css'

export default function ChatSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! 👋 Welcome to LIDKHA. How can we help you today?'
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: input }])

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        'Great question! Our course covers everything you need to start earning with your smartphone.',
        'Yes, you can start learning immediately after signing up.',
        'We support multiple languages to make learning easier for you.',
        'The course is designed for complete beginners with no prior experience needed.',
        'You can access the course anytime from any device with internet.'
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { type: 'bot', text: randomResponse }])
    }, 800)

    setInput('')
  }

  return (
    <>
      {/* Chat Button */}
      <button
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with us"
      >
        <span className="chat-icon">💬</span>
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <h3>LIDKHA Support</h3>
            <button
              className="chat-close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                <div className="message-content">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="chat-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="chat-input"
            />
            <button type="submit" className="chat-send">
              →
            </button>
          </form>
        </div>
      )}
    </>
  )
}
