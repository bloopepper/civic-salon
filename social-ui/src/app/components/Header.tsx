import React from 'react'
import { Bell, Settings, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"

type HeaderProps = {
    t: any;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (open: boolean) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    currentLanguage: string;
    changeLanguage: (language: string) => void;
};

const Header = ({ t, isDrawerOpen, setIsDrawerOpen, isDarkMode, toggleDarkMode, currentLanguage, changeLanguage }: HeaderProps) => (
    <header className="flex justify-between items-center p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <h1 className="text-xl font-bold">
            {/*{t.appName}*/}
        </h1>
        <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="lg:block">
                <Bell className="h-5 w-5" />
                <span className="sr-only">{t.notifications}</span>
            </Button>
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">{t.settings}</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className={`w-[280px] sm:w-[400px] ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">{t.settings}</h2>
                            {/*<Button variant="ghost" size="icon" onClick={() => setIsDrawerOpen(false)}>*/}
                            {/*    <X className="h-5 w-5" />*/}
                            {/*    <span className="sr-only">Close</span>*/}
                            {/*</Button>*/}
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span>{t.darkMode}</span>
                                <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                            </div>
                            <div>
                                <h3 className="mb-2">{t.language}</h3>
                                <div className="space-y-2">
                                    <Button
                                        variant={currentLanguage === 'en' ? 'default' : 'outline'}
                                        className="w-full justify-start"
                                        onClick={() => changeLanguage('en')}
                                    >
                                        English
                                    </Button>
                                    <Button
                                        variant={currentLanguage === 'zh' ? 'default' : 'outline'}
                                        className="w-full justify-start"
                                        onClick={() => changeLanguage('zh')}
                                    >
                                        繁體中文
                                    </Button>
                                    <Button
                                        variant={currentLanguage === 'ja' ? 'default' : 'outline'}
                                        className="w-full justify-start"
                                        onClick={() => changeLanguage('ja')}
                                    >
                                        日本語
                                    </Button>
                                    <Button
                                        variant={currentLanguage === 'hi' ? 'default' : 'outline'}
                                        className="w-full justify-start"
                                        onClick={() => changeLanguage('hi')}
                                    >
                                        हिन्दी
                                    </Button>
                                    <Button
                                        variant={currentLanguage === 'th' ? 'default' : 'outline'}
                                        className="w-full justify-start"
                                        onClick={() => changeLanguage('th')}
                                    >
                                        ไทย
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    </header>
)

export default Header
