'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import { History, Home, Menu, Settings } from 'lucide-react'
import ChatHistory from './ChatHistory'
import SettingsScreen from './SettingsScreen'

export const MainPage = () => {
  const [activeTab, setActiveTab] = useState('main')

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-background text-foreground">
      <header className="sticky top-0 left-0 w-full px-2 py-4 border-b bg-[#3ED85C] text-primary-foreground z-50">
        <div className="grid grid-cols-6 gap-4 items-center justify-center text-center">
          <Image src="/logo.png" alt="logo.png" width={100} height={100} className='col-span-1' />
          <h1 className="text-lg font-semibold col-span-4">Communication App</h1>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 space-y-4 overflow-y-auto h-screen">
        {activeTab === 'main' && (
          <>
            <div className='w-full flex items-center justify-center'>
              <Button className="w-40 h-40 rounded-full bg-gradient-radial from-[#44FF06] to-[#31C300] shadow-lg"></Button>
            </div>
            <Input placeholder="番号入力" className="w-full" />
            <Input placeholder="送り先" className="w-full" />
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon">
                <div className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <div className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <div className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
        {activeTab === 'history' && (
          <ChatHistory />
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