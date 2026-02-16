import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons'
import css from './index.module.css'

const CATEGORY = 'Laptops > Gaming Laptops'
const MAX_PRICE = 1500
const DETECTED_FINISH_COLORS = ['Black', 'Midnight']
const CLOUDINARY_GAMING_LAPTOP_SKUS = new Set(
  Array.from({ length: 12 }, (_, index) => `gl-${String(index + 1001)}`)
)

const PRODUCTS = [
  {
    sku: 'GL-1001',
    name: 'Zephyr 14',
    brand: 'ASUS',
    processor: 'AMD Ryzen 7',
    ram: '16GB',
    storage: '1TB SSD',
    color: 'Black',
    sale_price: 1399,
    sales_rank: 4,
  },
  {
    sku: 'GL-1002',
    name: 'Blade 15 Base',
    brand: 'Razer',
    processor: 'Intel Core i7',
    ram: '16GB',
    storage: '512GB SSD',
    color: 'Midnight',
    sale_price: 1499,
    sales_rank: 1,
  },
  {
    sku: 'GL-1003',
    name: 'Legion Slim 7',
    brand: 'Lenovo',
    processor: 'Intel Core i7',
    ram: '32GB',
    storage: '1TB SSD',
    color: 'Black',
    sale_price: 1449,
    sales_rank: 3,
  },
  {
    sku: 'GL-1004',
    name: 'Predator Helios Neo',
    brand: 'Acer',
    processor: 'Intel Core i5',
    ram: '16GB',
    storage: '1TB SSD',
    color: 'Black',
    sale_price: 1299,
    sales_rank: 7,
  },
  {
    sku: 'GL-1005',
    name: 'Stealth M16',
    brand: 'MSI',
    processor: 'Intel Core i7',
    ram: '32GB',
    storage: '1TB SSD',
    color: 'Midnight',
    sale_price: 1479,
    sales_rank: 2,
  },
  {
    sku: 'GL-1006',
    name: 'Nitro V 15',
    brand: 'Acer',
    processor: 'Intel Core i5',
    ram: '16GB',
    storage: '512GB SSD',
    color: 'Black',
    sale_price: 1099,
    sales_rank: 10,
  },
  {
    sku: 'GL-1007',
    name: 'OMEN 16',
    brand: 'HP',
    processor: 'AMD Ryzen 7',
    ram: '16GB',
    storage: '1TB SSD',
    color: 'Midnight',
    sale_price: 1349,
    sales_rank: 6,
  },
  {
    sku: 'GL-1008',
    name: 'G16',
    brand: 'Dell',
    processor: 'Intel Core i7',
    ram: '32GB',
    storage: '1TB SSD',
    color: 'Black',
    sale_price: 1499,
    sales_rank: 5,
  },
  {
    sku: 'GL-1009',
    name: 'MacBook Pro 14',
    brand: 'Apple',
    processor: 'Apple M3 Pro',
    ram: '18GB',
    storage: '1TB SSD',
    color: 'Space Gray',
    sale_price: 1699,
    sales_rank: 11,
  },
  {
    sku: 'GL-1010',
    name: 'TUF A15',
    brand: 'ASUS',
    processor: 'AMD Ryzen 9',
    ram: '16GB',
    storage: '512GB SSD',
    color: 'Silver',
    sale_price: 1199,
    sales_rank: 9,
  },
  {
    sku: 'GL-1011',
    name: 'Alienware m16',
    brand: 'Dell',
    processor: 'Intel Core i7',
    ram: '32GB',
    storage: '2TB SSD',
    color: 'Black',
    sale_price: 1799,
    sales_rank: 12,
  },
  {
    sku: 'GL-1012',
    name: 'ROG Flow X13',
    brand: 'ASUS',
    processor: 'AMD Ryzen 7',
    ram: '16GB',
    storage: '1TB SSD',
    color: 'Midnight',
    sale_price: 1429,
    sales_rank: 8,
  },
].map((item) => ({ ...item, category: CATEGORY }))

const getProductImageSrc = (sku) => {
  const normalizedSku = sku.toLowerCase()
  if (CLOUDINARY_GAMING_LAPTOP_SKUS.has(normalizedSku)) {
    return `/media/gaming-laptops/${normalizedSku}.svg`
  }

  return `/gaming-laptops/${normalizedSku}.svg`
}

const PRICE_OPTIONS = [
  { id: 'under-1000', label: 'Under $1,000', min: 0, max: 999 },
  { id: '1000-1500', label: '$1,000-$1,500', min: 1000, max: 1500 },
]

