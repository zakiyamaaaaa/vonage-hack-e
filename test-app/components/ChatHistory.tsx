import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// メッセージの型定義
export type Message = {
  id: string
  content: string
  timestamp: string
}

interface ChatHistoryProps {
  sentMessages: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ sentMessages }) => {
  return (
    <div className="mx-auto min-w-full rounded-lg bg-white shadow-md">
      <div className="border-b p-4">
        <h1 className="text-lg font-semibold">送信履歴</h1>
      </div>
      <ScrollArea className="max-h-96">
        <div className="flex flex-col space-y-4 p-4">
          {sentMessages.length === 0 ?
          <p>まだメッセージが送られていません</p> :
          sentMessages.map((message) => (
            <div key={message.id} className="flex justify-start">
              <div className="flex flex-row">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/user-avatar.png" alt="User" />
                  <AvatarFallback>Me</AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 bg-blue-100 text-blue-900">
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-blue-600">{message.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default ChatHistory;