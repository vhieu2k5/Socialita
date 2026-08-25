// ==================== INITIAL DATA & STATE ====================
let user = {
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

// ==================== TOAST SYSTEM ====================
function showToast(msg, icon = '✨') {
  const container = document.getElementById('toast-container');
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
    const response = await fetch('http://localhost:8080/api/posts', {
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
      showToast(result.message || 'Lỗi khi đăng bài');
      return;
    }

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

function handleEditProfile(e) {
  e.preventDefault();
  user.name = document.getElementById('edit-name-input').value.trim() || user.name;
  user.bio = document.getElementById('edit-bio-input').value.trim() || user.bio;
  user.school = document.getElementById('edit-school-input').value.trim() || user.school;
  user.liveIn = document.getElementById('edit-livein-input').value.trim() || user.liveIn;

  // Update UI everywhere
  document.querySelectorAll('.profile-user-name').forEach(el => el.textContent = user.name);
  document.querySelectorAll('.profile-user-bio').forEach(el => el.textContent = user.bio);
  document.querySelectorAll('.user-school-text').forEach(el => el.textContent = user.school);
  document.querySelectorAll('.user-livein-text').forEach(el => el.textContent = user.liveIn);

  closeEditProfileModal();
  showToast('Đã lưu thay đổi trang cá nhân!');
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
