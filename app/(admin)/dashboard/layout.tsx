import { auth } from "@/public/src/auth";
import AdminContent from "@/public/src/components/layout/admin.content";
import AdminFooter from "@/public/src/components/layout/admin.footer";
import AdminHeader from "@/public/src/components/layout/admin.header";
import AdminSideBar from "@/public/src/components/layout/admin.sidebar";
import { AdminContextProvider } from "@/public/src/library/admin.context";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log("session", session)

  if (!session) {
    redirect("/auth/login");
  }

  return  <AdminContextProvider>
            <div style={{ display: "flex" }}>
                <div className='left-side' style={{ minWidth: 80 }}>
                    <AdminSideBar session={session}/>
                </div>
                <div className='right-side' style={{ flex: 1 }}>
                    <AdminHeader session={session}/>
                    <AdminContent>
                        {children}
                    </AdminContent>
                    <AdminFooter />
                </div>
            </div>
        </AdminContextProvider>;
}