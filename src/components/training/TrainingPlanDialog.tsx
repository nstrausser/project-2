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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Minus, GraduationCap } from 'lucide-react';
import type { TrainingPlan, TrainingModule } from '@/types/training';

type TrainingPlanDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: TrainingPlan;
  onSave: (plan: TrainingPlan) => void;
};

export default function TrainingPlanDialog({
  open,
  onOpenChange,
  plan,
  onSave,
}: TrainingPlanDialogProps) {
  const [formData, setFormData] = useState({
    startDate: plan?.startDate || '',
    endDate: plan?.endDate || '',
    modules: plan?.modules || [],
    status: plan?.status || 'active',
    notes: plan?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      id: plan?.id || Math.random().toString(36).substr(2, 9),
      installerId: plan?.installerId || '',
      ...formData,
      progress: 0,
    });

    onOpenChange(false);
  };

  const addModule = () => {
    const newModule: TrainingModule = {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      description: '',
      duration: 0,
      requiredSkills: [],
      objectives: [],
      status: 'not_started',
    };

    setFormData({
      ...formData,
      modules: [...formData.modules, newModule],
    });
  };

  const removeModule = (moduleId: string) => {
    setFormData({
      ...formData,
      modules: formData.modules.filter((m) => m.id !== moduleId),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {plan ? 'Edit Training Plan' : 'Create Training Plan'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Training Modules</Label>
              <Button type="button" variant="outline" onClick={addModule}>
                <Plus className="mr-2 h-4 w-4" />
                Add Module
              </Button>
            </div>

            <div className="space-y-4">
              {formData.modules.map((module, index) => (
                <div
                  key={module.id}
                  className="p-4 rounded-lg border space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">Module {index + 1}</h4>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeModule(module.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={module.title}
                        onChange={(e) => {
                          const newModules = [...formData.modules];
                          newModules[index] = {
                            ...module,
                            title: e.target.value,
                          };
                          setFormData({ ...formData, modules: newModules });
                        }}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={module.description}
                        onChange={(e) => {
                          const newModules = [...formData.modules];
                          newModules[index] = {
                            ...module,
                            description: e.target.value,
                          };
                          setFormData({ ...formData, modules: newModules });
                        }}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Duration (hours)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={module.duration}
                          onChange={(e) => {
                            const newModules = [...formData.modules];
                            newModules[index] = {
                              ...module,
                              duration: parseInt(e.target.value),
                            };
                            setFormData({ ...formData, modules: newModules });
                          }}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select
                          value={module.status}
                          onValueChange={(value: TrainingModule['status']) => {
                            const newModules = [...formData.modules];
                            newModules[index] = {
                              ...module,
                              status: value,
                            };
                            setFormData({ ...formData, modules: newModules });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not_started">
                              Not Started
                            </SelectItem>
                            <SelectItem value="in_progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">
                              Completed
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Additional notes about the training plan..."
            />
          </div>

          <DialogFooter>
            <Button type="submit">
              {plan ? 'Update Plan' : 'Create Plan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}