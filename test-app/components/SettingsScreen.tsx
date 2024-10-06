import { useState } from "react"
import { Bell, Moon, Globe, Lock, ChevronRight } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">設定</h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5" />
            <Label htmlFor="notifications">通知</Label>
          </div>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Moon className="w-5 h-5" />
            <Label htmlFor="dark-mode">ダークモード</Label>
          </div>
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5" />
            <Label>言語</Label>
          </div>
          <Select defaultValue="ja">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="言語を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ja">日本語</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="zh">中文</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button className="flex items-center justify-between w-full py-2 px-3 bg-gray-100 rounded-lg">
          <div className="flex items-center space-x-3">
            <Lock className="w-5 h-5" />
            <span>プライバシー設定</span>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg mt-6">
        変更を保存
      </button>
    </div>
  )
}