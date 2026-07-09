'use client'
import { useEffect, useState, useCallback } from 'react'
import ProductFilter from './productfilter'
import ProductGrid from './productgrid'
import ProductPagination from './productPagination'
import ProductSort from './productsort'
import { clientProductService } from '@/public/src/services/client/product.service'
import type {
  Product,
  FilterState,
  Category,
  Brand,
  ProductQuery,
} from '@/public/src/types/type'
import { normalizeProducts } from '@/public/src/utils/product.utils'

const ITEMS_PER_PAGE = 12

const INITIAL_FILTERS: FilterState = {
  categoryId: null,
  brandId: null,
  minPrice: null,
  maxPrice: null,
}



const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('popular')
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)

  // Load categories + brands 1 lần duy nhất
  useEffect(() => {
    const fetchOptions = async () => {
      try {

        clientProductService.getProducts({ page: 1 }).then((res) => {
          console.log('API raw response:', res)
          console.log('products array:', res.data)
          console.log('total:', res.meta?.total)
        })

        const [catRes, brandRes] = await Promise.all([
          clientProductService.getCategories(),
          clientProductService.getBrands(),
        ])
        setCategories(catRes.data ?? catRes.items ?? catRes)
        setBrands(brandRes.data ?? brandRes.items ?? brandRes)


      } catch {
        // giữ array rỗng, không block UI
      }
    }
    fetchOptions()
  }, [])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const query: ProductQuery = {
        page,
        sort,
        ...(filters.categoryId && { category_id: filters.categoryId }),
        ...(filters.brandId && { brand_id: filters.brandId }),
        ...(filters.minPrice !== null && { min_price: filters.minPrice }),
        ...(filters.maxPrice !== null && { max_price: filters.maxPrice }),
      }

      const res = await clientProductService.getProducts(query)

      // Response thực tế: { data: [...], meta: { total, current_page, last_page } }
      const rawList = res.data ?? res.items ?? []

      const publishedOnly = (rawList as Product[]).filter(item => item.is_active === true);
      setProducts(publishedOnly);
    } catch (err) {
      console.error('fetchProducts error:', err)
      setProducts([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [page, sort, filters])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setPage(1)
  }

  const handleSortChange = (newSort: string) => {
    setSort(newSort)
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <main className="pt-28 pb-20 max-w-container-max mx-auto px-margin-desktop min-h-screen">
      <div className="flex flex-col md:flex-row gap-gutter">
        <ProductFilter
          filters={filters}
          categories={categories}
          brands={brands}
          onChange={handleFilterChange}
        />
        <div className="flex-1">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-on-surface-variant text-body-md mb-1">
                {loading
                  ? 'Đang tải...'
                  : `Hiển thị ${products.length} / ${total} sản phẩm`}
              </p>
              <h1 className="font-headline-lg text-headline-lg">
                Tất cả sản phẩm
              </h1>
            </div>
            <ProductSort value={sort} onChange={handleSortChange} />
          </div>

          <ProductGrid products={products} loading={loading} />

          {totalPages > 1 && (
            <ProductPagination
              currentPage={page}
              totalPages={totalPages}
              onChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default ProductPage