import { Card, CardBody } from "@nextui-org/react";
import React from "react";

interface LinkTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

export const LinkTypeCard: React.FC<LinkTypeCardProps> = ({ icon, title, description, isSelected, onClick }) => {
  return (
    <Card
      isPressable
      onPress={onClick}
      className={`w-full border-2 transition-all ${isSelected ? "border-primary" : "border-transparent"}`}
    >
      <CardBody className="flex flex-row items-center gap-4 p-4">
        <div className="text-3xl text-primary">{icon}</div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-default-500">{description}</p>
        </div>
      </CardBody>
    </Card>
  );
};
