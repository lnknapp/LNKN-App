import PageLayout from "../PageLayout";
import { UserService } from "../../services";

export function HomePage() {
  // Avoid calling the API if the user is not signed in
  if (!UserService.isSignedIn()) return <></>;

  return (
    <PageLayout>
      <div className="row">
        <h1>Welcome to LNKN!</h1>
      </div>
    </PageLayout>
  );
}

export default HomePage;
