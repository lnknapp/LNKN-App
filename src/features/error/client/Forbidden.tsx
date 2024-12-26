import AppLayout from '../../AppLayout';
import PageLayout from '../../PageLayout';
import { Link } from '../../../components';
import { routes } from '../../../app/routes';
import { FaArrowLeft } from 'react-icons/fa';
import { useSetPageTitle } from '../../../hooks';

export function Forbidden() {
  useSetPageTitle("");
  return (
    <AppLayout>
      <PageLayout>
          <div className="vh-100 w-100 d-flex flex-column justify-content-center align-items-center">
            <p style={{fontSize: "1.5rem"}}>Oop! 403 Error!</p>
            <span style={{fontSize: "6rem", lineHeight: "6rem"}}>Unauthorized</span>
            <Link url={routes.home} className="btn btn-primary mt-3 border-radius-xl px-4 py-2">
              <FaArrowLeft className="me-2" />
              Go home
            </Link>
          </div>
      </PageLayout>
    </AppLayout>
  );
}

export default Forbidden
