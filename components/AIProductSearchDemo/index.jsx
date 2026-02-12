import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons'
import css from './index.module.css'

const QUERY = 'gaming laptops under $1500 with a dark finish'
const CATEGORY = 'Laptops > Gaming Laptops'
const MAX_PRICE = 1500
const DETECTED_FINISH_COLORS = ['Black', 'Midnight']

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
    swatches: ['Black', 'Midnight', 'Silver'],
    swatchMore: 0,
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
    swatches: ['Midnight', 'Black'],
    swatchMore: 0,
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
    swatches: ['Black', 'Silver', 'Midnight'],
    swatchMore: 0,
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
    swatches: ['Black', 'Silver'],
    swatchMore: 0,
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
    swatches: ['Midnight', 'Black', 'White'],
    swatchMore: 2,
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
    swatches: ['Black', 'Silver'],
    swatchMore: 0,
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
    swatches: ['Midnight', 'Black', 'Silver'],
    swatchMore: 0,
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
    swatches: ['Black', 'White', 'Silver'],
    swatchMore: 0,
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
    swatches: ['Space Gray', 'Silver'],
    swatchMore: 0,
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
    swatches: ['Silver', 'Black'],
    swatchMore: 0,
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
    swatches: ['Black', 'White'],
    swatchMore: 0,
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
    swatches: ['Midnight', 'Black', 'Silver'],
    swatchMore: 0,
  },
].map((item) => ({ ...item, category: CATEGORY }))

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

const SORT_OPTIONS = [
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
  if (sortBy === 'price-asc') return copy.sort((a, b) => a.sale_price - b.sale_price)
  if (sortBy === 'price-desc') return copy.sort((a, b) => b.sale_price - a.sale_price)
  return copy
}

function countForOption(products, selected, detectedState, facetId, optionValue) {
  const next = {
    ...selected,
    [facetId]: selected[facetId].includes(optionValue)
      ? selected[facetId]
      : [...selected[facetId], optionValue],
  }
  return filterProducts(products, next, detectedState).length
}

function compactChipLabel(label, values, facetId) {
  if (!values.length) return label
  const rendered = values.map((value) => toOptionLabel(facetId, value))
  if (rendered.length === 1) return `${label}: ${rendered[0]}`
  return `${label}: ${rendered[0]} +${rendered.length - 1}`
}

const AIProductSearchDemo = () => {
  const [selected, setSelected] = useState(DEFAULT_SELECTIONS)
  const [detectedState, setDetectedState] = useState({
    category: true,
    budget: true,
  })
  const [sortBy, setSortBy] = useState('relevance')
  const [openFacetId, setOpenFacetId] = useState(null)
  const containerRef = useRef(null)
  const railRef = useRef(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const filteredProducts = useMemo(() => {
    const results = filterProducts(PRODUCTS, selected, detectedState)
    return sortProducts(results, sortBy)
  }, [detectedState, selected, sortBy])

  const detectedFilters = useMemo(
    () => [
      {
        key: 'category',
        label: 'Category: Gaming laptops',
        active: true,
        disabled: true,
        showCheckbox: false,
      },
      {
        key: 'budget',
        label: `Budget: Up to ${PRICE_FORMATTER.format(MAX_PRICE)}`,
        active: detectedState.budget,
        showCheckbox: true,
        onClick: () =>
          setDetectedState((prev) => ({ ...prev, budget: !prev.budget })),
      },
      {
        key: 'finish',
        label: `Finish: ${formatHumanList(selected.color) || 'None'}`,
        active: selected.color.length > 0,
        showCheckbox: true,
        onClick: () =>
          setSelected((prev) => ({
            ...prev,
            color: prev.color.length ? [] : [...DETECTED_FINISH_COLORS],
          })),
      },
    ],
    [detectedState.budget, detectedState.category, selected.color]
  )

  useEffect(() => {
    const handleOutside = (event) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(event.target)) {
        setOpenFacetId(null)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

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
  }, [filteredProducts.length])

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
    rail.scrollBy({ left: direction * 300, behavior: 'smooth' })
  }

  return (
    <section className={`not-prose ${css.wrap}`}>
      <div className={css.chatWindow} ref={containerRef}>
        <div className={css.messages}>
          <div className={css.userRow}>
            <div className={css.userBubble}>{QUERY}</div>
          </div>

          <div className={css.assistantRow}>
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

            <div className={css.resultsPanel}>
              <div className={css.toolbar}>
                <div className={css.toolbarLeft}>
                  <span className={css.countText}>{filteredProducts.length} products</span>

                  {FACETS.slice(0, 5).map((facet) => {
                    const hasSelection = selected[facet.id].length > 0
                    const isOpen = openFacetId === facet.id
                    return (
                      <div className={css.filterChipWrap} key={facet.id}>
                        <button
                          type="button"
                          className={hasSelection ? css.filterChipActive : css.filterChip}
                          onClick={() =>
                            setOpenFacetId((current) =>
                              current === facet.id ? null : facet.id
                            )
                          }
                        >
                          {hasSelection && (
                            <span className={css.chipCheck}>
                              <CheckIcon width={12} height={12} />
                            </span>
                          )}
                          <span>
                            {compactChipLabel(facet.label, selected[facet.id], facet.id)}
                          </span>
                          <ChevronDownIcon
                            width={16}
                            height={16}
                            className={isOpen ? css.chevronOpen : css.chevron}
                          />
                        </button>

                        {isOpen && (
                          <div className={css.menu}>
                            {facet.options.map((optionValue) => {
                              const selectedNow = selected[facet.id].includes(optionValue)
                              const count = countForOption(
                                PRODUCTS,
                                selected,
                                detectedState,
                                facet.id,
                                optionValue
                              )
                              return (
                                <button
                                  type="button"
                                  key={`${facet.id}-${optionValue}`}
                                  className={css.menuOption}
                                  onClick={() =>
                                    toggleSelection(facet.id, optionValue)
                                  }
                                >
                                  <span
                                    className={
                                      selectedNow ? css.checkOn : css.checkOff
                                    }
                                  >
                                    {selectedNow && <CheckIcon width={11} height={11} />}
                                  </span>
                                  <span className={css.menuLabel}>
                                    {toOptionLabel(facet.id, optionValue)}
                                  </span>
                                  <span className={css.menuCount}>{count}</span>
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}

                </div>

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

              <div className={css.carouselStage}>
                <div className={css.rail} ref={railRef}>
                  {filteredProducts.map((product) => (
                    <article key={product.sku} className={css.card}>
                      <div className={css.imageWrap}>
                        <img
                          className={css.productImage}
                          src={`/gaming-laptops/${product.sku.toLowerCase()}.svg`}
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
                      </div>
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  className={css.carouselArrowLeft}
                  onClick={() => scrollRail(-1)}
                  disabled={!canScrollPrev}
                  aria-label="Scroll products left"
                >
                  <ChevronLeftIcon width={22} height={22} />
                </button>

                <button
                  type="button"
                  className={css.carouselArrowRight}
                  onClick={() => scrollRail(1)}
                  disabled={!canScrollNext}
                  aria-label="Scroll products right"
                >
                  <ChevronRightIcon width={22} height={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIProductSearchDemo
