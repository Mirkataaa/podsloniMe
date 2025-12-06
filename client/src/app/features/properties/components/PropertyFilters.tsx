interface FilterState {
  settlement: string;
  transactionType: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
}

interface PropertyFiltersProps {
  filters: FilterState;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export function PropertyFilters({ filters, onChange }: PropertyFiltersProps) {
  const inputStyles = `
    w-full bg-white text-sm text-slate-700
    border border-slate-200 rounded-lg px-3 py-2.5
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-shadow cursor-pointer
    placeholder:text-slate-400
  `;

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* location */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 ml-1">
            Локация
          </label>
          <input
            type="text"
            name="settlement"
            placeholder="Напр. София"
            value={filters.settlement}
            onChange={onChange}
            className={inputStyles}
          />
        </div>

        {/* 2. transaction type */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 ml-1">
            Сделка
          </label>
          <select
            name="transactionType"
            value={filters.transactionType}
            onChange={onChange}
            className={inputStyles}
          >
            <option value="">Всички</option>
            <option value="sale">Продажба</option>
            <option value="rent">Наем</option>
          </select>
        </div>

        {/* 3. property type */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 ml-1">
            Вид имот
          </label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={onChange}
            className={inputStyles}
          >
            <option value="">Всички видове</option>
            <option value="apartment">Апартамент</option>
            <option value="house">Къща</option>
            <option value="office">Офис</option>
            <option value="land">Земя</option>
            <option value="garage">Гараж</option>
          </select>
        </div>

        {/* 4. price from */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 ml-1">
            Цена от
          </label>
          <input
            type="number"
            name="minPrice"
            placeholder="€ Min"
            value={filters.minPrice || ''}
            onChange={onChange}
            className={inputStyles}
          />
        </div>

        {/* 5. preice to */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 ml-1">
            Цена до
          </label>
          <input
            type="number"
            name="maxPrice"
            placeholder="€ Max"
            value={filters.maxPrice || ''}
            onChange={onChange}
            className={inputStyles}
          />
        </div>
      </div>
    </div>
  );
}
