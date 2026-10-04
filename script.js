// ==================== INITIAL DATA & STATE ====================
let user = {
  id: 1,
  name: 'Minh Anh',
  username: 'minhanh_123',
  bio: 'Cập nhật trạng thái thành công!',
  posts: 0,
  friends: 0,
  school: 'Sinh viên tại ĐH Kinh tế TP.HCM',
  liveIn: 'Sài Gòn, Việt Nam',
  roles: 'user'
};

// Đọc thông tin người dùng từ phiên đăng nhập (LocalStorage)
try {
  const savedUser = JSON.parse(localStorage.getItem('currentUser'));
  if (savedUser && savedUser.id) {
    user.id = savedUser.id;
    user.name = savedUser.full_name || savedUser.username || user.name;
    user.username = savedUser.username || user.username;
    if (savedUser.bio) user.bio = savedUser.bio;
    if (savedUser.school) user.school = savedUser.school;
    if (savedUser.liveIn) user.liveIn = savedUser.liveIn;
    if (savedUser.roles) user.roles = savedUser.roles;
  } else {
    // Nếu đang ở trang home.html và chưa có phiên, gán mặc định user 1 (Minh Anh) để trải nghiệm liền mạch
    if (window.location.pathname.includes('home.html')) {
      const defaultUser = {
        id: 1,
        username: 'minhanh_123',
        full_name: 'Minh Anh',
        email: 'minhanh@gmail.com',
        bio: 'Cập nhật trạng thái thành công!',
        school: 'Sinh viên tại ĐH Kinh tế TP.HCM',
        liveIn: 'Sài Gòn, Việt Nam',
        roles: 'user'
      };
      localStorage.setItem('currentUser', JSON.stringify(defaultUser));
      user.id = defaultUser.id;
      user.name = defaultUser.full_name;
      user.bio = defaultUser.bio;
    }
  }
} catch (e) {
  console.warn('Lỗi đọc currentUser:', e);
}

// Biến lưu trữ tệp ảnh khi tạo bài viết
let selectedPostImageFile = null;

// Biến quản lý trạng thái trò chuyện (Messenger)
let activeChatPartner = null;
let chatPollInterval = null;

// Biến theo dõi bộ lọc feed hiện tại
let currentFeedFilter = 'all';

// ==================== TOAST SYSTEM ====================
function showToast(msg, icon = '✨') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-box';
  toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.2s ease';
    setTimeout(() => toast.remove(), 200);
  }, 2500);
}

// ==================== TAB NAVIGATION ====================
function switchTab(tabId) {
  document.querySelectorAll('.sidebar-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.toggle('active', view.id === `tab-${tabId}`);
  });

  const mainWrapper = document.getElementById('main-wrapper');
  if (mainWrapper) mainWrapper.scrollTop = 0;

  if (tabId === 'friends') {
    loadFriends();
    loadFriendRequests();
  } else if (tabId === 'feed') {
    loadFeedPosts(currentFeedFilter);
  }
}

// ==================== PROFILE SUB-TABS ====================
function switchProfileTab(tabName) {
  document.querySelectorAll('.profile-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.ptab === tabName);
  });

  document.querySelectorAll('.profile-sub-view').forEach(view => {
    view.style.display = view.id === `profile-tab-${tabName}` ? 'block' : 'none';
  });
}

// ==================== HTML ESCAPING ====================
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

function formatPostTime(dateStr) {
  if (!dateStr) return 'Vừa xong';
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffHours = Math.floor((now - d) / (1000 * 60 * 60));
    if (diffHours <= 0) {
      const diffMins = Math.floor((now - d) / (1000 * 60));
      return diffMins > 0 ? `${diffMins} phút trước` : 'Vừa xong';
    }
    if (diffHours < 24) return `${diffHours} giờ trước`;
    return `${Math.floor(diffHours / 24)} ngày trước`;
  } catch (e) {
    return 'Vừa xong';
  }
}

