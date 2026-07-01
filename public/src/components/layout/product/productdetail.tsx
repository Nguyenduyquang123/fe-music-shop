'use client'

import { useParams } from "next/navigation";


const ProductDetail = () => {
  return (
    <>
    
      <main className="pt-24 pb-20">
        {/* <!-- Product Detail Section --> */}
        <section className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          {/* <!-- Left: Large Image Gallery --> */}
          <div className="md:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[4/5] bg-surface-container rounded-xl overflow-hidden amber-glow transition-all duration-500">
              <img className="w-full h-full object-cover" data-alt="A premium high-resolution studio photograph of a polished acoustic guitar with a deep mahogany wood finish. The instrument is positioned against a dark, moody concert hall background with dramatic rim lighting that highlights the elegant curves and fine wood grain texture. The image evokes a sense of professional craftsmanship and rich, resonant sound quality." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA45VBayIKF47a1eccvZDshhrhgQPTQWfLfj1evRw0hLfLskoB2gzHXDoNsZT45J4hgxE3J72Y0JUGr9Q5847E0Wup6Wew7I4tJs5YpcIiBMUefMW4L3IF8qv8ctMIgCpTWwUPQpMMDqAiU6mcdSbc79uHzn7_TnKstUnCOqNaAdH_w7Y3baEs02e1HHyMYLpocdKvIlQDgY2yFBQZej8HjYL2LnLLizWBB6skt23gQgVIgVokSfechGmDOeA171CsdAOoVmJoURyQ" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-square bg-surface-container rounded-lg overflow-hidden border border-outline-variant hover:border-primary transition-colors cursor-pointer">
                <img className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" data-alt="Detailed close-up of the acoustic guitar's soundhole and strings, showcasing the intricate wooden rosette and the metallic shimmer of new phosphor bronze strings. Soft, warm lighting emphasizes the textures." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoJUlP6xTL_p60uavXBpruU7Pt0sL7pUq6ZQhD83x-8yE5xDjlVfvnVRQq9BFqL_Iq92xWkfgobgDOSPSEtTH94w5H5emeZPYUUNNyymjzdaHeNKu5dAVAgGAwmJ3Q-h5ZEuQ61LsB-5xR2PWGDf8jc75QAwUQZnmgkcUznVOeE-TZDrOoP0DIX_XAfj7ej6lmNgVnmnA_RUbYcdAVWy2U7y_NbvS1bD35Ux_f5hbNcmMCFM0GZ69zbQra4x-7zoNCQ7KeD1s_H08" />
              </div>
              <div className="aspect-square bg-surface-container rounded-lg overflow-hidden border border-outline-variant hover:border-primary transition-colors cursor-pointer">
                <img className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" data-alt="A close-up view of the guitar's headstock, featuring gold-plated tuning pegs and a minimalist brand logo. The wood has a deep, lacquered gloss finish, reflecting subtle amber light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7ZIRq826CC12m5c3vriK5nvSroxZS1M-2Ep7LlG61rmpz3Pu6Dppjk-Al7LW1tzUelvCI_Np93yP1lKhI-6tJC5dYqzaIYp3b-wD_y2CbHYVD3TYLdJqzeFwVQsB9qO8yTB41T_N_2_VnJnngkT4-A9Ggyh4NDg_HVcKMfkOpJ5V03zx4JrJzs2c9MtTwH2Ybqn1OM8Z89VFolGNy13gzpmEpqoyJgvRCP9Z04rHL-gMnWUbs0_QUSQ81-pQ5EapS3NJyd9xY-8w" />
              </div>
              <div className="aspect-square bg-surface-container rounded-lg overflow-hidden border border-outline-variant hover:border-primary transition-colors cursor-pointer">
                <img className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" data-alt="Macro photography of the guitar's bridge and saddle area, showing the precise wood carving and the way the strings are anchored. Professional lighting creates soft shadows and depth." src="https://lh3.googleusercontent.com/aida-public/AB6AXuClrPJJm4mEu5flIzwMw9OjWvmwZcMZwAYChc2C4Dr7uqSVI-d1HX6ZWXvMdZAQ6nZDjGmJ3Cxndrf3y4sfQvOkETgbc00K3In9svIrphx-X0PRZ7O9uX4aoAeicM5eJJHvfwuNVJDce9aiQNo0w_yTa2wVmRDEjQoMbpHy9uy1mFsrafzzBns16cIxUN_7RSIIuE1KJY5EEIg_boAjSJX3zj6hXMa_8EOg1GrdnBxH8ExbWBIYj1cHeSN2SP2kLhKVL6BGFy6hvYE" />
              </div>
              <div className="aspect-square bg-surface-container rounded-lg overflow-hidden border border-outline-variant hover:border-primary transition-colors cursor-pointer">
                <img className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" data-alt="Side profile shot of the guitar body, emphasizing the slim, elegant waist and the beautiful grain of the side wood panels. The atmosphere is sophisticated and quiet." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-M0ld4rbcKVrGpi88lv8RtUBy9hQd6ye1FSJPmjQ0NxyT3Tbw2oCmvDEPN7rtW_Ir2DmavGEgcDbApj5EGgQlpDobD9rrjDiRYMDzNRJ1cjelj2svAkoP_JdZLesMthC9Ma8TS-h-e9uJsJCMVLsaOKG6mA2ChAA09T93ZmH1G4nqtNOCFqJJVACID3jw-m43VGzYGil7zjjYTcjlO-WSTmN6wCrwkd_VjRbiHsuB4Z-YMZnaVdzdPG7CSNcBeB4sGpTUKo2R3DY" />
              </div>
            </div>
          </div>
          {/* <!-- Right: Product Info --> */}
          <div className="md:col-span-5 flex flex-col gap-6 sticky top-28">
            <nav className="flex gap-2 text-label-sm font-label-sm text-on-surface-variant">
              <a className="hover:text-primary" href="#">Trang chủ</a>
              <span>/</span>
              <a className="hover:text-primary" href="#">Guitar Acoustic</a>
            </nav>
            <div className="space-y-2">
              <h1 className="font-headline-lg text-headline-lg text-primary">Guitar Acoustic Heritage Series H-100</h1>
              <div className="flex items-center gap-2">
                <div className="flex text-primary">
                  <span className="material-symbols-outlined text-[18px]" data-weight="fill">star</span>
                  <span className="material-symbols-outlined text-[18px]" data-weight="fill">star</span>
                  <span className="material-symbols-outlined text-[18px]" data-weight="fill">star</span>
                  <span className="material-symbols-outlined text-[18px]" data-weight="fill">star</span>
                  <span className="material-symbols-outlined text-[18px]" data-weight="fill">star_half</span>
                </div>
                <span className="text-label-sm text-on-surface-variant">(42 đánh giá)</span>
              </div>
            </div>
            <div className="text-display-lg font-display-lg text-primary-fixed-dim">
              3,500,000₫
            </div>
            {/* <!-- Specs Bento --> */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-surface-container-high border border-outline-variant/30">
              <div className="flex flex-col gap-1">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Thương hiệu</span>
                <span className="font-bold text-on-surface">VietMusic Pro</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Loại gỗ</span>
                <span className="font-bold text-on-surface">Mặt thông Solid A+</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Dây đàn</span>
                <span className="font-bold text-on-surface">D'Addario EXP16</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Kiểu dáng</span>
                <span className="font-bold text-on-surface">Grand Auditorium</span>
              </div>
            </div>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Dòng Heritage H-100 mang đến âm thanh vang sáng, cân bằng tuyệt đối giữa các dải tần. Phù hợp cho cả đệm hát và fingerstyle chuyên nghiệp.
            </p>
            {/* <!-- Actions --> */}
            <div className="flex flex-col gap-4 mt-4">
              <button className="w-full py-4 px-6 bg-primary text-on-primary font-bold rounded-lg flex items-center justify-center gap-2 accent-gradient transition-all active:scale-95 shadow-[0px_8px_24px_rgba(255,184,0,0.15)]">
                <span className="material-symbols-outlined">shopping_cart</span>
                THÊM VÀO GIỎ HÀNG
              </button>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">chat</span>
                  Zalo
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">forum</span>
                  Facebook
                </button>
              </div>
            </div>
            <div className="flex items-center gap-6 pt-6 border-t border-outline-variant/30">
              <div className="flex items-center gap-2 text-label-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                Giao hàng toàn quốc
              </div>
              <div className="flex items-center gap-2 text-label-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-primary">verified</span>
                Bảo hành 24 tháng
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Detailed Description Section --> */}
        <section className="max-w-[720px] mx-auto px-margin-mobile mt-24">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8 border-l-4 border-primary pl-4">Mô tả chi tiết</h2>
          <div className="prose prose-invert max-w-none space-y-6 text-on-surface-variant leading-relaxed">
            <p>Cây Guitar Acoustic Heritage H-100 là tinh hoa của kỹ thuật chế tác nhạc cụ truyền thống kết hợp với công nghệ hiện đại. Được tuyển chọn từ những tấm gỗ thông Solid cao cấp nhất, sản phẩm mang lại độ ngân rung vượt trội và sự ấm áp đặc trưng theo thời gian sử dụng.</p>
            <blockquote className="text-headline-md font-headline-md italic text-primary border-l-4 border-primary pl-6 py-4 my-8">
              "Âm thanh của H-100 không chỉ là những nốt nhạc, đó là hơi thở của gỗ và tâm hồn của người nghệ nhân."
            </blockquote>
            <p>Mặt lưng và hông được làm từ gỗ Mahogany vân gỗ đều, giúp tăng cường dải âm trung trầm đầy đặn. Cần đàn được gia công tỉ mỉ, độ cao dây (action) được căn chỉnh chuẩn xác giúp người mới chơi dễ dàng bấm hợp âm mà không gây đau tay.</p>
            <div className="my-10 bg-surface-container rounded-xl p-8 border border-outline-variant/20">
              <h3 className="text-primary font-bold text-xl mb-4">Thông số kỹ thuật đầy đủ:</h3>
              <ul className="space-y-3">
                <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span>Mặt đàn (Top)</span>
                  <span className="font-semibold text-on-surface">Solid Sitka Spruce (Gỗ thông nguyên tấm)</span>
                </li>
                <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span>Lưng &amp; Hông (Back &amp; Sides)</span>
                  <span className="font-semibold text-on-surface">Laminated Mahogany</span>
                </li>
                <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span>Cần đàn (Neck)</span>
                  <span className="font-semibold text-on-surface">Mahogany</span>
                </li>
                <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span>Mặt phím (Fretboard)</span>
                  <span className="font-semibold text-on-surface">Rosewood</span>
                </li>
                <li className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span>Khóa đàn (Tuners)</span>
                  <span className="font-semibold text-on-surface">Chrome Die-cast</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* <!-- Related Products --> */}
        <section className="max-w-container-max mx-auto px-margin-desktop mt-24">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-primary text-label-sm font-bold uppercase tracking-widest">Bộ sưu tập</span>
              <h2 className="font-headline-lg text-headline-lg">Sản phẩm liên quan</h2>
            </div>
            <a className="text-primary font-bold hover:underline flex items-center gap-1" href="#">
              Xem tất cả <span className="material-symbols-outlined">arrow_right_alt</span>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* <!-- Card 1 --> */}
            <div className="group bg-surface-container-low rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 amber-glow border border-outline-variant/20">
              <div className="aspect-[4/5] overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A sleek black acoustic-electric guitar standing on a professional stage stand. The matte black finish absorbs light beautifully, with subtle amber highlights on the edges. Minimalist dark studio setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzGvOD-FQRYjXEJ5gxrowI3trpEhz8wZ-I6HUkqrffRhtpttaWvlgdHBLGhS2wc85rpzQqXH4D_r5tOYhbb9DmgXjpvJF-AoX_usVF1tEGMl_1NfeVRhElE_5qKfK8FHuhy2zoI92NB4kl8SvCe1bJO9GWEEi2QvPiO40nOZcViiE1ybqVCsEo1FgQalt8fQ0JON-L9o0IGXyknj_haywIjpKMtvgLhiQaIaJjuC7yg_S_r2mtjJ7pb0jKeM0Vh-61ZQ0E3OywJYs" />
              </div>
              <div className="p-6">
                <span className="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded uppercase font-bold">Acoustic</span>
                <h3 className="mt-2 font-bold text-lg text-on-surface">Elite Stealth G-200</h3>
                <p className="text-primary font-headline-md mt-2">4,200,000₫</p>
              </div>
            </div>
            {/* <!-- Card 2 --> */}
            <div className="group bg-surface-container-low rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 amber-glow border border-outline-variant/20">
              <div className="aspect-[4/5] overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="classNameical guitar with a cedar top and rosewood back. The wide neck and nylon strings are visible. Warm, golden hour sunlight streams into a luxury wooden studio, creating a soft, nostalgic atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTjDWjvgYmqZdBtS6zoXKH_8piaiQH_qYh_AfdzUPI2bizWvk2AbOIyD6zMd8AkYF5rKxcylRdbMcYP7Bj5039NucNdU4BD2wGDT4BfPWXvKuTLlU8UcOLPvPjjFhAEmmo48fjQgLGyp_uJVwWENdzbq9RGbRnmbetoWaG3ubu9LnLPdvxgcxJ7GCugFp7zUZzpbUdTMqJyV9tjON4VypsLIvUaKn2a_v68gsTad-GrgaBLblSdCpnPZ9nVG3YEslTfmbMw_plqZQ" />
              </div>
              <div className="p-6">
                <span className="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded uppercase font-bold">classNameical</span>
                <h3 className="mt-2 font-bold text-lg text-on-surface">Sonata classNameic C-1</h3>
                <p className="text-primary font-headline-md mt-2">2,850,000₫</p>
              </div>
            </div>
            {/* <!-- Card 3 --> */}
            <div className="group bg-surface-container-low rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 amber-glow border border-outline-variant/20">
              <div className="aspect-[4/5] overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A vintage sunburst finish acoustic guitar leaning against an old brick wall in a jazz club environment. The warm orange and dark brown hues of the sunburst glow under a single spotlight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPbfV8IGl831r_IPRdgrVpRlOis5e41zCQJH9zQtRoVU-sRXEsvAxNwJN8UsxM3puqfYYJuFl62IIhCq4fSoCmS2oEHLRhLtLzotgmLBGeflJea7CPa9wE-HyAYSCvG0y_IxWvBNveUCBuBai4LI4OBP3Rs_Vkv1bviHT8rrzKwqAyKEqafBh8SuRMWF0l41NfRqqy-sOSOy3HoDZ62NncSmYvbC1HI8Q4Vox7EVOPoLKM9TZ8xYdh4fdpjGeDBL3hjjiaG6V0yXk" />
              </div>
              <div className="p-6">
                <span className="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded uppercase font-bold">Vintage</span>
                <h3 className="mt-2 font-bold text-lg text-on-surface">Retro Sunburst S-50</h3>
                <p className="text-primary font-headline-md mt-2">3,100,000₫</p>
              </div>
            </div>
            {/* <!-- Card 4 --> */}
            <div className="group bg-surface-container-low rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 amber-glow border border-outline-variant/20">
              <div className="aspect-[4/5] overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A small body travel guitar made of bright maple wood, resting on a clean white linen surface in a bright, modern minimalist room. The aesthetic is clean, airy, and high-end." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6qaPrAmkvVMEe5Bdq1HBxqsdp334RkcKLoaXz0B5BMvU_9C3jMSchOfH3o_73Heo0Mfc1nlpkayffiAK9qv07890FGW2IZpGsus7h2lqd-QNEjWt--yMHgN3s2mKo5ipC0az0JmJ8ZvSpmXoH0HN0ozi__HZwQ33_hmRZzAwCI1pSOj0IbjeyxJpY1j_Iq4R2-WVGJcK5LakDZUwp1lwPNyBpvkQJ5K-alT1JMFb5vfvd63AcLG5HwVjZGUCYZImclbZlQpeGrO8" />
              </div>
              <div className="p-6">
                <span className="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded uppercase font-bold">Travel</span>
                <h3 className="mt-2 font-bold text-lg text-on-surface">Nomad Mini Spruce</h3>
                <p className="text-primary font-headline-md mt-2">2,400,000₫</p>
              </div>
            </div>
          </div>
        </section>
      </main>
     
      
    </>
  )
}

export default ProductDetail