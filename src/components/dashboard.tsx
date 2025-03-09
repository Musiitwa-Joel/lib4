import { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Library,
  Menu,
  Moon,
  Settings,
  Sun,
  Users,
  BookCopy,
  Receipt,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { DashboardStats } from '@/components/dashboard-stats';
import { ClearancePage } from '@/components/clearance/clearance-page';
import { BooksPage } from '@/components/books/books-page';
import { BorrowingPage } from '@/components/borrowing/borrowing-page';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ActivePage = 'dashboard' | 'books' | 'borrowings' | 'clearance' | 'digital' | 'fines' | 'reports';

export function Dashboard() {
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'books':
        return <BooksPage />;
      case 'borrowings':
        return <BorrowingPage />;
      case 'clearance':
        return <ClearancePage />;
      default:
        return (
          <div className="p-6">
            <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
            <DashboardStats />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 transform border-r bg-card transition-transform duration-200 ease-in-out',
          !isSidebarOpen && '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b bg-primary px-4">
          <div className="flex items-center space-x-2">
            <Library className="h-6 w-6 text-primary-foreground" />
            <span className="font-semibold text-primary-foreground">Nkumba Library</span>
          </div>
        </div>
        <nav className="space-y-1 p-4">
          <Button
            variant={activePage === 'dashboard' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActivePage('dashboard')}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={activePage === 'books' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActivePage('books')}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Books
          </Button>
          <Button
            variant={activePage === 'borrowings' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActivePage('borrowings')}
          >
            <Users className="mr-2 h-4 w-4" />
            Borrowings
          </Button>
          <Button
            variant={activePage === 'digital' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActivePage('digital')}
          >
            <BookCopy className="mr-2 h-4 w-4" />
            Digital Library
          </Button>
          <Button
            variant={activePage === 'clearance' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActivePage('clearance')}
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            Clearance
          </Button>
          <Button
            variant={activePage === 'fines' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActivePage('fines')}
          >
            <Receipt className="mr-2 h-4 w-4" />
            Fines
          </Button>
          <Button
            variant={activePage === 'reports' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActivePage('reports')}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Reports
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          'transition-margin duration-200 ease-in-out',
          isSidebarOpen ? 'ml-64' : 'ml-0'
        )}
      >
        {/* Top Bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center justify- between border-b bg-card px-4 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@library.nkumba.edu
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Page Content */}
        {renderContent()}
      </div>
    </div>
  );
}