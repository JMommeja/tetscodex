export type VersionType = 'Remix' | 'Edit' | 'Mashup' | 'Live' | 'Alt Version' | 'Reconstruction' | 'Leak Edit';

export const artist = {
  id: 1,
  name: 'Kanye West',
  slug: 'kanye-west',
  banner: 'Archive communautaire des versions alternatives, edits et remixes.'
};

export const albums = [
  { id: 1, artistId: 1, title: 'Graduation', slug: 'graduation', releaseYear: 2007 },
  { id: 2, artistId: 1, title: 'My Beautiful Dark Twisted Fantasy', slug: 'mbdtf', releaseYear: 2010 },
  { id: 3, artistId: 1, title: 'Yandhi / Unreleased', slug: 'yandhi-unreleased', releaseYear: 2018 }
];

export const tracks = [
  { id: 1, albumId: 1, title: 'I Wonder', slug: 'i-wonder', trackNumber: 4, sourceUrl: 'https://www.youtube.com/watch?v=7gHisR4xmOk' },
  { id: 2, albumId: 1, title: 'Stronger', slug: 'stronger', trackNumber: 3, sourceUrl: 'https://www.youtube.com/watch?v=PsO6ZnUZI0g' },
  { id: 3, albumId: 1, title: 'Flashing Lights', slug: 'flashing-lights', trackNumber: 7, sourceUrl: 'https://www.youtube.com/watch?v=ila-hAUXR5U' },
  { id: 4, albumId: 2, title: 'Runaway', slug: 'runaway', trackNumber: 9, sourceUrl: 'https://www.youtube.com/watch?v=VhEoCOWUtcU' }
];

export const versions = [
  {
    id: 1,
    trackId: 1,
    slug: 'i-wonder-synthwave-edit',
    title: 'I Wonder - Synthwave Edit',
    type: 'Edit' as VersionType,
    sourceUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    creatorName: 'nightcitymix',
    description: 'Version synthwave avec intro étendue et drums retravaillées.',
    tags: ['synthwave', 'extended intro', 'fanmade'],
    score: 42,
    comments: 8,
    createdAt: '2026-01-14'
  },
  {
    id: 2,
    trackId: 1,
    slug: 'i-wonder-orchestral-remix',
    title: 'I Wonder - Orchestral Remix',
    type: 'Remix' as VersionType,
    sourceUrl: 'https://soundcloud.com/example/i-wonder-orchestral',
    creatorName: 'archiveuser',
    description: 'Cordes et cuivres, approche cinématique.',
    tags: ['orchestral', 'graduation vibe'],
    score: 30,
    comments: 4,
    createdAt: '2026-02-01'
  },
  {
    id: 3,
    trackId: 2,
    slug: 'stronger-daft-mashup',
    title: 'Stronger - Daft Club Mashup',
    type: 'Mashup' as VersionType,
    sourceUrl: 'https://www.youtube.com/watch?v=example2',
    creatorName: 'clubeditor',
    description: 'Mashup orienté club avec stems isolés.',
    tags: ['mashup', 'live'],
    score: 58,
    comments: 12,
    createdAt: '2025-12-28'
  }
];

export const versionComments = [
  { id: 1, versionId: 1, username: 'yehub', content: 'Très bon edit, la transition 1:12 est un peu brutale.', createdAt: '2026-01-20' },
  { id: 2, versionId: 1, username: 'archivefan', content: 'Le meilleur que j’ai entendu sur ce morceau.', createdAt: '2026-01-21' }
];

export const types: VersionType[] = ['Remix', 'Edit', 'Mashup', 'Live', 'Alt Version', 'Reconstruction', 'Leak Edit'];
