import { LucideIcon, Heart, Sparkles, X, Check, Link, Share } from 'lucide-react';

export interface ThemeColorSet {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
}

export interface ThemeConfig {
    name: string;
    colors: {
        background: string; // Full class string for background gradient
        accent: {
            primary: string;   // e.g. "text-rose-600"
            secondary: string; // e.g. "text-pink-600"
        };
        input: {
            primary: {
                text: string;
                border: string;
                focus: string;
                placeholder: string;
                underline: string;
            };
            secondary: {
                text: string;
                border: string;
                focus: string;
                placeholder: string;
                underline: string;
            }
        };
        button: {
            gradient_from: string; // Hex code for inline style or CSS var
            gradient_to: string;   // Hex code
            shadow: string;       // Tailwind class
        }
    };
    icons: {
        MainIcon: LucideIcon;
        AcceptIcon: LucideIcon;
        RejectIcon: LucideIcon;
    }
}

export const defaultTheme: ThemeConfig = {
    name: 'Rose Romance',
    colors: {
        background: "bg-gradient-to-br from-rose-50 via-white to-pink-50",
        accent: {
            primary: "text-rose-600",
            secondary: "text-pink-600",
        },
        input: {
            primary: {
                text: "text-rose-600",
                border: "border-rose-200",
                focus: "focus:border-rose-500",
                placeholder: "placeholder:text-rose-200",
                underline: "bg-rose-500",
            },
            secondary: {
                text: "text-pink-600",
                border: "border-pink-200",
                focus: "focus:border-pink-500",
                placeholder: "placeholder:text-pink-200",
                underline: "bg-pink-500",
            }
        },
        button: {
            gradient_from: "#ec4899", // pink-500
            gradient_to: "#f43f5e",   // rose-500
            shadow: "shadow-pink-200/50 hover:shadow-pink-300/50",
        }
    },
    icons: {
        MainIcon: Sparkles,
        AcceptIcon: Heart,
        RejectIcon: X,
    }
};
