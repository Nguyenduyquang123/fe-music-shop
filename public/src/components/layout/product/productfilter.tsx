const ProductFiler = () => {
  return (
    <>
      {/* <!-- Sidebar Filters --> */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-28 space-y-8">
          <div>
            <h3 className="font-headline-md text-headline-md text-primary mb-4">Bộ lọc</h3>
            <div className="h-1 w-12 bg-primary-container rounded-full mb-8"></div>
          </div>
          {/* <!-- Category Filter --> */}
          <section>
            <h4 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-4">Loại nhạc cụ</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input defaultChecked className="rounded-sm bg-surface-container border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                <span className="text-body-md group-hover:text-primary transition-colors">Đàn Guitar</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="rounded-sm bg-surface-container border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                <span className="text-body-md group-hover:text-primary transition-colors">Đàn Piano</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="rounded-sm bg-surface-container border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                <span className="text-body-md group-hover:text-primary transition-colors">Trống &amp; Bộ gõ</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="rounded-sm bg-surface-container border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                <span className="text-body-md group-hover:text-primary transition-colors">Kèn &amp; Sáo</span>
              </label>
            </div>
          </section>
          {/* <!-- Price Filter --> */}
          <section>
            <h4 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-4">Khoảng giá</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="bg-surface-container border-outline-variant text-primary focus:ring-primary" name="price" type="radio" />
                <span className="text-body-md group-hover:text-primary transition-colors">Dưới 5 triệu</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="bg-surface-container border-outline-variant text-primary focus:ring-primary" name="price" type="radio" />
                <span className="text-body-md group-hover:text-primary transition-colors">5 - 20 triệu</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="bg-surface-container border-outline-variant text-primary focus:ring-primary" name="price" type="radio" />
                <span className="text-body-md group-hover:text-primary transition-colors">Trên 20 triệu</span>
              </label>
            </div>
          </section>
          {/* <!-- Brand Filter --> */}
          <section>
            <h4 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-4">Thương hiệu</h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-2 bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-label-sm rounded-lg transition-all border border-outline-variant/30">Yamaha</button>
              <button className="px-3 py-2 bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-label-sm rounded-lg transition-all border border-outline-variant/30">Fender</button>
              <button className="px-3 py-2 bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-label-sm rounded-lg transition-all border border-outline-variant/30">Roland</button>
              <button className="px-3 py-2 bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-label-sm rounded-lg transition-all border border-outline-variant/30">Kawai</button>
            </div>
          </section>
        </div>
      </aside>
    </>
  )
}

export default ProductFiler