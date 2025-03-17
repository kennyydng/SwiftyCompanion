export type ProfileData = {
  id: number;
  login: string;
  email: string;
  usual_full_name: string;
  displayname: string;
  image: { link: string };
  wallet: number;
  correction_point: number;
  rank: number;
  cursus_users: Array<CursusUser>;
  projects_users: Array<ProjectUser>;
  coalition?: CoalitionInfo;
};

export type Cursus = {
  id: number;
  name: string;
};

export type CursusUser = {
  cursus_id: number;
  level: number;
  skills: Array<Skill>;
  cursus: Cursus;
};

export type Skill = {
  name: string;
  level: number;
};

export type ProjectUser = {
  final_mark: number;
  'validated?': boolean;
  project: { name: string };
  cursus_ids: Array<number>;
};

export type CoalitionUser = {
  coalition_id: number;
  coalition: CoalitionInfo;
  score: number;
  rank: number;
  cursus_id: number;
};

export type CoalitionInfo = {
  name: string;
  image_url: string;
  cover_url: string;
  color: string;
};

export type UserSearchResult = {
  id: string;
  login: string;
  displayName: string;
  avatar: string;
}; 