import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Camera, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { QualityCheck, ChecklistItem } from '@/types/quality';

const checklistCategories = {
  surface_prep: {
    name: 'Surface Preparation',
    items: [
      'Surface thoroughly cleaned and decontaminated',
      'No visible contaminants or debris',
      'Proper surface temperature maintained',
    ],
  },
  installation: {
    name: 'Installation Technique',
    items: [
      'Proper slip solution mixture used',
      'Correct squeegee pressure applied',
      'No finger prints or marks on adhesive',
      'Film properly stretched around curves',
    ],
  },
  finish: {
    name: 'Finish Quality',
    items: [
      'No air bubbles or silvering',
      'No dirt or debris trapped under film',
      'Even and consistent finish',
      'No water spots or residue',
    ],
  },
  edges: {
    name: 'Edge Work',
    items: [
      'Edges properly wrapped and sealed',
      'No lifting at corners or edges',
      'Clean and even trim lines',
      'Proper tucking around gaskets',
    ],
  },
  clarity: {
    name: 'Optical Clarity',
    items: [
      'No distortion in film',
      'Proper alignment of patterns/textures',
      'Consistent clarity across installation',
      'No hazing or cloudiness',
    ],
  },
};

const StatusIndicator = ({ status }: { status: ChecklistItem['status'] }) => {
  const icon = {
    passed: '●',
    failed: '■',
    na: '–',
  }[status];

  const colors = {
    passed: 'text-[#0070F3]',
    failed: 'text-[#E00]',
    na: 'text-muted-foreground',
  }[status];

  return (
    <div className={cn("flex items-center gap-1.5", colors)}>
      <span className="text-[10px]">{icon}</span>
      <span className="capitalize">{status}</span>
    </div>
  );
};

type QualityCheckDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  installationId: string;
  onSave: (check: QualityCheck) => void;
};

export default function QualityCheckDialog({
  open,
  onOpenChange,
  installationId,
  onSave,
}: QualityCheckDialogProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    Object.entries(checklistCategories).flatMap(([category, { items }]) =>
      items.map((description, index) => ({
        id: `${category}-${index}`,
        category: category as ChecklistItem['category'],
        description,
        status: 'na' as const,
        notes: '',
      }))
    )
  );

  const [notes, setNotes] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'surface_prep',
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const qualityCheck: QualityCheck = {
      id: Math.random().toString(36).substr(2, 9),
      installationId,
      performedBy: 'Current User', // Replace with actual user
      performedAt: new Date().toISOString(),
      status: checklist.some((item) => item.status === 'failed')
        ? 'failed'
        : checklist.some((item) => item.status === 'na')
        ? 'needs-review'
        : 'passed',
      checklist,
      notes,
      images,
    };

    onSave(qualityCheck);
    onOpenChange(false);
  };

  const checklistByCategory = Object.fromEntries(
    Object.keys(checklistCategories).map((category) => [
      category,
      checklist.filter((item) => item.category === category),
    ])
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Quality Check</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Accordion
            type="multiple"
            value={expandedCategories}
            onValueChange={setExpandedCategories}
            className="space-y-4"
          >
            {Object.entries(checklistCategories).map(([category, { name }]) => (
              <AccordionItem
                key={category}
                value={category}
                className="border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 hover:bg-accent/50">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold">{name}</span>
                    <div className="flex items-center space-x-2">
                      {checklistByCategory[category].every(
                        (item) => item.status === 'passed'
                      ) && (
                        <Badge className="bg-[#0070F3]/10 text-[#0070F3] border-[#0070F3]/20">
                          All Passed
                        </Badge>
                      )}
                      {checklistByCategory[category].some(
                        (item) => item.status === 'failed'
                      ) && (
                        <Badge className="bg-[#E00]/10 text-[#E00] border-[#E00]/20">
                          Issues Found
                        </Badge>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="divide-y">
                    {checklistByCategory[category].map((item) => (
                      <div key={item.id} className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{item.description}</span>
                          <Select
                            value={item.status}
                            onValueChange={(value: ChecklistItem['status']) => {
                              setChecklist(
                                checklist.map((i) =>
                                  i.id === item.id
                                    ? { ...i, status: value }
                                    : i
                                )
                              );
                            }}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="passed">
                                <StatusIndicator status="passed" />
                              </SelectItem>
                              <SelectItem value="failed">
                                <StatusIndicator status="failed" />
                              </SelectItem>
                              <SelectItem value="na">
                                <StatusIndicator status="na" />
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {item.status === 'failed' && (
                          <Textarea
                            placeholder="Add notes about the issue..."
                            value={item.notes}
                            onChange={(e) => {
                              setChecklist(
                                checklist.map((i) =>
                                  i.id === item.id
                                    ? { ...i, notes: e.target.value }
                                    : i
                                )
                              );
                            }}
                            className="text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="space-y-4">
            <div>
              <Label>Documentation</Label>
              <div className="flex space-x-2 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    // Simulate camera capture
                    setImages([...images, `photo-${Date.now()}.jpg`]);
                  }}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    // Simulate file upload
                    setImages([...images, `upload-${Date.now()}.jpg`]);
                  }}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </div>
              {images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {images.map((image) => (
                    <Badge key={image} variant="secondary">
                      {image}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional observations or comments..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Complete Quality Check</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}