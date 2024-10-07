import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { languages } from '@/lib/languages'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {Heart, MessageSquare, MoreHorizontal, Share2} from "lucide-react";

interface ProfileProps {
    t: typeof languages['en'],
    handlePostClick: (e: any) => void;
}

const Profile: React.FC<ProfileProps> = ({ t, handlePostClick }) => {
    return (<div className="p-4 max-w-2xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-20 h-20">
                    <AvatarImage src="https://i.pravatar.cc/80?img=1" alt={`${t.user} ${t.avatar}`} />
                    <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-2xl font-bold">{t.user} 1</h2>
                    <p className="text-muted-foreground">user1@example.com</p>
                </div>
            </div>
            <p className="mb-4">This is a brief bio about the user. They can write about their interests, hobbies, or any other information they want to share.</p>
            <Tabs defaultValue="posts" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="posts">{t.posts}</TabsTrigger>
                    <TabsTrigger value="replies">{t.yourReplies}</TabsTrigger>
                </TabsList>
                <TabsContent value="posts">
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-card rounded-lg shadow p-4" onClick={() => handlePostClick({
                                id: i,
                                username: `${t.user} 1`,
                                avatarSrc: `https://i.pravatar.cc/40?img=1`,
                                timeAgo: 2 + i,
                                content: t.postContent,
                                imageSrc: `https://picsum.photos/seed/${i + 100}/400/300`,
                                comments: [
                                    { username: `${t.user} ${i + 7}`, avatarSrc: `https://i.pravatar.cc/40?img=${i + 7}`, timeAgo: 1, content: 'Great post!' },
                                    { username: `${t.user} ${i + 8}`, avatarSrc: `https://i.pravatar.cc/40?img=${i + 8}`, timeAgo: 1, content: 'I agree with this.' },
                                ]
                            })}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <Avatar>
                                            <AvatarImage src="https://i.pravatar.cc/40?img=1" alt={`${t.user} ${t.avatar}`} />
                                            <AvatarFallback>U1</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{t.user} 1</p>
                                            <p className="text-xs text-muted-foreground">{2 + i} {t.hoursAgo}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-5 w-5" />
                                        <span className="sr-only">More options</span>
                                    </Button>
                                </div>
                                <p className="mb-4">{t.postContent}</p>
                                <img
                                    src={`https://picsum.photos/seed/${i + 100}/400/300`}
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
                </TabsContent>
                <TabsContent value="replies">
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-muted p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Avatar>
                                        <AvatarImage src="https://i.pravatar.cc/40?img=1" alt={`${t.user} 1 ${t.avatar}`} />
                                        <AvatarFallback>U1</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{t.user} 1</p>
                                        <p className="text-xs text-muted-foreground">{i + 1} {t.hoursAgo}</p>
                                    </div>
                                </div>
                                <p className="mb-2">This is a reply to another user's post. It could be a comment, a question, or any other type of interaction.</p>
                                <div className="bg-background p-2 rounded-md">
                                    <p className="text-sm text-muted-foreground">Replying to @{t.user}{i + 2}</p>
                                    <p className="text-sm">Original post content snippet...</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Profile
