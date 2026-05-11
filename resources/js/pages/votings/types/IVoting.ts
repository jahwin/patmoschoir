export interface IVoting {
  title: string ,
  slug: string,
  logo: string,
  phase: string,
  cover_image: string,
  description: string,
  start_time: string,
  end_time: string,
  ended: number
}

export interface IVotingDetails {
  id: number,
  title: string,
  logo: string,
  cover_image: string,
  description: string,
  end_time: string,
  sort_by_votes: number,
  intro_video: null,
  sponsors: string,
  categories: {
    id: number,
    name: string,
    winners: number,
    slug: string,
    participants: {
      id: number,
      name: string,
      image: string,
      item_index: number,
      slug: string,
      session_id: number,
      category_id: number,
      votes: string
    }[]
  }[]
}

export interface IVotingCategory extends IVotingDetails {}

export interface IContestant {
  id: number;
  name: string;
  image: string;
  session_id: number;
  item_index: number;
  slug: string;
  category_id: number;
  votes: string | null;
  category_name: string;
  bio: string | null;
  facebook_url: string | null;
  facebook_followers: string | null;
  twitter_url: string | null;
  twitter_followers: string | null;
  instagram_url: string | null;
  instagram_followers: string | null;
  threads_url: string | null;
  threads_followers: string | null;
  tiktok_url: string | null;
  tiktok_followers: string | null;
  youtube_url: string | null;
  youtube_followers: string | null;
}

export interface IContestantDetails {
  id: number;
  title: string;
  logo: string;
  cover_image: string;
  description: string;
  end_time: string;
  intro_video: string | null;
  sponsors: string;
  participant: IContestant;
  related: IContestant[];
}