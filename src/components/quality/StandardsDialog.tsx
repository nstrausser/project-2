import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Minus } from 'lucide-react';
import type { InstallationStandard } from '@/types/quality';

type StandardsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  standard?: InstallationStandard;
  onSave: (standard: InstallationStandard) => void;
};

export default function StandardsDialog({
  open,
  onOpenChange,
  standard,
  onSave,
}: StandardsDialogProps) {
  const [formData, setFormData] = useState({
    name: standard?.name || '',
    version: standard?.version || '',
    categories: standard?.categories || [
      {
        name: '',
        requirements: [
          {
            id: '1',
            description: '',
            criticalityLevel: 'medium' as const,
          },
        ],
      },
    ],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      id: standard?.id || Math.random().toString(36).substr(2, 9),
      ...formData,
      updatedAt: new Date().toISOString(),
    });

    onOpenChange(false);
  };

  const addCategory = () => {
    setFormData({
      ...formData,
      categories: [
        ...formData.categories,
        {
          name: '',
          requirements: [
            {
              id: Math.random().toString(36).substr(2, 9),
              description: '',
              criticalityLevel: 'medium',
            },
          ],
        },
      ],
    });
  };

  const addRequirement = (categoryIndex: number) => {
    const newCategories = [...formData.categories];
    newCategories[categoryIndex].requirements.push({
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      criticalityLevel: 'medium',
    });
    setFormData({ ...formData, categories: newCategories });
  };

  const removeRequirement = (categoryIndex: number, requirementIndex: number) => {
    const newCategories = [...formData.categories];
    newCategories[categoryIndex].requirements.splice(requirementIndex, 1);
    setFormData({ ...formData, categories: newCategories });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {standard ? 'Edit Standard' : 'Create Installation Standard'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Standard Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., PPF Installation Standard"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                value={formData.version}
                onChange={(e) =>
                  setFormData({ ...formData, version: e.target.value })
                }
                placeholder="e.g., 1.0"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Categories & Requirements</Label>
              <Button type="button" variant="outline" onClick={addCategory}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                {formData.categories.map((category, categoryIndex) => (
                  <div
                    key={categoryIndex}
                    className="p-4 rounded-lg border space-y-4"
                  >
                    <Input
                      placeholder="Category Name"
                      value={category.name}
                      onChange={(e) => {
                        const newCategories = [...formData.categories];
                        newCategories[categoryIndex].name = e.target.value;
                        setFormData({ ...formData, categories: newCategories });
                      }}
                      required
                    />

                    <div className="space-y-2">
                      {category.requirements.map((req, reqIndex) => (
                        <div key={req.id} className="flex items-center space-x-2">
                          <Input
                            className="flex-1"
                            placeholder="Requirement description"
                            value={req.description}
                            onChange={(e) => {
                              const newCategories = [...formData.categories];
                              newCategories[categoryIndex].requirements[
                                reqIndex
                              ].description = e.target.value;
                              setFormData({
                                ...formData,
                                categories: newCategories,
                              });
                            }}
                            required
                          />
                          <Select
                            value={req.criticalityLevel}
                            onValueChange={(value: any) => {
                              const newCategories = [...formData.categories];
                              newCategories[categoryIndex].requirements[
                                reqIndex
                              ].criticalityLevel = value;
                              setFormData({
                                ...formData,
                                categories: newCategories,
                              });
                            }}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              removeRequirement(categoryIndex, reqIndex)
                            }
                            disabled={category.requirements.length === 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addRequirement(categoryIndex)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Requirement
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter>
            <Button type="submit">
              {standard ? 'Update Standard' : 'Create Standard'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}