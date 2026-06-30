import ProductFiler from "./productfilter"
import ProductGird from "./productgrid"
import ProductPagination from "./productPagination"
import ProductSort from "./productsort"

const Product = () => {
  return (
    <>
      <main className="pt-28 pb-20 max-w-container-max mx-auto px-margin-desktop min-h-screen">
        <div className="flex flex-col md:flex-row gap-gutter">
          <ProductFiler />
          {/* <!-- Product Grid --> */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-on-surface-variant text-body-md mb-1">Hiển thị 12 sản phẩm</p>
                <h1 className="font-headline-lg text-headline-lg">Tất cả sản phẩm</h1>
              </div>
              {/* sort */}
              <ProductSort />
            </div>
            {/* <!-- Bento-style Grid --> */}
            <ProductGird />
            {/* <!-- Pagination --> */}
            <ProductPagination />
          </div>

        </div>
      </main>
    </>
  )
}
export default Product