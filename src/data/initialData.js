// src/data/initialData.js
export const INITIAL_USER = {
  id: 1,
  name: 'Lê Minh Anh',
  username: 'minhanh_123',
  email: 'minhanh@gmail.com',
  bio: 'Yêu thích du lịch, công nghệ và chụp ảnh - Sài Gòn, VN',
  avatarBg: '#35c9b0',
  stats: {
    posts: 0,
    friends: 0,
    followers: 0,
    groups: 0
  },
  intro: {
    school: 'Sinh viên tại ĐH Kinh tế TP.HCM',
    liveIn: 'Sống tại Sài Gòn, Việt Nam',
    joinedDate: 'Tham gia gần đây'
  },
  photos: []
};

export const INITIAL_STORIES = [
  { id: 's-user', userName: 'Story của bạn', isUser: true }
];

export const INITIAL_POSTS = [];

export const INITIAL_TRENDS = [
  { id: 'tr-1', rank: '01', tag: '#SocialitaChallenge', postCount: '4.2K bài viết' },
  { id: 'tr-2', rank: '02', tag: '#GoiYPhim', postCount: '1.9K bài viết' },
  { id: 'tr-3', rank: '03', tag: '#HocNhomOnThi', postCount: '1.2K bài viết' }
];

export const INITIAL_FRIEND_SUGGESTIONS = [];

export const INITIAL_FRIENDS = [];

export const INITIAL_FRIEND_REQUESTS = [];

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
  { id: 'mg-1', name: 'Nhiếp ảnh đường phố', members: '12.4K thành viên', banner: 'linear-gradient(135deg, #18191a 0%, #7a1d26 100%)' },
  { id: 'mg-2', name: 'Review sách hay', members: '8.1K thành viên', banner: 'linear-gradient(135deg, #18191a 0%, #7a1d26 100%)' },
  { id: 'mg-3', name: 'Cộng đồng Fitness', members: '5.6K thành viên', banner: 'linear-gradient(135deg, #18191a 0%, #7a1d26 100%)' },
  { id: 'mg-4', name: 'Học nhóm ôn thi', members: '3.2K thành viên', banner: 'linear-gradient(135deg, #18191a 0%, #7a1d26 100%)' }
];

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
  }
];

export const MOCK_ACCOUNT = [];