const FACETS = [
  {
    id: 'brand',
    label: 'Brand',
    options: ['Dell', 'HP', 'Lenovo', 'Apple', 'ASUS', 'Acer', 'MSI', 'Razer'],
  },
  {
    id: 'processor',
    label: 'Processor',
    options: [
      'Intel Core i7',
      'Intel Core i5',
      'AMD Ryzen 7',
      'AMD Ryzen 9',
      'Apple M3 Pro',
    ],
  },
  {
    id: 'price',
    label: 'Price',
    options: PRICE_OPTIONS.map((option) => option.id),
  },
  {
    id: 'color',
    label: 'Color',
    options: ['Black', 'Midnight', 'Silver', 'Space Gray', 'Starlight', 'White'],
  },
  {
    id: 'ram',
    label: 'RAM',
    options: ['8GB', '16GB', '18GB', '32GB', '64GB'],
  },
  {
    id: 'storage',
    label: 'Storage',
    options: ['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD'],
  },
]

const DEFAULT_SELECTIONS = {
  brand: [],
  processor: [],
  price: [],
  color: [...DETECTED_FINISH_COLORS],
  ram: [],
  storage: [],
}

const DEFAULT_DETECTED_STATE = {
  category: true,
  budget: true,
}

const DEMO_SCENARIOS = {
  default: {
    query: 'gaming laptops under $1500 with a dark finish',
    showSystemMessage: true,
    selected: DEFAULT_SELECTIONS,
    detectedState: DEFAULT_DETECTED_STATE,
    detectedProcessor: null,
  },
  'followup-core-i7': {
    query: 'with core i7',
    showSystemMessage: false,
    selected: {
      ...DEFAULT_SELECTIONS,
      processor: ['Intel Core i7'],
    },
    detectedState: DEFAULT_DETECTED_STATE,
    detectedProcessor: 'Intel Core i7',
  },
}

const FACET_TO_PAYLOAD_KEY = {
  brand: 'brands',
  processor: 'attributes.processor',
  color: 'attributes.color',
  ram: 'attributes.ram',
  storage: 'attributes.storage',
}

const SORT_OPTIONS = [
  { value: 'best-selling', label: 'Sort by Best Selling' },
  { value: 'relevance', label: 'Sort by Relevance' },
  { value: 'price-asc', label: 'Sort by Price: Low to High' },
  { value: 'price-desc', label: 'Sort by Price: High to Low' },
]

const PRICE_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

function toOptionLabel(facetId, value) {
  if (facetId !== 'price') return value
  return PRICE_OPTIONS.find((option) => option.id === value)?.label || value
}

function formatHumanList(values) {
  if (!values.length) return ''
  if (values.length === 1) return values[0]
  if (values.length === 2) return `${values[0]} or ${values[1]}`
  return `${values.slice(0, -1).join(', ')}, or ${values[values.length - 1]}`
}

function matchesPrice(product, selectedPrices) {
  if (!selectedPrices.length) return true
  return selectedPrices.some((id) => {
    const range = PRICE_OPTIONS.find((option) => option.id === id)
    if (!range) return true
    return product.sale_price >= range.min && product.sale_price <= range.max
  })
}

function filterProducts(products, selected, detectedState) {
  return products.filter((product) => {
    if (detectedState.category && product.category !== CATEGORY) return false
    if (detectedState.budget && product.sale_price > MAX_PRICE) return false
    if (selected.brand.length && !selected.brand.includes(product.brand)) return false
    if (selected.processor.length && !selected.processor.includes(product.processor)) {
      return false
    }
    if (selected.color.length && !selected.color.includes(product.color)) return false
    if (selected.ram.length && !selected.ram.includes(product.ram)) return false
    if (selected.storage.length && !selected.storage.includes(product.storage)) {
      return false
    }
    if (!matchesPrice(product, selected.price)) return false
    return true
  })
}

function sortProducts(products, sortBy) {
  const copy = [...products]
  if (sortBy === 'best-selling') {
    return copy.sort((a, b) => a.sales_rank - b.sales_rank)
  }
  if (sortBy === 'price-asc') return copy.sort((a, b) => a.sale_price - b.sale_price)
  if (sortBy === 'price-desc') return copy.sort((a, b) => b.sale_price - a.sale_price)
  return copy
}

function getIndexFromSort(sortBy) {
  if (sortBy === 'best-selling') return 'products_best_selling'
  if (sortBy === 'price-asc') return 'products_price_asc'
  if (sortBy === 'price-desc') return 'products_price_desc'
  return 'products_relevance'
}

