import PageLayout from "../BasePageLayout";
import AppLayout from "../AppLayout";

interface ErrorPageProps {
  message?: string;
}

export function ErrorPage(props: Readonly<ErrorPageProps>) {
  return (
    <PageLayout>
      <h1>Ooops... An error!</h1>
      <p>{props.message ?? ""}</p>
    </PageLayout>
  );
}

export default ErrorPage;
