// app/admin/page.jsx

import AdminHeader from './components/Header';
import AcademicsGrid from './components/grid';
// Import your other components like Search or Footer if needed
// import Search from '@/components/Search';
// import Footer from '@/components/Footer';

export default function AdminPage() {
  return (
    // Set the dark background for the whole page
    <div className="bg-[#121212] min-h-screen">
      {/* <Search /> */}
      
      <main className="container mx-auto py-8">
        <AdminHeader />
        <AcademicsGrid />
      </main>

      {/* <Footer /> */}
    </div>
  );
}