function buildPayload(selected, detectedState, sortBy) {
  const facetFilters = []
  const numericFilters = []

  if (detectedState.category) {
    facetFilters.push([`categories.lvl1:${CATEGORY}`])
  }

  for (const [facetId, payloadKey] of Object.entries(FACET_TO_PAYLOAD_KEY)) {
    if (!selected[facetId]?.length) continue
    facetFilters.push(selected[facetId].map((value) => `${payloadKey}:${value}`))
  }

  if (detectedState.budget) {
    numericFilters.push(`prices.sale_price <= ${MAX_PRICE}`)
  }

  if (selected.price.length === 1) {
    if (selected.price[0] === 'under-1000') numericFilters.push('prices.sale_price <= 999')
    if (selected.price[0] === '1000-1500') {
      numericFilters.push('prices.sale_price >= 1000')
      numericFilters.push('prices.sale_price <= 1500')
    }
  }

  return {
    index: getIndexFromSort(sortBy),
    query: '',
    facetFilters,
    numericFilters,
    facets: [
      'brands',
      'attributes.processor',
      'attributes.ram',
      'attributes.storage',
      'attributes.color',
      'prices.sale_price',
      'attributes.screen_size',
    ],
  }
}

function cloneSelections(selected) {
  return {
    brand: [...selected.brand],
    processor: [...selected.processor],
    price: [...selected.price],
    color: [...selected.color],
    ram: [...selected.ram],
    storage: [...selected.storage],
  }
}

