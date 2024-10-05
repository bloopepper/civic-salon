// src/screens/PostDetail.tsx
import React from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
    ArrowLeft,
    Bot,
    ChevronDown,
    ChevronUp,
    Heart,
    Loader2,
    MessageSquare,
    MoreHorizontal, Send,
    Share2, X
} from 'lucide-react'
import {ScrollArea} from "@/components/ui/scroll-area";

type PostDetailProps = {
    t: any;
    selectedPost: {
        avatarSrc: string;
        username: string;
        timeAgo: string;
        content: string;
        imageSrc: string;
        comments: Array<{
            avatarSrc: string;
            username: string;
            timeAgo: string;
            content: string;
        }>;
    };
    setCurrentScreen: (screen: string) => void;
    isLoading: boolean;
    handleAIButtonClick: () => void;
    showBackgroundSection: boolean;
    handleChatAIButtonClick: (section: string) => void;
    showFullBackground: boolean;
    setShowFullBackground: (show: boolean) => void;
    showCivicThoughtsSection: boolean;
    setShowFullCivicThoughts: (show: boolean) => void;
    showFullCivicThoughts: boolean;
    isChatOpen: boolean;
    activeChatSection: string;
    setIsChatOpen: (open: boolean) => void;
    chatMessages: Array<{ type: string; content: string }>;
    handleChatSubmit: (e: React.FormEvent) => void;
    chatInput: string;
    setChatInput: (input: string) => void;
}

