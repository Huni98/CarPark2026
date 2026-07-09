import type { Car } from "../../models/car";
import './SortingPanel.css'
import SortIcon from '../../assets/sort.svg?react'
import { useFilters } from "../../hooks/useFilters";

const SORT_FIELDS: { value: keyof Car | "", label: string }[] = [
    { value: "manufacturer", label: "Manufacturer" },
    { value: "model", label: "Model" },
    { value: "constructionYear", label: "Construction Year" },
    { value: "mileage", label: "Mileage" },
    { value: "price", label: "Price" },
    { value: "power", label: "Power" },
]

const PAGE_SIZES = [5, 10, 20, 50]

export function SortingPanel() {

    const { sort, setSort, order, setOrder, limit, setLimit } = useFilters()

    function handleSort(event: React.ChangeEvent<HTMLSelectElement>) {
        setSort(event.target.value as keyof Car | undefined)
    }

    function handleLimit(event: React.ChangeEvent<HTMLSelectElement>) {
        setLimit(Number(event.target.value))
    }

    return (
        <div className="SortingPanel">
            <label className="SortingPanel__field">
                <span className="SortingPanel__label">Sort by</span>
                <div className="SortingPanel__select">
                    <select
                        value={sort}
                        onChange={handleSort}
                    >
                        {SORT_FIELDS.map((field) => (
                            <option key={field.value} value={field.value}>
                                {field.label}
                            </option>
                        ))}
                    </select>
                </div>
            </label>

            <button
                type="button"
                className="SortingPanel__order"
                onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                disabled={false}
                aria-label={order === "asc" ? "Sort ascending" : "Sort descending"}
                title={order === "asc" ? "Ascending" : "Descending"}
            >
                <SortIcon
                    className={`SortingPanel__orderIcon${order === "desc" ? " SortingPanel__orderIcon--desc" : ""}`}
                />
            </button>

            <label className="SortingPanel__field">
                <span className="SortingPanel__label">Per page</span>
                <div className="SortingPanel__select">
                    <select
                        value={limit}
                        onChange={handleLimit}
                    >
                        {PAGE_SIZES.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </label>
        </div>
    )
}