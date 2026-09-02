import type {
  UserProfile,
  Post,
  Story,
  Friend,
  FriendRequest,
  FriendSuggestion,
  TrendingTopic,
  GroupItem
} from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Minh Anh Lê',
  bio: 'Bio - Yêu thích du lịch - Hải Phòng, VN',
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

export const INITIAL_STORIES: Story[] = [
  {
    id: 's-user',
    userName: 'Story của bạn',
    isUser: true
  },
  {
    id: 's-1',
    userName: 'Bảo Trân',
    avatarBg: '#e52e3d',
    seen: false
  },
  {
    id: 's-2',
    userName: 'Bảo Trân',
    avatarBg: '#d32735',
    seen: false
  },
  {
    id: 's-3',
    userName: 'Bảo Trân',
    avatarBg: '#e52e3d',
    seen: false
  },
  {
    id: 's-4',
    userName: 'Bảo Trân',
    avatarBg: '#b71c28',
    seen: false
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p-1',
    authorName: 'Quang Huy',
    time: '2 giờ trước · Công khai',
    isPublic: true,
    content: 'Cuối tuần này lớp mình tổ chức đi Đà Lạt, ai muốn tham gia thì để lại bình luận nhé! 🌿 #DuLichCuoiTuan',
    mediaGradient: 'linear-gradient(180deg, #18191a 0%, #242526 50%, #7a1d26 100%)',
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
    authorName: 'Hải Yến',
    time: '5 giờ trước · Công khai',
    isPublic: true,
    content: 'Một buổi chiều bình yên tại góc cafe quen thuộc ở Sài Gòn ☕✨ #WeekendVibes',
    mediaGradient: 'linear-gradient(135deg, #2b2d3d 0%, #1c1d2b 100%)',
    location: 'Quận 1, TP.HCM',
    likes: 96,
    liked: false,
    commentsCount: 14,
    sharesCount: 2,
    category: 'following',
    comments: []
  }
];

export const INITIAL_TRENDS: TrendingTopic[] = [
  {
    id: 'tr-1',
    rank: '01',
    tag: '#SocialitaChallenge',
    postCount: '4.2K bài viết'
  },
  {
    id: 'tr-2',
    rank: '02',
    tag: '#GoiYPhim',
    postCount: '1.9K bài viết'
  },
  {
    id: 'tr-3',
    rank: '03',
    tag: '#HocNhomOnThi',
    postCount: '1.2K bài viết'
  }
];

export const INITIAL_FRIEND_SUGGESTIONS: FriendSuggestion[] = [
  {
    id: 'sug-1',
    name: 'Ngọc Bích',
    mutualFriends: 6,
    avatarBg: '#ff7675'
  },
  {
    id: 'sug-2',
    name: 'Tấn Phát',
    mutualFriends: 3,
    avatarBg: '#74b9ff'
  },
  {
    id: 'sug-3',
    name: 'Hải Đăng',
    mutualFriends: 9,
    avatarBg: '#55efc4'
  }
];

export const INITIAL_FRIENDS: Friend[] = [
  {
    id: 'fr-1',
    name: 'Quang Huy',
    friendSince: 'Bạn từ 08/2024',
    mutualFriends: 14,
    avatarBg: '#4c8dff'
  },
  {
    id: 'fr-2',
    name: 'Hải Yến',
    friendSince: 'Bạn từ 05/2024',
    mutualFriends: 8,
    avatarBg: '#e056fd'
  },
  {
    id: 'fr-3',
    name: 'Đức Anh',
    friendSince: 'Bạn từ 01/2025',
    mutualFriends: 5,
    avatarBg: '#f0932b'
  },
  {
    id: 'fr-4',
    name: 'Thùy Linh',
    friendSince: 'Bạn từ 02/2025',
    mutualFriends: 20,
    avatarBg: '#686de0'
  }
];

