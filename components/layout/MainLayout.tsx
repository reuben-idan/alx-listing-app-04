import React, { ReactNode } from 'react';
import Head from 'next/head';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'ALX Listing App',
  description = 'Find and book unique properties around the world',
  className = '',
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">ALX Stays</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="/favorites" className="text-gray-700 hover:text-blue-600 transition-colors">Favorites</a></li>
              <li><a href="/bookings" className="text-gray-700 hover:text-blue-600 transition-colors">My Bookings</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-grow container mx-auto px-4 py-8 ${className}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ALX Stays</h3>
              <p className="text-gray-600">Find your perfect stay with our curated selection of properties worldwide.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Popular destinations</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Unique stays</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Experiences</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Hosting</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Become a host</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Host resources</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Community forum</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Safety information</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} ALX Stays. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
