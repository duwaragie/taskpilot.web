interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterStatus: 'all' | 'pending' | 'completed';
  onFilterChange: (status: 'all' | 'pending' | 'completed') => void;
  taskCounts: {
    total: number;
    pending: number;
    completed: number;
  };
}

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  taskCounts
}: SearchFilterProps) => {
  const filterButtons = [
    { key: 'all' as const, label: 'All', count: taskCounts.total },
    { key: 'pending' as const, label: 'Pending', count: taskCounts.pending },
    { key: 'completed' as const, label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {filterButtons.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              filterStatus === key
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {(searchTerm || filterStatus !== 'all') && (
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            {searchTerm && `Searching for "${searchTerm}"`}
            {searchTerm && filterStatus !== 'all' && ' • '}
            {filterStatus !== 'all' && `Showing ${filterStatus} tasks`}
          </span>
          <button
            onClick={() => {
              onSearchChange('');
              onFilterChange('all');
            }}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
