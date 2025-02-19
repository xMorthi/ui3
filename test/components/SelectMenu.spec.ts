import { describe, it, expect } from 'vitest'
import SelectMenu, { type SelectMenuProps, type SelectMenuSlots } from '../../src/runtime/components/SelectMenu.vue'
import ComponentRender from '../component-render'
import theme from '#build/ui/input'

describe('SelectMenu', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const colors = Object.keys(theme.variants.color) as any
  const variants = Object.keys(theme.variants.variant) as any

  const items = [{
    label: 'Backlog',
    value: 'backlog',
    icon: 'i-heroicons-question-mark-circle'
  }, {
    label: 'Todo',
    value: 'todo',
    icon: 'i-heroicons-plus-circle'
  }, {
    label: 'In Progress',
    value: 'in_progress',
    icon: 'i-heroicons-arrow-up-circle'
  }, {
    label: 'Done',
    value: 'done',
    icon: 'i-heroicons-check-circle'
  }, {
    label: 'Canceled',
    value: 'canceled',
    icon: 'i-heroicons-x-circle'
  }]

  const props = { open: true, portal: false, items }

  it.each([
    // Props
    ['with items', { props }],
    ['with modelValue', { props: { ...props, modelValue: items[0] } }],
    ['with defaultValue', { props: { ...props, defaultValue: items[0] } }],
    ['with multiple', { props: { ...props, multiple: true } }],
    ['with multiple and modelValue', { props: { ...props, multiple: true, modelValue: [items[0], items[1]] } }],
    ['with id', { props: { ...props, id: 'id' } }],
    ['with name', { props: { ...props, name: 'name' } }],
    ['with placeholder', { props: { ...props, placeholder: 'Search...' } }],
    ['with searchPlaceholder', { props: { ...props, searchPlaceholder: 'Filter items...' } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with required', { props: { ...props, required: true } }],
    ['with icon', { props: { ...props, icon: 'i-heroicons-magnifying-glass' } }],
    ['with leading and icon', { props: { ...props, leading: true, icon: 'i-heroicons-magnifying-glass' } }],
    ['with leadingIcon', { props: { ...props, leadingIcon: 'i-heroicons-magnifying-glass' } }],
    ['with trailing and icon', { props: { ...props, trailing: true, icon: 'i-heroicons-magnifying-glass' } }],
    ['with trailingIcon', { props: { ...props, trailingIcon: 'i-heroicons-magnifying-glass' } }],
    ['with loading', { props: { ...props, loading: true } }],
    ['with loadingIcon', { props: { ...props, loading: true, loadingIcon: 'i-heroicons-sparkles' } }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    ...colors.map((color: string) => [`with color ${color}`, { props: { ...props, color } }]),
    ...variants.map((variant: string) => [`with variant ${variant}`, { props: { ...props, variant } }]),
    ['with class', { props: { ...props, class: 'rounded-full' } }],
    ['with ui', { props: { ...props, ui: { group: 'p-2' } } }],
    // Slots
    ['with leading slot', { props, slots: { leading: () => 'Leading slot' } }],
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with trailing slot', { props, slots: { trailing: () => 'Trailing slot' } }],
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: SelectMenuProps<typeof items[number]>, slots?: Partial<SelectMenuSlots<typeof items[number]>> }) => {
    const html = await ComponentRender(nameOrHtml, options, SelectMenu)
    expect(html).toMatchSnapshot()
  })
})