const PostDetail = ({ t, selectedPost, setCurrentScreen, isLoading, handleAIButtonClick, showBackgroundSection, handleChatAIButtonClick, showFullBackground, setShowFullBackground, showCivicThoughtsSection, setShowFullCivicThoughts, showFullCivicThoughts, isChatOpen, activeChatSection, setIsChatOpen, chatMessages, handleChatSubmit, chatInput, setChatInput }: PostDetailProps) => (
    <div className="p-4 max-w-2xl mx-auto relative">
        <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" onClick={() => setCurrentScreen('home')} className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.back}
            </Button>
            <Button
                variant="outline"
                className="bg-blue-900 text-white hover:bg-blue-800"
                onClick={handleAIButtonClick}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                    <Bot className="h-4 w-4 mr-2" />
                )}
                {isLoading ? t.loading : t.aiButton}
            </Button>
        </div>
        <div className="bg-card rounded-lg shadow p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src={selectedPost.avatarSrc} alt={`${selectedPost.username} ${t.avatar}`} />
                        <AvatarFallback>{selectedPost.username[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{selectedPost.username}</p>
                        <p className="text-xs text-muted-foreground">{selectedPost.timeAgo} {t.hoursAgo}</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                    <span className="sr-only">More options</span>
                </Button>
            </div>
            <p className="mb-4">{selectedPost.content}</p>
            <img
                src={selectedPost.imageSrc}
                alt={t.postImage}
                className="w-full rounded-md mb-4"
            />
            {isLoading ? (
                <div className="bg-blue-100 p-4 rounded-md mb-4 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>{t.loading}</span>
                </div>
            ) : showBackgroundSection && (
                <div className="bg-blue-100 p-4 rounded-md mb-4 transition-opacity duration-500 ease-in-out opacity-100 relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => handleChatAIButtonClick('background')}
                    >
                        <Bot className="h-4 w-4" />
                        <span className="sr-only">{t.discussBackground}</span>
                    </Button>
                    <h4 className="font-bold mb-2">{t.background}</h4>
                    <p>
                        {showFullBackground
                            ? "Dame Maggie Smith, born Margaret Natalie Smith on December 28, 1934, was a renowned British actress celebrated for her extensive career spanning over seven decades in theatre, film, and television. She was widely recognized for her sharp wit, versatility, and commanding presence on both stage and screen. Smith's illustrious career began in the 1950s and continued well into the 21st century, earning her numerous accolades including two Academy Awards, five BAFTAs, and four Emmys. She gained widespread recognition for her roles in films such as 'The Prime of Miss Jean Brodie' and more recently as Professor Minerva McGonagall in the Harry Potter series. Her passing marks the end of an era in British acting, leaving behind a legacy that has inspired generations of performers and entertained audiences worldwide."
                            : "Dame Maggie Smith, born Margaret Natalie Smith on December 28, 1934, was a renowned British actress celebrated for her extensive career spanning over seven decades in theatre, film, and television. She was widely recognized for her sharp wit, versatility, and commanding presence on both stage and screen..."}
                    </p>
                    <Button
                        variant="link"
                        onClick={() => setShowFullBackground(!showFullBackground)}
                        className="mt-2 p-0 h-auto font-semibold"
                    >
                        {showFullBackground ? t.less : t.more}
                        {showFullBackground ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                    </Button>

                </div>
            )}
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
        <h3 className="font-bold text-lg mb-2">{t.replies}</h3>
        {isLoading ? (
            <div className="bg-green-100 p-4 rounded-md mb-4 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>{t.loading}</span>
            </div>
        ) : showCivicThoughtsSection && (
            <div className="bg-green-100 p-4 rounded-md mb-4 transition-opacity duration-500 ease-in-out opacity-100 relative">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleChatAIButtonClick('civicThoughts')}
                >
                    {/*<MessageSquare className="h-4 w-4 mr-2" />*/}
                    <Bot className="h-4 w-4" />
                    <span className="sr-only">{t.discussCivicThoughts}</span>
                </Button>
                <h4 className="font-bold mb-2">{t.civicThoughts}</h4>
                <p>
                    {showFullCivicThoughts
                        ? "The death of Maggie Smith, a legendary actress known for her roles in Harry Potter and The Prime of Miss Jean Brodie, represents a significant loss to the world of entertainment and culture. Her passing prompts reflection on the impact of art and performance on society, the evolution of British theatre and cinema, and the role of iconic figures in shaping public discourse and imagination. Smith's career spanned periods of significant social and cultural change, an her performances often reflected and commented on these shifts. Her loss invites us to consider the importance of preserving and celebrating cultural heritage, the value of mentorship in the arts (as Smith was known for nurturing young talent), and the power of storytelling in fostering empathy and understanding across generations and cultures. It also raises questions about the future of classical acting traditions in an era of rapidly changing media landscapes and audience preferences."
                        : "The death of Maggie Smith, a legendary actress known for her roles in Harry Potter and The Prime of Miss Jean Brodie, represents a significant loss to the world of entertainment and culture. Her passing prompts reflection on the impact of art and performance on society, the evolution of British theatre and cinema, and the role of iconic figures in shaping public discourse and imagination..."}
                </p>
                <Button
                    variant="link"
                    onClick={() => setShowFullCivicThoughts(!showFullCivicThoughts)}
                    className="mt-2 p-0 h-auto font-semibold"
                >
                    {showFullCivicThoughts ? t.less : t.more}
                    {showFullCivicThoughts ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                </Button>
            </div>
        )}
        <div className="space-y-4 mb-4">
            {selectedPost.comments.map((comment, index) => (
                <div key={index} className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                        <Avatar>
                            <AvatarImage src={comment.avatarSrc} alt={`${comment.username} ${t.avatar}`} />
                            <AvatarFallback>{comment.username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{comment.username}</p>
                            <p className="text-xs text-muted-foreground">{comment.timeAgo} {t.hoursAgo}</p>
                        </div>
                    </div>
                    <p>{comment.content}</p>
                </div>
            ))}
        </div>
        <div className="flex items-center space-x-2">
            <Avatar>`
                <AvatarImage src="https://i.pravatar.cc/40?img=1" alt={`${t.user} ${t.avatar}`} />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Input placeholder={t.addComment} />
            <Button size="sm">{t.submit}</Button>
        </div>
        {isChatOpen && (
            <div
                className="fixed bottom-16 right-4 w-80 bg-background border border-border shadow-lg rounded-lg overflow-hidden flex flex-col"
                style={{height: 'calc(100% - 12rem)'}}>
                <div className="flex justify-between items-center p-4 border-b border-border">
                    <h3 className="text-lg font-semibold">{t.chatAI}: {activeChatSection === 'background' ? t.background : t.civicThoughts}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(false)}>
                        <X className="h-4 w-4"/>
                    </Button>
                </div>
                <ScrollArea className="flex-grow p-4">
                    <div className="space-y-4">
                        {chatMessages.map((message, index) => (
                            <div key={index}
                                 className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[80%] p-2 rounded-lg ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <form onSubmit={handleChatSubmit} className="p-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                        <Input
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder={t.chatPlaceholder}
                            className="flex-grow"
                        />
                        <Button type="submit" size="sm">
                            <Send className="h-4 w-4"/>
                            <span className="sr-only">{t.send}</span>
                        </Button>
                    </div>
                </form>
            </div>
        )}
    </div>
)


export default PostDetail
