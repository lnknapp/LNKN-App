import { Card, CardBody } from "@nextui-org/react";
import React from "react";

interface StreamPlatformCardProps {
  icon: React.ReactNode;
  name: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export const StreamPlatformCard: React.FC<StreamPlatformCardProps> = ({ icon, name, color, isSelected, onClick }) => {
  return (
    <Card
      isPressable
      onPress={onClick}
      className={`border-2 transition-all ${isSelected ? "border-primary" : "border-transparent"}`}
    >
      <CardBody className="flex flex-col items-center justify-center gap-2 p-6" style={{ backgroundColor: `${color}22` }}>
        <div className="text-4xl" style={{ color }}>{icon}</div>
        <p className="font-semibold text-sm">{name}</p>
      </CardBody>
    </Card>
  );
};
