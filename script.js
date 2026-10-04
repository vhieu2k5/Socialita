// ==================== INITIAL DATA & STATE ====================
let user = {
  id: 1,
  name: 'Minh Anh Lê',
  bio: 'Bio - Yêu thích du lịch - Hải Phòng, VN',
  posts: 86,
  friends: 128,
  followers: '1.4K',
  groups: 9,
  school: 'Sinh viên tại ĐH Kinh tế TP.HCM',
  liveIn: 'Sống tại Sài Gòn, Việt Nam',
  joinedDate: 'Tham gia từ tháng 3, 2024'
};

// Đọc thông tin người dùng từ phiên đăng nhập (LocalStorage)
try {
  const savedUser = JSON.parse(localStorage.getItem('currentUser'));
  if (savedUser && savedUser.id) {
    user.id = savedUser.id;
    user.name = savedUser.full_name || savedUser.username || user.name;
    if (savedUser.bio) user.bio = savedUser.bio;
    if (savedUser.school) user.school = savedUser.school;
    if (savedUser.liveIn) user.liveIn = savedUser.liveIn;
  }
} catch (e) {
  console.warn('Lỗi đọc currentUser:', e);
}

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
  // Update sidebar active classes
  document.querySelectorAll('.sidebar-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // Update visible tab section
  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.toggle('active', view.id === `tab-${tabId}`);
  });

  // Scroll to top of main wrapper
  document.getElementById('main-wrapper').scrollTop = 0;
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

// ==================== POST INTERACTIONS ====================
function toggleLike(btn) {
  btn.classList.toggle('liked');
  const card = btn.closest('.post-card');
  const statSpan = card.querySelector('.like-count-stat');
  let currentLikes = parseInt(statSpan.dataset.likes || statSpan.textContent.match(/\d+/)[0]);

  if (btn.classList.contains('liked')) {
    currentLikes += 1;
    btn.querySelector('.like-icon').textContent = '❤️';
    btn.style.color = 'var(--brand-red)';
  } else {
    currentLikes -= 1;
    btn.querySelector('.like-icon').textContent = '🤍';
    btn.style.color = 'var(--text-gray)';
  }

  statSpan.dataset.likes = currentLikes;
  statSpan.textContent = `${currentLikes} lượt thích`;
}

function toggleCommentBox(btn) {
  const card = btn.closest('.post-card');
  const commentBox = card.querySelector('.comments-container');
  if (commentBox) {
    commentBox.style.display = commentBox.style.display === 'none' ? 'flex' : 'none';
    if (commentBox.style.display === 'flex') {
      const input = commentBox.querySelector('.comment-input');
      if (input) input.focus();
    }
  }
}

function addComment(btn) {
  const container = btn.closest('.comments-container');
  const input = container.querySelector('.comment-input');
  const val = input.value.trim();
  if (!val) return;

  const commentsList = container.querySelector('.comments-list');
  const commentEl = document.createElement('div');
  commentEl.className = 'comment-item';
  commentEl.innerHTML = `
    <div class="comment-author">${user.name}</div>
    <div class="comment-text">${val}</div>
  `;
  commentsList.appendChild(commentEl);
  input.value = '';

  // Update comment counter in stats
  const card = btn.closest('.post-card');
  const commentStat = card.querySelector('.comment-count-stat');
  if (commentStat) {
    const current = parseInt(commentStat.dataset.count || commentStat.textContent.match(/\d+/)[0]);
    commentStat.dataset.count = current + 1;
    commentStat.textContent = `${current + 1} bình luận`;
  }
  showToast('Đã gửi bình luận');
}

function sharePost() {
  showToast('Đã sao chép liên kết chia sẻ!');
}

// ==================== FRIEND REQUESTS ====================
function acceptFriend(btn, name) {
  const card = btn.closest('.request-card');
  card.remove();

  // Increment user friends count
  user.friends += 1;
  document.querySelectorAll('.user-friends-stat').forEach(el => el.textContent = user.friends);
  
  // Decrement badge count
  const badge = document.getElementById('badge-friends-count');
  if (badge) {
    const count = parseInt(badge.textContent) - 1;
    badge.textContent = count > 0 ? count : 0;
  }

  showToast(`Đã đồng ý kết bạn với ${name}!`);
}

function rejectFriend(btn, name) {
  const card = btn.closest('.request-card');
  card.remove();

  // Decrement badge count
  const badge = document.getElementById('badge-friends-count');
  if (badge) {
    const count = parseInt(badge.textContent) - 1;
    badge.textContent = count > 0 ? count : 0;
  }

  showToast(`Đã từ chối lời mời của ${name}`, 'ℹ️');
}

function sendFriendRequest(btn, name) {
  btn.disabled = true;
  btn.textContent = 'Đã gửi';
  showToast(`Đã gửi lời mời kết bạn đến ${name}`);
}

