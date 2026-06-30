const FeaturedProductPage = () => {
  return (
    <>
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-headline-lg text-headline-lg flex items-center gap-4">
            <span className="w-12 h-1 bg-primary"></span>
            Sản Phẩm Nổi Bật
          </h2>
          <a className="text-primary font-bold hover:underline" href="#">Xem tất cả</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* <!-- Product 1 --> */}
          <div className="group bg-surface-container-high rounded-xl p-4 transition-all duration-300 hover:-translate-y-2 accent-glow">
            <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-surface-container flex items-center justify-center">
              <img className="w-4/5 h-4/5 object-contain transition-transform group-hover:scale-110" data-alt="Close-up of a premium acoustic guitar with intricate wood grain and a glossy finish, isolated on a dark studio background with soft amber lighting highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqb1rzi7leZFW8a2T0WOazxiKIzU0QS3u-Cuj3x2NvPNkQDKWtLh97_HCqZDispFqBvPdutWmKeARamN-EmGsmwmWFla5XvXdBvpOryf6VbMQ6l5pLLw2VZkg-jSbSC1kN2dhatP9P_LiC6dHNKGm_40ZJeZWEvfbDEMPvkhX4nvFKLbSgqi_pU2VW7Zm1EeA77rjo-wyAQJBvFWA-0USVgB4xFHDK7xGYFUNpDqfNxiUvgBKDOxna641y0GHqyQBJ6T8E9GECbPU" />
            </div>
            <div className="space-y-2">
              <span className="text-label-sm font-label-sm text-primary uppercase bg-primary/10 px-2 py-1 rounded">Acoustic</span>
              <h3 className="font-headline-md text-headline-md leading-none">Guitar Accoutic</h3>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold text-headline-md">3,500,000₫</span>
                <button className="bg-primary text-on-primary p-2 rounded-lg metallic-sheen">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Product 2 --> */}
          <div className="group bg-surface-container-high rounded-xl p-4 transition-all duration-300 hover:-translate-y-2 accent-glow">
            <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-surface-container flex items-center justify-center">
              <img className="w-4/5 h-4/5 object-contain transition-transform group-hover:scale-110" data-alt="A modern matte black digital piano with weighted keys and elegant design lines, shot in a professional music studio setting with subtle warm glows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiXqVBYySUaBnfe8wK5Dvg6h2QrewU-jIj9jrsh3D5AI-iWuD1h13hzeMLdaR0lHQ5H15zH05WC7L-D7-z9yOrZ0J5ygtZztgP3aPrxzl5CAQ3rcLZPyNrQ2cs9UluzimB3URb6v7hfRQ-muKy6H4ueZjyEWh5ozQhxzYLERl384DjIu5f7SkXWGPKOjuiI0ixQNJ-94KGZ2nsU5GanIX-liXJPR2UBpvq6utnzWpvgC0reJiMzO6AfgM8ncX_Z8IzsREXP1b8Sl0" />
            </div>
            <div className="space-y-2">
              <span className="text-label-sm font-label-sm text-primary uppercase bg-primary/10 px-2 py-1 rounded">Electronic</span>
              <h3 className="font-headline-md text-headline-md leading-none">Đàn Piano Điện</h3>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold text-headline-md">15,800,000₫</span>
                <button className="bg-primary text-on-primary p-2 rounded-lg metallic-sheen">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Product 3 --> */}
          <div className="group bg-surface-container-high rounded-xl p-4 transition-all duration-300 hover:-translate-y-2 accent-glow">
            <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-surface-container flex items-center justify-center">
              <img className="w-4/5 h-4/5 object-contain transition-transform group-hover:scale-110" data-alt="A complete professional drum set with chrome hardware and black shell finish, dramatically lit with rim light and amber atmospheric glows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJsIql3i2FWbo1LYbh01XmM1WLFGzPUWReCMNzQnZEilRiOji8A8eRW5Qknn21til-nKjcW43JpfYosrwM6GZELKXpK6Pc2quLgUfhVMEeam8urkDsdIcwDdlcipil--ZBcxzRdSDgtVSaKnRPm9UnmTuCUxxxDXjoZ-cs9h0EyUL2xo9lc19o2Ws1uzrItpI-L2go3N8o1Je_8kYqc8_DG2BFAOVDuFCkH8S3uV0eaIh8TbyNjhu-VMyFT9u3kEjdoLYY-HmW1RU" />
            </div>
            <div className="space-y-2">
              <span className="text-label-sm font-label-sm text-primary uppercase bg-primary/10 px-2 py-1 rounded">Percussion</span>
              <h3 className="font-headline-md text-headline-md leading-none">Bộ Trống Drum Set</h3>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold text-headline-md">12,450,000₫</span>
                <button className="bg-primary text-on-primary p-2 rounded-lg metallic-sheen">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Product 4 --> */}
          <div className="group bg-surface-container-high rounded-xl p-4 transition-all duration-300 hover:-translate-y-2 accent-glow">
            <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-surface-container flex items-center justify-center">
              <img className="w-4/5 h-4/5 object-contain transition-transform group-hover:scale-110" data-alt="A high-end silver transverse flute with intricate keys and a polished mirror finish, lying on a dark velvet surface under a soft spotlight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt2zT_mEA5wQnHkrdkX9gFrvd5vpTwQjczNo0Mobh4G2IhA6XCcLkl8v2RM57jCI2bz_8_xvMRi6Z9Zb-aoGcpGwZxfvctfwDW_sgHYYSgCZaUSoxrf-DbT82CDh-ds8f80HnZsMHBekW578ndkja_4TADA3ScPTrVK_WSNHTzyMeFgXZU23HTHhq4xPrtDNc7bztkTfs4lOMT_fsJL4Jx96DpoF87CJngOSiXh5g62RGrpcD2hw2TDiEqIrQg_COTc5R2YSXWX40" />
            </div>
            <div className="space-y-2">
              <span className="text-label-sm font-label-sm text-primary uppercase bg-primary/10 px-2 py-1 rounded">Wind</span>
              <h3 className="font-headline-md text-headline-md leading-none">Sáo Flute Bạc</h3>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold text-headline-md">1,200,000₫</span>
                <button className="bg-primary text-on-primary p-2 rounded-lg metallic-sheen">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProductPage;