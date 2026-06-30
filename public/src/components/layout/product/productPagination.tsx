const ProductPagination = () => {
  return (
    <>
       <div className="mt-16 flex justify-center gap-2">
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-high border border-outline-variant/30 text-on-surface hover:bg-primary hover:text-on-primary transition-all">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold">1</button>
      </div>
    </>
  )
}

export default ProductPagination