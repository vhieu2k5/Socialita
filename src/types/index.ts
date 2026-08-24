export type NavigationTab = 'home' | 'feed' | 'profile' | 'friends' | 'groups';

export type FeedFilterType = 'all' | 'following' | 'groups';

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  time: string;
  likes?: number;
}

export interface Post {
  id: string;
  authorName: string;
  authorAvatar?: string;
  time: string;
  isPublic?: boolean;
  content: string;
  mediaGradient?: string;
  location?: string;
  likes: number;
  liked: boolean;
  commentsCount: number;
  sharesCount: number;
  comments: Comment[];
  category: FeedFilterType;
  groupName?: string;
}

export interface Story {
  id: string;
  userName: string;
  userAvatar?: string;
  isUser?: boolean;
  avatarBg?: string;
  seen?: boolean;
}

export interface Friend {
  id: string;
  name: string;
  avatar?: string;
  avatarBg?: string;
  friendSince: string;
  mutualFriends: number;
}

export interface FriendRequest {
  id: string;
  name: string;
  avatar?: string;
  avatarBg?: string;
  mutualFriends: number;
}

export interface FriendSuggestion {
  id: string;
  name: string;
  avatar?: string;
  avatarBg?: string;
  mutualFriends: number;
  requested?: boolean;
}

export interface TrendingTopic {
  id: string;
  rank: string;
  tag: string;
  postCount: string;
}

export interface GroupItem {
  id: string;
  name: string;
  avatar?: string;
  category: string;
  memberCount: number;
  joined: boolean;
  description: string;
}

export interface UserProfile {
  name: string;
  bio: string;
  avatarBg: string;
  stats: {
    posts: number;
    friends: number;
    followers: string;
    groups: number;
  };
  intro: {
    school: string;
    liveIn: string;
    joinedDate: string;
  };
  photos: string[];
}
