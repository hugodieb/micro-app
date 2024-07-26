

export type DashboardPageGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

export function DashboardPage({
  className,
  children,
}: DashboardPageGenericProps) {
  return (
    <section className="{cn([
        'h-screen',
        className,
      ])}">
      {children}
    </section>
  )
}

export function DashboardPageHeader({
  className,
  children,
}: DashboardPageGenericProps) {
  return (
    <header className="{cn([
        'px-6 h-12 border-b border-border flex items-center justify-between',
        className,
      ])}">
      {children}
    </header>
  )
}

export function DashboardPageHeaderTtile({
  className,
  children,
}: DashboardPageGenericProps) {
  return (
    <h1 className="{cn([
        'text-xs text-muted-foreground uppercase',
        className,
      ])}">
      {children}
    </h1>
  )
}

export function DashboardPageHeaderNav({
  className,
  children,
}: DashboardPageGenericProps) {
  return (
    <nav className="{cn([
        '',
        className,
      ])}">
      {children}
    </nav>
  )
}

export function DashboardPageMain({
  className,
  children,
}: DashboardPageGenericProps) {
  return (
    <main className="{cn([
        'p-6',
        className,
      ])}">
      {children}
    </main>
  )
}
