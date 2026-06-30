const HeroPage = () => {
  return (
    <>
      <section className="relative min-h-[819px] flex items-center overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10"></div>
        <div className="relative z-20 px-margin-desktop max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div className="space-y-6">
            <h1 className="font-display-lg text-display-lg leading-tight">
              Khám Phá <span className="text-primary">Thế Giới</span><br />
              Âm Nhạc!
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-lg">
              Đa dạng nhạc cụ chất lượng, giá tốt cho mọi đam mê âm nhạc. Từ những chiếc guitar thủ công đến những bộ trống uy lực nhất.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-primary text-on-primary font-bold py-4 px-8 rounded-lg metallic-sheen accent-glow transition-transform active:scale-95">
                MUA NGAY
              </button>
              <button className="border-2 border-primary text-primary font-bold py-4 px-8 rounded-lg hover:bg-primary/10 transition-all">
                TƯ VẤN NHANH
              </button>
            </div>
          </div>
          <div className="hidden lg:flex justify-end relative">
            <div className="relative w-full aspect-square max-w-xl">
              <img className="w-full h-full object-contain filter drop-shadow-2xl" data-alt="A professional studio shot of a high-end acoustic guitar with a polished wood finish, a sleek digital piano, and a detailed drum kit arranged artistically. The lighting is dramatic and cinematic, highlighting the textures and craftsmanship of the instruments against a deep charcoal grey and amber accented background, reflecting a premium concert hall atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS478cm80URo3sIEymye1_kGk5RI-jiMfYuu8qy8tCGRy7ZxdkJaA7MOedLSQ8zSdq_KIaW7LPgn25pq0O8aNqDyn7fCMtG9dAaU_xekPUUX9MUChanyvP8Cc5ozygkMSHnpp97RrHUd9j3SmMKc53oQ0NY-8tKULN1tEcxSUmPPpT0ut6XcAMY3zkI9SSib1S0wTpSoAY0dH8rSsoc4kxFzpBPRBNXJUJ6m4i8tZJ3iSXtbFZC046N7YoHZlplL0HhbSttVL9-7k" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroPage;