import AppLayout from '../../AppLayout';
import PageLayout from '../../BasePageLayout';
import { Button } from '../../../components';
import { routes } from '../../../app/routes';
import { FaArrowLeft } from 'react-icons/fa';
import { useSetPageHeader } from '../../../hooks';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  useSetPageHeader("");
  const navigate = useNavigate();
  return (
    <AppLayout>
      <PageLayout>
          <div className="w-full flex flex-col justify-center items-center" style={{ height: 'calc(100vh - 10rem)' }}>
            <p style={{fontSize: "1.5rem"}}>Oop! 404 Error!</p>
            <span style={{fontSize: "6rem", lineHeight: "6rem"}}>Page Not</span>
            <span className="mb-4" style={{fontSize: "6rem", lineHeight: "6rem"}}>Found</span>
            <div>
              <Button onClick={() => navigate(routes.home)} className="flex items-center mt-3 rounded-xl text-sm">
                <FaArrowLeft className="me-2" />
                Go home
              </Button>
            </div>
          </div>
      </PageLayout>
    </AppLayout>
  );
}

export default NotFound
