import { useCallback, useRef, useState } from 'react';
import { Button, Spinner } from '@nextui-org/react';
import { FiUploadCloud, FiX, FiImage } from 'react-icons/fi';
import { ImageService } from '../../../services/image/ImageService';
import { usePageDetails } from './PageDetailsContext';
import { showErrorMessage } from '../../../utils';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export const PageImageUpload = () => {
  const { page, updatePageKey } = usePageDetails();
  const imageService = new ImageService();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const currentImageUrl = page.imageId
    ? imageService.getRenderUrl(page.imageId)
    : null;

  const theme = (() => { try { return JSON.parse(page.theme); } catch { return {}; } })();
  const imageRadius = theme.imageShape === 'round' ? 'rounded-full' : theme.imageShape === 'sharp' ? 'rounded-none' : 'rounded-xl';

  const handleFile = useCallback(async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      showErrorMessage('Unsupported file type. Please upload a JPEG, PNG, or GIF.');
      return;
    }
    setUploading(true);
    try {
      const result = await imageService.uploadPageImage(page.id, file);
      updatePageKey('imageId', result.id);
    } catch {
      showErrorMessage('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [page.id, updatePageKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = async () => {
    setUploading(true);
    try {
      await imageService.deletePageImage(page.id);
      updatePageKey('imageId', null);
    } catch {
      showErrorMessage('Failed to remove image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-default-600 uppercase tracking-wider">Page Image</p>

      {currentImageUrl ? (
        /* Existing image preview */
        <div className={`relative group w-48 h-48 ${imageRadius} overflow-hidden border-2 border-default-200 bg-default-100`}>
          <img
            src={currentImageUrl}
            alt="Page image"
            className="w-full h-full object-cover"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button
              size="sm"
              variant="solid"
              color="primary"
              radius="full"
              startContent={<FiUploadCloud size={14} />}
              onPress={() => fileInputRef.current?.click()}
              isDisabled={uploading}
            >
              Replace
            </Button>
            <Button
              size="sm"
              variant="solid"
              color="danger"
              radius="full"
              startContent={<FiX size={14} />}
              onPress={handleRemove}
              isDisabled={uploading}
            >
              Remove
            </Button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Spinner color="white" size="md" />
            </div>
          )}
        </div>
      ) : (
        /* Drop zone */
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`
            relative flex flex-col items-center justify-center gap-3
            w-48 h-48 ${imageRadius} border-2 border-dashed cursor-pointer
            transition-all select-none
            ${dragOver
              ? 'border-primary bg-primary-50 scale-[1.01]'
              : 'border-default-300 bg-default-50 hover:border-primary hover:bg-primary-50/50'
            }
            ${uploading ? 'pointer-events-none opacity-60' : ''}
          `}
        >
          {uploading ? (
            <Spinner color="primary" size="md" />
          ) : (
            <>
              <div className="p-3 rounded-full bg-default-100">
                {dragOver ? (
                  <FiUploadCloud size={22} className="text-primary" />
                ) : (
                  <FiImage size={22} className="text-default-400" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-default-600">
                  {dragOver ? 'Drop to upload' : 'Click or drag to upload'}
                </p>
                <p className="text-xs text-default-400 mt-0.5">
                  JPEG, PNG, GIF — auto-scaled to 2MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};

export default PageImageUpload;
