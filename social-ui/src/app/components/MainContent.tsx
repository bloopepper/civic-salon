import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"

type MainContentProps = {
    renderScreen: () => JSX.Element;
    isDrawerOpen: boolean;
};

const MainContent = ({ renderScreen, isDrawerOpen }: MainContentProps) => (
    <main className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full pb-16 lg:pb-0">
            {renderScreen()}
        </ScrollArea>
        {isDrawerOpen && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        )}
    </main>
)

export default MainContent
