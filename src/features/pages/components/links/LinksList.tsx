import { Card, CardBody } from "@nextui-org/react";
import React, { useState } from "react";
import { FaLink } from "react-icons/fa";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Button } from "../../../../components/Button/Button";
import { Link } from "../../../../data/entities/pages/Link";
import { LinkService } from "../../../../services/pages/LinkService";
import { usePageDetails } from "../PageDetailsContext";
import { AddLinkModal } from "./AddLinkModal";
import { EditLinkModal } from "./EditLinkModal";
import { LinkCard } from "./LinkCard";

const linkService = new LinkService();

export const LinksList: React.FC = () => {
  const { page, updatePageKey } = usePageDetails();
  const [addOpen, setAddOpen] = useState(false);
  const [editLink, setEditLink] = useState<Link | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const links = [...(page.links ?? [])].sort((a, b) => a.position - b.position);

  const handleDelete = async (id: number) => {
    await linkService.delete(id);
    updatePageKey("links", (page.links ?? []).filter((l) => l.id !== id));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);
    const reordered = arrayMove(links, oldIndex, newIndex).map((l, i) => ({
      ...l,
      position: i + 1,
    }));

    // Optimistic update
    updatePageKey("links", reordered);

    // Persist only links whose position actually changed
    const oldPositionById = new Map(links.map((l) => [l.id, l.position]));
    const changed = reordered.filter((l) => l.position !== oldPositionById.get(l.id));
    await Promise.all(
      changed.map((l) => {
        const theme = typeof l.theme === "string" ? l.theme : JSON.stringify(l.theme ?? {});
        return linkService.update(l.id, { ...l, theme: theme as any });
      })
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-bold text-primary">Buttons</span>
        <Button size="sm" color="secondary" variant="solid" onClick={() => setAddOpen(true)}>
          + Add Button
        </Button>
      </div>

      {links.length === 0 ? (
        <Card className="border border-dashed border-default-300">
          <CardBody className="flex flex-col items-center justify-center py-8 gap-2">
            <FaLink className="text-default-300" size={28} />
            <p className="text-sm text-default-400">No buttons yet. Add one to get started.</p>
          </CardBody>
        </Card>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {links.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  onEdit={(l) => setEditLink(l)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <AddLinkModal isOpen={addOpen} onClose={() => setAddOpen(false)} />
      <EditLinkModal link={editLink} isOpen={!!editLink} onClose={() => setEditLink(null)} />
    </div>
  );
};
