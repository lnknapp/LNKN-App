import { useEffect, useState } from 'react';
import style from './PhonePreview.module.scss';
import { useRefresh } from '../Refresh';

interface PhonePreviewProps {
  pageUrl: string;
  className?: string;
}

const PhonePreview = ({ pageUrl, className }: PhonePreviewProps) => {
  const [iframeSrc, setIframeSrc] = useState(pageUrl);
  const { refreshTrigger } = useRefresh();

  useEffect(() => {
    if (refreshTrigger) {
      setIframeSrc(`${pageUrl}?timestamp=${new Date().getTime()}`);
    }
  }, [refreshTrigger, pageUrl]);

  return (
    <div className={style.phonePreview + ' ' + className}>
      <iframe src={iframeSrc} title="iPhone Preview" className={style.phoneFrame} />
    </div>
  );
};

export default PhonePreview;
