const BlogCategory = () => {
  return (
    <>
      <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30">
        <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Danh mục</h3>
        <ul className="space-y-3">
          <li><a className="flex justify-between items-center text-on-surface-variant hover:text-primary transition-all group" href="#">
            <span className="font-label-sm text-label-sm">Kỹ thuật Piano</span>
            <span className="text-[12px] bg-surface-container-high px-2 py-1 rounded">12</span>
          </a></li>
          <li><a className="flex justify-between items-center text-on-surface-variant hover:text-primary transition-all group" href="#">
            <span className="font-label-sm text-label-sm">Hướng dẫn Guitar</span>
            <span className="text-[12px] bg-surface-container-high px-2 py-1 rounded">08</span>
          </a></li>
          <li><a className="flex justify-between items-center text-on-surface-variant hover:text-primary transition-all group" href="#">
            <span className="font-label-sm text-label-sm">Kiến thức tổng hợp</span>
            <span className="text-[12px] bg-surface-container-high px-2 py-1 rounded">15</span>
          </a></li>
          <li><a className="flex justify-between items-center text-on-surface-variant hover:text-primary transition-all group" href="#">
            <span className="font-label-sm text-label-sm">Review nhạc cụ</span>
            <span className="text-[12px] bg-surface-container-high px-2 py-1 rounded">21</span>
          </a></li>
        </ul>
      </div>
    </>
  )
}
export default BlogCategory