import React from "react";
import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Td,
    Tbody,
    Th,
} from "@chakra-ui/react";
import { DataTableProps } from "./types";

export function DataTable({ columnDefs, data }: DataTableProps): JSX.Element {
    return (
        <TableContainer data-testid="data-table">
            <Table>
                <Thead>
                    <Tr data-testid="data-col">
                        {columnDefs.map((item, idx) => (
                            <Th key={idx}>{item.column}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody data-testid="data-row">
                    {data.map((d, row) => (
                        <Tr key={row}>
                            {columnDefs.map((item, idx) => (
                                <Td key={idx}>
                                    <>
                                        {item.customColumn
                                            ? item.customColumn(
                                                  d[
                                                      item.target as keyof typeof d
                                                  ],
                                                  d,
                                              )
                                            : Array.isArray(
                                                  d[
                                                      item.target as keyof typeof d
                                                  ],
                                              )
                                            ? JSON.stringify(
                                                  d[
                                                      item.target as keyof typeof d
                                                  ],
                                              )
                                            : d[item.target as keyof typeof d]}
                                    </>
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