// ==================== BUILD POST CARD HTML ====================
function buildPostCardHtml(p) {
  const author = p.full_name || p.username || 'Người dùng';
  const initial = author.charAt(0).toUpperCase();
  const timeStr = formatPostTime(p.created_at);
  const isOwner = p.user_id == user.id;

  const hasImage = !!p.image_url;
  const hasGradient = !hasImage && !!p.gradient;
  const gradientStyle = p.gradient || 'linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)';

  const hasLiked = !!p.user_has_reacted;
  const likesCount = parseInt(p.reaction_count) || 0;
  const commentsCount = parseInt(p.comment_count) || 0;

  return `
    <article class="post-card" data-post-id="${p.id}">
      <div class="post-head">
        <div class="post-author">
          <div class="avatar-circle" style="background:#35c9b0;">${initial}</div>
          <div>
            <h4 class="author-name">${escapeHtml(author)}</h4>
            <div class="post-time">${timeStr} · Công khai</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          ${isOwner ? `
            <button onclick="handleDeletePost(${p.id})" title="Xóa bài viết" style="color:var(--text-light-gray); font-size:14px; padding:4px 8px; border-radius:6px;" onmouseover="this.style.color='var(--brand-red)'" onmouseout="this.style.color='var(--text-light-gray)'">🗑️</button>
          ` : `
            <button style="color:var(--text-light-gray); font-size:18px;">•••</button>
          `}
        </div>
      </div>

      <p class="post-content">${escapeHtml(p.content)}</p>

      ${hasImage ? `
        <div class="post-media-box has-image">
          <img src="${p.image_url}" alt="Hình ảnh bài viết" class="post-card-img" onerror="this.parentElement.style.display='none'">
          ${p.location ? `<div class="location-tag"><span>📍</span><span>${escapeHtml(p.location)}</span></div>` : ''}
        </div>
      ` : (hasGradient ? `
        <div class="post-media-box" style="background:${gradientStyle};">
          ${p.location ? `<div class="location-tag"><span>📍</span><span>${escapeHtml(p.location)}</span></div>` : ''}
        </div>
      ` : '')}

      <div class="post-stats-row">
        <span class="like-count-stat" data-likes="${likesCount}">${likesCount} lượt thích</span>
        <span><span class="comment-count-stat" data-count="${commentsCount}">${commentsCount} bình luận</span> · 0 chia sẻ</span>
      </div>

      <div class="post-actions-row">
        <button class="action-btn ${hasLiked ? 'liked' : ''}" style="${hasLiked ? 'color:var(--brand-red);' : ''}" onclick="toggleLike(this, ${p.id})">
          <span class="like-icon">${hasLiked ? '❤️' : '🤍'}</span>
          <span>Thích</span>
        </button>
        <button class="action-btn" onclick="toggleCommentBox(this, ${p.id})">
          <span>💬</span><span>Bình luận</span>
        </button>
        <button class="action-btn" onclick="sharePost()">
          <span>↗</span><span>Chia sẻ</span>
        </button>
      </div>

      <div class="comments-container" style="display:none;" data-loaded="false">
        <div class="comment-input-row">
          <input type="text" class="comment-input" placeholder="Viết bình luận..." onkeydown="if(event.key==='Enter') addComment(this, ${p.id})">
          <button class="btn-send-comment" onclick="addComment(this, ${p.id})">Gửi</button>
        </div>
        <div class="comments-list">
          <div style="font-size:12px; color:var(--text-light-gray); text-align:center; padding:6px;">Đang tải bình luận...</div>
        </div>
      </div>
    </article>
  `;
}

// ==================== LOAD FEED POSTS ====================
async function loadFeedPosts(filter = 'all') {
  currentFeedFilter = filter;
  const homeFeed = document.getElementById('home-posts-list');
  const mainFeed = document.getElementById('feed-posts-list');
  const profileFeed = document.getElementById('profile-posts-list');

  try {
    const url = `http://localhost:8080/api/posts?current_user_id=${user.id}&filter=${filter}&userId=${user.id}`;
    const response = await fetch(url);
    if (!response.ok) return;

    const data = await response.json();
    const posts = data.posts || [];

    const allCardsHtml = posts.length > 0 
      ? posts.map(buildPostCardHtml).join('') 
      : `<div class="widget-card" style="text-align:center; padding:32px; color:var(--text-gray);">
          ${filter === 'following' ? 'Chưa có bài viết nào từ bạn bè của bạn. Hãy kết nối thêm bạn bè!' : 'Chưa có bài viết nào.'}
        </div>`;

    if (homeFeed && filter === 'all') homeFeed.innerHTML = allCardsHtml;
    if (mainFeed) mainFeed.innerHTML = allCardsHtml;

    if (profileFeed) {
      const myPosts = posts.filter(p => p.user_id == user.id);
      profileFeed.innerHTML = myPosts.length > 0 
        ? myPosts.map(buildPostCardHtml).join('')
        : `<div class="widget-card" style="text-align:center; padding:32px; color:var(--text-gray);">Bạn chưa đăng bài viết nào.</div>`;
      
      // Cập nhật số lượng bài viết của user
      user.posts = myPosts.length;
      document.querySelectorAll('.user-posts-stat').forEach(el => el.textContent = user.posts);
    }
  } catch (error) {
    console.warn('Lỗi khi tải bài viết từ server:', error);
  }
}

