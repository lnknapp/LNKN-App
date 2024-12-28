import { PageLayout } from "../PageLayout";
import { UserService } from "../../services";
import { useSetPageTitle } from "../../hooks";

export function HomePage() {

  useSetPageTitle("Dashboard");

  // Avoid calling the API if the user is not signed in
  if (!UserService.isSignedIn()) return <></>;

  return (
    <PageLayout>
      <div>
        <p className="text-6xl">blah blah blah</p>
      </div>
    </PageLayout>
  );
}

export default HomePage;
