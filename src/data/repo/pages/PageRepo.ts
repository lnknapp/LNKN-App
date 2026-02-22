import { supabase } from '../../../lib/supabase';
import { Page } from '../../entities/pages';
import { Link } from '../../entities/pages/Link';
import { IDataRepository } from '../IDataRepository';

function mapLink(row: any): Link {
  return {
    id: row.id,
    pageId: row.page_id,
    type: row.type,
    title: row.title,
    url: row.url ?? null,
    position: row.position,
    theme: row.theme,
    page: null as any,
  };
}

function mapPage(row: any): Page {
  const links: Link[] = (row.links ?? [])
    .filter((l: any) => !l.is_deleted)
    .map(mapLink)
    .sort((a: Link, b: Link) => a.position - b.position);

  return {
    id: row.id,
    userId: row.user_id,
    type: row.type,
    slug: row.slug ?? null,
    pixelId: row.pixel_id ?? null,
    name: row.name,
    isPublished: row.is_published,
    theme: row.theme ?? '{}',
    description: row.description ?? null,
    imageId: row.image_id ?? null,
    links,
    pageTags: [],
  };
}

export class PageRepo implements IDataRepository<Page> {
  async getAll(): Promise<Page[]> {
    const { data, error } = await supabase
      .from('pages')
      .select('*, links(*)')
      .eq('is_deleted', false)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data ?? []).map(mapPage);
  }

  async get(id: number): Promise<Page | null> {
    const { data, error } = await supabase
      .from('pages')
      .select('*, links(*)')
      .eq('id', id)
      .eq('is_deleted', false)
      .single();
    if (error) return null;
    return mapPage(data);
  }

  async insert(page: Page): Promise<Page> {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('pages')
      .insert({
        user_id: user!.id,
        type: page.type,
        name: page.name,
        slug: page.slug ?? null,
        pixel_id: page.pixelId ?? null,
        is_published: page.isPublished ?? false,
        theme: page.theme ?? '{}',
        description: page.description ?? null,
        image_id: page.imageId ?? null,
      })
      .select('*, links(*)')
      .single();
    if (error) throw error;
    return mapPage(data);
  }

  async update(id: number, page: Page): Promise<Page> {
    const { data, error } = await supabase
      .from('pages')
      .update({
        type: page.type,
        name: page.name,
        slug: page.slug ?? null,
        pixel_id: page.pixelId ?? null,
        is_published: page.isPublished,
        theme: page.theme,
        description: page.description ?? null,
        image_id: page.imageId ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('*, links(*)')
      .single();
    if (error) throw error;
    return mapPage(data);
  }

  async delete(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('pages')
      .update({ is_deleted: true, deleted_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
    return true;
  }

  async getByUsernameAndSlug(userName: string, slug?: string | null): Promise<Page> {
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('user_id')
      .eq('username', userName)
      .single();
    if (profileError || !profile) throw new Error('User not found');

    let query = supabase
      .from('pages')
      .select('*, links(*)')
      .eq('user_id', profile.user_id)
      .eq('is_deleted', false)
      .eq('is_published', true);

    if (slug) {
      query = query.eq('slug', slug);
    } else {
      query = query.order('created_at', { ascending: false }).limit(1);
    }

    const { data, error } = await query.single();
    if (error) throw error;
    return mapPage(data);
  }

  async getPreview(userName: string, slug?: string | null): Promise<Page> {
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('user_id')
      .eq('username', userName)
      .single();
    if (profileError || !profile) throw new Error('User not found');

    let query = supabase
      .from('pages')
      .select('*, links(*)')
      .eq('user_id', profile.user_id)
      .eq('is_deleted', false);

    if (slug) {
      query = query.eq('slug', slug);
    } else {
      query = query.order('created_at', { ascending: false }).limit(1);
    }

    const { data, error } = await query.single();
    if (error) throw error;
    return mapPage(data);
  }
}

export default PageRepo;
