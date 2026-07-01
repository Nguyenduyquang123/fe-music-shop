interface Props {
    currentPage: number
    totalPages: number
    onChange: (page: number) => void
}

const getPageNumbers = (current: number, total: number): (number | '...')[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

    const pages: (number | '...')[] = [1]
    if (current > 3) pages.push('...')
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
        pages.push(i)
    }
    if (current < total - 2) pages.push('...')
    pages.push(total)
    return pages
}

const btnBase =
    'w-10 h-10 flex items-center justify-center rounded-lg transition-all border border-outline-variant/30'

const ProductPagination = ({ currentPage, totalPages, onChange }: Props) => (
    <div className="mt-16 flex justify-center gap-2">
        <button
            onClick={() => onChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${btnBase} bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary disabled:opacity-30 disabled:cursor-not-allowed`}
        >
            <span className="material-symbols-outlined">chevron_left</span>
        </button>

        {getPageNumbers(currentPage, totalPages).map((p, i) =>
            p === '...' ? (
                <span
                    key={`dot-${i}`}
                    className="w-10 h-10 flex items-center justify-center text-on-surface-variant"
                >
                    ...
                </span>
            ) : (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    className={`${btnBase} ${
                        currentPage === p
                            ? 'bg-primary text-on-primary border-primary'
                            : 'bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary'
                    }`}
                >
                    {p}
                </button>
            )
        )}

        <button
            onClick={() => onChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${btnBase} bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary disabled:opacity-30 disabled:cursor-not-allowed`}
        >
            <span className="material-symbols-outlined">chevron_right</span>
        </button>
    </div>
)

export default ProductPagination