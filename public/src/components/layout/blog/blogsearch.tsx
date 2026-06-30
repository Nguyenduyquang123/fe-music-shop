const BlogSearch = () => {
  return (
    <>
      <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30">
        <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Tìm kiếm</h3>
        <div className="relative">
          <input className="w-full bg-surface-container-high border border-outline-variant focus:border-primary rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all text-on-surface outline-none" placeholder="Nhập từ khóa..." type="text" />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default BlogSearch
