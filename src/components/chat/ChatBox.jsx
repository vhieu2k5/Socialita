import React, { useState, useRef, useEffect } from 'react';
import { useSocial } from '../../context/SocialContext';

export const ChatBox = () => {
  const { activeChat, closeChat, sendMessage } = useSocial();
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isMinimized) {
      scrollToBottom();
    }
  }, [activeChat?.messages, isMinimized]);

  if (!activeChat) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeChat.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className={'chat-box-floating ' + (isMinimized ? 'minimized' : '')}>
      {/* Header */}
      <div className="chat-box-header" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="chat-contact-info">
          <div className="chat-avatar-wrap">
            <img src={activeChat.avatar} alt={activeChat.name} />
            <span className="chat-online-dot"></span>
          </div>
          <div>
            <div className="chat-contact-name">{activeChat.name}</div>
            <div className="chat-status-text">
              {activeChat.isGroup ? 'Nhóm trò chuyện' : 'Đang hoạt động'}
            </div>
          </div>
        </div>

        <div className="chat-controls" onClick={(e) => e.stopPropagation()}>
          <button
            className="chat-ctrl-btn"
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? 'Mở rộng' : 'Thu nhỏ'}
          >
            {isMinimized ? '▲' : '─'}
          </button>
          <button className="chat-ctrl-btn" onClick={closeChat} title="Đóng">✕</button>
        </div>
      </div>

      {/* Body & Input (chỉ hiện khi không thu nhỏ) */}
      {!isMinimized && (
        <>
          <div className="chat-box-messages">
            <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
              <img
                src={activeChat.avatar}
                alt={activeChat.name}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 6px' }}
              />
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)' }}>{activeChat.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-light-gray)' }}>Các bạn đã kết nối trên Socialita</div>
            </div>

            {(activeChat.messages || []).map((msg) => (
              <div
                key={msg.id}
                className={'chat-bubble-row ' + (msg.isMe ? 'outgoing' : 'incoming')}
              >
                {!msg.isMe && (
                  <img src={activeChat.avatar} alt="" className="bubble-avatar" />
                )}
                <div className={'chat-bubble ' + (msg.isMe ? 'outgoing' : 'incoming')}>
                  <div className="bubble-text">{msg.text}</div>
                  {msg.time && <div className="bubble-time">{msg.time}</div>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="chat-box-input-row">
            <input
              type="text"
              placeholder="Aa..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="chat-input-field"
              autoFocus
            />
            <button type="submit" className="chat-send-btn" disabled={!inputText.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </>
      )}
    </div>
  );
};
