'use client';

import { Button } from '@/components/ui/button';
import { SetStateAction, useState } from 'react';
import { responseType } from '@/app/api/sendGemini/route';
import { CommonDialog, CommonDrawer } from '@/components/CommonUI';
import { MakeCallResponse, SessionSearchResponse } from '@/lib/types';
import { Message } from './ChatHistory';

interface ButtonComponentProps {
  hasError: boolean;
  setErrorMessage: React.Dispatch<SetStateAction<string | null>>;
  phoneNumber: string;
  sentMessages: Message[];
  setSentMessages: React.Dispatch<SetStateAction<Message[]>>;
  sendTo: 'Discord' | 'Line';
  children?: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  hasError,
  setErrorMessage,
  phoneNumber,
  sentMessages,
  setSentMessages,
  sendTo,
  children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState<boolean>(false);
  const [drawerMessage, setDraserMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>('');
  const [talkId, setTalkId] = useState<string | undefined>(undefined);
  const [talkAudioUrl, setTalkAudioUrl] = useState<string | undefined>(undefined);
  const [isSendVoice, setIsSendVoice] = useState<boolean>(false);

  const addMessage = (content: string) => {
    const newMessage: Message = {
      id: (sentMessages.length + 1).toString(),
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setSentMessages((prevMessages) => [...prevMessages, newMessage]);
  };
  
  const comumnicateVonage = async () => {
    setErrorMessage(null);
    if (hasError) {
      setErrorMessage('番号はハイフンなし11桁です')
      return;
    }
    setIsSending(true);
    setDialogMessage('電話をかけています');
    setIsDialogOpen(true);
    try {
      const callNumber = phoneNumber.replace(/^0/, '81');
      const res = await fetch('/api/vonage/make-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to: callNumber })
      });
      const json: MakeCallResponse = await res.json();
      setTalkId(json.data?.sessionId);
      console.log(json.data)
    } catch (error) {
      console.error(error);
    }
    setIsSending(false);
    setDialogMessage('文章を整える');
  }
  
  const sendGeminiDatafromVonage = async () => {
    if(!talkId) return;
    try {
      setIsSending(true);
      setDialogMessage('会話と声を取得しています')
      const result = await fetch(`/api/vonage/search-session?sessionId=${encodeURIComponent(talkId)}`);
      const data: SessionSearchResponse = await result.json();
      const { lastUserMessage, audioUrl } = data;
      setTalkAudioUrl(audioUrl);
      setDialogMessage('AI考え中・・・')
      const res = await fetch('/api/sendGemini',
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: lastUserMessage
        })
      });
      const json = await res.json() as responseType;
      console.log(json);
      setDraserMessage(json.resText);
    } catch (error) {
      console.error(error);
      setDraserMessage('AIとの通信に失敗しました');
    } finally {
      setIsSending(false);
      setIsDialogOpen(false);
      setDialogMessage('');
      setIsDrawerOpen(true);
    }
  }

  const sender = async () => {
    const message = isSendVoice ?
    `${drawerMessage}
    ${talkAudioUrl}` :
    drawerMessage
    try {
      setIsSending(true);
      const endPoint = `/api/send${sendTo}`
      const res = await fetch(endPoint,
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message
        })
      });
      const json = await res.json() as responseType;
      console.log(json);
      setDialogMessage('送信に成功しました');
      setIsMessageDialogOpen(true);
    } catch (error) {
      console.error(error);
      setDialogMessage('送信に失敗しました')
      setIsMessageDialogOpen(true);
    } finally {
      setIsSending(false)
      setIsDrawerOpen(false);
      addMessage(drawerMessage);
    }
  }


  return (
    <div>
      <Button className={`w-40 h-40 rounded-full bg-gradient-radial from-[#44FF06] to-[#31C300] shadow-lg ${hasError ? 'opacity-45':'animate-pulse'}`}
        // onClick={sendMessageToDiscord}
        // onClick={sendGemini}
        onClick={comumnicateVonage}
      >
        {children}
      </Button>
      <CommonDialog
       isDialogOpen={isMessageDialogOpen}
       setIsDialogOpen={setIsMessageDialogOpen}
       dialogMessage={dialogMessage}
       setDialogMessage={setDialogMessage}
       isSending={isSending}
      />
      <CommonDialog
       isDialogOpen={isDialogOpen}
       setIsDialogOpen={setIsDialogOpen}
       dialogMessage={dialogMessage}
       setDialogMessage={setDialogMessage}
       handleButtonClick={sendGeminiDatafromVonage}
       isSending={isSending}
      />
      <CommonDrawer
       isDrawerOpen={isDrawerOpen}
       setIsDrawerOpen={setIsDrawerOpen}
       drawerMessage={drawerMessage}
       setDrawerMessage={setDraserMessage}
       handleButtonClick={sender}
       isSending={isSending}
       hasSwitch={true}
       switchState={isSendVoice}
       setSwitchState={setIsSendVoice}
      />

    </div>
  );
};

export default ButtonComponent;