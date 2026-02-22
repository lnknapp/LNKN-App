import { Card, CardBody, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { FaEdit, FaEllipsisV, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { Page, PageType } from "../../../data/entities/pages";
import { UserService } from "../../../services";
import { ImageService } from "../../../services/image/ImageService";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../app/routes";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useState } from "react";
import { usePage } from "../hooks/usePage";

interface PageCardProps {
  page: Page;
  onDelete: () => void;
}


const TYPE_ACCENT: Record<PageType, string> = {
  [PageType.Profile]: "#022213",
  [PageType.Song]:    "#7828c8",
  [PageType.Album]:   "#17c964",
  [PageType.Event]:   "#f5a524",
};

const imageService = new ImageService();

function PageThumbnail({ page }: { page: Page }) {
  const theme = (() => { try { return JSON.parse(page.theme); } catch { return {}; } })();
  const bg = theme.backgroundColor || "#022213";
  const initial = page.name?.[0]?.toUpperCase() ?? "?";

  if (page.imageId) {
    return (
      <div className="w-14 h-14 rounded-xl shrink-0 overflow-hidden">
        <img
          src={imageService.getRenderUrl(page.imageId)}
          alt={page.name}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 select-none relative overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)",
        backgroundSize: "8px 8px",
      }} />
      <span className="text-white text-xl font-bold relative z-10">{initial}</span>
    </div>
  );
}

export const PageCard = ({ page, onDelete }: PageCardProps) => {
  const navigate = useNavigate();
  const userInfo = UserService.getUserInfo();
  const isProfilePage = page.type === PageType.Profile;
  const { handleDeletePage: deletePage } = usePage();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const displayUrl = isProfilePage
    ? `lnkn.my/${userInfo?.userName}`
    : `lnkn.my/${userInfo?.userName}/${page.slug}`;
  const fullUrl = `https://${displayUrl}`;

  const accent = TYPE_ACCENT[page.type];

  const handleDeletePage = async (pageId: number) => {
    await deletePage(pageId);
    setDeleteModalOpen(false);
    onDelete();
  };

  return (
    <>
      <Card
        className="w-full border border-default-200 shadow-none hover:shadow-md transition-shadow cursor-pointer group overflow-hidden"
        radius="lg"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: accent }} />
        <CardBody className="flex flex-row items-center gap-4 p-4 pl-5">
          {/* Thumbnail */}
          <div onClick={() => navigate(routes.pages.page.index.replace(":id", page.id.toString()))}>
            <PageThumbnail page={page} />
          </div>

          {/* Info */}
          <div
            className="flex-1 min-w-0"
            onClick={() => navigate(routes.pages.page.index.replace(":id", page.id.toString()))}
          >
            <h3 className="font-bold text-base leading-tight truncate">{page.name}</h3>
            <button
              className="flex items-center gap-1 text-xs text-default-400 hover:text-primary transition-colors mt-1 group/link"
              onClick={(e) => { e.stopPropagation(); window.open(fullUrl, "_blank"); }}
            >
              <span className="truncate">{displayUrl}</span>
              <FaExternalLinkAlt size={9} className="shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            <Chip
              size="sm"
              variant="dot"
              color={page.isPublished ? "success" : "warning"}
              className="text-xs"
            >
              {page.isPublished ? "Live" : "Draft"}
            </Chip>

            <Dropdown>
              <DropdownTrigger>
                <button
                  className="p-1.5 rounded-lg text-default-400 hover:text-default-700 hover:bg-default-100 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaEllipsisV size={14} />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Page Actions">
                <DropdownItem
                  key="edit"
                  startContent={<FaEdit className="text-default-500" />}
                  onPress={() => navigate(routes.pages.page.index.replace(":id", page.id.toString()))}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  startContent={<FaTrash className="text-danger" />}
                  className="text-danger"
                  color="danger"
                  onPress={() => setDeleteModalOpen(true)}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardBody>
      </Card>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => handleDeletePage(page.id)}
      />
    </>
  );
};

export default PageCard;
