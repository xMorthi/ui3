import { describe, it, expect } from 'vitest'
import ContextMenu, { type ContextMenuProps, type ContextMenuSlots } from '../../src/runtime/components/ContextMenu.vue'
import ComponentRender from '../component-render'

// FIXME: Can't force open state
describe('ContextMenu', () => {
  const items = [
    [{
      label: 'Appearance',
      children: [{
        label: 'System',
        icon: 'i-heroicons-computer-desktop'
      }, {
        label: 'Light',
        icon: 'i-heroicons-sun'
      }, {
        label: 'Dark',
        icon: 'i-heroicons-moon'
      }]
    }],
    [{
      label: 'Show Sidebar',
      kbds: ['meta', 'S'],
      select() {
        console.log('Show Sidebar clicked')
      }
    }, {
      label: 'Show Toolbar',
      kbds: ['shift', 'meta', 'D'],
      select() {
        console.log('Show Toolbar clicked')
      }
    }, {
      label: 'Collapse Pinned Tabs',
      disabled: true
    }], [{
      label: 'Refresh the Page'
    }, {
      label: 'Clear Cookies and Refresh'
    }, {
      label: 'Clear Cache and Refresh'
    }, {
      type: 'separator' as const
    }, {
      label: 'Developer',
      children: [[{
        label: 'View Source',
        kbds: ['option', 'meta', 'U'],
        select() {
          console.log('View Source clicked')
        }
      }, {
        label: 'Developer Tools',
        kbds: ['option', 'meta', 'I'],
        select() {
          console.log('Developer Tools clicked')
        }
      }], [{
        label: 'Inspect Elements',
        kbds: ['option', 'meta', 'C'],
        select() {
          console.log('Inspect Elements clicked')
        }
      }], [{
        label: 'JavaScript Console',
        kbds: ['option', 'meta', 'J'],
        slot: 'custom',
        select() {
          console.log('JavaScript Console clicked')
        }
      }]]
    }]
  ]

  const props = { portal: false, items }

  it.each([
    // Props
    ['with items', { props }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with class', { props: { ...props, class: 'min-w-96' } }],
    ['with ui', { props: { ...props, ui: { itemLeadingIcon: 'size-4' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }],
    ['with custom slot', { props, slots: { custom: () => 'Custom slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ContextMenuProps<typeof items[number][number]>, slots?: Partial<ContextMenuSlots<any>> }) => {
    const html = await ComponentRender(nameOrHtml, options, ContextMenu)
    expect(html).toMatchSnapshot()
  })
})
