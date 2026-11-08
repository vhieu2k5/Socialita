// src/utils/privacy.js

/**
 * Kiểm tra xem người dùng hiện tại có quyền xem bài viết hay không:
 * 1. Tác giả luôn xem được tất cả bài viết của chính mình (kể cả Chỉ mình tôi / Bạn bè).
 * 2. Bài viết 'private' (Chỉ mình tôi): Chỉ tác giả mới xem được.
 * 3. Bài viết 'friends' (Bạn bè): Chỉ tác giả và bạn bè trong danh sách bạn bè mới xem được.
 * 4. Bài viết 'public' (Công khai): Mọi người đều xem được.
 */
export function canViewPost(post, currentUser, friends = []) {
  if (!post) return false;

  const currentUserId = currentUser?.id ? String(currentUser.id) : null;
  const currentUserName = currentUser?.name ? currentUser.name.trim().toLowerCase() : '';
  const currentUsername = currentUser?.username ? currentUser.username.trim().toLowerCase() : '';

  const postUserId = post.user_id ? String(post.user_id) : null;
  const postAuthorName = post.authorName ? post.authorName.trim().toLowerCase() : '';
  const postUsername = post.username ? post.username.trim().toLowerCase() : '';

  // 1. Kiểm tra nếu người xem là tác giả
  const isAuthor =
    (currentUserId && postUserId && currentUserId === postUserId) ||
    (currentUserName && postAuthorName && currentUserName === postAuthorName) ||
    (currentUsername && postUsername && currentUsername === postUsername);
  if (isAuthor) return true;

  // 2. Chế độ "Chỉ mình tôi" (private) -> Người khác hoàn toàn không được xem
  if (post.privacy === 'private') return false;

  // 3. Chế độ "Bạn bè" (friends) -> Phải là bạn bè của tác giả
  if (post.privacy === 'friends') {
    const isFriend = Array.isArray(friends) && friends.some(f => {
      const friendId = f.id ? String(f.id) : null;
      const friendName = f.name ? f.name.trim().toLowerCase() : '';
      const friendUsername = f.username ? f.username.trim().toLowerCase() : '';

      return (
        (friendId && postUserId && friendId === postUserId) ||
        (friendName && postAuthorName && friendName === postAuthorName) ||
        (friendUsername && postUsername && friendUsername === postUsername)
      );
    });
    return isFriend;
  }

  // 4. Mặc định hoặc chế độ "Công khai"
  return true;
}
