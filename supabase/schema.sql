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
  track_number int,
  source_url text
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

insert into artists (name, slug) values
('Kanye West', 'kanye-west');

insert into albums (artist_id, title, slug, release_year) values
(1, 'Graduation', 'graduation', 2007),
(1, 'My Beautiful Dark Twisted Fantasy', 'mbdtf', 2010),
(1, 'Yandhi / Unreleased', 'yandhi-unreleased', 2018);

insert into tracks (album_id, title, slug, track_number, source_url) values
(1, 'I Wonder', 'i-wonder', 4, 'https://www.youtube.com/watch?v=7gHisR4xmOk'),
(1, 'Stronger', 'stronger', 3, 'https://www.youtube.com/watch?v=PsO6ZnUZI0g'),
(1, 'Flashing Lights', 'flashing-lights', 7, 'https://www.youtube.com/watch?v=ila-hAUXR5U'),
(2, 'Runaway', 'runaway', 9, 'https://www.youtube.com/watch?v=VhEoCOWUtcU');
