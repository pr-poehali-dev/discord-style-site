import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState([70]);
  const [theme, setTheme] = useState('dark');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-background w-full max-w-4xl h-[90vh] rounded-lg shadow-2xl flex overflow-hidden">
        <div className="w-60 bg-[#2C3142] p-4">
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
              Настройки пользователя
            </h2>
          </div>

          <ScrollArea className="h-[calc(100%-100px)]">
            <div className="space-y-1">
              <button className="w-full px-2 py-2 rounded text-left hover:bg-muted/50 transition-colors flex items-center gap-2">
                <Icon name="User" size={18} />
                <span className="text-sm">Мой аккаунт</span>
              </button>
              <button className="w-full px-2 py-2 rounded text-left hover:bg-muted/50 transition-colors flex items-center gap-2">
                <Icon name="Palette" size={18} />
                <span className="text-sm">Внешний вид</span>
              </button>
              <button className="w-full px-2 py-2 rounded text-left hover:bg-muted/50 transition-colors flex items-center gap-2">
                <Icon name="Bell" size={18} />
                <span className="text-sm">Уведомления</span>
              </button>
              <button className="w-full px-2 py-2 rounded text-left hover:bg-muted/50 transition-colors flex items-center gap-2">
                <Icon name="Shield" size={18} />
                <span className="text-sm">Конфиденциальность</span>
              </button>
              <button className="w-full px-2 py-2 rounded text-left hover:bg-muted/50 transition-colors flex items-center gap-2">
                <Icon name="Volume2" size={18} />
                <span className="text-sm">Голос и видео</span>
              </button>
              <button className="w-full px-2 py-2 rounded text-left hover:bg-muted/50 transition-colors flex items-center gap-2">
                <Icon name="Keyboard" size={18} />
                <span className="text-sm">Горячие клавиши</span>
              </button>
              <button className="w-full px-2 py-2 rounded text-left hover:bg-muted/50 transition-colors flex items-center gap-2">
                <Icon name="Languages" size={18} />
                <span className="text-sm">Язык</span>
              </button>

              <Separator className="my-4" />

              <button className="w-full px-2 py-2 rounded text-left text-red-500 hover:bg-muted/50 transition-colors flex items-center gap-2">
                <Icon name="LogOut" size={18} />
                <span className="text-sm">Выйти</span>
              </button>
            </div>
          </ScrollArea>

          <Button
            onClick={onClose}
            variant="ghost"
            className="absolute bottom-4 left-4 text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={18} className="mr-2" />
            Закрыть
          </Button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="max-w-2xl">
              <h1 className="text-2xl font-bold mb-6">Мой аккаунт</h1>

              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
                    <AvatarFallback>ВЫ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Ваше имя</h3>
                    <p className="text-sm text-muted-foreground mb-3">username#1234</p>
                    <Button size="sm" variant="outline">
                      Изменить аватар
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username" className="text-xs font-semibold text-muted-foreground uppercase">
                      Имя пользователя
                    </Label>
                    <Input id="username" defaultValue="Ваше имя" className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase">
                      Email
                    </Label>
                    <Input id="email" type="email" defaultValue="user@example.com" className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-xs font-semibold text-muted-foreground uppercase">
                      Телефон
                    </Label>
                    <Input id="phone" type="tel" defaultValue="+7 900 123-45-67" className="mt-2" />
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Уведомления</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Включить уведомления</p>
                      <p className="text-sm text-muted-foreground">Получать push-уведомления</p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Звук уведомлений</p>
                      <p className="text-sm text-muted-foreground">Проигрывать звук при получении</p>
                    </div>
                    <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Громкость ({volume[0]}%)</Label>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      disabled={!soundEnabled}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Внешний вид</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Тема</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setTheme('dark')}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          theme === 'dark' ? 'border-primary bg-primary/10' : 'border-border bg-muted'
                        }`}
                      >
                        <div className="w-full h-16 bg-[#1A1F2C] rounded mb-2"></div>
                        <p className="text-sm font-medium">Темная</p>
                      </button>
                      <button
                        onClick={() => setTheme('light')}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          theme === 'light' ? 'border-primary bg-primary/10' : 'border-border bg-muted'
                        }`}
                      >
                        <div className="w-full h-16 bg-white rounded mb-2"></div>
                        <p className="text-sm font-medium">Светлая</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-500">Опасная зона</h3>
                
                <div className="space-y-3">
                  <Button variant="destructive" className="w-full">
                    Удалить аккаунт
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Это действие необратимо. Все ваши данные будут удалены.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