// ==================== FEED FILTERS ====================
function filterFeed(category, btn) {
  document.querySelectorAll('.feed-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  loadFeedPosts(category);
}

// ==================== POST INTERACTIONS: LIKE (THẢ TIM) ====================
async function toggleLike(btn, postId) {
  const card = btn.closest('.post-card');
  const statSpan = card.querySelector('.like-count-stat');

  try {
    const res = await fetch(`http://localhost:8080/api/posts/${postId}/react`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, type: 'love' })
    });

    const data = await res.json();
    if (!res.ok) {
      showToast(data.message || 'Lỗi khi tương tác bài viết', '⚠️');
      return;
    }

    if (data.reacted) {
      btn.classList.add('liked');
      btn.querySelector('.like-icon').textContent = '❤️';
      btn.style.color = 'var(--brand-red)';
      showToast('Đã thả tim bài viết ❤️');
    } else {
      btn.classList.remove('liked');
      btn.querySelector('.like-icon').textContent = '🤍';
      btn.style.color = 'var(--text-gray)';
    }

    if (statSpan) {
      statSpan.dataset.likes = data.reaction_count;
      statSpan.textContent = `${data.reaction_count} lượt thích`;
    }
  } catch (err) {
    console.error(err);
    showToast('Lỗi kết nối máy chủ khi thả tim', '⚠️');
  }
}

// ==================== POST INTERACTIONS: COMMENTS ====================
async function toggleCommentBox(btn, postId) {
  const card = btn.closest('.post-card');
  const commentBox = card.querySelector('.comments-container');
  if (!commentBox) return;

  const isHidden = commentBox.style.display === 'none';
  commentBox.style.display = isHidden ? 'flex' : 'none';

  if (isHidden) {
    const input = commentBox.querySelector('.comment-input');
    if (input) input.focus();

    // Tải bình luận từ database nếu chưa tải
    if (commentBox.dataset.loaded !== 'true') {
      await loadCommentsForPost(postId, commentBox);
    }
  }
}

async function loadCommentsForPost(postId, container) {
  const listEl = container.querySelector('.comments-list');
  try {
    const res = await fetch(`http://localhost:8080/api/posts/${postId}/comments`);
    if (!res.ok) return;

    const data = await res.json();
    const comments = data.comments || [];

    if (comments.length === 0) {
      listEl.innerHTML = `<div style="font-size:12px; color:var(--text-light-gray); padding:6px 0;">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</div>`;
    } else {
      listEl.innerHTML = comments.map(c => `
        <div class="comment-item" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
          <div>
            <div class="comment-author">${escapeHtml(c.full_name || c.username)}</div>
            <div class="comment-text">${escapeHtml(c.content)}</div>
            <div style="font-size:10.5px; color:var(--text-light-gray); margin-top:2px;">${formatPostTime(c.created_at)}</div>
          </div>
          ${c.user_id == user.id ? `
            <button onclick="handleDeleteComment(${c.id}, this, ${postId})" style="font-size:12px; color:var(--text-light-gray); padding:2px;" title="Xóa">✕</button>
          ` : ''}
        </div>
      `).join('');
    }
    container.dataset.loaded = 'true';
  } catch (err) {
    console.error(err);
    listEl.innerHTML = `<div style="font-size:12px; color:var(--brand-red);">Không thể tải bình luận</div>`;
  }
}

