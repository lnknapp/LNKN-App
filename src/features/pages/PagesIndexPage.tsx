import { useState } from 'react';
import { useAsync, useSetPageHeader } from "../../hooks";
import { usePageActions } from "../BasePageLayout";
import { Chip, useDisclosure } from "@nextui-org/react";
import { PageCard, SkeletonPageCard } from "./components";
import { NewPageModal } from "./components/NewPageModal";
import { PageType } from '../../data/entities/pages';
import { PageService } from '../../services';
import NewPageDropdown from './components/NewPageDropdown';
import { FaLayerGroup } from 'react-icons/fa';

export function PagesIndexPage() {
  const pageService = new PageService();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPageType, setSelectedPageType] = useState<PageType | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const { value: pages, loading, error } = useAsync(() => pageService.getAll(), [refreshKey]);

  useSetPageHeader("Pages");
  const hasProfile = pages?.some(p => p.type === PageType.Profile) ?? false;

  usePageActions(
    <NewPageDropdown
      onSelectPageType={(pageType: PageType) => {
        setSelectedPageType(pageType);
        onOpen();
      }}
      hasProfile={hasProfile}
    />,
    [hasProfile]
  );

  if (loading) return <SkeletonPageCard />;
  if (error) return <p>Error: {error.message}</p>;

  const renderSection = (type: PageType, title: string) => {
    const filteredPages = pages?.filter(page => page.type === type);
    if (!filteredPages || filteredPages.length === 0) return null;

    return (
      <section key={type} className="space-y-3">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-default-500">{title}</p>
          <Chip size="sm" variant="flat" color="default" className="text-xs h-5 min-w-0 px-1.5">
            {filteredPages.length}
          </Chip>
        </div>
        <div className="space-y-2">
          {filteredPages.map((page) => (
            <PageCard key={page.id} page={page} onDelete={() => setRefreshKey(oldKey => oldKey + 1)}/>
          ))}
        </div>
      </section>
    );
  };

  return (
    <>
      {pages?.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-6 py-20">
          <div className="w-16 h-16 rounded-2xl bg-default-100 flex items-center justify-center">
            <FaLayerGroup className="text-default-300" size={28} />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold">No pages yet</h2>
            <p className="text-sm text-default-400 mt-1">Create your first page to get started.</p>
          </div>
        </div>
      )}
      <div className="space-y-8">
        {renderSection(PageType.Profile, "Profile")}
        {renderSection(PageType.Song, "Songs")}
        {renderSection(PageType.Album, "Albums")}
        {renderSection(PageType.Event, "Events")}
      </div>
      <NewPageModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedPageType={selectedPageType}
      />
    </>
  );
}

export default PagesIndexPage;
