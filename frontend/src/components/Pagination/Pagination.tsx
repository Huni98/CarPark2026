import { useFilters } from '../../hooks/useFilters'
import { useCarsList } from '../../hooks/useCarsList'
import './Pagination.css'

export function Pagination() {
    const { page, setPage } = useFilters()
    const { totalPages } = useCarsList()

    // Don't render pagination if there's only 1 page (or none)
    if (totalPages <= 1) return null

    // Helper function to calculate the page window
    const getPaginationItems = () => {
        // If there are 7 or fewer pages, just show all of them
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        // If we are near the beginning
        if (page <= 3) {
            return [1, 2, 3, 4, 5, '...', totalPages]
        }

        // If we are near the end
        if (page >= totalPages - 2) {
            return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        }

        // If we are somewhere in the middle
        return [1, '...', page - 1, page, page + 1, '...', totalPages]
    }

    const paginationItems = getPaginationItems()

    return (
        <div className="Pagination">
            <button
                type="button"
                className="Pagination__button"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
            >
                Prev
            </button>

            {paginationItems.map((item, index) => {
                if (item === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className="Pagination__ellipsis">
                            &#8230;
                        </span>
                    )
                }

                return (
                    <button
                        key={item}
                        type="button"
                        className={`Pagination__button${item === page ? ' Pagination__button--active' : ''}`}
                        onClick={() => setPage(item as number)}
                    >
                        {item}
                    </button>
                )
            })}

            <button
                type="button"
                className="Pagination__button"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    )
}