const AIProductSearchDemo = ({ scenario = 'default' }) => {
  const scenarioConfig = DEMO_SCENARIOS[scenario] || DEMO_SCENARIOS.default
  const [selected, setSelected] = useState(() => cloneSelections(scenarioConfig.selected))
  const [detectedState, setDetectedState] = useState(() => ({
    ...scenarioConfig.detectedState,
  }))
  const [sortBy, setSortBy] = useState('best-selling')
  const [openFacetId, setOpenFacetId] = useState(null)
  const [mobileMenuStyle, setMobileMenuStyle] = useState(null)
  const containerRef = useRef(null)
  const railRef = useRef(null)
  const didInitLoadingRef = useRef(false)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const filteredProducts = useMemo(() => {
    const results = filterProducts(PRODUCTS, selected, detectedState)
    return sortProducts(results, sortBy)
  }, [detectedState, selected, sortBy])
  const [visibleProducts, setVisibleProducts] = useState(filteredProducts)

  const generatedPayload = useMemo(
    () => buildPayload(selected, detectedState, sortBy),
    [detectedState, selected, sortBy]
  )

  const detectedFilters = useMemo(
    () => {
      const filters = [
        {
          key: 'category',
          label: 'Category: Gaming Laptops',
          active: true,
          disabled: true,
          showCheckbox: false,
        },
        {
          key: 'budget',
          label: `Price: Up to ${PRICE_FORMATTER.format(MAX_PRICE)}`,
          active: detectedState.budget,
          showCheckbox: true,
          onClick: () =>
            setDetectedState((prev) => ({ ...prev, budget: !prev.budget })),
        },
        {
          key: 'finish',
          label: `Finish: ${formatHumanList(DETECTED_FINISH_COLORS)}`,
          active: selected.color.length > 0,
          showCheckbox: true,
          onClick: () =>
            setSelected((prev) => ({
              ...prev,
              color: prev.color.length ? [] : [...DETECTED_FINISH_COLORS],
            })),
        },
      ]

      if (scenarioConfig.detectedProcessor) {
        filters.push({
          key: 'processor-detected',
          label: `Processor: ${scenarioConfig.detectedProcessor}`,
          active: selected.processor.includes(scenarioConfig.detectedProcessor),
          showCheckbox: true,
          onClick: () =>
            toggleSelection('processor', scenarioConfig.detectedProcessor),
        })
      }

      return filters
    },
    [detectedState.budget, scenarioConfig.detectedProcessor, selected.color, selected.processor]
  )

  useEffect(() => {
    if (!didInitLoadingRef.current) {
      didInitLoadingRef.current = true
      setVisibleProducts(filteredProducts)
      return
    }

    setIsLoading(true)
    const timeoutId = window.setTimeout(() => {
      setVisibleProducts(filteredProducts)
      setIsLoading(false)
    }, 500)

    return () => window.clearTimeout(timeoutId)
  }, [filteredProducts])

  useEffect(() => {
    const handleOutside = (event) => {
      if (openFacetId === null) return

      const target = event.target
      const activeFacet = target?.closest?.(`[data-facet-id="${openFacetId}"]`)
      if (activeFacet) return

      setOpenFacetId(null)
      setMobileMenuStyle(null)
    }
    document.addEventListener('pointerdown', handleOutside)
    return () => document.removeEventListener('pointerdown', handleOutside)
  }, [openFacetId])

  useEffect(() => {
    if (openFacetId === null) return
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(max-width: 760px)').matches) return

    const closeMenu = () => {
      setOpenFacetId(null)
      setMobileMenuStyle(null)
    }

    // Prevent detached fixed-position menus after viewport scroll/resize.
    window.addEventListener('scroll', closeMenu, true)
    window.addEventListener('resize', closeMenu)
    window.addEventListener('orientationchange', closeMenu)

    return () => {
      window.removeEventListener('scroll', closeMenu, true)
      window.removeEventListener('resize', closeMenu)
      window.removeEventListener('orientationchange', closeMenu)
    }
  }, [openFacetId])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const update = () => {
      const maxLeft = rail.scrollWidth - rail.clientWidth
      setCanScrollPrev(rail.scrollLeft > 4)
      setCanScrollNext(maxLeft - rail.scrollLeft > 4)
    }

    update()
    rail.addEventListener('scroll', update)
    window.addEventListener('resize', update)
    return () => {
      rail.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [visibleProducts.length])

  const toggleSelection = (facetId, optionValue) => {
    setSelected((prev) => {
      const current = prev[facetId]
      const isActive = current.includes(optionValue)
      return {
        ...prev,
        [facetId]: isActive
          ? current.filter((value) => value !== optionValue)
          : [...current, optionValue],
      }
    })
  }

  const scrollRail = (direction) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: direction * 320, behavior: 'smooth' })
  }

  const handleFacetToggle = (facetId, event) => {
    const isClosing = openFacetId === facetId
    if (isClosing) {
      setOpenFacetId(null)
      setMobileMenuStyle(null)
      return
    }

    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches) {
      const triggerRect = event.currentTarget.getBoundingClientRect()
      const containerRect = containerRef.current?.getBoundingClientRect()
      const viewportPadding = 8
      const containerPadding = 8
      const minLeft = Math.max(
        viewportPadding,
        (containerRect?.left ?? viewportPadding) + containerPadding
      )
      const maxRight = Math.min(
        window.innerWidth - viewportPadding,
        (containerRect?.right ?? window.innerWidth - viewportPadding) - containerPadding
      )
      const menuWidth = Math.min(220, Math.max(0, maxRight - minLeft))
      const left = Math.min(
        Math.max(triggerRect.left, minLeft),
        Math.max(minLeft, maxRight - menuWidth)
      )

      const estimatedMenuHeight = 272
      const downTop = triggerRect.bottom + 6
      const upTop = triggerRect.top - estimatedMenuHeight - 6
      const canOpenDown =
        downTop + estimatedMenuHeight <= window.innerHeight - viewportPadding
      const top = canOpenDown
        ? downTop
        : Math.max(viewportPadding, Math.min(upTop, window.innerHeight - estimatedMenuHeight))

      setMobileMenuStyle({
        top: `${top}px`,
        left: `${left}px`,
        width: `${menuWidth}px`,
      })
    } else {
      setMobileMenuStyle(null)
    }

    setOpenFacetId(facetId)
  }

  return (
    <section className={`not-prose ${css.wrap}`}>
      <div className={css.demoShell}>
        <div className={css.chatWindow} ref={containerRef}>
          <div className={css.messages}>
            {scenarioConfig.showSystemMessage && (
              <div className={css.systemRow}>
                <div className={css.systemBubble}>How can I help you</div>
              </div>
            )}

            <div className={css.userRow}>
              <div className={css.userBubble}>{scenarioConfig.query}</div>
            </div>

            <div className={css.assistantRow}>
              <div className={css.leftPanel}>
                <div className={css.detectedRow}>
                  <span className={css.detectedLabel}>Detected filters</span>
                  {detectedFilters.map((chip) => (
                    <button
                      type="button"
                      className={
                        chip.disabled
                          ? css.detectedChipDisabled
                          : chip.active
                            ? css.detectedChip
                            : css.detectedChipOff
                      }
                      key={chip.key}
                      disabled={chip.disabled}
                      onClick={chip.onClick}
                    >
                      {chip.showCheckbox && (
                        <span
                          className={chip.active ? css.detectedCheck : css.detectedCheckOff}
                        >
                          <CheckIcon width={11} height={11} />
                        </span>
                      )}
                      <span>{chip.label}</span>
                    </button>
                  ))}
                </div>

                <div className={css.followupRow}>
                  <span className={css.countText}>{visibleProducts.length} products</span>
                  <span className={css.toolbarDivider} />

                  {FACETS.slice(0, 5).map((facet) => {
                    const selectedCount = selected[facet.id].length
                    const hasSelection = selectedCount > 0
                    const optionStates = facet.options
                      .map((optionValue) => {
                        const selectedNow = selected[facet.id].includes(optionValue)
                        const count = filteredProducts.filter(
                          (product) => product[facet.id] === optionValue
                        ).length
                        return {
                          optionValue,
                          selectedNow,
                          count,
                        }
                      })
                      .filter(({ selectedNow, count }) => selectedNow || count > 0)
                      .sort((a, b) => {
                        if (a.selectedNow !== b.selectedNow) {
                          return a.selectedNow ? -1 : 1
                        }
                        if (b.count !== a.count) return b.count - a.count
                        return a.optionValue.localeCompare(b.optionValue)
                      })

                    if (!hasSelection && optionStates.length === 0) return null

                    const isOpen = openFacetId === facet.id
                    return (
                      <div className={css.filterChipWrap} key={facet.id} data-facet-id={facet.id}>
                        <button
                          type="button"
                          className={hasSelection ? css.filterChipActive : css.filterChip}
                          onClick={(event) => handleFacetToggle(facet.id, event)}
                        >
                          <span>
                            {facet.label}
                          </span>
                          {hasSelection && (
                            <span className={css.selectedCountBadge}>{selectedCount}</span>
                          )}
                          <ChevronDownIcon
                            width={16}
                            height={16}
                            className={isOpen ? css.chevronOpen : css.chevron}
                          />
                        </button>

                        {isOpen && (
                          <div className={css.menu} style={mobileMenuStyle || undefined}>
                            {optionStates.map(({ optionValue, selectedNow, count }) => (
                                <button
                                  type="button"
                                  key={`${facet.id}-${optionValue}`}
                                  className={css.menuOption}
                                  onClick={() => toggleSelection(facet.id, optionValue)}
                                >
                                  <span className={selectedNow ? css.checkOn : css.checkOff}>
                                    {selectedNow && <CheckIcon width={11} height={11} />}
                                  </span>
                                  <span className={css.menuLabel}>
                                    {toOptionLabel(facet.id, optionValue)}
                                  </span>
                                  <span className={css.menuCount}>{count > 0 ? count : ''}</span>
                                </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}

                  <div className={css.sortWrap}>
                    <select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className={css.sortSelect}
                      aria-label="Sort products"
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div
                  className={
                    isLoading
                      ? `${css.carouselStage} ${css.carouselStageLoading}`
                      : css.carouselStage
                  }
                >
                  <div className={css.rail} ref={railRef}>
                    {visibleProducts.map((product) => (
                      <article key={product.sku} className={css.card}>
                        <div className={css.imageWrap}>
                          <img
                            className={css.productImage}
                            src={getProductImageSrc(product.sku)}
                            alt={`${product.brand} ${product.name}`}
                            loading="lazy"
                          />
                        </div>

                        <div className={css.cardBody}>
                          <p className={css.brandLine}>
                            {product.brand.toUpperCase()}
                            <span className={css.stockDot} />
                            <span className={css.stockText}>IN STOCK</span>
                          </p>

                          <h4 className={css.name}>{product.name}</h4>
                          <p className={css.sku}>{product.sku}</p>

                          <p className={css.price}>
                            {PRICE_FORMATTER.format(product.sale_price)}
                          </p>

                          <button type="button" className={css.addToCartButton}>
                            Add to Cart
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={css.carouselArrowLeft}
                    onClick={() => scrollRail(-1)}
                    disabled={!canScrollPrev || isLoading}
                    aria-label="Scroll products left"
                  >
                    <ChevronLeftIcon width={18} height={18} />
                  </button>

                  <button
                    type="button"
                    className={css.carouselArrowRight}
                    onClick={() => scrollRail(1)}
                    disabled={!canScrollNext || isLoading}
                    aria-label="Scroll products right"
                  >
                    <ChevronRightIcon width={18} height={18} />
                  </button>

                  {isLoading && (
                    <div className={css.loadingOverlay} aria-live="polite">
                      <span className={css.loadingSpinner} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className={css.payloadPanel}>
          <p className={css.payloadTitle}>Search Payload</p>
          <pre>{JSON.stringify(generatedPayload, null, 2)}</pre>
        </aside>
      </div>
    </section>
  )
}

export default AIProductSearchDemo
