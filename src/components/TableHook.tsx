import { Table, 
    TableHeader, 
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue 
} from '@heroui/react';
import React, { JSX } from 'react'

type Props = {
    columns: {
        name: string;
        uid: string;
    }[];
    items: {
        _id: string;
        amount: number;
        discount: number;
        quantity: number;
        status: React.JSX.Element;
        action: React.JSX.Element;
    }[] | {
        _id: string;
        amount: number;
        quantity: number;
        discount: number;
        status: string;
    }[] | {
        _id: string;
        avatar: React.JSX.Element;
        name: string;
        email: string;
        gender: string;
        role: string;
        action: React.JSX.Element;
    }[] | {
        _id: string;
        photo: JSX.Element;
        name: string;
        price: number;
        stock: number;
        action: JSX.Element;
    }[]
}

const TableHook = ({ columns, items }: Props) => {
    return (
        <Table>
            <TableHeader style={{
            backgroundColor: 'greenyellow'
        }} columns={columns}>
                {(column) => <TableColumn align='center' key={column.uid} >{column.name}</TableColumn>}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item._id}>
                        {(columnKey) => (
                            <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default TableHook;