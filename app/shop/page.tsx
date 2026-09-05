'use client'

import { useRouter } from 'next/navigation'
import { Clock, GripVertical, MapPin, Phone, Plus, Store, Trash2, UtensilsCrossed } from 'lucide-react'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import {
  uid,
  useProfiles,
  type MenuCategory,
  type MenuItem,
  type ShopData,
} from '@/components/dashboard/store'

export default function ShopPage() {
  const router = useRouter()
  const { active, updateProfile, activateShop } = useProfiles()

  if (active.type !== 'shop' || !active.shop) {
    return (
      <div className="min-h-[100dvh] bg-background">
        <DashboardNav />
        <main className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Store className="h-7 w-7" />
          </span>
          <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-foreground">
            Shop isn&apos;t active on {active.name}
          </h1>
          <p className="mt-2 max-w-md text-pretty text-muted-foreground">
            Activate the shop feature to add a menu, your location, and opening hours right on this
            profile.
          </p>
          <button
            type="button"
            onClick={() => activateShop(active.id)}
            className="mt-6 rounded-full bg-primary px-6 py-3 font-display text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Activate shop
          </button>
          <button
            type="button"
            onClick={() => router.push('/home')}
            className="mt-3 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            Back to home
          </button>
        </main>
      </div>
    )
  }

  const shop = active.shop

  function patch(next: Partial<ShopData>) {
    updateProfile(active.id, { shop: { ...shop, ...next } })
  }
  function patchCategories(categories: MenuCategory[]) {
    patch({ categories })
  }

  function addCategory() {
    patchCategories([...shop.categories, { id: uid('cat'), name: 'New category', items: [] }])
  }
  function renameCategory(id: string, name: string) {
    patchCategories(shop.categories.map((c) => (c.id === id ? { ...c, name } : c)))
  }
  function removeCategory(id: string) {
    patchCategories(shop.categories.filter((c) => c.id !== id))
  }
  function addItem(catId: string) {
    patchCategories(
      shop.categories.map((c) =>
        c.id === catId
          ? { ...c, items: [...c.items, { id: uid('item'), name: '', description: '', price: '' }] }
          : c,
      ),
    )
  }
  function updateItem(catId: string, itemId: string, next: Partial<MenuItem>) {
    patchCategories(
      shop.categories.map((c) =>
        c.id === catId
          ? { ...c, items: c.items.map((it) => (it.id === itemId ? { ...it, ...next } : it)) }
          : c,
      ),
    )
  }
  function removeItem(catId: string, itemId: string) {
    patchCategories(
      shop.categories.map((c) =>
        c.id === catId ? { ...c, items: c.items.filter((it) => it.id !== itemId) } : c,
      ),
    )
  }

  const itemCount = shop.categories.reduce((n, c) => n + c.items.length, 0)

  return (
    <div className="min-h-[100dvh] bg-background">
      <DashboardNav />

      <main className="mx-auto w-full max-w-6xl px-5 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
                Menu editor
              </h1>
              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
                Premium
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">
              {itemCount} items · {shop.categories.length} categories on{' '}
              <span className="font-semibold text-foreground">{active.name}</span>
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Editor */}
          <div className="flex flex-col gap-5">
            {/* Shop details */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold text-foreground">Shop details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Location" icon={MapPin}>
                  <input
                    value={shop.location}
                    onChange={(e) => patch({ location: e.target.value })}
                    placeholder="123 Market St, San Francisco"
                    className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/60"
                  />
                </Field>
                <Field label="Phone" icon={Phone}>
                  <input
                    value={shop.phone}
                    onChange={(e) => patch({ phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/60"
                  />
                </Field>
              </div>
            </section>

            {/* Categories */}
            <section className="flex flex-col gap-4">
              {shop.categories.map((cat) => (
                <div key={cat.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                    <input
                      value={cat.name}
                      onChange={(e) => renameCategory(cat.id, e.target.value)}
                      className="flex-1 rounded-lg bg-transparent px-1 py-1 font-display text-lg font-bold text-foreground outline-none focus:bg-muted"
                    />
                    <button
                      type="button"
                      onClick={() => removeCategory(cat.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`Remove ${cat.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-col gap-3">
                    {cat.items.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[1fr_auto] gap-3 rounded-xl border border-border bg-background p-3"
                      >
                        <div className="flex flex-col gap-2">
                          <input
                            value={item.name}
                            onChange={(e) => updateItem(cat.id, item.id, { name: e.target.value })}
                            placeholder="Item name"
                            className="w-full bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground/60"
                          />
                          <input
                            value={item.description}
                            onChange={(e) =>
                              updateItem(cat.id, item.id, { description: e.target.value })
                            }
                            placeholder="Short description"
                            className="w-full bg-transparent text-xs text-muted-foreground outline-none placeholder:text-muted-foreground/50"
                          />
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="flex items-center rounded-lg border border-border bg-card px-2 py-1.5">
                            <span className="text-sm font-semibold text-muted-foreground">$</span>
                            <input
                              value={item.price}
                              onChange={(e) =>
                                updateItem(cat.id, item.id, {
                                  price: e.target.value.replace(/[^0-9.]/g, ''),
                                })
                              }
                              placeholder="0.00"
                              inputMode="decimal"
                              className="w-16 bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground/60"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(cat.id, item.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addItem(cat.id)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-border py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Plus className="h-4 w-4" />
                      Add item
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addCategory}
                className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card py-4 font-display text-sm font-bold text-foreground transition-colors hover:bg-muted"
              >
                <Plus className="h-4 w-4 text-primary" />
                Add category
              </button>
            </section>

            {/* Hours */}
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                <Clock className="h-4 w-4 text-primary" />
                Opening hours
              </h2>
              <div className="mt-4 flex flex-col divide-y divide-border">
                {shop.hours.map((row, i) => (
                  <div key={row.day} className="flex items-center gap-3 py-2.5">
                    <span className="w-24 text-sm font-semibold text-foreground">{row.day}</span>
                    {row.closed ? (
                      <span className="flex-1 text-sm font-medium text-muted-foreground">Closed</span>
                    ) : (
                      <div className="flex flex-1 items-center gap-2">
                        <input
                          type="time"
                          value={row.open}
                          onChange={(e) => {
                            const hours = [...shop.hours]
                            hours[i] = { ...row, open: e.target.value }
                            patch({ hours })
                          }}
                          className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm font-medium text-foreground outline-none"
                        />
                        <span className="text-muted-foreground">–</span>
                        <input
                          type="time"
                          value={row.close}
                          onChange={(e) => {
                            const hours = [...shop.hours]
                            hours[i] = { ...row, close: e.target.value }
                            patch({ hours })
                          }}
                          className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm font-medium text-foreground outline-none"
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const hours = [...shop.hours]
                        hours[i] = { ...row, closed: !row.closed }
                        patch({ hours })
                      }}
                      className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                        row.closed
                          ? 'bg-muted text-muted-foreground hover:bg-border'
                          : 'bg-primary/10 text-primary hover:bg-primary/20'
                      }`}
                    >
                      {row.closed ? 'Closed' : 'Open'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Live preview */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <MenuPreview
              name={active.name}
              main={active.mainColor}
              accent={active.accentColor}
              shop={shop}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string
  icon: typeof MapPin
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        {children}
      </span>
    </label>
  )
}

function MenuPreview({
  name,
  main,
  accent,
  shop,
}: {
  name: string
  main: string
  accent: string
  shop: ShopData
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
      <div className="p-5 text-center" style={{ background: main }}>
        <p className="font-display text-lg font-extrabold text-white drop-shadow-sm">{name}</p>
        {shop.location ? (
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-white/85">
            <MapPin className="h-3 w-3" />
            {shop.location}
          </p>
        ) : null}
      </div>
      <div className="max-h-[60vh] overflow-y-auto p-5">
        {shop.categories.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Your menu is empty. Add a category to get started.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {shop.categories.map((cat) => (
              <div key={cat.id}>
                <h3
                  className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide"
                  style={{ color: main }}
                >
                  <UtensilsCrossed className="h-3.5 w-3.5" />
                  {cat.name}
                </h3>
                <div className="mt-2 flex flex-col gap-2.5">
                  {cat.items.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No items yet.</p>
                  ) : (
                    cat.items.map((item) => (
                      <div key={item.id} className="flex items-baseline gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {item.name || 'Untitled item'}
                          </p>
                          {item.description ? (
                            <p className="truncate text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          ) : null}
                        </div>
                        <span
                          className="shrink-0 rounded-md px-1.5 py-0.5 text-sm font-bold"
                          style={{ background: accent, color: '#1b1b1f' }}
                        >
                          {item.price ? `$${item.price}` : '—'}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
