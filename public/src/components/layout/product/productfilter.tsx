'use client'
import type { FilterState, Category, Brand, PriceRange } from '@/public/src/types/type'

const PRICE_RANGES: PriceRange[] = [
    { label: 'Dưới 5 triệu', min: 0, max: 5_000_000 },
    { label: '5 - 20 triệu', min: 5_000_000, max: 20_000_000 },
    { label: '20 - 50 triệu', min: 20_000_000, max: 50_000_000 },
    { label: 'Trên 50 triệu', min: 50_000_000, max: null },
]

interface Props {
    filters: FilterState
    categories: Category[]
    brands: Brand[]
    onChange: (filters: FilterState) => void
}

const ProductFilter = ({ filters, categories, brands, onChange }: Props) => {
    const handleCategory = (id: number) => {
        onChange({
            ...filters,
            categoryId: filters.categoryId === id ? null : id,
        })
    }

    const handleBrand = (id: number) => {
        onChange({
            ...filters,
            brandId: filters.brandId === id ? null : id,
        })
    }

    const handlePriceRange = (min: number, max: number | null) => {
        const isSelected = filters.minPrice === min && filters.maxPrice === max
        onChange({
            ...filters,
            minPrice: isSelected ? null : min,
            maxPrice: isSelected ? null : max,
        })
    }

    const hasActiveFilter =
        filters.categoryId !== null ||
        filters.brandId !== null ||
        filters.minPrice !== null

    return (
        <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-headline-md text-headline-md text-primary mb-4">
                            Bộ lọc
                        </h3>
                        <div className="h-1 w-12 bg-primary-container rounded-full" />
                    </div>
                    {hasActiveFilter && (
                        <button
                            onClick={() =>
                                onChange({
                                    categoryId: null,
                                    brandId: null,
                                    minPrice: null,
                                    maxPrice: null,
                                })
                            }
                            className="text-label-sm text-error hover:underline mt-1"
                        >
                            Xóa tất cả
                        </button>
                    )}
                </div>

                {/* Danh mục */}
                {categories.length > 0 && (
                    <section>
                        <h4 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-4">
                            Loại nhạc cụ
                        </h4>
                        <div className="space-y-3">
                            {categories.map((cat) => (
                                <label
                                    key={cat.id}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={filters.categoryId === cat.id}
                                        onChange={() => handleCategory(cat.id)}
                                        className="bg-surface-container border-outline-variant text-primary focus:ring-primary"
                                    />
                                    <span className="text-body-md group-hover:text-primary transition-colors">
                                        {cat.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </section>
                )}

                {/* Khoảng giá */}
                <section>
                    <h4 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-4">
                        Khoảng giá
                    </h4>
                    <div className="space-y-3">
                        {PRICE_RANGES.map((range) => (
                            <label
                                key={range.label}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <input
                                    type="radio"
                                    name="price"
                                    checked={
                                        filters.minPrice === range.min &&
                                        filters.maxPrice === range.max
                                    }
                                    onChange={() => handlePriceRange(range.min, range.max)}
                                    className="bg-surface-container border-outline-variant text-primary focus:ring-primary"
                                />
                                <span className="text-body-md group-hover:text-primary transition-colors">
                                    {range.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </section>

                {/* Thương hiệu */}
                {brands.length > 0 && (
                    <section>
                        <h4 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-4">
                            Thương hiệu
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {brands.map((brand) => (
                                <button
                                    key={brand.id}
                                    onClick={() => handleBrand(brand.id)}
                                    className={`px-3 py-2 text-label-sm rounded-lg transition-all border ${
                                        filters.brandId === brand.id
                                            ? 'bg-primary-container text-on-primary-container border-primary/30'
                                            : 'bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container border-outline-variant/30'
                                    }`}
                                >
                                    {brand.name}
                                </button>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </aside>
    )
}

export default ProductFilter