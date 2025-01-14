import { Card, Skeleton } from "@nextui-org/react";

export const SkeletonPageCard = () => (
  <Card className="w-full space-y-5 p-3" radius="lg">
    <div className="flex items-center space-x-4">
      <Skeleton
        className="object-cover rounded-lg w-20 h-20"
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

export default SkeletonPageCard;
