import { ReactNode, useEffect, useState } from 'react';
import style from './PhonePreview.module.scss';
import { useRefresh } from '../Refresh';

interface PhonePreviewProps {
  pageUrl?: string;
  className?: string;
  children?: ReactNode;
}

const PhonePreview = ({ pageUrl, className, children }: PhonePreviewProps) => {
  const [iframeSrc, setIframeSrc] = useState(pageUrl);
  const { refreshTrigger } = useRefresh();

  useEffect(() => {
    if (!pageUrl) return;
    if (refreshTrigger) {
      setIframeSrc(`${pageUrl}?timestamp=${new Date().getTime()}`);
    }
  }, [refreshTrigger, pageUrl]);

  return (
    <div className={style.phonePreview + ' ' + className}>
      {children ? (
        <div className={style.phoneContent}>
          {children}
        </div>
      ) : (
        <iframe src={iframeSrc} title="iPhone Preview" className={style.phoneFrame} />
      )}
    </div>
  );
};

export default PhonePreview;
