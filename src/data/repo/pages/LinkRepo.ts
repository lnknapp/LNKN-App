import { supabase } from '../../../lib/supabase';
import { Link } from '../../entities/pages';
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

export class LinkRepo implements IDataRepository<Link> {
  async getAll(): Promise<Link[]> {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('is_deleted', false);
    if (error) throw error;
    return (data ?? []).map(mapLink);
  }

  async get(id: number): Promise<Link | null> {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('id', id)
      .eq('is_deleted', false)
      .single();
    if (error) return null;
    return mapLink(data);
  }

  async insert(link: Link): Promise<Link> {
    const theme = typeof link.theme === 'string'
      ? link.theme
      : JSON.stringify(link.theme ?? {});

    const { data, error } = await supabase
      .from('links')
      .insert({
        page_id: link.pageId,
        type: link.type,
        title: link.title,
        url: link.url ?? null,
        position: link.position,
        theme,
      })
      .select()
      .single();
    if (error) throw error;
    return mapLink(data);
  }

  async update(id: number, link: Link): Promise<Link> {
    const theme = typeof link.theme === 'string'
      ? link.theme
      : JSON.stringify(link.theme ?? {});

    const { data, error } = await supabase
      .from('links')
      .update({
        title: link.title,
        url: link.url ?? null,
        position: link.position,
        theme,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return mapLink(data);
  }

  async delete(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('links')
      .update({ is_deleted: true, deleted_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
    return true;
  }

  async getByPageId(pageId: number): Promise<Link[]> {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('page_id', pageId)
      .eq('is_deleted', false)
      .order('position', { ascending: true });
    if (error) throw error;
    return (data ?? []).map(mapLink);
  }
}

export default LinkRepo;
