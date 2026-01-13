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

interface BaseProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface TotalPagesProps extends BaseProps {
  mode: "total";
  totalPages: number;
}

interface HasNextProps extends BaseProps {
  mode: "hasNext";
  hasNext: boolean;
}

type Props = TotalPagesProps | HasNextProps;

const Pagination: FC<Props> = (props) => {
  const { currentPage, onPageChange } = props;

  const pages = useMemo(() => {
    if (props.mode !== "total") return [];

    const { totalPages } = props;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pageNumbers: number[] = [1];

    if (currentPage <= 3) {
      pageNumbers.push(2, 3);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(totalPages - 2, totalPages - 1);
    } else {
      pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
    }

    pageNumbers.push(totalPages);

    return Array.from(new Set(pageNumbers)).sort((a, b) => a - b);
  }, [props, currentPage]);

  if (props.mode === "hasNext") {
    const { hasNext } = props;

    return (
      <PaginationRoot>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={cn(
                "text-white bg-primary-green hover:bg-primary-green/80 hover:text-white transition-colors",
                currentPage === 1 && "opacity-50 cursor-not-allowed",
              )}
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={cn(
                "text-white bg-primary-green hover:bg-primary-green/80 hover:text-white transition-colors",
                !hasNext && "opacity-50 cursor-not-allowed",
              )}
              onClick={() => hasNext && onPageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>
    );
  }

  const { totalPages } = props;

  if (totalPages <= 1) return null;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              "text-white bg-primary-green hover:bg-primary-green/80 hover:text-white transition-colors",
              isFirstPage && "opacity-50 cursor-not-allowed",
            )}
            onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {pages.map((page, index) => (
          <div key={page} className="flex items-center">
            {index > 0 && page - pages[index - 1] > 1 && (
              <PaginationEllipsis className="text-white" />
            )}

            <PaginationItem>
              <PaginationLink
                className={cn(
                  "text-white bg-primary-green/50 border-none hover:bg-primary-green/80 hover:text-white transition-colors",
                  currentPage === page && "bg-primary-green cursor-default",
                )}
                onClick={() => currentPage !== page && onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          </div>
        ))}

        <PaginationItem>
          <PaginationNext
            className={cn(
              "text-white bg-primary-green hover:bg-primary-green/80 hover:text-white transition-colors",
              isLastPage && "opacity-50 cursor-not-allowed",
            )}
            onClick={() => !isLastPage && onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};

export default Pagination;
