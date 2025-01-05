import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, PageType } from '../../../data/entities/pages';
import { PageService, UserService } from '../../../services';
import { showErrorMessage } from '../../../utils';

export const useCreatePage = () => {
  const pageService = new PageService();
  const userInfo = UserService.getUserInfo();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const generateSlug = () => {
    return Math.random().toString(36).substring(2, 8); // Generate a random slug
  };

  const handleCreatePage = async (selectedPageType: PageType | null) => {
    const slug = generateSlug();
    const newPage: Page = {
      id: 0,
      name: selectedPageType === PageType.Profile ? userInfo?.userName! : `Untitled ${selectedPageType}`,
      slug: selectedPageType === PageType.Profile ? null : slug,
      type: selectedPageType!,
      userId: userInfo?.id!,
      isPublished: false,
      links: [],
      theme: "{}",
      pageTags: [],
    };
    try {
      const result = await pageService.insert(newPage);
      if (result) {
        navigate(`/pages/${result.id}`);
      }
    } catch (error) {
      showErrorMessage(`Error occurred while trying to execute insert: ${error}`);
    }
  };

  return {
    currentStep,
    handleNext,
    handleBack,
    handleCreatePage,
  };
};