async function addComment(btn, postId) {
  const container = btn.closest('.comments-container');
  const input = container.querySelector('.comment-input');
  const val = input.value.trim();
  if (!val) return;

  try {
    const res = await fetch(`http://localhost:8080/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, content: val })
    });

    const data = await res.json();
    if (!res.ok) {
      showToast(data.message || 'Lỗi gửi bình luận', '⚠️');
      return;
    }

    input.value = '';
    showToast('Đã gửi bình luận thành công!');

    // Cập nhật số lượng bình luận trên Post card
    const card = container.closest('.post-card');
    const commentStat = card.querySelector('.comment-count-stat');
    if (commentStat) {
      commentStat.dataset.count = data.comment_count;
      commentStat.textContent = `${data.comment_count} bình luận`;
    }

    // Tải lại danh sách bình luận
    await loadCommentsForPost(postId, container);
  } catch (err) {
    console.error(err);
    showToast('Lỗi kết nối khi gửi bình luận', '⚠️');
  }
}

async function handleDeleteComment(commentId, btnEl, postId) {
  if (!confirm('Bạn có chắc muốn xóa bình luận này?')) return;
  try {
    const res = await fetch(`http://localhost:8080/api/comments/${commentId}`, { method: 'DELETE' });
    if (!res.ok) return;

    showToast('Đã xóa bình luận');
    const container = btnEl.closest('.comments-container');
    if (container) {
      await loadCommentsForPost(postId, container);
    }
  } catch (err) {
    console.error(err);
  }
}

async function handleDeletePost(postId) {
  if (!confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) return;
  try {
    const res = await fetch(`http://localhost:8080/api/posts/${postId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Không thể xóa bài viết');

    showToast('Đã xóa bài viết thành công!', '🗑️');
    loadFeedPosts(currentFeedFilter);
  } catch (err) {
    console.error(err);
    showToast('Lỗi khi xóa bài viết', '⚠️');
  }
}

function sharePost() {
  showToast('Đã sao chép liên kết chia sẻ!');
}

// ==================== POST CREATION WITH IMAGE ====================
function openCreatePostModal() {
  document.getElementById('modal-create-post').classList.add('open');
}

function closeCreatePostModal() {
  document.getElementById('modal-create-post').classList.remove('open');
  clearPostImageSelection();
}

function handlePostImageSelect(input) {
  if (input.files && input.files[0]) {
    selectedPostImageFile = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById('create-post-image-preview');
      const wrapper = document.getElementById('create-post-image-preview-wrapper');
      if (preview && wrapper) {
        preview.src = e.target.result;
        wrapper.style.display = 'block';
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function handlePostImageUrlInput(input) {
  const url = input.value.trim();
  const preview = document.getElementById('create-post-image-preview');
  const wrapper = document.getElementById('create-post-image-preview-wrapper');
  if (url && preview && wrapper) {
    preview.src = url;
    wrapper.style.display = 'block';
    selectedPostImageFile = null;
    const fileInput = document.getElementById('create-post-image-file');
    if (fileInput) fileInput.value = '';
  }
}

function clearPostImageSelection() {
  selectedPostImageFile = null;
  const fileInput = document.getElementById('create-post-image-file');
  const urlInput = document.getElementById('create-post-image-url');
  const wrapper = document.getElementById('create-post-image-preview-wrapper');
  if (fileInput) fileInput.value = '';
  if (urlInput) urlInput.value = '';
  if (wrapper) wrapper.style.display = 'none';
}

async function handleCreatePost(e) {
  e.preventDefault();
  const content = document.getElementById('create-post-content').value.trim();
  const location = document.getElementById('create-post-location').value.trim();
  const gradient = document.querySelector('input[name="post-gradient"]:checked')?.value || 'linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)';
  const hasBg = document.getElementById('create-post-has-media')?.checked;
  const directUrl = document.getElementById('create-post-image-url')?.value.trim();

  let imageUrl = directUrl || null;

  // Nếu người dùng chọn file ảnh từ máy tính -> upload lên server trước
  if (selectedPostImageFile) {
    try {
      showToast('Đang tải ảnh lên...', '⏳');
      const formData = new FormData();
      formData.append('image', selectedPostImageFile);
      const uploadRes = await fetch('http://localhost:8080/api/posts/upload-image', {
        method: 'POST',
        body: formData
      });
      const uploadData = await uploadRes.json();
      if (uploadRes.ok && uploadData.image_url) {
        imageUrl = uploadData.image_url;
      }
    } catch (err) {
      console.warn('Lỗi tải ảnh:', err);
    }
  }

  if (!content && !imageUrl) {
    showToast('Vui lòng nhập nội dung hoặc đính kèm ảnh', '⚠️');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/users/${user.id}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        location,
        gradient: hasBg ? gradient : null,
        image_url: imageUrl
      })
    });

    const result = await response.json();
    if (!response.ok) {
      showToast(result.message || 'Lỗi khi đăng bài', '⚠️');
      return;
    }

    showToast('Đăng bài viết mới thành công!', '🎉');
    document.getElementById('create-post-content').value = '';
    document.getElementById('create-post-location').value = '';
    closeCreatePostModal();

    // Tải lại newsfeed
    await loadFeedPosts(currentFeedFilter);
  } catch (error) {
    console.error(error);
    showToast('Không thể kết nối máy chủ để đăng bài', '⚠️');
  }
}

// ==================== EDIT PROFILE (CẬP NHẬT TIỂU SỬ / TRẠNG THÁI) ====================
function openEditProfileModal() {
  document.getElementById('edit-name-input').value = user.name;
  document.getElementById('edit-bio-input').value = user.bio || '';
  document.getElementById('edit-school-input').value = user.school || '';
  document.getElementById('edit-livein-input').value = user.liveIn || '';
  document.getElementById('modal-edit-profile').classList.add('open');
}

function closeEditProfileModal() {
  document.getElementById('modal-edit-profile').classList.remove('open');
}

async function handleEditProfile(e) {
  e.preventDefault();
  const newName = document.getElementById('edit-name-input').value.trim();
  const newBio = document.getElementById('edit-bio-input').value.trim();
  const newSchool = document.getElementById('edit-school-input').value.trim();
  const newLiveIn = document.getElementById('edit-livein-input').value.trim();

  try {
    const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newName,
        bio: newBio,
        school: newSchool,
        liveIn: newLiveIn
      })
    });

    if (!response.ok) throw new Error('Failed to update profile');

    user.name = newName;
    user.bio = newBio;
    user.school = newSchool;
    user.liveIn = newLiveIn;

    // Cập nhật LocalStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    currentUser.full_name = newName;
    currentUser.bio = newBio;
    currentUser.school = newSchool;
    currentUser.liveIn = newLiveIn;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Đồng bộ giao diện
    syncCurrentUserUI();
    closeEditProfileModal();
    showToast('Đã lưu thông tin trang cá nhân!', '✨');
  } catch (error) {
    console.error(error);
    showToast('Lỗi khi cập nhật thông tin cá nhân', '⚠️');
  }
}

// ==================== FRIENDSHIPS (KẾT BẠN) ====================
async function loadFriends() {
  const container = document.getElementById('all-friends-list');
  if (!container) return;

  try {
    const res = await fetch(`http://localhost:8080/api/users/${user.id}/friends`);
    if (!res.ok) return;

    const data = await res.json();
    const friends = data.friends || [];

    user.friends = friends.length;
    document.querySelectorAll('.user-friends-stat').forEach(el => el.textContent = friends.length);

    if (friends.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:24px; color:var(--text-gray); font-size:13px;">Bạn chưa có người bạn nào. Hãy gửi lời mời kết bạn từ danh sách gợi ý!</div>`;
      return;
    }

    container.innerHTML = friends.map(f => {
      const name = f.full_name || f.username;
      const initial = name.charAt(0).toUpperCase();
      const schoolOrLive = f.school || f.liveIn || 'Thành viên Socialita';

      return `
        <div class="friend-row">
          <div style="display:flex; align-items:center; gap:12px;">
            <div class="avatar-circle" style="background:#4c8dff;">${initial}</div>
            <div>
              <div style="font-weight:700; font-size:13.5px;">${escapeHtml(name)}</div>
              <div style="font-size:11.5px; color:var(--text-light-gray);">${escapeHtml(schoolOrLive)}</div>
            </div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="icon-btn-white" style="width:34px; height:34px; border:1px solid #e5e7eb;" title="Nhắn tin" onclick="openChatWith(${f.id}, '${escapeHtml(name)}')">✉️</button>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error(err);
  }
}

async function loadFriendRequests() {
  const grid = document.querySelector('.friend-requests-grid');
  const countBadge = document.getElementById('friend-requests-count');
  const sidebarBadge = document.getElementById('badge-friends-count');
  if (!grid) return;

  try {
    const res = await fetch(`http://localhost:8080/api/users/${user.id}/friend-requests`);
    if (!res.ok) return;

    const data = await res.json();
    const requests = data.requests || [];

    if (countBadge) countBadge.textContent = requests.length;
    if (sidebarBadge) sidebarBadge.textContent = requests.length;

    if (requests.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; padding:24px; color:var(--text-gray); font-size:13px;">Không có lời mời kết bạn nào đang chờ.</div>`;
      return;
    }

    grid.innerHTML = requests.map(r => {
      const name = r.full_name || r.username;
      const initial = name.charAt(0).toUpperCase();

      return `
        <div class="request-card">
          <div class="avatar-circle" style="background:#ff7675; width:52px; height:52px; font-size:18px; margin-bottom:10px;">${initial}</div>
          <div style="font-weight:700; font-size:13.5px;">${escapeHtml(name)}</div>
          <div style="font-size:11px; color:var(--text-light-gray);">${escapeHtml(r.bio || 'Yêu cầu kết bạn')}</div>
          <div class="request-actions">
            <button class="btn-accept" onclick="acceptFriend(this, ${r.requester_id}, '${escapeHtml(name)}')">Chấp nhận</button>
            <button class="btn-reject" onclick="rejectFriend(this, ${r.requester_id}, '${escapeHtml(name)}')">Từ chối</button>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error(err);
  }
}

async function loadFriendSuggestions() {
  const list = document.getElementById('friend-suggestions-list');
  if (!list) return;

  try {
    const res = await fetch(`http://localhost:8080/api/users/${user.id}/suggestions`);
    if (!res.ok) return;

    const data = await res.json();
    const suggestions = data.suggestions || [];

    if (suggestions.length === 0) {
      list.innerHTML = `<div style="font-size:12px; color:var(--text-light-gray); text-align:center; padding:12px;">Đã kết nối với mọi người!</div>`;
      return;
    }

    list.innerHTML = suggestions.map(s => {
      const name = s.full_name || s.username;
      const initial = name.charAt(0).toUpperCase();

      return `
        <div class="suggestion-item">
          <div style="display:flex; align-items:center; gap:10px;">
            <div class="avatar-circle" style="background:#74b9ff; width:36px; height:36px; font-size:12px;">${initial}</div>
            <div>
              <div style="font-size:13px; font-weight:700;">${escapeHtml(name)}</div>
              <div style="font-size:11px; color:var(--text-light-gray);">${escapeHtml(s.school || 'Gợi ý cho bạn')}</div>
            </div>
          </div>
          <button class="btn-add-friend" onclick="sendFriendRequest(this, ${s.id}, '${escapeHtml(name)}')">Kết bạn</button>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error(err);
  }
}

async function sendFriendRequest(btn, targetUserId, targetName) {
  try {
    const res = await fetch('http://localhost:8080/api/friends/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requester_id: user.id, receiver_id: targetUserId })
    });

    const data = await res.json();
    if (!res.ok) {
      showToast(data.message || 'Không thể gửi lời mời', '⚠️');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Đã gửi';
    btn.style.background = '#e5e7eb';
    btn.style.color = '#6b7280';
    showToast(`Đã gửi lời mời kết bạn đến ${targetName}!`, '🤝');
  } catch (err) {
    console.error(err);
    showToast('Lỗi khi gửi lời mời kết bạn', '⚠️');
  }
}

async function acceptFriend(btn, requesterId, requesterName) {
  try {
    const res = await fetch('http://localhost:8080/api/friends/respond', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requester_id: requesterId, user_id: user.id, action: 'accept' })
    });

    const data = await res.json();
    if (!res.ok) {
      showToast(data.message || 'Lỗi khi chấp nhận kết bạn', '⚠️');
      return;
    }

    showToast(`Đã đồng ý kết bạn với ${requesterName}!`, '🎉');
    await loadFriends();
    await loadFriendRequests();
    await loadFriendSuggestions();
  } catch (err) {
    console.error(err);
    showToast('Lỗi khi chấp nhận kết bạn', '⚠️');
  }
}

async function rejectFriend(btn, requesterId, requesterName) {
  try {
    const res = await fetch('http://localhost:8080/api/friends/respond', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requester_id: requesterId, user_id: user.id, action: 'reject' })
    });

    if (!res.ok) return;

    showToast(`Đã từ chối lời mời của ${requesterName}`, 'ℹ️');
    await loadFriendRequests();
  } catch (err) {
    console.error(err);
  }
}

// ==================== MESSAGING SYSTEM (NHẮN TIN) ====================
function openChatWith(partnerId, partnerName, partnerAvatar) {
  activeChatPartner = {
    id: partnerId,
    name: partnerName,
    avatar: partnerAvatar || partnerName.charAt(0).toUpperCase()
  };

  const nameEl = document.getElementById('messenger-partner-name');
  const avatarEl = document.getElementById('messenger-partner-avatar');
  if (nameEl) nameEl.textContent = partnerName;
  if (avatarEl) avatarEl.textContent = activeChatPartner.avatar;

  const dock = document.getElementById('messenger-dock');
  if (dock) dock.classList.add('open');

  // Đóng dropdown cuộc hội thoại nếu đang mở
  const convDropdown = document.getElementById('conversations-dropdown');
  if (convDropdown) convDropdown.classList.remove('open');

  loadChatMessages();

  // Bắt đầu chu kỳ làm mới tin nhắn mỗi 3 giây
  if (chatPollInterval) clearInterval(chatPollInterval);
  chatPollInterval = setInterval(loadChatMessages, 3000);

  const input = document.getElementById('messenger-input');
  if (input) input.focus();
}

function closeChatBox() {
  const dock = document.getElementById('messenger-dock');
  if (dock) dock.classList.remove('open');
  if (chatPollInterval) clearInterval(chatPollInterval);
  activeChatPartner = null;
}

async function loadChatMessages() {
  if (!activeChatPartner) return;
  const body = document.getElementById('messenger-messages-body');
  if (!body) return;

  try {
    const res = await fetch(`http://localhost:8080/api/messages/${user.id}/${activeChatPartner.id}`);
    if (!res.ok) return;

    const data = await res.json();
    const messages = data.messages || [];

    if (messages.length === 0) {
      body.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-light-gray); font-size:12.5px;">Chưa có tin nhắn nào. Hãy gửi lời chào đến ${escapeHtml(activeChatPartner.name)}! 👋</div>`;
      return;
    }

    body.innerHTML = messages.map(m => {
      const isSentByMe = m.sender_id == user.id;
      const timeStr = m.created_at ? new Date(m.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '';

      return `
        <div class="chat-bubble ${isSentByMe ? 'sent' : 'received'}">
          <div>${escapeHtml(m.content)}</div>
          <div class="chat-bubble-time">${timeStr}</div>
        </div>
      `;
    }).join('');

    body.scrollTop = body.scrollHeight;
  } catch (err) {
    console.error(err);
  }
}

async function handleSendChatMessage(e) {
  e.preventDefault();
  if (!activeChatPartner) return;

  const input = document.getElementById('messenger-input');
  const content = input.value.trim();
  if (!content) return;

  try {
    input.value = '';
    const res = await fetch('http://localhost:8080/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender_id: user.id,
        receiver_id: activeChatPartner.id,
        content
      })
    });

    if (!res.ok) {
      showToast('Lỗi khi gửi tin nhắn', '⚠️');
      return;
    }

    await loadChatMessages();
  } catch (err) {
    console.error(err);
    showToast('Lỗi kết nối khi gửi tin nhắn', '⚠️');
  }
}

async function toggleConversationsDropdown() {
  const dropdown = document.getElementById('conversations-dropdown');
  if (!dropdown) return;

  const isOpen = dropdown.classList.contains('open');
  if (isOpen) {
    dropdown.classList.remove('open');
  } else {
    dropdown.classList.add('open');
    await loadRecentConversations();
  }
}

async function loadRecentConversations() {
  const container = document.getElementById('conversations-list-container');
  if (!container) return;

  try {
    const res = await fetch(`http://localhost:8080/api/messages/conversations/${user.id}`);
    if (!res.ok) return;

    const data = await res.json();
    const convs = data.conversations || [];

    if (convs.length === 0) {
      container.innerHTML = `<div style="padding:16px; text-align:center; font-size:12.5px; color:var(--text-gray);">Chưa có tin nhắn nào gần đây.</div>`;
      return;
    }

    container.innerHTML = convs.map(c => {
      const name = c.partner_name || c.partner_username;
      const initial = name.charAt(0).toUpperCase();
      const lastMsg = c.last_message || 'Bắt đầu cuộc trò chuyện';

      return `
        <div class="conv-item" onclick="openChatWith(${c.partner_id}, '${escapeHtml(name)}')">
          <div class="avatar-circle" style="background:#e52e3d; width:34px; height:34px; font-size:12px;">${initial}</div>
          <div style="flex:1; overflow:hidden;">
            <div style="font-weight:700; font-size:13px; color:var(--text-dark);">${escapeHtml(name)}</div>
            <div style="font-size:11.5px; color:var(--text-light-gray); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(lastMsg)}</div>
          </div>
          ${c.unread_count > 0 ? `<span style="background:var(--brand-red); color:#fff; border-radius:50%; font-size:10px; padding:2px 6px; font-weight:700;">${c.unread_count}</span>` : ''}
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error(err);
  }
}

// ==================== SEARCH ====================
function handleMainSearch(input) {
  const query = input.value.toLowerCase().trim();
  document.querySelectorAll('#home-posts-list .post-card, #feed-posts-list .post-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? 'block' : 'none';
  });
}

function handleFriendSearch(input) {
  const query = input.value.toLowerCase().trim();
  document.querySelectorAll('#all-friends-list .friend-row').forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? 'flex' : 'none';
  });
}

// ==================== AUTHENTICATION LOGIC ====================
async function handleLogin() {
  const usernameInput = document.getElementById('login-username');
  const passwordInput = document.getElementById('login-password');
  if (!usernameInput || !passwordInput) return;

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    showToast('Vui lòng nhập email/tên đăng nhập và mật khẩu', '⚠️');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Đăng nhập không thành công');
    }

    localStorage.setItem('token', data.token);
    if (data.user) {
      localStorage.setItem('currentUser', JSON.stringify(data.user));
    }

    showToast('Đăng nhập thành công!', '✨');

    setTimeout(() => {
      const userRole = data.role || data.user?.roles;
      if (userRole === 'admin') {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'home.html';
      }
    }, 600);

  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    showToast(error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.', '⚠️');
  }
}

async function handleRegister() {
  const lastName = (document.getElementById('reg-last-name')?.value || '').trim();
  const firstName = (document.getElementById('reg-first-name')?.value || '').trim();
  const email = (document.getElementById('reg-email')?.value || '').trim();
  const password = (document.getElementById('reg-password')?.value || '').trim();
  const confirmPassword = (document.getElementById('reg-password-confirm')?.value || '').trim();

  if (!email || !password) {
    showToast('Vui lòng nhập Email và Mật khẩu', '⚠️');
    return;
  }

  if (confirmPassword && password !== confirmPassword) {
    showToast('Mật khẩu xác nhận không khớp!', '⚠️');
    return;
  }

  const fullName = `${lastName} ${firstName}`.trim() || firstName || lastName || 'Người dùng mới';
  const username = email.split('@')[0] || `user_${Date.now()}`;

  try {
    const response = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
        full_name: fullName
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Đăng ký không thành công');
    }

    showToast('Đăng ký tài khoản thành công! Đang chuyển sang đăng nhập...', '✨');

    setTimeout(() => {
      const loginUser = document.getElementById('login-username');
      const loginPass = document.getElementById('login-password');
      if (loginUser) loginUser.value = email;
      if (loginPass) loginPass.value = password;
      if (typeof toggleAuth === 'function') toggleAuth('login');
    }, 1200);

  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    showToast(error.message || 'Đăng ký thất bại.', '⚠️');
  }
}

function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  showToast('Đã đăng xuất khỏi tài khoản', 'ℹ️');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 500);
}

// ==================== SYNC USER UI ====================
function syncCurrentUserUI() {
  document.querySelectorAll('.profile-user-name').forEach(el => el.textContent = user.name);
  document.querySelectorAll('.profile-user-bio').forEach(el => el.textContent = user.bio);
  document.querySelectorAll('.user-school-text').forEach(el => el.textContent = user.school);
  document.querySelectorAll('.user-livein-text').forEach(el => el.textContent = user.liveIn);

  const bannerTitle = document.querySelector('.banner-title');
  if (bannerTitle) {
    bannerTitle.textContent = `Chào buổi sáng, ${user.name} 👋`;
  }

  // Nếu là admin, hiển thị nút Admin trên Sidebar
  const adminSidebarLink = document.getElementById('sidebar-admin-link');
  if (adminSidebarLink) {
    adminSidebarLink.style.display = (user.roles === 'admin') ? 'flex' : 'none';
  }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  syncCurrentUserUI();
  loadFeedPosts('all');
  loadFriends();
  loadFriendRequests();
  loadFriendSuggestions();
});
