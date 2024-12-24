import AppLayout from '../../AppLayout';
import PageLayout from '../../PageLayout';
import { Link } from '../../../components';
import { routes } from '../../../app/routes';

export function NotFound() {
  return (
    <AppLayout>
      <PageLayout>
        <div className="row">
          <div className="col-auto text-danger" style={{ fontSize: 90 }}>
            <span>icon</span>
          </div>
          <div className="col">
            <h1>404 Not Found</h1>
            <p>Sorry, the page you are trying to access does not exists.</p>
            <p>
              Would you like to go back to the{" "}
              <Link url={routes.home}>homepage</Link>?
            </p>
          </div>
        </div>
      </PageLayout>
    </AppLayout>
  );
}

export default NotFound
