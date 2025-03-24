import { columnsType, ItemsType } from '@/types/types';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Spinner
} from '@heroui/react';

import { useAsyncList } from '@react-stately/data';
import { useEffect, useMemo, useState } from 'react';

type Props = {
    columns: columnsType[];
    items: ItemsType[]
}

const TableHook = ({ columns, items }: Props) => {

    const [isLoading, setIsLoading] = useState(true);

    let list = useAsyncList({
        async load() {
            setIsLoading(false);
            return { items };
        },
        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a, b) => {
                    let first = a[sortDescriptor.column as keyof ItemsType];
                    let second = b[sortDescriptor.column as keyof ItemsType];
                    let cmp = (first) < (second) ? -1 : 1;

                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }

                    return cmp;
                }),
            };
        },
    });

    const classNames = useMemo(
        () => ({
            wrapper: ["bg-orange-100/50", "dark:bg-gray-700/50"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]/tr:first:before:rounded-none",
                "group-data-[first=true]/tr:last:before:rounded-none",
                // middle
                "group-data-[middle=true]/tr:before:rounded-none",
                // last
                "group-data-[last=true]/tr:first:before:rounded-none",
                "group-data-[last=true]/tr:last:before:rounded-none",
            ],
        }),
        [],
    );

    useEffect(() => {
        list.reload();
    }, [items]);

    return (
        <Table
            onSortChange={list.sort}
            classNames={classNames}
            sortDescriptor={list.sortDescriptor}
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn align='center' key={column.uid} allowsSorting>{column.name}</TableColumn>}
            </TableHeader>
            <TableBody
                isLoading={isLoading}
                items={list.items}
                loadingContent={<Spinner label="Loading..." />}
            >
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