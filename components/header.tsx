import {Button} from "../@/components/ui/button";
import {Moon, Sun} from "lucide-react";
import React from "react";
import {useTheme} from "next-themes";

export default function Header(){
    const {setTheme, theme} = useTheme()
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md dark:bg-gray-900">
            <div className="flex items-center space-x-2">
                {/*<svg*/}
                {/*    className=" w-6 h-6 text-gray-500 dark:text-gray-400"*/}
                {/*    fill="none"*/}
                {/*    height="24"*/}
                {/*    stroke="currentColor"*/}
                {/*    strokeLinecap="round"*/}
                {/*    strokeLinejoin="round"*/}
                {/*    strokeWidth="2"*/}
                {/*    viewBox="0 0 24 24"*/}
                {/*    width="24"*/}
                {/*    xmlns="http://www.w3.org/2000/svg"*/}
                {/*>*/}
                {/*    <line x1="4" x2="20" y1="12" y2="12"/>*/}
                {/*    <line x1="4" x2="20" y1="6" y2="6"/>*/}
                {/*    <line x1="4" x2="20" y1="18" y2="18"/>*/}
                {/*</svg>*/}
                <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">trelloZ</h1>
                <Button  onClick={() => {
                    setTheme(theme === "system" || theme === "light" ? "dark" : "light");
                }}> {theme === "light" ? <Sun/> : <Moon/>}
                </Button>
            </div>
            <div className="flex items-center space-x-2">
                {/*<Button variant="ghost">Sign In</Button>*/}
                {/*<Button>Sign Up</Button>*/}
            </div>
        </header>
    )
}