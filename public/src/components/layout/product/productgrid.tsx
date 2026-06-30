

const ProductGird = () => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {/* <!-- Product 1 --> */}
        <div className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10 product-card-glow flex flex-col">
          <div className="relative aspect-square overflow-hidden bg-[#1E1E1E]">
            <img className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500" data-alt="A professional studio photograph of a premium Fender Stratocaster electric guitar in sunburst finish, resting against a dark velvet backdrop with dramatic cinematic lighting highlighting its polished wood texture and chrome hardware. Professional composition for a high-end music store catalog, luxury atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxrWvnqy1GK0XDDaLyUkNQiq0RwBbObQQYGx-s5duJTCMN4Qq2t8VbGRwm7KGwquDpE_oLbO9wpIQxsE0Oh6QWTPhhhcdwwGYZ2zS654Ml5y_MH-Bj62H3gLBvFyE2zP1Lrx1V3J4H5vt29H1pa5y4C2hSl3HQS37NfeUCYm07DwAoU2VAN8mFoH3Lp163p96FLSsbNIVBxLfJQByySqrgzgQKTREF7ji9uZ25BBlbfdXiStuoRyV-XbfP8RV3S-Ge_A8cpqNzHLQ" />
            <div className="absolute top-4 left-4">
              <span className="bg-primary-container text-on-primary-container text-label-sm font-label-sm px-3 py-1 rounded-full shadow-lg">Bán chạy</span>
            </div>
            <button className="absolute bottom-4 right-4 bg-primary text-on-primary p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
              <span className="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <span className="text-label-sm text-on-surface-variant uppercase mb-2">Electric Guitar</span>
            <h3 className="font-headline-md text-headline-md mb-4 group-hover:text-primary transition-colors">Fender Stratocaster Elite</h3>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-primary font-headline-md text-headline-md">45.000.000₫</span>
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="text-label-sm">4.9</span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Product 2 --> */}
        <div className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10 product-card-glow flex flex-col">
          <div className="relative aspect-square overflow-hidden bg-[#1E1E1E]">
            <img className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500" data-alt="A grand piano by Yamaha, majestic and black lacquered, standing in a sophisticated concert hall environment with warm amber lighting reflecting off its polished surface. The photo captures the intricate details of the keys and the open lid, emphasizing craftsmanship and musical excellence." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSJFF_Ib3rbqivDbRRpFTaTHN-ybRhdlxkhuaPrU22SNErHxTOiiaWahklR088JugGuI04y4kK-0RxdSFTwhf4yzrFfPguPxZv2xgBXl_tUF9Ehf9xIrH5_sMI0uv0yVsLUH5m4y43VILZvH8pKjUhO0fyk7gZZEj0UznYECQWEDGuE6jjX4spYEYu3tb0mJgwIwasOfYIu-tltMeiMpVnsGvfH9uk_qPZdPGrh3rQeRCZ5Jq2uADQvNGhMYxcyIVhMaHI9JxCGL8" />
            <div className="absolute top-4 left-4">
              <span className="bg-secondary-container text-on-secondary-container text-label-sm font-label-sm px-3 py-1 rounded-full shadow-lg border border-outline-variant/30">Mới</span>
            </div>
            <button className="absolute bottom-4 right-4 bg-primary text-on-primary p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
              <span className="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <span className="text-label-sm text-on-surface-variant uppercase mb-2">Grand Piano</span>
            <h3 className="font-headline-md text-headline-md mb-4 group-hover:text-primary transition-colors">Yamaha GB1K Baby Grand</h3>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-primary font-headline-md text-headline-md">285.000.000₫</span>
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="text-label-sm">5.0</span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Product 3 --> */}
        <div className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10 product-card-glow flex flex-col">
          <div className="relative aspect-square overflow-hidden bg-[#1E1E1E]">
            <img className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500" data-alt="A professional Pearl Masters Maple drum kit set in a smoky studio with moody orange and blue lighting. The shells have a deep wood grain texture, and the cymbals gleam with high-end metallic reflections. Sharp focus on the snare drum and hi-hat, presenting a powerful and rhythmic vibe." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVjx_fD81R6KZq2Aa4F7bXt2EbrzH4Wz_QwU_1uWXZP35Gws4Lp32jcVhYHHBNZ4qRf4ijCN28FRn0YcICkxE7vScJ91BI6XkOfnlr_bFeiBZAhagTJtxUVrx9gu1lMvohSK6zg10khhPd7Z-rcXqJF1u0QkjuWLYag65kEU8iKqKx7cor6b0KahvH6WaPUfKGICFAARGYTrIuI66-BVvfZ1hBsT_kIVzDLqiiyu5GvX2ap82j0PWt-R8yWvjWBfhPxVqc_s7W2EU" />
            <div className="absolute top-4 left-4">
              <span className="bg-primary-container text-on-primary-container text-label-sm font-label-sm px-3 py-1 rounded-full shadow-lg">Bán chạy</span>
            </div>
            <button className="absolute bottom-4 right-4 bg-primary text-on-primary p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
              <span className="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <span className="text-label-sm text-on-surface-variant uppercase mb-2">Drum Kit</span>
            <h3 className="font-headline-md text-headline-md mb-4 group-hover:text-primary transition-colors">Pearl Masters Maple Complete</h3>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-primary font-headline-md text-headline-md">68.500.000₫</span>
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="text-label-sm">4.8</span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Product 4 --> */}
        <div className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10 product-card-glow flex flex-col">
          <div className="relative aspect-square overflow-hidden bg-[#1E1E1E]">
            <img className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500" data-alt="A beautiful Taylor 814ce acoustic-electric guitar with a V-className bracing system, showcased in a warmly lit library with leather chairs and wood paneling. The lighting emphasizes the fine spruce top and rosewood back, conveying a sense of heritage, warmth, and acoustic purity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuANxW9WS-mUAQilNXjIKdx2CgknX7Q43zmprxj8YiSNak_J7rJeugFCH1qzdH1EssWVdN1DsZfqXYGaW44l17CBRp-nLFkt6oPsZ0fn5mxwKWkI4hjPuql6l6fNMqCNxxhxU83dtUQ4Eou8Y539X5mDbBcYJJeSCp2HHQBWAlBgPCktioFiT9Vs38xle1DooFB6OtjPdGXCDbdcckVQFbf6aazvaejCMC1PADUQ2r5CKNxjsHm6GbZZ97hSZfoIPQPRwjm5-cy7ABw" />
            <button className="absolute bottom-4 right-4 bg-primary text-on-primary p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
              <span className="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <span className="text-label-sm text-on-surface-variant uppercase mb-2">Acoustic Guitar</span>
            <h3 className="font-headline-md text-headline-md mb-4 group-hover:text-primary transition-colors">Taylor 814ce Builders Edition</h3>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-primary font-headline-md text-headline-md">92.000.000₫</span>
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="text-label-sm">4.9</span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Product 5 --> */}
        <div className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10 product-card-glow flex flex-col">
          <div className="relative aspect-square overflow-hidden bg-[#1E1E1E]">
            <img className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500" data-alt="A Roland TD-50K2 V-Drums flagship electronic drum set arranged professionally. High-resolution shot showing the mesh heads and digital cymbals with a futuristic studio lighting setup, neon amber accents against deep blacks, highlighting modern technology and professional gear." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5cRn3TpeX7SRR1LxMgY6x0KXLROFw_mVZRpuLahAVKIoveTZ0ZdMucZD_ZoRCnfuRoJ232JSYfgvpIJW2IeaqUIy9JsE1Aw2bAT-1n6rD4w2W5zhp5PR3RdHgj7qdc7kTLxUUhXHHy9g8lZQ52J6evLrXX9jQqNXsApkJPPWkBAwM3XKjntfHEYniPb-0EtMbEyqRL5g30PvICmZyu5UpKcemA902Zw4e03vcXUDddppfknhUZSwSWTPyv9Ee8M23Cs2UNcBV9GM" />
            <div className="absolute top-4 left-4">
              <span className="bg-secondary-container text-on-secondary-container text-label-sm font-label-sm px-3 py-1 rounded-full shadow-lg border border-outline-variant/30">Mới</span>
            </div>
            <button className="absolute bottom-4 right-4 bg-primary text-on-primary p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
              <span className="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <span className="text-label-sm text-on-surface-variant uppercase mb-2">Electronic Drums</span>
            <h3 className="font-headline-md text-headline-md mb-4 group-hover:text-primary transition-colors">Roland TD-50K2 V-Drums</h3>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-primary font-headline-md text-headline-md">115.000.000₫</span>
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="text-label-sm">5.0</span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Product 6 --> */}
        <div className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10 product-card-glow flex flex-col">
          <div className="relative aspect-square overflow-hidden bg-[#1E1E1E]">
            <img className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500" data-alt="A vintage Moog Matriarch semi-modular analog synthesizer with multi-colored knobs and patch cables. Photographed with a retro-futuristic aesthetic, warm analog glow, and shallow depth of field. The image highlights the complexity and tactile nature of the instrument." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfUH9yCrIO1eJ2K4FaWAKl80PN8NvGjIXOKfPjonF9cMLqGa5IFhSxMVxuuwt_rWH70yd73LF-gS7F1McpXvgqdA13WfelpqnV_RQwj30Dr0z-BqUWqn3dAWKroklno7sPBZrp6dx6ZhgT2wdBxMgBrIG4VbEPVVInD14rCV2nN0udv3IwpWzxl45oSwALNYU3VPgm-i-CL0mNtFhBkHFNIK_stra0dIncylaPsuPYyq0NGKQrSnT_oee4FEiyfUwZZ_XqpKzdoro" />
            <button className="absolute bottom-4 right-4 bg-primary text-on-primary p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
              <span className="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <span className="text-label-sm text-on-surface-variant uppercase mb-2">Synthesizer</span>
            <h3 className="font-headline-md text-headline-md mb-4 group-hover:text-primary transition-colors">Moog Matriarch Semi-Modular</h3>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-primary font-headline-md text-headline-md">56.000.000₫</span>
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="text-label-sm">4.7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  </>
)
export default ProductGird