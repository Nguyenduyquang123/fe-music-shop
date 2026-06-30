
import Image from "next/image";
import NavigationPage from "./header/navigation";
import logo from "../../../../public/src/assets/image/logp.jpg";

const HeaderPage = () => {
    return (
        <>
            <nav className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-md shadow-sm dark:shadow-none">
                <div className="container flex items-center justify-between h-20">
                    <div className="flex items-center gap-3">
                        <Image
                            src={logo} // Đường dẫn đến ảnh của bạn trong thư mục public
                            alt="Logo Nhạc Cụ Việt"
                            width={60}      // Điều chỉnh kích thước tùy ý
                            height={60}
                            className="object-cover rounded-[50%]"
                        />
                        <div className="text-headline-md font-headline-md font-bold text-primary">
                            Camus music
                        </div>
                    </div>
                    <NavigationPage />
                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <input className="bg-surface-container text-body-md px-4 py-2 rounded-full border-none focus:ring-2 focus:ring-primary/50 w-64 transition-all" placeholder="Tìm kiếm nhạc cụ..." type="text" />
                        </div>
                        <button className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container transition-all active:scale-95">
                            <span className="material-symbols-outlined text-primary">shopping_cart</span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
};

export default HeaderPage;