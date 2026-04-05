import * as pathModule from 'path';

// Mock gray-matter
vi.mock('gray-matter', () => ({
  default: vi.fn((content: string) => {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { data: {}, content };
    const frontmatter = match[1];
    const body = match[2];
    const data: Record<string, unknown> = {};
    for (const line of frontmatter.split('\n')) {
      if (!line.trim()) continue;
      const [key, ...rest] = line.split(': ');
      const value = rest.join(': ').trim();
      if (value.startsWith('[')) {
        const inner = value.slice(1, -1).trim();
        data[key] = inner ? inner.split(', ').map((s) => s.trim()) : [];
      } else {
        data[key] = value;
      }
    }
    return { data, content: body };
  }),
}));

// Mock fs module
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
  },
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
  readFileSync: vi.fn(),
}));

import fs from 'fs';
import { getAllPosts, getPostBySlug, getAllSlugs } from '@/models/blog';

const MOCK_BLOG_DIR = pathModule.join(process.cwd(), 'content', 'blog');

const POST_A = `---
title: Post Alpha
date: 2025-01-15
description: Description for alpha
tags: [tag1, tag2]
---
Body of post alpha`;

const POST_B = `---
title: Post Beta
date: 2025-03-01
description: Description for beta
tags: [tagA]
---
Body of post beta`;

const POST_C = `---
title: Post Gamma
date: 2024-12-01
description: Description for gamma
tags: []
---
Body of post gamma`;

const POST_MISSING_FIELDS = `---
---
Body with no frontmatter fields`;

describe('blog model', () => {
  beforeEach(() => {
    vi.mocked(fs.existsSync).mockReset();
    vi.mocked(fs.readdirSync).mockReset();
    vi.mocked(fs.readFileSync).mockReset();
  });

  describe('getAllPosts', () => {
    it('returns empty array when blog directory does not exist', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      const posts = getAllPosts();

      expect(posts).toEqual([]);
    });

    it('returns empty array when directory has no mdx files', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockReturnValue([] as unknown as ReturnType<typeof fs.readdirSync>);

      const posts = getAllPosts();

      expect(posts).toEqual([]);
    });

    it('returns empty array when directory has only non-mdx files', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockReturnValue(['readme.txt', 'notes.md'] as unknown as ReturnType<typeof fs.readdirSync>);

      const posts = getAllPosts();

      expect(posts).toEqual([]);
    });

    it('parses a single mdx file correctly', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockReturnValue(['post-alpha.mdx'] as unknown as ReturnType<typeof fs.readdirSync>);
      vi.mocked(fs.readFileSync).mockReturnValue(POST_A as unknown as Buffer);

      const posts = getAllPosts();

      expect(posts).toHaveLength(1);
      expect(posts[0]).toMatchObject({
        slug: 'post-alpha',
        title: 'Post Alpha',
        date: '2025-01-15',
        description: 'Description for alpha',
        tags: ['tag1', 'tag2'],
      });
      expect(posts[0].content).toContain('Body of post alpha');
    });

    it('sorts posts by date descending (newest first)', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockReturnValue(['post-alpha.mdx', 'post-beta.mdx', 'post-gamma.mdx'] as unknown as ReturnType<typeof fs.readdirSync>);
      vi.mocked(fs.readFileSync)
        .mockReturnValueOnce(POST_A as unknown as Buffer)
        .mockReturnValueOnce(POST_B as unknown as Buffer)
        .mockReturnValueOnce(POST_C as unknown as Buffer);

      const posts = getAllPosts();

      expect(posts[0].slug).toBe('post-beta');  // 2025-03-01
      expect(posts[1].slug).toBe('post-alpha'); // 2025-01-15
      expect(posts[2].slug).toBe('post-gamma'); // 2024-12-01
    });

    it('uses default values when frontmatter fields are missing', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockReturnValue(['missing.mdx'] as unknown as ReturnType<typeof fs.readdirSync>);
      vi.mocked(fs.readFileSync).mockReturnValue(POST_MISSING_FIELDS as unknown as Buffer);

      const posts = getAllPosts();

      expect(posts[0].title).toBe('Untitled');
      expect(posts[0].date).toBe('');
      expect(posts[0].description).toBe('');
      expect(posts[0].tags).toEqual([]);
    });

    it('derives slug from filename without .mdx extension', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockReturnValue(['my-great-post.mdx'] as unknown as ReturnType<typeof fs.readdirSync>);
      vi.mocked(fs.readFileSync).mockReturnValue(POST_A as unknown as Buffer);

      const posts = getAllPosts();

      expect(posts[0].slug).toBe('my-great-post');
    });
  });

  describe('getPostBySlug', () => {
    it('returns null when file does not exist', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      const post = getPostBySlug('nonexistent');

      expect(post).toBeNull();
    });

    it('returns parsed post when file exists', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(POST_B as unknown as Buffer);

      const post = getPostBySlug('post-beta');

      expect(post).not.toBeNull();
      expect(post?.slug).toBe('post-beta');
      expect(post?.title).toBe('Post Beta');
      expect(post?.date).toBe('2025-03-01');
      expect(post?.description).toBe('Description for beta');
      expect(post?.tags).toEqual(['tagA']);
    });

    it('returns default values for missing frontmatter fields', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(POST_MISSING_FIELDS as unknown as Buffer);

      const post = getPostBySlug('missing');

      expect(post?.title).toBe('Untitled');
      expect(post?.date).toBe('');
      expect(post?.description).toBe('');
      expect(post?.tags).toEqual([]);
    });

    it('reads the correct file path for the given slug', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(POST_A as unknown as Buffer);

      getPostBySlug('post-alpha');

      const expectedPath = pathModule.join(MOCK_BLOG_DIR, 'post-alpha.mdx');
      expect(fs.readFileSync).toHaveBeenCalledWith(expectedPath, 'utf-8');
    });
  });

  describe('getAllSlugs', () => {
    it('returns empty array when blog directory does not exist', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      const slugs = getAllSlugs();

      expect(slugs).toEqual([]);
    });

    it('returns slugs for mdx files only', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockReturnValue(['post-alpha.mdx', 'post-beta.mdx', 'readme.txt', 'notes.md'] as unknown as ReturnType<typeof fs.readdirSync>);

      const slugs = getAllSlugs();

      expect(slugs).toEqual(['post-alpha', 'post-beta']);
    });

    it('strips .mdx extension from filenames', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockReturnValue(['my-post.mdx'] as unknown as ReturnType<typeof fs.readdirSync>);

      const slugs = getAllSlugs();

      expect(slugs[0]).toBe('my-post');
      expect(slugs[0]).not.toContain('.mdx');
    });

    it('returns all slugs when directory has multiple mdx files', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readdirSync).mockReturnValue(['a.mdx', 'b.mdx', 'c.mdx'] as unknown as ReturnType<typeof fs.readdirSync>);

      const slugs = getAllSlugs();

      expect(slugs).toHaveLength(3);
      expect(slugs).toContain('a');
      expect(slugs).toContain('b');
      expect(slugs).toContain('c');
    });
  });
});
