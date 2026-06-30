const BlogPagination = () =>{
  return(
    <>
     <div className="mt-12 flex justify-center items-center gap-4">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface hover:bg-primary hover:text-on-primary transition-all">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold">1</button>
            </div>
    </>
  )
}
export default BlogPagination