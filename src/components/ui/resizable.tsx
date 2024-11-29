import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={className}
    {...props}
  >
    {withHandle && (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8">
        <GripVertical className="h-4 w-4" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export {
  ResizableHandle,
  ResizablePanel,
}