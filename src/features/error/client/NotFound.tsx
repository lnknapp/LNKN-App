import AppLayout from '../../AppLayout';
import PageLayout from '../../PageLayout';
import { Link } from '../../../components';
import { routes } from '../../../app/routes';
import { FaArrowLeft } from 'react-icons/fa';
import { useSetPageTitle } from '../../../hooks';

export function NotFound() {
  useSetPageTitle("");
  return (
    <AppLayout>
      <PageLayout>
          <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ height: 'calc(100vh - 10rem)' }}>
            <p style={{fontSize: "1.5rem"}}>Oop! 404 Error!</p>
            <span style={{fontSize: "6rem", lineHeight: "6rem"}}>Page Not</span>
            <span className="mb-4" style={{fontSize: "6rem", lineHeight: "6rem"}}>Found</span>
            <Link url={routes.home} className="btn btn-primary mt-3 border-radius-xl px-4 py-2">
              <FaArrowLeft className="me-2" />
              Go home
            </Link>
          </div>
      </PageLayout>
    </AppLayout>
  );
}

export default NotFound
