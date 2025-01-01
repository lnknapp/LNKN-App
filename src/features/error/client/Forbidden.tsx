import PageLayout from '../../BasePageLayout';
import { routes } from '../../../app/routes';
import { FaArrowLeft } from 'react-icons/fa';
import { useSetPageTitle } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components';

export function Forbidden() {
  useSetPageTitle("");
  const navigate = useNavigate();
  return (
    <PageLayout>
      <div className="vh-full w-full flex flex-col justify-center items-center" style={{ height: 'calc(100vh - 10rem)' }}>
        <p style={{fontSize: "1.5rem"}}>Oop! 403 Error!</p>
        <span style={{fontSize: "6rem", lineHeight: "6rem"}}>Unauthorized</span>
        <div>
          <Button onClick={() => navigate(routes.home)} className="flex items-center mt-3 rounded-xl text-sm">
            <FaArrowLeft className="me-2" />
            Go home
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}

export default Forbidden
