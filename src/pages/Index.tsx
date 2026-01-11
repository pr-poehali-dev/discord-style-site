import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import SettingsModal from '@/components/SettingsModal';

interface Server {
  id: string;
  name: string;
  icon: string;
}

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
}

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  hasFile?: boolean;
  fileName?: string;
}

interface User {
  id: string;
  name: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  avatar: string;
}

interface DirectMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: 'online' | 'idle' | 'dnd' | 'offline';
}

const mockServers: Server[] = [
  { id: '1', name: 'Главный сервер', icon: '🚀' },
  { id: '2', name: 'Разработка', icon: '💻' },
  { id: '3', name: 'Игры', icon: '🎮' },
  { id: '4', name: 'Музыка', icon: '🎵' },
  { id: '5', name: 'Искусство', icon: '🎨' },
];

const mockChannels: Channel[] = [
  { id: '1', name: 'общий', type: 'text' },
  { id: '2', name: 'объявления', type: 'text' },
  { id: '3', name: 'мемы', type: 'text' },
  { id: '4', name: 'Общая комната', type: 'voice' },
  { id: '5', name: 'Игровая', type: 'voice' },
  { id: '6', name: 'AFK', type: 'voice' },
];

const mockMessages: Message[] = [
  {
    id: '1',
    author: 'Алексей',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    content: 'Всем привет! Как дела?',
    timestamp: '14:32',
  },
  {
    id: '2',
    author: 'Мария',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    content: 'Отлично! Работаю над новым проектом 🚀',
    timestamp: '14:35',
  },
  {
    id: '3',
    author: 'Дмитрий',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
    content: 'Скинул документацию в файлах',
    timestamp: '14:38',
    hasFile: true,
    fileName: 'documentation.pdf',
  },
  {
    id: '4',
    author: 'Анна',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    content: 'Спасибо! Уже смотрю',
    timestamp: '14:40',
  },
];

