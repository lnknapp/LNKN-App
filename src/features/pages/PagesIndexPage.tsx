import { Card, Skeleton, Image, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useSetPageTitle } from "../../hooks";
import { usePageActions } from "../BasePageLayout";
import { Button } from "@nextui-org/react";
import { FaEllipsisV, FaPlus } from 'react-icons/fa';

export function PagesIndexPage() {
  useSetPageTitle("Pages");

  usePageActions(<Button className="font-bold" color="primary" variant="ghost" radius="full" endContent={<FaPlus />}>Add New Page</Button>);

  const renderSkeletonCard = () => (
    <Card className="w-full space-y-5 p-3" radius="lg">
      <div className="flex items-center space-x-4">
        <Image
          alt="Album cover"
          className="object-cover"
          height={100}
          shadow="md"
          src="https://nextui.org/images/album-cover.png"
          width="100%"
        />
        <div className="flex flex-col space-y-3 flex-grow">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </div>
    </Card>
  );

  const renderPageCard = (page: { name: string; url: string; published: boolean }) => (
    <Card className="w-full space-y-5 p-2 cursor-pointer " radius="lg" onPress={() => console.log("Page clicked")}>
      <div className="flex items-center space-x-4">
        <Image
          alt="Page cover"
          className="object-cover"
          height={75}
          shadow="md"
          src="https://nextui.org/images/album-cover.png"
          width="100%"
        />
        <div className="flex flex-row justify-between space-y-3 flex-grow">
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold">{page.name}</h3>
            <p className="text-gray-500 hover:text-primary cursor-pointer" onClick={
              (e: any) => {
                e.stopPropagation();
                window.open(`https://${page.url}`, "_blank");
              }
            }>{page.url}</p>
          </div>
          <div className="flex items-center" style={{"margin": "0 0.5rem 0 0"}}>
            <Dropdown>
              <DropdownTrigger>
                <span className="cursor-pointer"><FaEllipsisV /></span>
              </DropdownTrigger>
              <DropdownMenu aria-label="Page Actions">
                <DropdownItem key="edit">Edit page</DropdownItem>
                <DropdownItem key="copy">Clone page</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                  Delete page
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </Card>
  );

  const pages = [
    { name: "latkop", url: "lnkn.my/latkop", published: true },
    { name: "Mo Bamba", url: "lnkn.my/latkop/mobamba", published: false },
    { name: "Dark Side of The Moon", url: "lnkn.my/latkop/dsotm", published: true },
    { name: "Backyard Shenanigans", url: "lnkn.my/latkop/bsbussi", published: false },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Default</h2>
        {renderPageCard(pages[0])}
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Songs</h2>
        {renderPageCard(pages[1])}
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Albums</h2>
        {renderPageCard(pages[2])}
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Events</h2>
        {renderPageCard(pages[3])}
      </section>
    </div>
  );
}

export default PagesIndexPage;
