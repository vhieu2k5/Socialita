import React, { useState, useRef, useEffect } from 'react';
import { useSocial } from '../../context/SocialContext';

export const ChatBox = () => {
  const { activeChat, closeChat, sendMessage } = useSocial();
  const [inputText, setInputText] = useState('');
  const [avatarError, setAvatarError] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setAvatarError(false);
  }, [activeChat?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  if (!activeChat) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeChat.id, inputText.trim());
    setInputText('');
  };

  const initialLetter = (activeChat.name || '?').charAt(0).toUpperCase();

  return (
    <div className="chat-box-floating">
      {/* Header đen chuẩn ảnh 2 */}
      <div className="chat-box-header">
        <div className="chat-contact-info">
          <div className="chat-avatar-wrap">
            {activeChat.avatar && !avatarError ? (
              <img
                src={activeChat.avatar}
                alt={activeChat.name}
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div
                className="chat-avatar-initial"
                style={{ backgroundColor: activeChat.avatarBg || '#dc2626' }}
              >
                {initialLetter}
              </div>
            )}
          </div>
          <div>
            <div className="chat-contact-name">{activeChat.name}</div>
            <div className="chat-status-text">
              <span className="chat-online-dot"></span>
              <span>{activeChat.isGroup ? 'Nhóm trò chuyện' : 'Đang hoạt động'}</span>
            </div>
          </div>
        </div>

        <div className="chat-controls">
          <button className="chat-close-btn" onClick={closeChat} title="Đóng">
            ✕
          </button>
        </div>
      </div>

      {/* Body tin nhắn */}
      <div className="chat-box-messages">
        {(activeChat.messages || []).map((msg) => (
          <div
            key={msg.id}
            className={'chat-msg-row ' + (msg.isMe ? 'outgoing' : 'incoming')}
          >
            {msg.isMe ? (
              /* Tin nhắn gửi đi: bubble đỏ, chữ trắng, thời gian góc dưới bên phải trong bubble */
              <div className="chat-bubble outgoing">
                <div className="bubble-text">{msg.text}</div>
                {msg.time && <div className="bubble-time outgoing">{msg.time}</div>}
              </div>
            ) : (
              /* Tin nhắn nhận: bubble trắng viền nhẹ, thời gian nằm bên dưới bubble */
              <>
                <div className="chat-bubble incoming">
                  <div className="bubble-text">{msg.text}</div>
                </div>
                {msg.time && <div className="bubble-time incoming">{msg.time}</div>}
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input row với nút "Gửi" bo tròn đỏ */}
      <form onSubmit={handleSend} className="chat-box-input-row">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="chat-input-field"
          autoFocus
        />
        <button
          type="submit"
          className="chat-send-btn"
          disabled={!inputText.trim()}
        >
          Gửi
        </button>
      </form>
    </div>
  );
};