const mockUsers: User[] = [
  { id: '1', name: 'Алексей', status: 'online', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
  { id: '2', name: 'Мария', status: 'online', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
  { id: '3', name: 'Дмитрий', status: 'idle', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry' },
  { id: '4', name: 'Анна', status: 'online', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna' },
  { id: '5', name: 'Иван', status: 'dnd', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan' },
  { id: '6', name: 'Елена', status: 'offline', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
];

const mockDirectMessages: DirectMessage[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Алексей',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    lastMessage: 'Привет! Ты видел последнее обновление?',
    timestamp: '15:24',
    unread: 2,
    status: 'online',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Мария',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    lastMessage: 'Спасибо за помощь с проектом!',
    timestamp: '14:15',
    unread: 0,
    status: 'online',
  },
  {
    id: '3',
    userId: '3',
    userName: 'Дмитрий',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
    lastMessage: 'Давай созвонимся завтра',
    timestamp: 'Вчера',
    unread: 1,
    status: 'idle',
  },
];

export default function Index() {
  const [view, setView] = useState<'servers' | 'dm'>('servers');
  const [selectedServer, setSelectedServer] = useState<string>('1');
  const [selectedChannel, setSelectedChannel] = useState<string>('1');
  const [selectedDM, setSelectedDM] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [hasNotification, setHasNotification] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: String(messages.length + 1),
      author: 'Вы',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      content: messageInput,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'dnd':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="h-screen flex bg-background text-foreground">
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      
      <div className="w-[72px] bg-[#1A1F2C] flex flex-col items-center py-3 gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setView('dm');
            setSelectedDM(null);
          }}
          className={`w-12 h-12 rounded-full hover:rounded-2xl transition-all duration-200 relative ${
            view === 'dm' ? 'bg-primary' : 'bg-primary/80 hover:bg-primary'
          }`}
        >
          <Icon name="MessageSquare" size={24} />
          {view === 'dm' && (
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-10 bg-primary rounded-r-full" />
          )}
        </Button>
        
        <div className="w-8 h-[2px] bg-border rounded-full my-1" />

        <ScrollArea className="flex-1 w-full">
          <div className="flex flex-col items-center gap-2 px-3">
            {mockServers.map((server) => (
              <button
                key={server.id}
                onClick={() => {
                  setView('servers');
                  setSelectedServer(server.id);
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-200 relative ${
                  view === 'servers' && selectedServer === server.id
                    ? 'bg-primary rounded-2xl'
                    : 'bg-muted hover:bg-primary/50 hover:rounded-2xl'
                }`}
              >
                {server.icon}
                {view === 'servers' && selectedServer === server.id && (
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-10 bg-primary rounded-r-full" />
                )}
              </button>
            ))}
          </div>
        </ScrollArea>

        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 hover:rounded-2xl transition-all duration-200"
        >
          <Icon name="Plus" size={24} />
        </Button>
      </div>

      <div className="w-60 bg-[#2C3142] flex flex-col">
        <div className="h-12 px-4 flex items-center border-b border-border shadow-sm">
          <h2 className="font-semibold text-sm">
            {view === 'dm' ? 'Личные сообщения' : mockServers.find((s) => s.id === selectedServer)?.name}
          </h2>
        </div>

        <ScrollArea className="flex-1">
          {view === 'dm' ? (
            <div className="p-2">
              <div className="px-2 mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Сообщения</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Icon name="Plus" size={14} />
                </Button>
              </div>
              {mockDirectMessages.map((dm) => (
                <button
                  key={dm.id}
                  onClick={() => setSelectedDM(dm.id)}
                  className={`w-full px-2 py-2 rounded flex items-center gap-2 transition-colors mb-1 ${
                    selectedDM === dm.id
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={dm.userAvatar} />
                      <AvatarFallback>{dm.userName[0]}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#2C3142] ${getStatusColor(
                        dm.status
                      )}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{dm.userName}</p>
                      <span className="text-xs text-muted-foreground">{dm.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{dm.lastMessage}</p>
                  </div>
                  {dm.unread > 0 && (
                    <Badge variant="destructive" className="ml-auto flex-shrink-0 h-5 min-w-5 px-1.5">
                      {dm.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-2">
              <div className="mb-4">
                <div className="px-2 mb-1 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Текстовые каналы</span>
                  <Icon name="Plus" size={14} className="text-muted-foreground" />
                </div>
                {mockChannels
                  .filter((ch) => ch.type === 'text')
                  .map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel.id)}
                      className={`w-full px-2 py-1.5 rounded flex items-center gap-2 transition-colors ${
                        selectedChannel === channel.id
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`}
                    >
                      <Icon name="Hash" size={18} />
                      <span className="text-sm">{channel.name}</span>
                    </button>
                  ))}
              </div>

              <div>
                <div className="px-2 mb-1 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Голосовые каналы</span>
                  <Icon name="Plus" size={14} className="text-muted-foreground" />
                </div>
                {mockChannels
                  .filter((ch) => ch.type === 'voice')
                  .map((channel) => (
                    <button
                      key={channel.id}
                      className="w-full px-2 py-1.5 rounded flex items-center gap-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                    >
                      <Icon name="Volume2" size={18} />
                      <span className="text-sm">{channel.name}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </ScrollArea>

        <div className="h-14 bg-[#1A1F2C] px-2 flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
            <AvatarFallback>ВЫ</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Ваше имя</p>
            <p className="text-xs text-muted-foreground">#1234</p>
          </div>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Icon name="Mic" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Icon name="Headphones" size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8"
            onClick={() => setShowSettings(true)}
          >
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-12 px-4 flex items-center justify-between border-b border-border shadow-sm">
          <div className="flex items-center gap-2">
            {view === 'dm' && selectedDM ? (
              <>
                <Avatar className="w-6 h-6">
                  <AvatarImage src={mockDirectMessages.find((dm) => dm.id === selectedDM)?.userAvatar} />
                  <AvatarFallback>
                    {mockDirectMessages.find((dm) => dm.id === selectedDM)?.userName[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold">
                  {mockDirectMessages.find((dm) => dm.id === selectedDM)?.userName}
                </span>
              </>
            ) : view === 'dm' ? (
              <>
                <Icon name="Users" size={20} className="text-muted-foreground" />
                <span className="font-semibold">Друзья</span>
              </>
            ) : (
              <>
                <Icon name="Hash" size={20} className="text-muted-foreground" />
                <span className="font-semibold">
                  {mockChannels.find((ch) => ch.id === selectedChannel)?.name}
                </span>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="Bell" size={20} />
              {hasNotification && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Users" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Search" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Inbox" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="CircleHelp" size={20} />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4">
          {view === 'dm' && !selectedDM ? (
            <div className="py-8 px-4 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Выберите друга</h3>
                <p className="text-muted-foreground mb-6">
                  Начните переписку, выбрав контакт из списка слева
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {mockUsers.slice(0, 4).map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        const dm = mockDirectMessages.find((d) => d.userId === user.id);
                        if (dm) setSelectedDM(dm.id);
                      }}
                      className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Avatar className="w-12 h-12 mx-auto mb-2">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium">{user.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-3 hover:bg-muted/30 px-2 py-1 rounded group">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>{message.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-sm">{message.author}</span>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <p className="text-sm mt-0.5">{message.content}</p>
                    {message.hasFile && (
                      <div className="mt-2 p-3 bg-muted rounded flex items-center gap-3 w-fit">
                        <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center">
                          <Icon name="FileText" size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{message.fileName}</p>
                          <p className="text-xs text-muted-foreground">245 KB</p>
                        </div>
                        <Button variant="ghost" size="icon" className="ml-2">
                          <Icon name="Download" size={16} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="p-4">
          <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3">
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Icon name="Plus" size={20} />
            </Button>
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                view === 'dm' && selectedDM
                  ? `Написать @${mockDirectMessages.find((dm) => dm.id === selectedDM)?.userName}`
                  : view === 'servers'
                  ? `Написать в #${mockChannels.find((ch) => ch.id === selectedChannel)?.name}`
                  : 'Выберите чат'
              }
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Icon name="Gift" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Icon name="Sticker" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Icon name="Smile" size={20} />
            </Button>
          </div>
        </div>
      </div>

      {view === 'servers' && (
        <div className="w-60 bg-[#2C3142] flex flex-col">
          <div className="h-12 px-4 flex items-center border-b border-border">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase">
              Участники — {mockUsers.filter((u) => u.status !== 'offline').length}
            </h3>
          </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            <div className="mb-3">
              <p className="px-2 mb-1 text-xs font-semibold text-muted-foreground uppercase">
                Онлайн — {mockUsers.filter((u) => u.status === 'online').length}
              </p>
              {mockUsers
                .filter((u) => u.status === 'online')
                .map((user) => (
                  <div
                    key={user.id}
                    className="px-2 py-1.5 rounded flex items-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer group"
                  >
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#2C3142] ${getStatusColor(
                          user.status
                        )}`}
                      />
                    </div>
                    <span className="text-sm">{user.name}</span>
                  </div>
                ))}
            </div>

            {mockUsers.filter((u) => u.status === 'idle' || u.status === 'dnd').length > 0 && (
              <div className="mb-3">
                <p className="px-2 mb-1 text-xs font-semibold text-muted-foreground uppercase">
                  Не активны
                </p>
                {mockUsers
                  .filter((u) => u.status === 'idle' || u.status === 'dnd')
                  .map((user) => (
                    <div
                      key={user.id}
                      className="px-2 py-1.5 rounded flex items-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#2C3142] ${getStatusColor(
                            user.status
                          )}`}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{user.name}</span>
                    </div>
                  ))}
              </div>
            )}

            {mockUsers.filter((u) => u.status === 'offline').length > 0 && (
              <div>
                <p className="px-2 mb-1 text-xs font-semibold text-muted-foreground uppercase">
                  Не в сети — {mockUsers.filter((u) => u.status === 'offline').length}
                </p>
                {mockUsers
                  .filter((u) => u.status === 'offline')
                  .map((user) => (
                    <div
                      key={user.id}
                      className="px-2 py-1.5 rounded flex items-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer opacity-50"
                    >
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#2C3142] ${getStatusColor(
                            user.status
                          )}`}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{user.name}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </ScrollArea>
        </div>
      )}
    </div>
  );
}