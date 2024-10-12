'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import { History, Home, Menu, Settings } from 'lucide-react'
import SettingsScreen from './SettingsScreen'
import ChatHistory, { Message } from './ChatHistory'
import ButtonComponent from './ButtonComponent'
import PhoneNumberInput from './PhoneNumberInput'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export const MainPage = () => {
  const [activeTab, setActiveTab] = useState('main')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hasError, setHasError] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [sendTo, setSendTo] = useState<'Discord' | 'Line'>('Discord');

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-background text-foreground" style={{ backgroundImage: "url('/images/background.webp')" }}>
      <header className="sticky top-0 left-0 w-full px-2 py-4 border-b bg-[#3ED85C] text-primary-foreground z-50">
        <div className="grid grid-cols-6 gap-4 items-center justify-center text-center">
          <Image src="/logo.png" alt="logo.png" width={100} height={100} className='col-span-1' />
          <h1 className="text-lg font-semibold col-span-4">Communication App</h1>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </div>
      </header>
      <main className="flex flex-col p-10 space-y-4 overflow-y-auto h-screen">
        {activeTab === 'main' && (
          <>
            <PhoneNumberInput
             phoneNumber={phoneNumber}
             setPhoneNumber={setPhoneNumber}
             setHasError={setHasError}
            />
            <div className="flex justify-center space-x-10">
              <Avatar
               onClick={() => setSendTo('Discord')}
               className={`cursor-pointer p-1 rounded-full ${
                sendTo === 'Discord' ? 'ring-4 ring-blue-500' : 'ring-2 ring-transparent'
               }`}
              >
                <AvatarImage src="/discord.jpg" />
                <AvatarFallback>Discord</AvatarFallback>
              </Avatar>
              <Avatar
               onClick={() => setSendTo('Line')}
               className={`cursor-pointer p-1 rounded-full ${
                sendTo === 'Line' ? 'ring-4 ring-green-500' : 'ring-2 ring-transparent'
               }`}
              >
                <AvatarImage src="/line.png" />
                <AvatarFallback>LINE</AvatarFallback>
              </Avatar>
            </div>
            <p className='w-full text-center text-[#c32525] font-bold'>{errorMessage}</p>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-10'>
              <ButtonComponent
               hasError={hasError}
               setErrorMessage={setErrorMessage}
               phoneNumber={phoneNumber}
               sentMessages={sentMessages}
               setSentMessages={setSentMessages}
               sendTo={sendTo}
              />
            </div>
          </>
        )}
        {activeTab === 'history' && (
          <ChatHistory sentMessages={sentMessages} />
        )}
        {activeTab === 'settings' && (
          <SettingsScreen />
        )}
      </main>
      <footer className="border-t sticky bottom-0 left-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 items-center">
            <TabsTrigger value="main" className='flex flex-col items-center'>
              <Home />
              <p className="mt-1">ホーム</p>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex flex-col items-center">
              <History />
              <p className="mt-1">履歴</p>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col items-center">
              <Settings />
              <p className="mt-1">設定</p>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </footer>
    </div>
  )
}