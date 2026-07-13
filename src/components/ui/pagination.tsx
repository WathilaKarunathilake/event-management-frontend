import { Button } from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex justify-center mt-8 gap-2">
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        variant="outline"
        className="cursor-pointer"
      >
        Previous
      </Button>

      {[...Array(totalPages)].map((_, i) => (
        <Button
          key={i}
          variant={currentPage === i + 1 ? "default" : "outline"}
          onClick={() => onPageChange(i + 1)}
          className="cursor-pointer"
        >
          {i + 1}
        </Button>
      ))}

      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        variant="outline"
        className="cursor-pointer"
      >
        Next
      </Button>
    </div>
  );
};
