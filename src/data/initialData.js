// src/data/initialData.js
export const INITIAL_USER = {
  id: 1,
  name: 'Lê Minh Anh',
  username: 'minhanh_123',
  email: 'minhanh@gmail.com',
  bio: 'Yêu thích du lịch, công nghệ và chụp ảnh - Sài Gòn, VN',
  avatarBg: '#35c9b0',
  stats: {
    posts: 86,
    friends: 128,
    followers: '1.4K',
    groups: 9
  },
  intro: {
    school: 'Sinh viên tại ĐH Kinh tế TP.HCM',
    liveIn: 'Sống tại Sài Gòn, Việt Nam',
    joinedDate: 'Tham gia từ tháng 3, 2024'
  },
  photos: [
    '#3a3b3c',
    '#4e4f50',
    '#5c4419',
    '#274a82',
    '#5c2323',
    '#1b5b50'
  ]
};

export const INITIAL_STORIES = [
  { id: 's-user', userName: 'Story của bạn', isUser: true },
  { id: 's-1', userName: 'Bảo Trân', avatarBg: '#e52e3d', seen: false },
  { id: 's-2', userName: 'Đức Anh', avatarBg: '#3b82f6', seen: false },
  { id: 's-3', userName: 'Hải Yến', avatarBg: '#10b981', seen: false },
  { id: 's-4', userName: 'Quang Huy', avatarBg: '#f59e0b', seen: false }
];

export const INITIAL_POSTS = [
  {
    id: 'p-video-1',
    user_id: 2,
    privacy: 'public',
    authorName: 'Quang Huy',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    time: '15 phút trước · Công khai',
    isPublic: true,
    content: 'Chia sẻ một chút không gian xanh mát và bình yên giữa lòng Hà Nội 🌿🌸 Dừng lại một chút giữa bộn bề để thư giãn cùng thiên nhiên nhé cả nhà! #NatureVibes #RelaxingVideo #GreenLife',
    location: 'Vườn bách thảo Hà Nội',
    mediaType: 'video',
    mediaUrl: 'http://localhost:8080/uploads/sample-flower.mp4',
    images: ['http://localhost:8080/uploads/sample-flower.mp4'],
    image_url: 'http://localhost:8080/uploads/sample-flower.mp4',
    likes: 128,
    liked: false,
    commentsCount: 14,
    sharesCount: 8,
    category: 'all',
    comments: [
      {
        id: 'c-vid-1',
        authorName: 'Lê Minh Anh',
        content: 'Chill thực sự luôn Huy ơi, màu video đẹp quá! 🥰',
        time: '10 phút trước',
        likes: 4
      }
    ]
  },
  {
    id: 'p-video-2',
    user_id: 7,
    privacy: 'public',
    authorName: 'Hoàng Nam',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    time: '1 giờ trước · Công khai',
    isPublic: true,
    content: 'Thước phim ngắn ghi lại hành trình rong ruổi cung đường đèo ven biển miền Trung 🌊🏍️ Gió biển lồng lộng, cảnh sắc tuyệt đẹp của quê hương Việt Nam! #TravelVlog #Roadtrip #VietnamFromAbove',
    location: 'Đèo Hải Vân, Đà Nẵng',
    mediaType: 'video',
    mediaUrl: 'http://localhost:8080/uploads/sample-travel.mp4',
    images: ['http://localhost:8080/uploads/sample-travel.mp4'],
    image_url: 'http://localhost:8080/uploads/sample-travel.mp4',
    likes: 245,
    liked: true,
    commentsCount: 28,
    sharesCount: 12,
    category: 'all',
    comments: [
      {
        id: 'c-vid-2',
        authorName: 'Bùi Việt Anh',
        content: 'Góc quay cinematic quá bạn ơi, xin tips chỉnh màu với! 🎥🔥',
        time: '45 phút trước',
        likes: 5
      }
    ]
  },
  {
    id: 'p-multi-photos',
    user_id: 1,
    privacy: 'public',
    authorName: 'Lê Minh Anh',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    time: '30 phút trước · Công khai',
    isPublic: true,
    content: 'Album ảnh chuyến phượt Đà Lạt cùng hội bạn! Thời tiết se lạnh, cảnh sắc mộng mơ, đồ ăn ngon xỉu luôn mọi người ơi 🌲🍓☁️ #DaLatTravel #SocialitaTrip',
    location: 'Đà Lạt, Lâm Đồng',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&fit=crop',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&fit=crop',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&fit=crop'
    ],
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&fit=crop',
    likes: 352,
    liked: true,
    commentsCount: 45,
    sharesCount: 18,
    category: 'all',
    comments: [
      {
        id: 'c-demo-1',
        authorName: 'Quang Huy',
        content: 'Ảnh chụp bằng máy gì mà nét đỉnh thế bạn ơi! 😍',
        time: '20 phút trước',
        likes: 6
      }
    ]
  },
  {
    id: 'p-1',
    user_id: 2,
    privacy: 'public',
    authorName: 'Quang Huy',
    authorAvatar: '',
    time: '2 giờ trước · Công khai',
    isPublic: true,
    content: 'Cuối tuần này lớp mình tổ chức đi Đà Lạt, ai muốn tham gia thì để lại bình luận nhé! 🌿 #DuLichCuoiTuan',
    mediaGradient: 'linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)',
    image_url: '',
    location: 'Đà Lạt, Lâm Đồng',
    likes: 214,
    liked: false,
    commentsCount: 38,
    sharesCount: 12,
    category: 'all',
    comments: [
      {
        id: 'c-1',
        authorName: 'Ngọc Bích',
        content: 'Cho mình đăng ký 1 vé với nhé Huy ơi! Háo hức quá 🛵',
        time: '1 giờ trước',
        likes: 4
      }
    ]
  },
  {
    id: 'p-2',
    user_id: 6,
    privacy: 'public',
    authorName: 'Hải Yến',
    authorAvatar: '',
    time: '5 giờ trước · Công khai',
    isPublic: true,
    content: 'Một buổi chiều bình yên tại góc cafe quen thuộc ở Sài Gòn ☕✨ #WeekendVibes',
    mediaGradient: 'linear-gradient(135deg, #2b2d3d 0%, #1c1d2b 100%)',
    image_url: '',
    location: 'Quận 1, TP.HCM',
    likes: 96,
    liked: false,
    commentsCount: 14,
    sharesCount: 2,
    category: 'following',
    comments: []
  }
];

