import { Card, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Image, Chip } from "@nextui-org/react";
import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";
import { Page, PageType } from "../../../data/entities/pages";
import { UserService } from "../../../services";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../app/routes";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useState } from "react";
import { usePage } from "../hooks/usePage";

interface PageCardProps {
  page: Page;
  onDelete: () => void;
}

export const PageCard = ({ page, onDelete }: PageCardProps) => {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const navigate = useNavigate();
  const userInfo = UserService.getUserInfo();
  const isProfilePage = page.type === PageType.Profile;
  const { handleDeletePage: deletePage } = usePage();
  const pageUrl = isProfilePage
    ? `https://lnkn.my/${userInfo?.userName}`
    : `https://lnkn.my/${userInfo?.userName}/${page.slug}`;
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeletePage = async (pageId: number) => {
    await deletePage(pageId);
    setDeleteModalOpen(false);
    onDelete()
  };

  return (
    <>
      <Card
        className="w-full space-y-5 p-2 mb-4 cursor-pointer "
        radius="lg"
      >
        <div className="flex items-center space-x-4" onClick={() => navigate(routes.pages.page.index.replace(":id", page.id.toString()))}>
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
              <p
                className="text-gray-500 hover:text-primary cursor-pointer"
                onClick={(e: any) => {
                  e.stopPropagation();
                  window.open(pageUrl, "_blank");
                }}
              >
                {isProfilePage
                  ? `lnkn.my/${userInfo?.userName}`
                  : `lnkn.my/${userInfo?.userName}/${page.slug}`}
              </p>
            </div>
            <div className="flex items-center space-x-4" style={{"margin": "0 0.5rem 0 0"}}>
              <Chip
                color={page.isPublished ? "success" : "warning"}
                variant="dot"
              >
                {page.isPublished ? "Live" : "Draft"}
              </Chip>
              <Dropdown>
                <DropdownTrigger>
                  <span className="cursor-pointer"><FaEllipsisV /></span>
                </DropdownTrigger>
                <DropdownMenu aria-label="Page Actions">
                  <DropdownItem
                    key="edit"
                    startContent={<FaEdit className={iconClasses} />}
                    onPress={() => navigate(routes.pages.page.index.replace(":id", page.id.toString()))}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    startContent={<FaTrash className={iconClasses} />}
                    onPress={() => setDeleteModalOpen(true)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </Card>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => handleDeletePage(page.id)}
      />
    </>
  )
};

export default PageCard;
