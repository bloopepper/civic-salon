import React from 'react'
import { Home, Search, PlusSquare, MessageCircle, User } from 'lucide-react'
import { Button } from "@/components/ui/button"

type MobileNavBarProps = {
    t: any;
    setCurrentScreen: (screen: string) => void;
};

const MobileNavBar = ({ t, setCurrentScreen }:MobileNavBarProps) => (
    <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center p-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border">
        <Button variant="ghost" size="icon" aria-label={t.home} onClick={() => setCurrentScreen('home')}>
            <Home className="h-6 w-6"/>
        </Button>
        <Button variant="ghost" size="icon" aria-label={t.search} onClick={() => setCurrentScreen('search')}>
            <Search className="h-6 w-6"/>
        </Button>
        <Button variant="ghost" size="icon" aria-label={t.post} onClick={() => setCurrentScreen('post')}>
            <PlusSquare className="h-6 w-6"/>
        </Button>
        <Button variant="ghost" size="icon" aria-label={t.messages} onClick={() => setCurrentScreen('messages')}>
            <MessageCircle className="h-6 w-6"/>
        </Button>
        <Button variant="ghost" size="icon" aria-label={t.profile} onClick={() => setCurrentScreen('profile')}>
            <User className="h-6 w-6"/>
        </Button>
    </nav>
)

export default MobileNavBar
