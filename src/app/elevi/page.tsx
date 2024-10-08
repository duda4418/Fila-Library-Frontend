'use client';

import Sidebar from './Sidebar';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { useSession } from 'next-auth/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { useState } from 'react';

interface Student {
    id: string;
    login_id: string;
    first_name: string;
    last_name: string;
    gender: string;
    year: string;
    group: string;
    address: string;
    phone_number: string;
    location: string;
    created_at: string;
}

const Statistics = () => {
    const { data: session, status } = useSession();
    const [students, setStudents] = useState<Student[]>([]);

    const fetchElevi = async () => {
        try {
            const response = await fetch(`${baseUrl}/persons`, {
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setStudents(Object.values(data));
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    fetchElevi();

    return (
        <div className="grid min-h-screen w-full">
            <Sidebar />
            <div className="ml-60 flex-1">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 md:h-[140px] lg:h-[80px] lg:px-6"></header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <h1 className="text-lg font-semibold md:text-2xl">
                        {`Elevi`}
                        <div className="flex items-center justify-between"></div>
                    </h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Prenume</TableHead>
                                <TableHead>Nume</TableHead>
                                <TableHead>Gen</TableHead>
                                <TableHead>Clasa</TableHead>
                                <TableHead>Mediu</TableHead>
                                <TableHead>Telefon</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.first_name}</TableCell>
                                    <TableCell>{student.last_name}</TableCell>
                                    <TableCell>
                                        {student.gender == 'male' ? 'M' : 'F'}
                                    </TableCell>
                                    <TableCell>
                                        {student.year}
                                        {student.group}
                                    </TableCell>
                                    <TableCell>{student.address}</TableCell>
                                    <TableCell>
                                        {student.phone_number}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="w-full h-full overflow-auto"></div>
                </main>
            </div>
        </div>
    );
};
export default Statistics;