export const INITIAL_FRIEND_REQUESTS: FriendRequest[] = [
  {
    id: 'req-1',
    name: 'Ngọc Bích',
    mutualFriends: 6,
    avatarBg: '#ff7675'
  },
  {
    id: 'req-2',
    name: 'Tấn Phát',
    mutualFriends: 3,
    avatarBg: '#74b9ff'
  },
  {
    id: 'req-3',
    name: 'Hải Đăng',
    mutualFriends: 9,
    avatarBg: '#55efc4'
  },
  {
    id: 'req-4',
    name: 'Thu Trang',
    mutualFriends: 2,
    avatarBg: '#fd79a8'
  }
];

export const INITIAL_GROUPS: GroupItem[] = [
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

// 1. Danh sách các nhóm đã tham gia (Nhóm của tôi)
export const MY_JOINED_GROUPS = [
  { id: 'mg-1', name: 'Nhiếp ảnh đường phố', members: '12.4K thành viên', banner: 'linear-gradient(135deg, #18191a 0%, #7a1d26 100%)' },
  { id: 'mg-2', name: 'Review sách hay', members: '8.1K thành viên', banner: 'linear-gradient(135deg, #18191a 0%, #7a1d26 100%)' },
  { id: 'mg-3', name: 'Cộng đồng Fitness', members: '5.6K thành viên', banner: 'linear-gradient(135deg, #18191a 0%, #7a1d26 100%)' },
  { id: 'mg-4', name: 'Học nhóm ôn thi', members: '3.2K thành viên', banner: 'linear-gradient(135deg, #18191a 0%, #7a1d26 100%)' },
];
// 2. Danh sách các nhóm khám phá mới
export const DISCOVER_GROUPS = [
  {
    id: 'dg-1',
    category: 'Công nghệ',
    name: 'Dev Trẻ Việt Nam',
    desc: 'Nơi chia sẻ kiến thức lập trình, tuyển dụng và dự án cho sinh viên IT.',
    members: '18.9K thành viên',
    banner: 'linear-gradient(135deg, #18191a 0%, #7a1d26 100%)'
  },
  {
    id: 'dg-2',
    category: 'Du lịch',
    name: 'Phượt Thủ Việt',
    desc: 'Chia sẻ kinh nghiệm, lịch trình và địa điểm du lịch khắp Việt Nam.',
    members: '24.3K thành viên',
    banner: 'linear-gradient(135deg, #242526 0%, #18191a 100%)'
  },
  {
    id: 'dg-3',
    category: 'Nghệ thuật',
    name: 'Vẽ Mỗi Ngày',
    desc: 'Thử thách sáng tác và góp ý tranh vẽ cùng cộng đồng yêu nghệ thuật.',
    members: '6.7K thành viên',
    banner: 'linear-gradient(135deg, #18191a 0%, #7a1d26 100%)'
  },
  {
    id: 'dg-4',
    category: 'Thể thao',
    name: 'Runner Sài Gòn',
    desc: 'Kết nối những người yêu chạy bộ, tổ chức giải chạy hàng tháng.',
    members: '9.4K thành viên',
    banner: 'linear-gradient(135deg, #242526 0%, #18191a 100%)'
  },
  {
    id: 'dg-5',
    category: 'Học tập',
    name: 'Góc Ôn Thi Đại Học',
    desc: 'Tài liệu, đề thi và mẹo ôn tập cho sĩ tử chuẩn bị kỳ thi.',
    members: '31.2K thành viên',
    banner: 'linear-gradient(135deg, #18191a 0%, #7a1d26 100%)'
  },
  {
    id: 'dg-6',
    category: 'Công nghệ',
    name: 'UI/UX Designers VN',
    desc: 'Nơi chia sẻ portfolio, feedback thiết kế và cơ hội việc làm.',
    members: '14.6K thành viên',
    banner: 'linear-gradient(135deg, #242526 0%, #18191a 100%)'
  }
];

export const MOCK_ACCOUNT = [
  {
    id: 'admin-1',
    name: 'Admin — Hiếu',
    email: 'admin@gmail.com',
    password: '123',
    role: 'admin' as const,
    avatarBg: '#e52e3d'
  },
  {
    id: 'user-1',
    name: 'Thiện',
    email: 'user@gmail.com',
    password: '123',
    role: 'user' as const,
    avatarBg: '#3b82f6'
  }
];