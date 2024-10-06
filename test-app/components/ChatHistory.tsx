import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// メッセージの型定義
type Message = {
  id: string
  content: string
  timestamp: string
  isSent: boolean
}

// サンプルデータ
const messages: Message[] = [
  { id: "1", content: "こんにちは！", timestamp: "10:00", isSent: false },
  { id: "2", content: "やあ、元気？", timestamp: "10:01", isSent: true },
  { id: "3", content: "元気だよ。今日の天気いいね。", timestamp: "10:03", isSent: false },
  { id: "4", content: "そうだね。散歩でも行こうか。", timestamp: "10:05", isSent: true },
  { id: "5", content: "いいね！何時頃がいい？", timestamp: "10:07", isSent: false },
  { id: "6", content: "2時頃はどう？", timestamp: "10:10", isSent: true },
  { id: "7", content: "了解！2時に駅前で待ち合わせしよう。", timestamp: "10:12", isSent: false },
]

export default function ChatHistory() {
  return (
    <div>
      <div className="mx-auto max-w-md rounded-lg bg-white shadow-md">
        <div className="border-b p-4">
          <h1 className="text-lg font-semibold">トーク履歴</h1>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="flex flex-col space-y-4 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex max-w-[70%] ${message.isSent ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.isSent ? "/user-avatar.png" : "/friend-avatar.png"} />
                    <AvatarFallback>{message.isSent ? "Me" : "Friend"}</AvatarFallback>
                  </Avatar>
                  <div className={`mx-2 rounded-lg p-3 ${message.isSent ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs ${message.isSent ? "text-blue-100" : "text-gray-500"}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}