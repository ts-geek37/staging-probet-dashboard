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

    const pageSet = new Set<number>();

    pageSet.add(1);
    pageSet.add(totalPages - 1);
    pageSet.add(totalPages);

    pageSet.add(currentPage);
    if (currentPage > 1) {
      pageSet.add(currentPage - 1);
    }
    if (currentPage < totalPages) {
      pageSet.add(currentPage + 1);
    }

    return Array.from(pageSet).sort((a, b) => a - b);
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
          <>
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
          </>
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
