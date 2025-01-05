import { useState } from 'react';
import { useAsync, useSetPageTitle } from "../../hooks";
import { usePageActions } from "../BasePageLayout";
import { useDisclosure } from "@nextui-org/react";
import { PageCard, SkeletonPageCard } from "./components";
import { NewPageModal } from "./components/NewPageModal";
import { PageType } from '../../data/entities/pages';
import { PageService } from '../../services';
import NewPageDropdown from './components/NewPageDropdown';

export function PagesIndexPage() {
  const pageService = new PageService();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPageType, setSelectedPageType] = useState<PageType | null>(null);

  const { value: pages, loading, error } = useAsync(() => pageService.getAll(), []);

  useSetPageTitle("Pages");
  usePageActions(
    <NewPageDropdown onSelectPageType={(pageType: PageType) => {
      setSelectedPageType(pageType);
      onOpen();
    }} />
  );

  if (loading) return <SkeletonPageCard />;
  if (error) return <p>Error: {error.message}</p>;

  const renderSection = (type: PageType, title: string) => {
    const filteredPages = pages?.filter(page => page.type === type);
    if (!filteredPages || filteredPages.length === 0) return null;

    return (
      <section key={type}>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {filteredPages.map((page) => (
          <PageCard page={page}/>
        ))}
      </section>
    );
  };

  return (
    <>
      {pages?.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
          <h2 className="text-2xl font-bold">No pages found</h2>
          <p className="text-gray-500">Create a new page to get started.</p>
        </div>
      )}
      <div className="space-y-8">
        {renderSection(PageType.Profile, "Profile")}
        {renderSection(PageType.Song, "Song")}
        {renderSection(PageType.Album, "Album")}
        {renderSection(PageType.Event, "Event")}
      </div>
      <NewPageModal isOpen={isOpen} onOpenChange={onOpenChange} selectedPageType={selectedPageType} />
    </>
  );
}

export default PagesIndexPage;
