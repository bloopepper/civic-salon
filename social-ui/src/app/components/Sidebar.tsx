import React from 'react'
import { Home, Search, PlusSquare, MessageCircle, User, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {any} from "prop-types";
import {LangKey} from "@/lib/languages";

type SidebarProps = {
    t: any;
    isDarkMode: boolean;
    toggleDarkMode: (checked: boolean) => void;
    changeLanguage: (language: LangKey) => void;
    setCurrentScreen: (screen: string) => void;
}

const Sidebar = ({ t, isDarkMode, toggleDarkMode, changeLanguage, setCurrentScreen }:SidebarProps
) => (
    <aside className="hidden lg:flex flex-col w-64 border-r border-border p-4">
        <h1 className="text-2xl font-bold mb-8">{t.appName}</h1>
        <nav className="space-y-4">
            <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentScreen('home')}>
                <Home className="h-5 w-5 mr-2" />
                <span>{t.home}</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentScreen('search')}>
                <Search className="h-5 w-5 mr-2" />
                <span>{t.search}</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentScreen('post')}>
                <PlusSquare className="h-5 w-5 mr-2" />
                <span>{t.post}</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentScreen('messages')}>
                <MessageCircle className="h-5 w-5 mr-2" />
                <span>{t.messages}</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setCurrentScreen('profile')}>
                <User className="h-5 w-5 mr-2" />
                <span>{t.profile}</span>
            </Button>
        </nav>
        <div className="mt-auto space-y-4">
            <div className="flex items-center justify-between">
                <span>{t.darkMode}</span>
                <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <Globe className="h-5 w-5 mr-2" />
                        {t.language}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage('zh')}>繁體中文</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage('ja')}>日本語</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage('hi')}>हिन्दी</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage('th')}>ไทย</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </aside>
)

export default Sidebar
