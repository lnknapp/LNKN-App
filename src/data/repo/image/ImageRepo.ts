import { supabase } from '../../../lib/supabase';

export interface UploadedImage {
  id: number;
  fileType?: string;
  fileName?: string;
}

export class ImageRepo {
  getRenderUrl(imageId: number): string {
    // Images stored in the "images" bucket at path "{id}"
    return `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/images/${imageId}`;
  }

  async uploadPageImage(pageId: number, file: File): Promise<UploadedImage> {
    // Insert a record to get a stable ID
    const { data: imgRecord, error: insertError } = await supabase
      .from('images')
      .insert({ storage_path: 'temp', file_type: file.type, file_name: file.name })
      .select()
      .single();
    if (insertError) throw insertError;

    const imageId: number = imgRecord.id;

    // Upload the file to Supabase Storage at path "{imageId}"
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(String(imageId), file, { contentType: file.type, upsert: true });
    if (uploadError) throw uploadError;

    // Update the storage_path now that we have the real path
    await supabase.from('images').update({ storage_path: String(imageId) }).eq('id', imageId);

    // Link the image to the page
    await supabase.from('pages').update({ image_id: imageId }).eq('id', pageId);

    return { id: imageId, fileType: file.type, fileName: file.name };
  }

  async deletePageImage(pageId: number): Promise<void> {
    // Get the current image ID
    const { data: page } = await supabase
      .from('pages')
      .select('image_id')
      .eq('id', pageId)
      .single();
    if (!page?.image_id) return;

    // Get the storage path
    const { data: img } = await supabase
      .from('images')
      .select('storage_path')
      .eq('id', page.image_id)
      .single();

    // Remove from storage
    if (img?.storage_path) {
      await supabase.storage.from('images').remove([img.storage_path]);
    }

    // Soft-delete the image record
    await supabase
      .from('images')
      .update({ is_deleted: true, deleted_at: new Date().toISOString() })
      .eq('id', page.image_id);

    // Unlink from page
    await supabase.from('pages').update({ image_id: null }).eq('id', pageId);
  }
}

export default ImageRepo;
