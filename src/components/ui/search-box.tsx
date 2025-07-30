import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption =
  | "all"
  | "upc-only"
  | "exp-only"
  | "date-asc"
  | "date-desc"
  | "name-asc"
  | "name-desc";

interface Props {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function SearchBox({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
}: Props) {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm rounded-lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Find Your Perfect Event
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <Label htmlFor="searchInput" className="mb-2">
              Search Events
            </Label>
            <div className="relative">
              <Input
                id="searchInput"
                type="text"
                placeholder="Search by title, description, location..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 pr-1"
                  onClick={() => onSearchChange("")}
                  aria-label="Clear search"
                >
                  <svg
                    className="h-5 w-5 text-gray-400 hover:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              )}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div>
            <Label htmlFor="sortSelect" className="mb-2">
              Sort By
            </Label>
            <Select
              value={sortBy}
              onValueChange={(value) => onSortChange(value as SortOption)}
            >
              <SelectTrigger id="sortSelect" className="w-full cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="cursor-pointer">
                <SelectGroup>
                  <SelectItem className="cursor-pointer" value="all">
                    All Events
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="upc-only">
                    Upcomming Only
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="exp-only">
                    Expired Only
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="date-asc">
                    Date (Oldest First)
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="date-desc">
                    Date (Newest First)
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="name-asc">
                    Name (A-Z)
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="name-desc">
                    Name (Z-A)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
