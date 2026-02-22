import { ImageRepo, UploadedImage } from '../../data/repo/image/ImageRepo';

export class ImageService {
  private repo = new ImageRepo();

  getRenderUrl(imageId: number): string {
    return this.repo.getRenderUrl(imageId);
  }

  async uploadPageImage(pageId: number, file: File): Promise<UploadedImage> {
    return this.repo.uploadPageImage(pageId, file);
  }

  async deletePageImage(pageId: number): Promise<void> {
    return this.repo.deletePageImage(pageId);
  }
}

export default ImageService;
