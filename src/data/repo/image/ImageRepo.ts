import BaseRepository from '../BaseRepository';

export interface UploadedImage {
  id: number;
  fileType?: string;
  fileName?: string;
}

export class ImageRepo extends BaseRepository {
  private readonly baseUrl = 'image';

  getRenderUrl(imageId: number): string {
    const base = this.client.baseUrl.replace(/\/$/, '');
    return `${base}/${this.baseUrl}/${imageId}/render`;
  }

  async uploadPageImage(pageId: number, file: File): Promise<UploadedImage> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post<UploadedImage>(
      `${this.baseUrl}/page/${pageId}`,
      formData,
      { headers: { 'Content-Type': undefined } }
    );
    return this.handleResponse<UploadedImage>(response)!;
  }

  async deletePageImage(pageId: number): Promise<void> {
    await this.client.delete(`${this.baseUrl}/page/${pageId}`);
  }
}

export default ImageRepo;
