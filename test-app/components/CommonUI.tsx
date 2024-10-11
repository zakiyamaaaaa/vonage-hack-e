import { Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger 
} from '@/components/ui/drawer';
import { Loader2 } from 'lucide-react';
import { SetStateAction } from 'react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface CommonDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  dialogMessage: string;
  setDialogMessage: React.Dispatch<SetStateAction<string>>;
  handleButtonClick?: () => void;
  isSending: boolean;
}

export const CommonDialog: React.FC<CommonDialogProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  dialogMessage,
  handleButtonClick,
  isSending
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          {dialogMessage}
        </div>
        <DialogFooter className="flex flex-col space-y-4">
          {handleButtonClick &&
            <Button onClick={handleButtonClick}>
              {isSending ? <Loader2 className='animate-spin' /> : '送信する'}
            </Button>
          }
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface MessageDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  dialogMessage: string;
  setDialogMessage: React.Dispatch<SetStateAction<string>>;
  handleButtonClick: () => void;
  isSending: boolean;
  title?: string;
}

export const MessageDialog: React.FC<MessageDialogProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  dialogMessage,
  handleButtonClick,
  isSending,
  title
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          {dialogMessage}
        </div>
        <DialogFooter className="sm:justify-start">
          <Button onClick={handleButtonClick}>
            {isSending ? <Loader2 className='animate-spin' /> : '送信する'}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface CommonDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<SetStateAction<boolean>>;
  drawerMessage: string;
  setDrawerMessage: React.Dispatch<SetStateAction<string>>;
  handleButtonClick: () => void;
  isSending: boolean;
  hasSwitch: boolean;
  switchState?: boolean;
  setSwitchState?: React.Dispatch<SetStateAction<boolean>>;
}

export const CommonDrawer: React.FC<CommonDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  drawerMessage,
  setDrawerMessage,
  handleButtonClick,
  isSending,
  hasSwitch,
  switchState,
  setSwitchState
}) => {
  const editDrawerMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDrawerMessage(e.target.value);
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className='flex flex-row w-full items-center justify-center'>
            <DrawerTitle className='flex-1'>送信するメッセージ</DrawerTitle>
            {hasSwitch &&
              <div className='flex flex-col items-center'>
                <Label>send voice</Label>
                <Switch checked={switchState} onCheckedChange={setSwitchState} />
              </div>
            }
          </div>
          <DrawerDescription>
          <label htmlFor="name" className="font-medium text-gray-900 text-sm mt-8 mb-2 block">
            Description
          </label>
          <textarea
            value={drawerMessage}
            onChange={editDrawerMessage}
            className="border border-gray-200 bg-white w-full resize-none rounded-lg p-3 pt-2.5 text-gray-900 outline-none focus:ring-2 focus:ring-black/5 focus:ring-offset-0"
          />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button onClick={handleButtonClick}>
            {isSending ? <Loader2 className='animate-spin' /> : '送信する'}
          </Button>
          <DrawerClose asChild>
            <Button onClick={() => setDrawerMessage('')} variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}