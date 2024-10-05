import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

type MessagesProps = {
    t: any;
}

const Messages = ({ t }:MessagesProps) => (
    <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{t.messages}</h2>
        <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent">
                    <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/40?img=${i + 11}`} alt={`${t.user} ${i + 1} ${t.avatar}`} />
                        <AvatarFallback>U{i + 1}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{t.user} {i + 1}</p>
                        <p className="text-sm text-muted-foreground">Last message preview...</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

export default Messages
