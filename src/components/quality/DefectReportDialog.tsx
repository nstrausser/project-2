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
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, AlertTriangle } from 'lucide-react';
import type { DefectReport } from '@/types/quality';

type DefectReportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  installationId: string;
  onSave: (report: DefectReport) => void;
};

export default function DefectReportDialog({
  open,
  onOpenChange,
  installationId,
  onSave,
}: DefectReportDialogProps) {
  const [formData, setFormData] = useState({
    type: '',
    severity: '',
    location: '',
    description: '',
    images: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const report: DefectReport = {
      id: Math.random().toString(36).substr(2, 9),
      installationId,
      reportedBy: 'Current User', // Replace with actual user
      reportedAt: new Date().toISOString(),
      type: formData.type as DefectReport['type'],
      severity: formData.severity as DefectReport['severity'],
      location: formData.location,
      description: formData.description,
      status: 'open',
      images: formData.images,
    };

    onSave(report);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Report Defect</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Defect Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select defect type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bubble">Bubble</SelectItem>
                <SelectItem value="dirt">Dirt Inclusion</SelectItem>
                <SelectItem value="stretch">Stretch Mark</SelectItem>
                <SelectItem value="alignment">Misalignment</SelectItem>
                <SelectItem value="edge_lift">Edge Lifting</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="severity">Severity</Label>
            <Select
              value={formData.severity}
              onValueChange={(value) =>
                setFormData({ ...formData, severity: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="e.g., Hood - Center"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the defect in detail..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Documentation</Label>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  // Simulate camera capture
                  setFormData({
                    ...formData,
                    images: [...formData.images, `photo-${Date.now()}.jpg`],
                  });
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
                  setFormData({
                    ...formData,
                    images: [...formData.images, `upload-${Date.now()}.jpg`],
                  });
                }}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
            </div>
            {formData.images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.images.map((image) => (
                  <Badge key={image} variant="secondary">
                    {image}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Submit Report</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}