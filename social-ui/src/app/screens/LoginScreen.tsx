import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Key } from 'lucide-react';
import {useAuth} from "@/app/context/AuthContext";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";

type LoginScreenProps = {
    t: any;
    onLogin: (type: string, key?: string) => void;
    isDarkMode: boolean;
    currentLanguage: string;
    changeLanguage: (language: string) => void;
}

const LoginScreen = ({ t, onLogin, isDarkMode, currentLanguage,changeLanguage }:LoginScreenProps) => {
    const [key, setKey] = useState('');
    const { login } = useAuth();

    const flagEmoji = (countryCode) => {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    }
    return (
        <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <Card className={`w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl font-bold">{t.welcomeBack}</CardTitle>
                        <Select onValueChange={changeLanguage} defaultValue={currentLanguage}>
                            <SelectTrigger className="w-[60px]">
                                <SelectValue placeholder={flagEmoji(currentLanguage)} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">{flagEmoji('us')} EN</SelectItem>
                                <SelectItem value="zh">{flagEmoji('cn')} 繁體中文</SelectItem>
                                <SelectItem value="ja">{flagEmoji('jp')} 日本語</SelectItem>
                                <SelectItem value="hi">{flagEmoji('in')} हिंदी</SelectItem>
                                <SelectItem value="th">{flagEmoji('th')} ไทย</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder={t.enterKey}
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className={isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}
                        />
                    </div>
                    <Button className="w-full" onClick={() => login(key)}>
                        <Key className="w-4 h-4 mr-2" />
                        {t.loginWithKey}
                    </Button>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                                Or
                            </span>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => onLogin('guest')}>
                        {t.continueAsGuest}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginScreen;