// ==================== CREATE POST MODAL ====================
function openCreatePostModal() {
  document.getElementById('modal-create-post').classList.add('open');
}

function closeCreatePostModal() {
  document.getElementById('modal-create-post').classList.remove('open');
}

async function handleCreatePost(e) {
  e.preventDefault();
  const content = document.getElementById('create-post-content').value.trim();
  const location = document.getElementById('create-post-location').value.trim();
  const gradient = document.querySelector('input[name="post-gradient"]:checked')?.value || 'linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)';
  const hasBg = document.getElementById('create-post-has-media').checked;

  if (!content) return;

  try {
    const response = await fetch(`http://localhost:8080/api/users/${user.id}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content,
        location,
        gradient
      })
    });
    const result = await response.json();
    if (!response.ok) {
      showToast(result.message || 'Lỗi khi đăng bài', '⚠️');
      return;
    }
    showToast('Đăng bài thành công!', '🎉');

  // Build new post card
  const newCard = document.createElement('article');
  newCard.className = 'post-card';
  newCard.innerHTML = `
    <div class="post-head">
      <div class="post-author">
        <div class="avatar-circle" style="background:#35c9b0;">Avt</div>
        <div>
          <h4 class="author-name">${user.name}</h4>
          <div class="post-time">Vừa xong · Công khai</div>
        </div>
      </div>
      <button style="color:var(--text-light-gray); font-size:18px;">•••</button>
    </div>

    <p class="post-content">${content}</p>

    ${hasBg ? `
      <div class="post-media-box" style="background:${gradient};">
        ${location ? `<div class="location-tag"><span>📍</span><span>${location}</span></div>` : ''}
      </div>
    ` : ''}

    <div class="post-stats-row">
      <span class="like-count-stat" data-likes="0">0 lượt thích</span>
      <span><span class="comment-count-stat" data-count="0">0 bình luận</span> · 0 chia sẻ</span>
    </div>

    <div class="post-actions-row">
      <button class="action-btn" onclick="toggleLike(this)">
        <span class="like-icon">🤍</span><span>Thích</span>
      </button>
      <button class="action-btn" onclick="toggleCommentBox(this)">
        <span>💬</span><span>Bình luận</span>
      </button>
      <button class="action-btn" onclick="sharePost()">
        <span>↗</span><span>Chia sẻ</span>
      </button>
    </div>

    <div class="comments-container" style="display:none;">
      <div class="comment-input-row">
        <input type="text" class="comment-input" placeholder="Viết bình luận...">
        <button class="btn-send-comment" onclick="addComment(this)">Gửi</button>
      </div>
      <div class="comments-list"></div>
    </div>
  `;
  // Insert into Home and Feed post lists
  const homeFeed = document.getElementById('home-posts-list');
  const mainFeed = document.getElementById('feed-posts-list');
  const profileFeed = document.getElementById('profile-posts-list');

  if (homeFeed) homeFeed.prepend(newCard.cloneNode(true));
  if (mainFeed) mainFeed.prepend(newCard.cloneNode(true));
  if (profileFeed) profileFeed.prepend(newCard.cloneNode(true));

  // Increment user post stat
  user.posts += 1;
  document.querySelectorAll('.user-posts-stat').forEach(el => el.textContent = user.posts);

  // Reset form & close modal
  document.getElementById('create-post-content').value = '';
  document.getElementById('create-post-location').value = '';
  closeCreatePostModal();
  showToast('Đăng bài viết mới thành công!');

  } catch (error) {
    console.error(error);
    showToast('Không kết nối được với server');
    return;
  }
}

// ==================== EDIT PROFILE MODAL ====================
function openEditProfileModal() {
  document.getElementById('edit-name-input').value = user.name;
  document.getElementById('edit-bio-input').value = user.bio;
  document.getElementById('edit-school-input').value = user.school;
  document.getElementById('edit-livein-input').value = user.liveIn;
  document.getElementById('modal-edit-profile').classList.add('open');
}

function closeEditProfileModal() {
  document.getElementById('modal-edit-profile').classList.remove('open');
}

async function handleEditProfile(e) {
  e.preventDefault();
  user.name = document.getElementById('edit-name-input').value.trim();
  user.bio = document.getElementById('edit-bio-input').value.trim();
  user.school = document.getElementById('edit-school-input').value.trim();
  user.liveIn = document.getElementById('edit-livein-input').value.trim();

  try {
    const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        bio: user.bio,
        school: user.school,
        liveIn: user.liveIn
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }


  // Update UI everywhere
  document.querySelectorAll('.profile-user-name').forEach(el => el.textContent = user.name);
  document.querySelectorAll('.profile-user-bio').forEach(el => el.textContent = user.bio);
  document.querySelectorAll('.user-school-text').forEach(el => el.textContent = user.school);
  document.querySelectorAll('.user-livein-text').forEach(el => el.textContent = user.liveIn);

  closeEditProfileModal();
  showToast('Đã lưu thay đổi trang cá nhân!');

  } catch (error) {
    console.error(error);
    showToast('Không thể cập nhật thông tin cá nhân');
    return;
  }
}

// ==================== FEED FILTERS ====================
function filterFeed(category, btn) {
  document.querySelectorAll('.feed-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('#feed-posts-list .post-card').forEach(post => {
    const postCat = post.dataset.category || 'all';
    if (category === 'all' || postCat === category || postCat === 'all') {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
}

// ==================== SEARCH FUNCTIONALITY ====================
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: username, password })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Đăng nhập không thành công');
    }

    // Lưu token và thông tin người dùng vào LocalStorage
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
      headers: {
        'Content-Type': 'application/json'
      },
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

    // Tự động điền thông tin sang form đăng nhập
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

// ==================== DYNAMIC FEED & POST FETCHING ====================
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
    if (diffHours <= 0) return 'Vừa xong';
    if (diffHours < 24) return `${diffHours} giờ trước`;
    return `${Math.floor(diffHours / 24)} ngày trước`;
  } catch (e) {
    return 'Vừa xong';
  }
}

function buildPostCardHtml(p) {
  const author = p.full_name || p.username || 'Người dùng';
  const initial = author.charAt(0).toUpperCase();
  const timeStr = formatPostTime(p.created_at);
  const gradientStyle = p.gradient || 'linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)';
  const hasMedia = p.gradient || p.image_url;

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
        <button style="color:var(--text-light-gray); font-size:18px;">•••</button>
      </div>

      <p class="post-content">${escapeHtml(p.content)}</p>

      ${hasMedia ? `
        <div class="post-media-box" style="background:${gradientStyle};">
          ${p.location ? `<div class="location-tag"><span>📍</span><span>${escapeHtml(p.location)}</span></div>` : ''}
        </div>
      ` : ''}

      <div class="post-stats-row">
        <span class="like-count-stat" data-likes="0">0 lượt thích</span>
        <span><span class="comment-count-stat" data-count="0">0 bình luận</span> · 0 chia sẻ</span>
      </div>

      <div class="post-actions-row">
        <button class="action-btn" onclick="toggleLike(this)">
          <span class="like-icon">🤍</span><span>Thích</span>
        </button>
        <button class="action-btn" onclick="toggleCommentBox(this)">
          <span>💬</span><span>Bình luận</span>
        </button>
        <button class="action-btn" onclick="sharePost()">
          <span>↗</span><span>Chia sẻ</span>
        </button>
      </div>

      <div class="comments-container" style="display:none;">
        <div class="comment-input-row">
          <input type="text" class="comment-input" placeholder="Viết bình luận...">
          <button class="btn-send-comment" onclick="addComment(this)">Gửi</button>
        </div>
        <div class="comments-list"></div>
      </div>
    </article>
  `;
}

async function loadFeedPosts() {
  const homeFeed = document.getElementById('home-posts-list');
  const mainFeed = document.getElementById('feed-posts-list');
  const profileFeed = document.getElementById('profile-posts-list');

  if (!homeFeed && !mainFeed) return;

  try {
    const response = await fetch('http://localhost:8080/api/posts');
    if (!response.ok) return;

    const data = await response.json();
    const posts = data.posts || [];
    if (posts.length === 0) return;

    // Lọc các bài viết không bị ẩn
    const validPosts = posts.filter(p => p.status !== 'hidden');
    if (validPosts.length === 0) return;

    const allCardsHtml = validPosts.map(buildPostCardHtml).join('');

    if (homeFeed) homeFeed.innerHTML = allCardsHtml;
    if (mainFeed) mainFeed.innerHTML = allCardsHtml;

    if (profileFeed) {
      const myPosts = validPosts.filter(p => p.user_id == user.id);
      if (myPosts.length > 0) {
        profileFeed.innerHTML = myPosts.map(buildPostCardHtml).join('');
      }
    }
  } catch (error) {
    console.warn('Backend chưa sẵn sàng hoặc ngoại tuyến, giữ nguyên giao diện mẫu:', error);
  }
}

function syncCurrentUserUI() {
  document.querySelectorAll('.profile-user-name').forEach(el => el.textContent = user.name);
  document.querySelectorAll('.profile-user-bio').forEach(el => el.textContent = user.bio);
  document.querySelectorAll('.user-school-text').forEach(el => el.textContent = user.school);
  document.querySelectorAll('.user-livein-text').forEach(el => el.textContent = user.liveIn);

  const bannerTitle = document.querySelector('.banner-title');
  if (bannerTitle) {
    bannerTitle.textContent = `Chào buổi sáng, ${user.name} 👋`;
  }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  syncCurrentUserUI();
  loadFeedPosts();
});
