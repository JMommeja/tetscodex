create table users (
  id bigint generated always as identity primary key,
  username text not null unique,
  email text not null unique,
  created_at timestamptz default now()
);

create table artists (
  id bigint generated always as identity primary key,
  name text not null,
  slug text not null unique
);

create table albums (
  id bigint generated always as identity primary key,
  artist_id bigint not null references artists(id) on delete cascade,
  title text not null,
  slug text not null unique,
  cover_url text,
  release_year int
);

create table tracks (
  id bigint generated always as identity primary key,
  album_id bigint not null references albums(id) on delete cascade,
  title text not null,
  slug text not null unique,
  track_number int
);

create table versions (
  id bigint generated always as identity primary key,
  track_id bigint not null references tracks(id) on delete cascade,
  user_id bigint not null references users(id) on delete cascade,
  title text not null,
  slug text not null unique,
  type text not null,
  source_url text not null,
  creator_name text not null,
  description text,
  created_at timestamptz default now()
);

create table tags (
  id bigint generated always as identity primary key,
  name text not null unique,
  slug text not null unique
);

create table version_tags (
  version_id bigint not null references versions(id) on delete cascade,
  tag_id bigint not null references tags(id) on delete cascade,
  primary key (version_id, tag_id)
);

create table votes (
  id bigint generated always as identity primary key,
  version_id bigint not null references versions(id) on delete cascade,
  user_id bigint not null references users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(version_id, user_id)
);

create table comments (
  id bigint generated always as identity primary key,
  version_id bigint not null references versions(id) on delete cascade,
  user_id bigint not null references users(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

create table reports (
  id bigint generated always as identity primary key,
  version_id bigint not null references versions(id) on delete cascade,
  user_id bigint not null references users(id) on delete cascade,
  reason text not null,
  created_at timestamptz default now()
);
