'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const menus = [
  {
    name: "Trang chủ",
    href: "/",
  },
  {
    name: "Sản phẩm",
    href: "/product",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Giới thiệu",
    href: "/about",
  },
  {
    name: "Liên hệ",
    href: "/contact",
  },
];
const NavigationPage = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="hidden md:flex items-center gap-8">
        {menus.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`relative py-2 transition-colors ${pathname === item.href
                ? "text-primary"
                : "text-on-surface-variant hover:text-primary"
              }`}
          >
            {item.name}

            {pathname === item.href && (
              <motion.div
                layoutId="navbar"
                className="absolute left-0 right-0 bottom-0 h-[2px] bg-primary"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 35,
                }}
              />
            )}
          </Link>
        ))}
      </div>
    </>
  )
}

export default NavigationPage;