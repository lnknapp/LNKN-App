import { BasePageLayout } from "../BasePageLayout";
import { UserService } from "../../services";
import { useSetPageHeader } from "../../hooks";
import { Card, ProgressBar } from '@tremor/react';

export function HomePage() {

  useSetPageHeader("Dashboard");

  // Avoid calling the API if the user is not signed in
  if (!UserService.isSignedIn()) return <></>;

  return (
    <BasePageLayout>
      <div>
        <Card className="max-w-md">
          <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Sales
          </h4>
          <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            $71,465
          </p>
          <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <span>32% of annual target</span>
            <span>$225,000</span>
          </p>
          <ProgressBar value={32} className="mt-2" />
        </Card>
      </div>

    </BasePageLayout>
  );
}

export default HomePage;
