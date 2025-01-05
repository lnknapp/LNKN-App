import { Card, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Image } from "@nextui-org/react";
import { FaEllipsisV } from "react-icons/fa";
import { Page, PageType } from "../../../data/entities/pages";
import { UserService } from "../../../services";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../app/routes";

interface PageCardProps {
  page: Page;
}

export const PageCard = ({ page }: PageCardProps) => {
  const navigate = useNavigate();
  const userInfo = UserService.getUserInfo();
  const isProfilePage = page.type === PageType.Profile;
  const pageUrl = isProfilePage
    ? `https://lnkn.my/${userInfo?.userName}`
    : `https://lnkn.my/${userInfo?.userName}/${page.slug}`;

  return (
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
          <div className="flex items-center" style={{"margin": "0 0.5rem 0 0"}}>
            <Dropdown>
              <DropdownTrigger>
                <span className="cursor-pointer"><FaEllipsisV /></span>
              </DropdownTrigger>
              <DropdownMenu aria-label="Page Actions">
                <DropdownItem
                  key="edit"
                  onPress={() => navigate(routes.pages.page.index.replace(":id", page.id.toString()))}
                >
                  Edit page
                </DropdownItem>
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
  )
};

export default PageCard;
