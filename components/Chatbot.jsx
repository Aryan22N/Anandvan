"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Groq } from 'groq-sdk';
import { FaCommentDots, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';
import './Chatbot.css';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Required for client-side React usage
});

const SYSTEM_PROMPT = {
  role: "system",
  content: `You are the AI for Anandwan NGO (by Baba Amte).
Always keep answers EXTREMELY SHORT (1-2 sentences maximum).
Never write long paragraphs. Be direct and concise.
Always use Markdown formatting for emphasis, like **bolding** key terms.
If asked about funding, suggest direct donations or volunteering in one brief sentence.
CRITICAL: If the user wants to navigate to a page (e.g. about, contact, fundraiser, videos, awareness), give them a markdown link using these exact relative paths: /about, /contact, /fundraiser, /videos, /awareness.
Always include the text "Click on the link to navigate:" before providing the link. Follow this exact format:
Click on the link to navigate: [Go to Fundraiser](/fundraiser)`
};

function Chatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Namaste! 🙏 I am the Anandwan AI assistant. \n\nI am here to provide you with a complete overview of **Anandwan's mission, initiatives, and funding opportunities.** \n\nHow can I guide you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Initial placeholder for assistant's response
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    const chatHistory = [
      SYSTEM_PROMPT,
      // Pass the actual messages except the last empty assistant placeholder we just added
      ...messages.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: userMessage }
    ];

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: chatHistory,
        model: "llama-3.1-8b-instant", // specific groq active model
        temperature: 0.7,
        max_tokens: 1024,
        stream: true,
      });

      let fullResponse = '';
      
      for await (const chunk of chatCompletion) {
        const delta = chunk.choices[0]?.delta?.content || '';
        if (delta) {
          fullResponse += delta;
          // Update the last message in state with the new chunk
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = fullResponse;
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Groq API Error:", error);
      
      // Fallback
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = "Sorry, I am having trouble connecting to the network right now.";
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3><FaRobot /> Anandwan Assistant</h3>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.role}`}>
                <ReactMarkdown
                  components={{
                    a: ({ node, children, ...props }) => (
                      <a
                        {...props}
                        onClick={(e) => {
                          e.preventDefault();
                          if (props.href?.startsWith('/')) {
                            router.push(props.href);
                            window.scrollTo(0, 0); // Scroll to top
                            setIsOpen(false); // Close chat after navigating
                          } else {
                            window.open(props.href, '_blank');
                          }
                        }}
                        style={{ color: '#004d40', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        {children}
                      </a>
                    )
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.content === '' && (
              <div className="typing-indicator">Typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Anandwan or funding..."
              disabled={isLoading}
            />
            <button type="submit" disabled={!input.trim() || isLoading}>
              <FaPaperPlane size={14} />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button className="chatbot-button" onClick={() => setIsOpen(true)}>
          <FaCommentDots />
        </button>
      )}
    </div>
  );
}

export default Chatbot;
