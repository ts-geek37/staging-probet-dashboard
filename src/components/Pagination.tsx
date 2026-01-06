"use client";

import { FC, useMemo } from "react";

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationRoot,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pageNumbers: number[] = [];

    pageNumbers.push(1);
    if (currentPage <= 3) {
      pageNumbers.push(2, 3);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(totalPages - 2, totalPages - 1);
    } else {
      pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
    }
    pageNumbers.push(totalPages);

    return Array.from(new Set(pageNumbers)).sort((a, b) => a - b);
  }, [currentPage, totalPages]);
  if (totalPages <= 1) return null;

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="text-white bg-primary-green hover:bg-primary-green/80 hover:text-white transition-colors cursor-pointer"
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {pages.map((page, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && page - pages[index - 1] > 1 && (
              <PaginationEllipsis className="text-white" />
            )}
            <PaginationItem key={page}>
              <PaginationLink
                className={cn(
                  "text-white bg-primary-green/50 border-none hover:bg-primary-green/80 hover:text-white transition-colors cursor-pointer",
                  currentPage === page && "bg-primary-green cursor-default",
                )}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          </div>
        ))}

        <PaginationItem>
          <PaginationNext
            className="text-white bg-primary-green hover:bg-primary-green/80 hover:text-white transition-colors cursor-pointer"
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};

export default Pagination;
