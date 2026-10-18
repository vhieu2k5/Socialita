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

  // 1. Kiểm tra nếu người xem là tác giả
  const isAuthor = (currentUser?.id && post.user_id && Number(post.user_id) === Number(currentUser.id)) ||
                   (currentUser?.name && post.authorName && currentUser.name.trim() === post.authorName.trim());
  if (isAuthor) return true;

  // 2. Chế độ "Chỉ mình tôi" (private) -> Người khác hoàn toàn không được xem
  if (post.privacy === 'private') return false;

  // 3. Chế độ "Bạn bè" (friends) -> Phải là bạn bè của tác giả
  if (post.privacy === 'friends') {
    const isFriend = Array.isArray(friends) && friends.some(f => 
      (f.name && f.name.trim() === post.authorName?.trim()) ||
      (f.id && post.user_id && String(f.id) === String(post.user_id))
    );
    return isFriend;
  }

  // 4. Mặc định hoặc chế độ "Công khai"
  return true;
}
