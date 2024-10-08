'use client';

import { Library, Book, FileLineChart, Users } from 'lucide-react';
import Profile from '../../elevi/Profile';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import {
    CheckboxKeys,
    displayNames,
    useCheckboxContext
} from '../../context/BookProvider';

interface StateProps {
    title: boolean;
    author: boolean;
    category: boolean;
    year: boolean;
    place: boolean;
    inventory: boolean;
    borrow: boolean;
}

const Sidebar = () => {
    const { state, toggleCheckbox } = useCheckboxContext();
    return (
        <div className="fixed top-0 left-0 h-full w-60 border-r bg-muted/40 flex flex-col">
            <div className="flex flex-col gap-2 flex-1">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold"
                    >
                        <Library className="h-6 w-6" />
                        <span>Filadelfia</span>
                    </Link>
                    <Profile />
                </div>
                <div className="flex-1 overflow-y-auto h-full flex flex-col justify-between">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <Link
                            href="/carti?page=1"
                            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                        >
                            <Book className="h-4 w-4" />
                            Carti
                        </Link>
                        <Link
                            href="/statistics"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <FileLineChart className="h-4 w-4" />
                            Statistice
                        </Link>
                        <Link
                            href="/elevi"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Users className="h-4 w-4" />
                            Elevi
                        </Link>
                    </nav>
                    <div className="px-4 pb-8">
                        {Object.keys(state).map((key) => (
                            <div
                                key={key}
                                className="items-top flex space-x-2 py-2"
                            >
                                <Checkbox
                                    id={key}
                                    checked={state[key as CheckboxKeys]}
                                    onCheckedChange={() =>
                                        toggleCheckbox(key as CheckboxKeys)
                                    }
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor={key}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {displayNames[key as CheckboxKeys]}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
