import style from './PhonePreview.module.scss';

interface PhonePreviewProps {
  pageUrl: string;
  className?: string;
}

const PhonePreview = ({ pageUrl, className }: PhonePreviewProps) => {
  return (
    <div className={style.phonePreview + ' ' + className}>
      <iframe src={pageUrl} title="iPhone Preview" className={style.phoneFrame} />
    </div>
  );
};

export default PhonePreview;
