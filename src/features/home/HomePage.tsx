import { PageLayout } from "../PageLayout";
import { UserService } from "../../services";
import { useSetPageTitle } from "../../hooks";
import { Avatar } from "@nextui-org/react";

export function HomePage() {

  useSetPageTitle("Dashboard");

  // Avoid calling the API if the user is not signed in
  if (!UserService.isSignedIn()) return <></>;

  return (
    <PageLayout>
      <div>
        <p className="text-6xl">blah blah blah</p>
        <div className="flex gap-4 items-center">
          <Avatar isBordered color="default" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar isBordered color="primary" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar isBordered color="secondary" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar isBordered color="success" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          <Avatar isBordered color="warning" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <Avatar isBordered color="danger" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </div>
      </div>
    </PageLayout>
  );
}

export default HomePage;
