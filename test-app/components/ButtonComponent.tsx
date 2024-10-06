'use client';

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
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { responseType } from '@/app/api/sendGemini/route';
import { Loader2 } from 'lucide-react';
import { Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from '@/components/ui/dialog';

interface ButtonComponentProps {
  children?: string
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [drawerMessage, setDraserMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>('');

  const editDrawerMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraserMessage(e.target.value);
  }
  
  const sendGemini = async () => {
    try {
      setDialogMessage('AI考え中')
      setIsDialogOpen(true);
      const res = await fetch('/api/sendGemini',
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: 'こんにちは。お元気ですか？'
        })
      });
      const json = await res.json() as responseType;
      console.log(json);
      setDraserMessage(json.resText);
    } catch (error) {
      console.error(error);
      setDraserMessage('AIとの通信に失敗しました');
    } finally {
      setIsDialogOpen(false);
      setDialogMessage('');
      setIsDrawerOpen(true);
    }
  }

  const sendDiscord = async () => {
    try {
      setIsSending(true);
      const res = await fetch('/api/sendDiscord',
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: drawerMessage
        })
      });
      const json = await res.json() as responseType;
      console.log(json);
      setDialogMessage('送信に成功しました');
      setIsDialogOpen(true);
    } catch (error) {
      console.error(error);
      setDialogMessage('送信に失敗しました')
      setIsDialogOpen(true);
    } finally {
      setIsSending(false)
      setIsDrawerOpen(false);
    }
  }


  return (
    <div>
      <Button className="w-40 h-40 rounded-full bg-gradient-radial from-[#44FF06] to-[#31C300] shadow-lg animate-pulse"
        // onClick={sendMessageToDiscord}
        // onClick={sendGemini}
        onClick={async () => {
          await sendGemini();
        }}
      >
        {children}
      </Button>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>送信するメッセージ</DrawerTitle>
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
            <Button onClick={sendDiscord}>
              {isSending ? <Loader2 className='animate-spin' /> : '送信する'}
            </Button>
            <DrawerClose asChild>
              <Button onClick={() => setDraserMessage('')} variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
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
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ButtonComponent;