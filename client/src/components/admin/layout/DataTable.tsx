import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { type IconType } from "react-icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";


export type RowAction<T> = {
  label: string;
  icon?: LucideIcon | IconType;
  onClick: (row: T) => void;
  colorClass?: string;
};

export type Column<T> = {
  key: keyof T;
  header: React.ReactNode;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: RowAction<T>[];
  pagination?: PaginationProps;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  actions,
  pagination,
}: DataTableProps<T>) {
  return (
    <div className="w-full max-w-full border rounded-xl bg-white">
      {/* SCROLL MUST BE HERE */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableHeader >
            <TableRow className="">
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className={cn("whitespace-nowrap", col.className)}
                >
                  {col.header}
                </TableHead>
              ))}
              {actions && (
                <TableHead className="text-right whitespace-nowrap">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-6 text-muted-foreground"
                >
                  No data found
                </TableCell>
              </TableRow>
            )}

            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((col) => (
                  <TableCell
                    key={String(col.key)}
                    className={cn("whitespace-nowrap", col.className)}
                  >
                    {col.render
                      ? col.render(row)
                      : String(row[col.key])}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell className="text-right whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        {actions.map((action, idx) => {
                          const Icon = action.icon;
                          return (
                            <DropdownMenuItem
                              key={idx}
                              onClick={() => action.onClick(row)}
                              className={cn(action.colorClass)}
                            >
                              {Icon && <Icon className="mr-2 h-4 w-4" />}
                              {action.label}
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {pagination && (
          <div className="flex flex-col gap-2 px-4 py-3 border-t sm:flex-row sm:items-center sm:justify-between">
            
            {/* LEFT SIDE */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>
                Showing{" "}
                <span className="font-medium">
                  {(pagination.page - 1) * pagination.pageSize + 1}
                </span>
                –
                <span className="font-medium">
                  {Math.min(
                    pagination.page * pagination.pageSize,
                    pagination.total
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {pagination.total}
                </span>
              </span>

              {/* PAGE SIZE SELECT */}
              {pagination.onPageSizeChange && (
                <select
                  value={pagination.pageSize}
                  onChange={(e) =>
                    pagination.onPageSizeChange?.(Number(e.target.value))
                  }
                  className="border rounded-md px-2 py-1 text-sm bg-background"
                >
                  {(pagination.pageSizeOptions ?? [5, 10, 25, 50]).map(
                    (size) => (
                      <option key={size} value={size}>
                        {size} / page
                      </option>
                    )
                  )}
                </select>
              )}
            </div>

            {/* RIGHT BUTTONS (same as before) */}
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                disabled={pagination.page === 1}
                onClick={() =>
                  pagination.onPageChange(pagination.page - 1)
                }
              >
                ‹
              </Button>

              {Array.from(
                { length: Math.ceil(pagination.total / pagination.pageSize) },
                (_, i) => i + 1
              )
                .slice(
                  Math.max(0, pagination.page - 2),
                  pagination.page + 1
                )
                .map((p) => (
                  <Button
                    key={p}
                    size="icon"
                    variant={p === pagination.page ? "default" : "outline"}
                    onClick={() => pagination.onPageChange(p)}
                  >
                    {p}
                  </Button>
                ))}

              <Button
                variant="outline"
                size="icon"
                disabled={
                  pagination.page ===
                  Math.ceil(pagination.total / pagination.pageSize)
                }
                onClick={() =>
                  pagination.onPageChange(pagination.page + 1)
                }
              >
                ›
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

