"use client"

import Sidebar from '@/app/components/Sidebar'
import Header from '@/app/components/Header'
import MainContent from '@/app/components/MainContent'
import MobileNavBar from '@/app/components/MobileNavBar'
import {LangKey, languages} from '@/lib/languages'

import React, { useState } from 'react'
import { Heart, Share2, MessageSquare, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import PostDetail from "@/app/screens/PostDetail";
import Messages from "@/app/screens/Messages";
import Profile from "@/app/screens/Profile";



export default function ResponsiveSocialMediaLayout() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState('en')
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [currentScreen, setCurrentScreen] = useState('home')
    const [previousScreen, setPreviousScreen] = useState('home')
    const [selectedPost, setSelectedPost] = useState(null)
    const [showFullBackground, setShowFullBackground] = useState(false)
    const [showFullCivicThoughts, setShowFullCivicThoughts] = useState(false)
    const [showBackgroundSection, setShowBackgroundSection] = useState(false)
    const [showCivicThoughtsSection, setShowCivicThoughtsSection] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [chatMessages, setChatMessages] = useState([])
    const [chatInput, setChatInput] = useState('')
    const [activeChatSection, setActiveChatSection] = useState(null)
    const t = languages[currentLanguage as keyof typeof languages]

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle('dark')
    }

    const changeLanguage = (lang: LangKey) => {
        setCurrentLanguage(lang)
    }

    const handlePostClick = (post:any) => {
        setPreviousScreen(currentScreen)
        setSelectedPost(post)
        setCurrentScreen('postDetail')
        setShowBackgroundSection(false)
        setShowCivicThoughtsSection(false)
        setIsLoading(false)
        setIsChatOpen(false)
        setActiveChatSection(null)
    }

    const handleBackButton = () => {
        setCurrentScreen(previousScreen)
    }

    const handleAIButtonClick = () => {
        setIsLoading(true)
        setTimeout(() => {
            setShowBackgroundSection(true)
            setShowCivicThoughtsSection(true)
            setIsLoading(false)
        }, 2000) // Simulating a 2-second delay
    }

    const handleChatAIButtonClick = (section: 'background' | 'civicThoughts') => {
        setIsChatOpen(true)
        setActiveChatSection(section)
        setChatMessages([
            {
                type: 'ai',
                content: `Let's discuss the ${section === 'background' ? 'background' : 'civic thoughts'} of this post. What would you like to know?`
            }
        ])
    }

    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (chatInput.trim()) {
            setChatMessages([...chatMessages, { type: 'user', content: chatInput }])
            setChatInput('')
            // Simulate AI response
            setTimeout(() => {
                setChatMessages(prev => [...prev, { type: 'ai', content: 'This is a simulated AI response.' }])
            }, 1000)
        }
    }

    const renderScreen = () => {
        switch (currentScreen) {
            case 'search':
                return (
                    <div className="p-4 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4">{t.search}</h2>
                        <Input type="search" placeholder={t.searchPlaceholder} className="mb-4" />
                        <div className="space-y-4">
                            {/* Search results would go here */}
                            <p>Search results will be displayed here.</p>
                        </div>
                    </div>
                )
            case 'post':
                return (
                    <div className="p-4 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4">{t.createPost}</h2>
                        <Textarea placeholder={t.postPlaceholder} className="mb-4" />
                        <Button>{t.submit}</Button>
                    </div>
                )
            case 'profile':
                return <Profile
                            t={t}
                            handlePostClick={handlePostClick}/>
            case 'messages':
                return (
                    <Messages
                        t={t}
                    />
                )

            case 'postDetail':
                return (
                    <PostDetail
                        t={t}
                        selectedPost={selectedPost}
                        setCurrentScreen={setCurrentScreen}
                        handleBackButton={handleBackButton}
                        isChatOpen={isChatOpen}
                        setIsChatOpen={setIsChatOpen}
                        chatMessages={chatMessages}
                        handleChatSubmit={handleChatSubmit}
                        chatInput={chatInput}
                        setChatInput={setChatInput}
                        activeChatSection={activeChatSection}
                        setShowFullCivicThoughts={setShowFullCivicThoughts}
                        showFullCivicThoughts={showFullCivicThoughts}
                        handleAIButtonClick={handleAIButtonClick}
                        handleChatAIButtonClick={handleChatAIButtonClick}
                        isLoading={isLoading}
                        setShowFullBackground={setShowFullBackground}
                        showBackgroundSection={showBackgroundSection}
                        showCivicThoughtsSection={showCivicThoughtsSection}
                        showFullBackground={showFullBackground}/>
                )
            default:
                return (
                    <>
                        {/* Stories */}
                        <div className="flex space-x-4 p-4 overflow-x-auto">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <Avatar className="w-16 h-16 ring-2 ring-primary">
                                        <AvatarImage src={`https://i.pravatar.cc/64?img=${i + 1}`} alt={`${t.user} ${i + 1} ${t.story}`} />
                                        <AvatarFallback>U{i + 1}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs mt-1">{t.user} {i + 1}</span>
                                </div>
                            ))}
                        </div>

                        {/* Feed */}
                        <div className="space-y-4 p-4 max-w-2xl mx-auto">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="bg-card rounded-lg shadow p-4" onClick={() => handlePostClick({
                                    id: i,
                                    username: `${t.user} ${i + 6}`,
                                    avatarSrc: `https://i.pravatar.cc/40?img=${i + 6}`,
                                    timeAgo: 2,
                                    content: t.postContent,
                                    imageSrc: `https://picsum.photos/seed/${i}/400/300`,
                                    comments: [
                                        { username: `${t.user} ${i + 7}`, avatarSrc: `https://i.pravatar.cc/40?img=${i + 7}`, timeAgo: 1, content: 'Great post!' },
                                        { username: `${t.user} ${i + 8}`, avatarSrc: `https://i.pravatar.cc/40?img=${i + 8}`, timeAgo: 1, content: 'I agree with this.' },
                                    ]
                                })}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <Avatar>
                                                <AvatarImage src={`https://i.pravatar.cc/40?img=${i + 6}`} alt={`${t.user} ${i + 6} ${t.avatar}`} />
                                                <AvatarFallback>U{i + 6}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{t.user} {i + 6}</p>
                                                <p className="text-xs text-muted-foreground">2 {t.hoursAgo}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-5 w-5" />
                                            <span className="sr-only">More options</span>
                                        </Button>
                                    </div>
                                    <p className="mb-4">{t.postContent}</p>
                                    <img
                                        src={`https://picsum.photos/seed/${i}/400/300`}
                                        alt={t.postImage}
                                        className="w-full rounded-md mb-4"
                                    />
                                    <div className="flex justify-between items-center text-muted-foreground">
                                        <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                                            <Heart className="h-5 w-5" />
                                            <span>{t.like}</span>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                                            <MessageSquare className="h-5 w-5" />
                                            <span>{t.comment}</span>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                                            <Share2 className="h-5 w-5" />
                                            <span>{t.share}</span>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )
        }
    }

    return (
        <div className={`flex flex-col lg:flex-row h-screen bg-background text-foreground ${isDarkMode ? 'dark' : ''}`}>
            <Sidebar
                t={t}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                changeLanguage={(lang: LangKey) => changeLanguage(lang)}
                setCurrentScreen={setCurrentScreen}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    t={t}
                    isDrawerOpen={isDrawerOpen}
                    setIsDrawerOpen={setIsDrawerOpen}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                    currentLanguage={currentLanguage}
                    changeLanguage={(language: string) => changeLanguage(language as LangKey)}
                />
                <MainContent renderScreen={renderScreen} isDrawerOpen={isDrawerOpen} />
                <MobileNavBar t={t} setCurrentScreen={setCurrentScreen} />
            </div>
        </div>
    )
}
