import Nav from "@/templates/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <div>
      <Nav/>
      {children}
    </div>
  )
}