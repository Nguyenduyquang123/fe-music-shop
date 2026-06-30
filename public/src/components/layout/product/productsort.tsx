const ProductSort = () => {
  return (
    <>
    <div className="flex items-center gap-4">
            <span className="text-label-sm text-on-surface-variant uppercase">Sắp xếp theo:</span>
            <select className="bg-surface-container-high border-none text-on-surface text-label-sm rounded-lg focus:ring-primary px-4 py-2">
              <option>Phổ biến nhất</option>
              <option>Giá: Thấp đến Cao</option>
              <option>Giá: Cao đến Thấp</option>
              <option>Mới nhất</option>
            </select>
          </div>
    </>
  )
}

export default ProductSort