import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4 justify-between">
        <div className="flex gap-x-4 gap-y-1 pb-1 text-sm font-semibold">
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Tasks
          </Link>
          <Link
            to="/statistics"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Statistics
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-1.5 sm:ml-0 sm:gap-2">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
