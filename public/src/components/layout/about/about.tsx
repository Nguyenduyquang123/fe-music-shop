const About = () => {
  return (
    <>
      <main className="pt-24">
        {/* <!-- Hero Section --> */}
        <section className="relative h-[819px] flex items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
            <div className="w-full h-full bg-cover bg-center opacity-50 scale-105" data-alt="A high-end, dramatic close-up of a polished grand piano and a cellist in a dark, atmospheric concert hall. The lighting is moody with warm amber highlights reflecting off the lacquered wood surfaces, creating a premium and professional corporate aesthetic. The overall mood is sophisticated, rhythmic, and authoritative, perfectly capturing the essence of technical excellence in music." ></div>
          </div>
          <div className="relative z-20 text-center max-w-4xl">
            <span className="inline-block px-4 py-1 mb-6 rounded-full bg-primary/10 text-primary font-label-sm uppercase tracking-widest">Kinh nghiệm từ 1995</span>
            <h1 className="font-display-lg text-display-lg mb-6 text-primary">Hành Trình Âm Nhạc Của Chúng Tôi</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Khởi nguồn từ niềm đam mê mãnh liệt với những giai điệu, Nhạc Cụ Việt đã trở thành điểm đến tin cậy của những nghệ sĩ chuyên nghiệp và những tâm hồn yêu nhạc trên khắp dải đất hình chữ S.
            </p>
            <div className="mt-10">
              <button className="px-8 py-4 bg-primary-container text-on-primary-fixed font-bold rounded-lg amber-glow accent-gradient active:scale-95 transition-all">Khám phá showroom</button>
            </div>
          </div>
        </section>
        {/* <!-- Mission & Vision (Bento Grid Style) --> */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-7 bg-surface-container-high p-12 rounded-xl flex flex-col justify-center border border-outline-variant/20 amber-glow">
              <span className="material-symbols-outlined text-primary text-5xl mb-6">visibility</span>
              <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">Tầm nhìn</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                Trở thành biểu tượng uy tín hàng đầu trong lĩnh vực cung cấp nhạc cụ cao cấp tại Việt Nam, kiến tạo một hệ sinh thái âm nhạc đẳng cấp nơi nghệ thuật và công nghệ hòa quyện, truyền cảm hứng cho mọi thế hệ nghệ sĩ vươn tới đỉnh cao sáng tạo.
              </p>
            </div>
            <div className="md:col-span-5 bg-surface-container-high p-12 rounded-xl flex flex-col justify-center border border-outline-variant/20">
              <span className="material-symbols-outlined text-primary text-5xl mb-6">rocket_launch</span>
              <h2 className="font-headline-lg text-headline-lg mb-4 text-primary">Sứ mệnh</h2>
              <p className="font-body-md text-on-surface-variant">
                Mang đến những nhạc cụ được tinh tuyển khắt khe về chất lượng âm thanh và tay nghề thủ công, hỗ trợ tối đa cho hành trình phát triển tài năng của người yêu nhạc Việt.
              </p>
            </div>
          </div>
        </section>
        {/* <!-- Why Choose Us --> */}
        <section className="py-24 bg-surface-container-low relative overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Tại sao chọn Nhạc Cụ Việt?</h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group">
                <div className="mb-6 p-4 rounded-full bg-primary/5 inline-block group-hover:bg-primary/20 transition-all">
                  <span className="material-symbols-outlined text-primary text-4xl">verified</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">Chất lượng tuyệt đối</h3>
                <p className="text-on-surface-variant font-body-md">Mỗi nhạc cụ tại showroom đều được kiểm định bởi đội ngũ kỹ thuật viên giàu kinh nghiệm, đảm bảo tiêu chuẩn quốc tế.</p>
              </div>
              <div className="group">
                <div className="mb-6 p-4 rounded-full bg-primary/5 inline-block group-hover:bg-primary/20 transition-all">
                  <span className="material-symbols-outlined text-primary text-4xl">support_agent</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">Dịch vụ tận tâm</h3>
                <p className="text-on-surface-variant font-body-md">Hỗ trợ bảo hành dài hạn, bảo trì định kỳ và tư vấn chuyên sâu cho từng nhu cầu cụ thể của khách hàng.</p>
              </div>
              <div className="group">
                <div className="mb-6 p-4 rounded-full bg-primary/5 inline-block group-hover:bg-primary/20 transition-all">
                  <span className="material-symbols-outlined text-primary text-4xl">favorite</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">Niềm đam mê</h3>
                <p className="text-on-surface-variant font-body-md">Chúng tôi không chỉ bán nhạc cụ, chúng tôi chia sẻ tình yêu âm nhạc và đồng hành cùng sự thành công của bạn.</p>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Experts Team --> */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Đội ngũ chuyên gia</h2>
              <p className="text-on-surface-variant font-body-md max-w-xl">Hợp tác cùng những kỹ thuật viên và nghệ sĩ hàng đầu để mang lại trải nghiệm âm nhạc hoàn hảo nhất.</p>
            </div>
            <button className="hidden md:block text-primary font-bold border-b border-primary pb-1 text-glow">Xem tất cả thành viên</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* <!-- Expert Card 1 --> */}
            <div className="bg-surface-container rounded-xl overflow-hidden group">
              <div className="h-80 relative">
                <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" data-alt="A professional portrait of a senior Vietnamese piano technician with 30 years of experience, standing in a workshop with specialized tools. The lighting is focused and dramatic, highlighting the texture of the wooden piano parts in the background. The style is premium corporate with a warm, amber-toned professional color palette." ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h4 className="font-headline-md text-headline-md text-primary">Nguyễn Văn An</h4>
                <p className="text-on-surface-variant text-label-sm uppercase mt-1">Chuyên gia Piano</p>
              </div>
            </div>
            {/* <!-- Expert Card 2 --> */}
            <div className="bg-surface-container rounded-xl overflow-hidden group">
              <div className="h-80 relative">
                <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" data-alt="A high-end professional photograph of a female guitar luthier working on a custom acoustic guitar in a modern, dark-themed studio. Soft amber lighting catches the curves of the wood and her focused expression. The aesthetic is sophisticated and technically precise, emphasizing craftsmanship and high-quality instrument maintenance." ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h4 className="font-headline-md text-headline-md text-primary">Lê Minh Tú</h4>
                <p className="text-on-surface-variant text-label-sm uppercase mt-1">Nghệ nhân Guitar</p>
              </div>
            </div>
            {/* <!-- Expert Card 3 --> */}
            <div className="bg-surface-container rounded-xl overflow-hidden group">
              <div className="h-80 relative">
                <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" data-alt="Portrait of a modern sound engineer and music consultant surrounded by high-end studio equipment. The lighting features sharp amber highlights against a deep black background, creating a high-tech yet premium concert-hall feel. The focus is on technical excellence and professional authority in musical consultation." ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h4 className="font-headline-md text-headline-md text-primary">Trần Hoàng Nam</h4>
                <p className="text-on-surface-variant text-label-sm uppercase mt-1">Cố vấn âm thanh</p>
              </div>
            </div>
            {/* <!-- Expert Card 4 --> */}
            <div className="bg-surface-container rounded-xl overflow-hidden group">
              <div className="h-80 relative">
                <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" data-alt="A professional technician specializing in wind instruments, carefully inspecting a golden saxophone. The studio setting is dark and premium with dramatic spot lighting creating a metallic sheen on the instrument. The image conveys precision, technical mastery, and a luxury rhythmic brand personality."></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h4 className="font-headline-md text-headline-md text-primary">Phạm Gia Khánh</h4>
                <p className="text-on-surface-variant text-label-sm uppercase mt-1">Kỹ thuật viên Kèn</p>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Newsletter / CTA --> */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-4xl mx-auto bg-primary-container text-on-primary-fixed p-12 rounded-2xl amber-glow text-center">
            <h2 className="font-headline-lg text-headline-lg mb-6">Bắt đầu hành trình của bạn ngay hôm nay</h2>
            <p className="font-body-lg mb-8 opacity-90">Đăng ký để nhận thông tin về các dòng sản phẩm giới hạn và ưu đãi độc quyền dành cho nghệ sĩ.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input className="flex-1 bg-on-primary-fixed/10 border-on-primary-fixed/20 text-on-primary-fixed placeholder:text-on-primary-fixed/50 rounded-lg focus:ring-on-primary-fixed focus:border-on-primary-fixed" placeholder="Email của bạn" type="email" />
              <button className="px-8 py-3 bg-on-primary-fixed text-primary font-bold rounded-lg hover:scale-105 transition-transform">Đăng ký</button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
export default About