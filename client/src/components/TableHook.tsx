import { columnsType, ItemsType } from '@/types/types';
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
    columns: columnsType[];
    items: ItemsType[]
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