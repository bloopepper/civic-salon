"use client"

import { useState, useRef, createContext, useContext, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, MessageCircle, Repeat2, Heart, Bookmark, Share, Image as ImageIcon, Edit2, Check, Moon, Sun, X, Send, Bot, ChevronDown, ChevronUp } from "lucide-react"

const ThemeContext = createContext({ isDark: true, toggleTheme: () => {} })

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(false)
    const toggleTheme = () => setIsDark(!isDark)
    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

type Message = {
    role: 'user' | 'ai'
    content: string
}

export default function EditableSocialMediaPost() {
    const [isEditing, setIsEditing] = useState(false)
    const [postText, setPostText] = useState("Dame Maggie Smith has sadly passed away at the age of 89.")
    const [postImage, setPostImage] = useState<string | null>("https://www.womansworld.com/wp-content/uploads/2024/09/maggie-smith-death.jpg?w=953&quality=86&strip=all")
    const [backgroundText, setBackgroundText] = useState("Dame Maggie Smith, born Margaret Natalie Smith on December 28, 1934, was a renowned British actress celebrated for her extensive career spanning over seven decades in theatre, film, and television. She was widely recognized for her sharp wit, versatility, and commanding presence on both stage and screen. Smith's illustrious career began in the 1950s and continued well into the 21st century, earning her numerous accolades including two Academy Awards, five BAFTAs, and four Emmys. She gained widespread recognition for her roles in films such as 'The Prime of Miss Jean Brodie' and more recently as Professor Minerva McGonagall in the Harry Potter series. Her passing marks the end of an era in British acting, leaving behind a legacy that has inspired generations of performers and entertained audiences worldwide.")
    const [civicThoughtsText, setCivicThoughtsText] = useState("The death of Maggie Smith, a legendary actress known for her roles in Harry Potter and The Prime of Miss Jean Brodie, represents a significant loss to the world of entertainment and culture. Her passing prompts reflection on the impact of art and performance on society, the evolution of British theatre and cinema, and the role of iconic figures in shaping public discourse and imagination. Smith's career spanned periods of significant social and cultural change, and her performances often reflected and commented on these shifts. Her loss invites us to consider the importance of preserving and celebrating cultural heritage, the value of mentorship in the arts (as Smith was known for nurturing young talent), and the power of storytelling in fostering empathy and understanding across generations and cultures. It also raises questions about the future of classical acting traditions in an era of rapidly changing media landscapes and audience preferences.")
    const [expandedSection, setExpandedSection] = useState<'background' | 'civic' | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState("")
    const [isBackgroundExpanded, setIsBackgroundExpanded] = useState(false)
    const [isCivicThoughtsExpanded, setIsCivicThoughtsExpanded] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const chatScrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (expandedSection) {
            const initialMessage: Message = {
                role: 'ai',
                content: expandedSection === 'background'
                    ? "Hello! I'm here to provide information about Dame Maggie Smith's background. What would you like to know?"
                    : "Hello! I'm here to discuss the civic implications of Dame Maggie Smith's passing. What aspects would you like to explore?"
            }
            setMessages([initialMessage])
        }
    }, [expandedSection])

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostText(e.target.value)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPostImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const toggleEditing = () => {
        setIsEditing(!isEditing)
    }

    const toggleExpandedSection = (section: 'background' | 'civic') => {
        setExpandedSection(expandedSection === section ? null : section)
        setMessages([])
    }

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            const newMessages: Message[] = [
                ...messages,
                { role: 'user', content: inputMessage },
                { role: 'ai', content: `Here's some information about ${expandedSection === 'background' ? 'the background' : 'civic thoughts'} of Dame Maggie Smith: ${expandedSection === 'background' ? backgroundText : civicThoughtsText}` }
            ]
            setMessages(newMessages)
            setInputMessage("")
            setTimeout(() => {
                if (chatScrollRef.current) {
                    chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
                }
            }, 100)
        }
    }

    const toggleBackgroundExpansion = () => {
        setIsBackgroundExpanded(!isBackgroundExpanded)
    }

    const toggleCivicThoughtsExpansion = () => {
        setIsCivicThoughtsExpanded(!isCivicThoughtsExpanded)
    }

    return (
        <ThemeProvider>
            <ThemeToggle />
            <ThemeContext.Consumer>
                {({ isDark }) => (
                    <div className={`flex justify-center items-start min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} p-4`}>
                        <Card className={`w-full max-w-md ${isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
                            <CardHeader className="flex flex-row items-center gap-2 p-4">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <ArrowLeft className="h-4 w-4" />
                                    <span className="sr-only">Back</span>
                                </Button>
                                <h1 className="text-lg font-semibold">Post</h1>
                                <Button variant="ghost" size="icon" className="rounded-full ml-auto" onClick={toggleEditing}>
                                    {isEditing ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                                    <span className="sr-only">{isEditing ? "Save" : "Edit"}</span>
                                </Button>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@DiscussingFilm" />
                                        <AvatarFallback>DF</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">DiscussingFilm</p>
                                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>@DiscussingFilm</p>
                                    </div>
                                </div>
                                {isEditing ? (
                                    <Textarea
                                        value={postText}
                                        onChange={handleTextChange}
                                        className={`w-full min-h-[100px] resize-none ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
                                    />
                                ) : (
                                    <p>{postText}</p>
                                )}
                                {postImage && (
                                    <div className="relative">
                                        <img src={postImage} alt="Post content" className="w-full rounded-lg" />
                                        {isEditing && (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={() => setPostImage(null)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                )}
                                {isEditing && (
                                    <div>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                            onClick={handleImageClick}
                                        >
                                            <ImageIcon className="mr-2 h-4 w-4" />
                                            Upload Image
                                        </Button>
                                    </div>
                                )}
                                <div className={`${isDark ? 'bg-blue-900' : 'bg-blue-100'} p-3 rounded-lg text-sm relative`}>
                                    <h3 className="font-semibold mb-1">Background:</h3>
                                    <p>
                                        {isBackgroundExpanded
                                            ? backgroundText
                                            : `${backgroundText.slice(0, 100)}...`}
                                        <Button
                                            variant="link"
                                            className="px-1 h-auto"
                                            onClick={toggleBackgroundExpansion}
                                        >
                                            {isBackgroundExpanded ? (
                                                <>
                                                    Less <ChevronUp className="h-3 w-3 inline" />
                                                </>
                                            ) : (
                                                <>
                                                    More <ChevronDown className="h-3 w-3 inline" />
                                                </>
                                            )}
                                        </Button>
                                    </p>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={() => toggleExpandedSection('background')}
                                    >
                                        <Bot className="h-4 w-4" />
                                        <span className="sr-only">Open AI Chat for Background</span>
                                    </Button>
                                </div>
                                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>9:19 PM · Sep 27, 2024 · 3.5M Views</div>
                                <div className={`flex justify-between ${isDark ? 'text-gray-400 border-gray-800' : 'text-gray-600 border-gray-200'} border-y py-2`}>
                                    <span>2.5K</span>
                                    <span>39K</span>
                                    <span>145K</span>
                                    <span>3.6K</span>
                                </div>
                                <div className={`${isDark ? 'bg-blue-900' : 'bg-blue-100'} p-3 rounded-lg text-sm relative`}>
                                    <h3 className="font-semibold mb-1">Civic thoughts:</h3>
                                    <p>
                                        {isCivicThoughtsExpanded
                                            ? civicThoughtsText
                                            : `${civicThoughtsText.slice(0, 100)}...`}
                                        <Button
                                            variant="link"
                                            className="px-1 h-auto"
                                            onClick={toggleCivicThoughtsExpansion}
                                        >
                                            {isCivicThoughtsExpanded ? (
                                                <>
                                                    Less <ChevronUp className="h-3 w-3 inline" />
                                                </>
                                            ) : (
                                                <>
                                                    More <ChevronDown className="h-3 w-3 inline" />
                                                </>
                                            )}
                                        </Button>
                                    </p>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={() => toggleExpandedSection('civic')}
                                    >
                                        <Bot className="h-4 w-4" />
                                        <span className="sr-only">Open AI Chat for Civic Thoughts</span>
                                    </Button>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between p-4">
                                <Button variant="ghost" size="icon">
                                    <MessageCircle className="h-5 w-5" />
                                    <span className="sr-only">Comment</span>
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Repeat2 className="h-5 w-5" />
                                    <span className="sr-only">Retweet</span>
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Heart className="h-5 w-5" />
                                    <span className="sr-only">Like</span>
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Bookmark className="h-5 w-5" />
                                    <span className="sr-only">Bookmark</span>
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Share className="h-5 w-5" />
                                    <span className="sr-only">Share</span>
                                </Button>
                            </CardFooter>
                        </Card>
                        {expandedSection && (
                            <Card className={`w-full max-w-md ml-4 ${isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} fixed top-4 right-4 bottom-4 flex flex-col`}>
                                <CardHeader className="flex flex-row items-center justify-between p-4">
                                    <h2 className="text-lg font-semibold">
                                        {expandedSection === 'background' ? 'Background' : 'Civic Thoughts'} Chat
                                    </h2>
                                    <Button variant="ghost"size="icon" onClick={() => setExpandedSection(null)}>
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Close</span>
                                    </Button>
                                </CardHeader>
                                <CardContent className="flex-grow overflow-hidden">
                                    <ScrollArea className="h-full pr-4" ref={chatScrollRef}>
                                        {messages.map((message, index) => (
                                            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                                                <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? (isDark ? 'bg-blue-600' : 'bg-blue-200') : (isDark ? 'bg-gray-800' : 'bg-gray-200')}`}>
                                                    {message.content}
                                                </div>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                </CardContent>
                                <CardFooter className="p-4">
                                    <div className="flex w-full items-center space-x-2">
                                        <Input
                                            type="text"
                                            placeholder="Ask about the background or civic thoughts..."
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            className={isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}
                                        />
                                        <Button type="submit" size="icon" onClick={handleSendMessage}>
                                            <Send className="h-4 w-4" />
                                            <span className="sr-only">Send</span>
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        )}
                    </div>
                )}
            </ThemeContext.Consumer>
        </ThemeProvider>
    )
}

function ThemeToggle() {
    const { isDark, toggleTheme } = useContext(ThemeContext)
    return (
        <div className="fixed top-4 left-4 flex items-center space-x-2 z-10">
            <Sun className="h-4 w-4" />
            <Switch checked={isDark} onCheckedChange={toggleTheme} />
            <Moon className="h-4 w-4" />
        </div>
    )
}
