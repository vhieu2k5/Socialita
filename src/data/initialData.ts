import { UserProfile, Post, Story, Friend, FriendRequest, FriendSuggestion, TrendingTopic, GroupItem } from '../types';

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
      },
      {
        id: 'c-2',
        authorName: 'Hải Đăng',
        content: 'Thời tiết Đà Lạt mùa này đang đẹp lắm nè!',
        time: '30 phút trước',
        likes: 2
      }
    ]
  },
  {
    id: 'p-2',
    authorName: 'Quang Huy',
    time: '2 giờ trước · Công khai',
    isPublic: true,
    content: 'Cuối tuần này lớp mình tổ chức đi Đà Lạt, ai muốn tham gia thì để lại bình luận nhé! 🌿 #DuLichCuoiTuan',
    mediaGradient: 'linear-gradient(180deg, #1c1d2b 0%, #2b2d3d 50%, #85222b 100%)',
    location: 'Đà Lạt, Lâm Đồng',
    likes: 214,
    liked: false,
    commentsCount: 38,
    sharesCount: 12,
    category: 'following',
    comments: []
  },
  {
    id: 'p-3',
    authorName: 'Minh Anh Lê',
    time: 'Hôm qua lúc 19:45 · Công khai',
    isPublic: true,
    content: 'Hoàn thành bài tập nhóm môn Marketing xuất sắc cùng các bạn. Cảm ơn cả nhóm đã cùng thức đêm hoàn thiện deadline! ✨🎉 #UEH #Teamwork',
    mediaGradient: 'linear-gradient(135deg, #1a2a3a 0%, #0c141c 100%)',
    location: 'ĐH Kinh tế TP.HCM (UEH)',
    likes: 189,
    liked: true,
    commentsCount: 24,
    sharesCount: 5,
    category: 'all',
    comments: [
      {
        id: 'c-3',
        authorName: 'Thu Trang',
        content: 'Chúc mừng team bạn nha!',
        time: 'Hôm qua',
        likes: 1
      }
    ]
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
  },
  {
    id: 'fr-5',
    name: 'Bảo Trân',
    friendSince: 'Bạn từ 03/2024',
    mutualFriends: 32,
    avatarBg: '#e52e3d'
  },
  {
    id: 'fr-6',
    name: 'Minh Quân',
    friendSince: 'Bạn từ 10/2024',
    mutualFriends: 11,
    avatarBg: '#00cec9'
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
  },
  {
    id: 'req-5',
    name: 'Hữu Phước',
    mutualFriends: 4,
    avatarBg: '#a29bfe'
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
  },
  {
    id: 'gr-3',
    name: 'CLB Thiết Kế UI/UX & Web Frontend',
    category: 'Công nghệ & Thiết kế',
    memberCount: 32400,
    joined: true,
    description: 'Cùng nhau học Figma, React, Tailwind và chia sẻ dự án thực tế.'
  },
  {
    id: 'gr-4',
    name: 'Review Phim & Sách Hay Mỗi Ngày',
    category: 'Giải trí & Nghệ thuật',
    memberCount: 89600,
    joined: false,
    description: 'Cộng đồng chia sẻ cảm nhận về những bộ phim bom tấn và cuốn sách hay.'
  }
];
