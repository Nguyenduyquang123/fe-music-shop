const AboutSectionPage = () => {
  return (
    <>
      <section className="py-24 bg-surface-container-low">
        <div className="px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* <!-- Image Box --> */}
            <div className="lg:col-span-5 relative h-96 lg:h-auto rounded-2xl overflow-hidden group">
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A warm, atmospheric wide shot of a luxury musical instrument boutique showroom. Polished guitars hang on dark wood walls, illuminated by focused warm spots. The space feels artisanal, professional, and inviting with deep shadows and amber tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZp-RCrRYArdPZ_4wY0H_2hVn6FmQQYXVMGkLWJk5zx7eCAWkVH_m2EnhRrruhohCn064EITw3P1imDa3HVuBQ-lbQ6JdPxNw-sIzqjow7SBycmlHXY1SmM-TByHE0J4mkEjoEdVBblLIfIEr8B67Sv85z77U0YJGX7UaBf8U8cKBciuKrwJQumT_N6Xh5P3wFx8fwsgkLH_jLfSG_z9_1RciGnKO5ieZaHBNJ5084PnU58GLYjlAkVtBKV7PDfMsRxQWlUn0y2LQ" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-8">
                <p className="text-primary font-bold mb-2">Since 2012</p>
                <h3 className="text-headline-lg font-headline-lg">Hành Trình Âm Nhạc Của Bạn</h3>
              </div>
            </div>
            {/* <!-- Content Box --> */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-8 lg:pl-12">
              <div className="space-y-4">
                <h2 className="text-display-lg font-display-lg leading-tight">Về Chúng Tôi</h2>
                <p className="text-body-lg font-body-lg text-on-surface-variant">
                  Nhạc Cụ Việt tự hào là điểm đến tin cậy của cộng đồng yêu nhạc. Chúng tôi không chỉ bán nhạc cụ, chúng tôi mang đến những giải pháp âm thanh chuyên nghiệp và niềm cảm hứng sáng tạo vô tận.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <span className="material-symbols-outlined text-primary">verified</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Chất Lượng Đảm Bảo</h4>
                    <p className="text-label-sm text-on-surface-variant">Cam kết chính hãng 100%, bảo hành uy tín.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <span className="material-symbols-outlined text-primary">support_agent</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Hỗ Trợ Tận Tâm</h4>
                    <p className="text-label-sm text-on-surface-variant">Tư vấn và điều chỉnh nhạc cụ theo yêu cầu.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <span className="material-symbols-outlined text-primary">local_shipping</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Giao Hàng Nhanh</h4>
                    <p className="text-label-sm text-on-surface-variant">Vận chuyển an toàn, nhanh chóng toàn quốc.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <span className="material-symbols-outlined text-primary">payments</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Giá Cả Cạnh Tranh</h4>
                    <p className="text-label-sm text-on-surface-variant">Nhiều phân khúc giá cho mọi đối tượng.</p>
                  </div>
                </div>
              </div>
              <div>
                <button className="bg-primary text-on-primary font-bold py-4 px-10 rounded-lg metallic-sheen accent-glow">
                  MUA SẮM NGAY
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSectionPage;