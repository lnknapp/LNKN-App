import { Link } from "../../../components";
import { routes } from "../../../app/routes";
import PageLayout from "../../PageLayout";

export function Forbidden() {
  return (
    <PageLayout>
      <div className="row">
        <div className="col-auto text-danger" style={{ fontSize: 90 }}>
          <span>icon</span>
        </div>
        <div className="col">
          <h1>403 Forbidden</h1>
          <p>Sorry, you don't have permission to access this page.</p>
          <p>
            Would you like to go back to the{" "}
            <Link url={routes.home}>homepage</Link>?
          </p>
        </div>
      </div>
    </PageLayout>
  );
}

export default Forbidden;
