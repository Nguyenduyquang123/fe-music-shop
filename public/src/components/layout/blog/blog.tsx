import BlogCategory from "./blogcategory"
import BlogGird from "./bloggird"
import BlogPagination from "./blogpagination"
import BlogSearch from "./blogsearch"
import FeatureBlog from "./featureblog"

const Blog = () => {
  return (
    <>
      <main className="pt-32 pb-24 px-margin-desktop max-w-container-max mx-auto">
        {/* <!-- Hero Section / Header --> */}
        <div className="mb-16 text-center">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-primary text-label-sm font-label-sm tracking-wider">TIN TỨC &amp; KINH NGHIỆM</span>
          </div>
          <h1 className="text-display-lg font-display-lg text-on-surface mb-6">Góc Chia Sẻ Âm Nhạc</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-[720px] mx-auto">
            Khám phá những bí quyết bảo quản nhạc cụ, hướng dẫn chọn đàn cho người mới bắt đầu và những câu chuyện truyền cảm hứng từ giới nghệ sĩ.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-gutter">
          {/* <!-- Sidebar: Categories & Search (Mobile/Tablet Top, Desktop Side) --> */}
          <aside className="w-full lg:w-1/4 order-1 lg:order-2">
            <div className="sticky top-32 space-y-8">
              {/* <!-- Search Widget --> */}
              <BlogSearch />
              {/* <!-- Category Widget --> */}
              <BlogCategory />
              {/* <!-- Featured Widget --> */}
              <FeatureBlog />
            </div>
          </aside>
          {/* <!-- Blog Grid --> */}
          <div className="w-full lg:w-3/4 order-2 lg:order-1">
            <BlogGird />
            {/* <!-- Pagination --> */}
            <BlogPagination />
          </div>
        </div>
      </main>
    </>
  )

}
export default Blog