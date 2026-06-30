import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface DynamicListProps {
  titleLabel: string;
  descLabel?: string;
  items: { id: string; title: string; description?: string }[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, field: 'title' | 'description', value: string) => void;
}

export function DynamicList({ titleLabel, descLabel, items, onAdd, onRemove, onChange }: DynamicListProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="flex gap-4 items-start group">
          <div className="mt-3 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors cursor-grab">
            <GripVertical className="h-4 w-4" />
          </div>
          <div className="flex-1 space-y-3 p-4 rounded-lg border bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Item #{index + 1}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => onRemove(item.id)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="space-y-2">
              <Input
                placeholder={titleLabel}
                value={item.title}
                onChange={(e) => onChange(item.id, 'title', e.target.value)}
              />
              {descLabel && (
                <Textarea
                  placeholder={descLabel}
                  value={item.description}
                  onChange={(e) => onChange(item.id, 'description', e.target.value)}
                  className="h-20"
                />
              )}
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full border-dashed" onClick={onAdd}>
        <Plus className="h-4 w-4 mr-2" /> Add {titleLabel}
      </Button>
    </div>
  );
}
