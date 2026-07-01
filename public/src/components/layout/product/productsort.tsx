const SORT_OPTIONS = [
    { value: 'popular', label: 'Phổ biến nhất' },
    { value: 'price_asc', label: 'Giá: Thấp đến Cao' },
    { value: 'price_desc', label: 'Giá: Cao đến Thấp' },
    { value: 'newest', label: 'Mới nhất' },
] as const

interface Props {
    value: string
    onChange: (value: string) => void
}

const ProductSort = ({ value, onChange }: Props) => (
    <div className="flex items-center gap-4">
        <span className="text-label-sm text-on-surface-variant uppercase">
            Sắp xếp theo:
        </span>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-surface-container-high border-none text-on-surface text-label-sm rounded-lg focus:ring-primary px-4 py-2"
        >
            {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
)

export default ProductSort