export const INITIAL_TRENDS = [
  { id: 'tr-1', rank: '01', tag: '#SocialitaChallenge', postCount: '4.2K bài viết' },
  { id: 'tr-2', rank: '02', tag: '#GoiYPhim', postCount: '1.9K bài viết' },
  { id: 'tr-3', rank: '03', tag: '#HocNhomOnThi', postCount: '1.2K bài viết' }
];

export const INITIAL_FRIEND_SUGGESTIONS = [
  { id: 'sug-1', name: 'Ngọc Bích', username: 'ngocbich', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', mutualFriends: 6, avatarBg: '#ff7675' },
  { id: 'sug-2', name: 'Tấn Phát', username: 'tanphat', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', mutualFriends: 3, avatarBg: '#74b9ff' },
  { id: 'sug-3', name: 'Hải Đăng', username: 'haidang', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', mutualFriends: 9, avatarBg: '#55efc4' }
];

export const INITIAL_FRIENDS = [
  { id: 'fr-1', name: 'Quang Huy', username: 'quanghuy', avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', friendSince: 'Bạn từ 08/2024', mutualFriends: 14, avatarBg: '#4c8dff' },
  { id: 'fr-2', name: 'Hải Yến', username: 'haiyen', avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop', friendSince: 'Bạn từ 05/2024', mutualFriends: 8, avatarBg: '#e056fd' },
  { id: 'fr-3', name: 'Đức Anh', username: 'ducanh', avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', friendSince: 'Bạn từ 01/2025', mutualFriends: 5, avatarBg: '#f0932b' },
  { id: 'fr-4', name: 'Thùy Linh', username: 'thuylinh', avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', friendSince: 'Bạn từ 02/2025', mutualFriends: 20, avatarBg: '#686de0' }
];

export const INITIAL_FRIEND_REQUESTS = [
  { id: 'req-1', name: 'Ngọc Bích', username: 'ngocbich', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', mutualFriends: 6, avatarBg: '#ff7675' },
  { id: 'req-2', name: 'Tấn Phát', username: 'tanphat', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', mutualFriends: 3, avatarBg: '#74b9ff' }
];

export const INITIAL_GROUPS = [
  {
    id: 'gr-1',
    name: 'Cộng đồng Sinh viên UEH',
    category: 'Học tập & Giáo dục',
    memberCount: 45200,
    joined: true,
    description: 'Nơi giao lưu, chia sẻ tài liệu và trao đổi học tập của sinh viên UEH.'
  },
  {
    id: 'gr-2',
    name: 'Hội Yêu Du Lịch & Phượt Đà Lạt',
    category: 'Du lịch & Khám phá',
    memberCount: 128900,
    joined: true,
    description: 'Gợi ý các quán cafe, homestay và lịch trình check-in Đà Lạt tuyệt đẹp.'
  }
];

export const MY_JOINED_GROUPS = [
  { id: 'mg-1', name: 'Nhiếp ảnh đường phố', members: '12.4K thành viên', banner: 'url("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&fit=crop") center/cover' },
  { id: 'mg-2', name: 'Review sách hay', members: '8.1K thành viên', banner: 'url("https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&fit=crop") center/cover' },
  { id: 'mg-3', name: 'Cộng đồng Fitness', members: '5.6K thành viên', banner: 'url("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&fit=crop") center/cover' },
  { id: 'mg-4', name: 'Học nhóm ôn thi', members: '3.2K thành viên', banner: 'url("https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&fit=crop") center/cover' }
];

export const DISCOVER_GROUPS = [
  {
    id: 'dg-1',
    category: 'Công nghệ',
    name: 'Dev Trẻ Việt Nam',
    desc: 'Nơi chia sẻ kiến thức lập trình, tuyển dụng và dự án cho sinh viên IT.',
    members: '18.9K thành viên',
    banner: 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&fit=crop") center/cover'
  },
  {
    id: 'dg-2',
    category: 'Du lịch',
    name: 'Phượt Thủ Việt',
    desc: 'Chia sẻ kinh nghiệm, lịch trình và địa điểm du lịch khắp Việt Nam.',
    members: '24.3K thành viên',
    banner: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&fit=crop") center/cover'
  }
];

export const MOCK_ACCOUNT = [
  {
    id: 1,
    name: 'Admin — Hiếu',
    email: 'admin@gmail.com',
    password: '123',
    role: 'admin',
    avatarBg: '#e52e3d'
  },
  {
    id: 2,
    name: 'Thiện',
    email: 'user@gmail.com',
    password: '123',
    role: 'user',
    avatarBg: '#3b82f6'
  }
];
