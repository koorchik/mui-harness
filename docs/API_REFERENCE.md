# API Reference

## Base Class: DomHarness

All harnesses extend `DomHarness` from `dom-harness`. Every harness inherits these members.

### Static Properties

| Property | Type | Description |
|---|---|---|
| `testid` | `string \| undefined` | `data-testid` value used for lookup |
| `selector` | `string \| undefined` | CSS selector used for lookup |

### Static Methods

| Method | Returns | Description |
|---|---|---|
| `first(container?)` | `T` | First matching element (throws if none) |
| `all(container?)` | `T[]` | All matching elements |
| `find(matcher, container?)` | `T` | First element where `matcher` returns true (throws if none) |
| `match(textOrRegexp, getText, container?)` | `T` | First element whose `getText` result matches (throws if none) |
| `fromDomElement(root?)` | `T` | Wrap an existing DOM element |

### Instance Members

| Member | Type | Description |
|---|---|---|
| `root` | `Element` | The wrapped DOM element |
| `user` | `UserEvent` | `@testing-library/user-event` instance |
| `queryElement(selector)` | `Element` | Query within root (throws if not found) |
| `queryElement(selector, true)` | `Element \| null` | Query within root (returns null if not found) |

---

## Harness Index

| Harness | MUI Component | Selector | Static Finders |
|---|---|---|---|
| [AccordionHarness](#accordionharness) | Accordion | `.MuiAccordion-root` | — |
| [AlertHarness](#alertharness) | Alert | `.MuiAlert-root` | `getByText()` |
| [AutocompleteHarness](#autocompleteharness) | Autocomplete | `.MuiAutocomplete-inputRoot` | `getByName()` |
| [AvatarHarness](#avatarharness) | Avatar | `.MuiAvatar-root` | — |
| [BadgeHarness](#badgeharness) | Badge | `.MuiBadge-root` | — |
| [BreadcrumbsHarness](#breadcrumbsharness) | Breadcrumbs | `.MuiBreadcrumbs-root` | — |
| [ButtonGroupHarness](#buttongroupharness) | ButtonGroup | `.MuiButtonGroup-root` | — |
| [ButtonHarness](#buttonharness) | Button | `.MuiButtonBase-root` | `getByText()` |
| [CardHarness](#cardharness) | Card | `.MuiCard-root` | — |
| [CheckboxHarness](#checkboxharness) | Checkbox | `.MuiCheckbox-root` | — |
| [ChipHarness](#chipharness) | Chip | `.MuiChip-root` | `getByText()` |
| [CircularProgressHarness](#circularprogressharness) | CircularProgress | `.MuiCircularProgress-root` | — |
| [DialogHarness](#dialogharness) | Dialog | `.MuiDialog-root` | — |
| [DividerHarness](#dividerharness) | Divider | `.MuiDivider-root` | — |
| [DrawerHarness](#drawerharness) | Drawer | `.MuiDrawer-root` | — |
| [IconButtonHarness](#iconbuttonharness) | IconButton | `.MuiIconButton-root` | — |
| [IconHarness](#iconharness) | SvgIcon | `.MuiSvgIcon-root` | — |
| [LinearProgressHarness](#linearprogressharness) | LinearProgress | `.MuiLinearProgress-root` | — |
| [LinkHarness](#linkharness) | Link | `.MuiLink-root` | — |
| [ListItemHarness](#listitemharness) | ListItem | `.MuiListItem-root, .MuiListItemButton-root` | — |
| [MenuHarness](#menuharness) | Menu | `.MuiMenu-root` | — |
| [MenuItemHarness](#menuitemharness) | MenuItem | `.MuiMenuItem-root` | `getByText()` |
| [PaginationHarness](#paginationharness) | Pagination | `.MuiPagination-root` | — |
| [PaperHarness](#paperharness) | Paper | `.MuiPaper-root` | — |
| [PopoverHarness](#popoverharness) | Popover | `.MuiPopover-root` | — |
| [RadioGroupHarness](#radiogroupharness) | RadioGroup | `[role="radiogroup"]` | — |
| [SelectHarness](#selectharness) | Select | `.MuiSelect-select` | `getByName()`, `getByLabel()` |
| [SkeletonHarness](#skeletonharness) | Skeleton | `.MuiSkeleton-root` | — |
| [SliderHarness](#sliderharness) | Slider | `.MuiSlider-root` | — |
| [SnackbarHarness](#snackbarharness) | Snackbar | `.MuiSnackbar-root` | — |
| [SwitchHarness](#switchharness) | Switch | `.MuiSwitch-root` | — |
| [TabHarness](#tabharness) | Tab | `.MuiTab-root` | — |
| [TableCellHarness](#tablecellharness) | TableCell | `.MuiTableCell-root` | — |
| [TableContainerHarness](#tablecontainerharness) | TableContainer | `.MuiTableContainer-root` | — |
| [TableRowHarness](#tablerowharness) | TableRow | `.MuiTableRow-root` | — |
| [TabsHarness](#tabsharness) | Tabs | `.MuiTabs-root` | — |
| [TextFieldHarness](#textfieldharness) | TextField | `.MuiInputBase-root` | `getByName()` |
| [ToggleButtonHarness](#togglebuttonharness) | ToggleButton | `.MuiToggleButton-root` | — |
| [TooltipHarness](#tooltipharness) | Tooltip | `.MuiTooltip-popper` | — |
| [TypographyHarness](#typographyharness) | Typography | `.MuiTypography-root` | `getByText()` |

---

## AccordionHarness

**Selector:** `.MuiAccordion-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `isExpanded()` | `boolean` | Whether the accordion is expanded |
| `isDisabled()` | `boolean` | Whether the accordion is disabled |
| `getSummaryText()` | `string` | Summary text content |
| `toggle()` | `Promise<void>` | Toggle expansion state |

## AlertHarness

**Selector:** `.MuiAlert-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getByText(text, container?)` | `AlertHarness` | **Static** — find by text or regex |
| `getText()` | `string` | Alert message text |
| `getSeverity()` | `'error' \| 'warning' \| 'info' \| 'success'` | Alert severity |
| `getVariant()` | `'standard' \| 'filled' \| 'outlined'` | Alert variant |
| `hasIcon()` | `boolean` | Whether the alert has an icon |
| `hasCloseButton()` | `boolean` | Whether a close button exists |
| `clickCloseButton()` | `Promise<void>` | Click the close button |
| `hasAction()` | `boolean` | Whether the alert has an action element |
| `getRole()` | `string` | ARIA role attribute |
| `icon` | `IconHarness` | **Getter** — nested icon |
| `closeButton` | `IconButtonHarness` | **Getter** — nested close button |

## AutocompleteHarness

**Selector:** `.MuiAutocomplete-inputRoot` · **Extends:** TextFieldHarness

Inherits all methods from [TextFieldHarness](#textfieldharness).

## AvatarHarness

**Selector:** `.MuiAvatar-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getText()` | `string` | Avatar text content (letter avatar) |
| `getSrc()` | `string \| null` | Image `src` attribute |
| `getAlt()` | `string \| null` | Image `alt` attribute |
| `getVariant()` | `'circular' \| 'rounded' \| 'square'` | Avatar variant |

## BadgeHarness

**Selector:** `.MuiBadge-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getContent()` | `string` | Badge content text |
| `getColor()` | `string` | Badge color |
| `getVariant()` | `'standard' \| 'dot'` | Badge variant |
| `isInvisible()` | `boolean` | Whether the badge is invisible |

## BreadcrumbsHarness

**Selector:** `.MuiBreadcrumbs-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getItems()` | `string[]` | Breadcrumb item texts |
| `getItemCount()` | `number` | Number of items |
| `getSeparator()` | `string` | Separator text |

## ButtonGroupHarness

**Selector:** `.MuiButtonGroup-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getButtons()` | `ButtonHarness[]` | All buttons in the group |
| `getVariant()` | `'text' \| 'outlined' \| 'contained'` | Group variant |
| `getSize()` | `'small' \| 'medium' \| 'large'` | Group size |
| `getOrientation()` | `'horizontal' \| 'vertical'` | Group orientation |

## ButtonHarness

**Selector:** `.MuiButtonBase-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getByText(text, container?)` | `ButtonHarness` | **Static** — find by text or regex |
| `getText()` | `string` | Button text content |
| `click()` | `Promise<void>` | Click the button |
| `hover()` | `Promise<void>` | Hover over the button |
| `isDisabled()` | `boolean` | Whether the button is disabled |

## CardHarness

**Selector:** `.MuiCard-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getHeaderText()` | `string` | Card header title text |
| `getSubheaderText()` | `string` | Card subheader text |
| `getContentElement()` | `Element \| null` | Card content container |
| `getActionsElement()` | `Element \| null` | Card actions container |

## CheckboxHarness

**Selector:** `.MuiCheckbox-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `isChecked()` | `boolean` | Whether the checkbox is checked |
| `isDisabled()` | `boolean` | Whether the checkbox is disabled |
| `isIndeterminate()` | `boolean` | Whether the checkbox is indeterminate |
| `getColor()` | `string` | Checkbox color |
| `getSize()` | `'small' \| 'medium'` | Checkbox size |
| `toggle()` | `Promise<void>` | Toggle checked state |
| `getLabel()` | `string` | Associated label text |

## ChipHarness

**Selector:** `.MuiChip-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getByText(text, container?)` | `ChipHarness` | **Static** — find by label or regex |
| `getLabel()` | `string` | Chip label text |
| `getVariant()` | `'filled' \| 'outlined'` | Chip variant |
| `getColor()` | `string` | Chip color |
| `getSize()` | `'small' \| 'medium'` | Chip size |
| `click()` | `Promise<void>` | Click the chip |
| `clickDelete()` | `Promise<void>` | Click the delete icon |
| `isClickable()` | `boolean` | Whether the chip is clickable |
| `isDisabled()` | `boolean` | Whether the chip is disabled |
| `isDeletable()` | `boolean` | Whether the chip is deletable |
| `hasAvatar()` | `boolean` | Whether the chip has an avatar |
| `hasIcon()` | `boolean` | Whether the chip has an icon |
| `icon` | `IconHarness` | **Getter** — nested icon |
| `deleteIcon` | `IconHarness` | **Getter** — nested delete icon |

## CircularProgressHarness

**Selector:** `.MuiCircularProgress-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getValue()` | `number \| null` | Progress percentage (determinate only) |
| `getVariant()` | `'determinate' \| 'indeterminate'` | Progress variant |
| `getColor()` | `string` | Progress color |
| `getSize()` | `number` | Size in pixels |
| `getThickness()` | `number \| null` | Stroke thickness |
| `isIndeterminate()` | `boolean` | Whether variant is indeterminate |
| `isDeterminate()` | `boolean` | Whether variant is determinate |
| `getRole()` | `string` | ARIA role |
| `isAnimating()` | `boolean` | Whether currently animating |
| `getDimensions()` | `{ width, height }` | Element dimensions |

## DialogHarness

**Selector:** `.MuiDialog-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getTitle()` | `string` | Dialog title text |
| `getContentElement()` | `Element \| null` | Dialog content container |
| `getActionsElement()` | `Element \| null` | Dialog actions container |

## DividerHarness

**Selector:** `.MuiDivider-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getOrientation()` | `'horizontal' \| 'vertical'` | Divider orientation |
| `getVariant()` | `'fullWidth' \| 'inset' \| 'middle'` | Divider variant |
| `getText()` | `string` | Divider text (if any) |
| `hasText()` | `boolean` | Whether the divider has text |

## DrawerHarness

**Selector:** `.MuiDrawer-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getPaperElement()` | `HTMLElement \| null` | Drawer paper container |
| `getWidth()` | `string \| null` | Drawer width |

## IconButtonHarness

**Selector:** `.MuiIconButton-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `click()` | `Promise<void>` | Click the button |
| `isDisabled()` | `boolean` | Whether the button is disabled |
| `getSize()` | `'small' \| 'medium' \| 'large'` | Button size |
| `getColor()` | `string` | Button color |
| `getTitle()` | `string \| null` | Title attribute |
| `hasIcon()` | `boolean` | Whether the button has an icon |
| `icon` | `IconHarness` | **Getter** — nested icon |

## IconHarness

**Selector:** `.MuiSvgIcon-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getSize()` | `'inherit' \| 'small' \| 'medium' \| 'large'` | Icon font size |
| `getColor()` | `string` | Icon color |
| `getViewBox()` | `string \| null` | SVG viewBox attribute |
| `getAriaLabel()` | `string \| null` | ARIA label |
| `getTitle()` | `string \| null` | Title element text |
| `hasTitle()` | `boolean` | Whether the icon has a title |
| `getDimensions()` | `{ width, height }` | Element dimensions |
| `click()` | `Promise<void>` | Click the icon |

## LinearProgressHarness

**Selector:** `.MuiLinearProgress-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getValue()` | `number \| null` | Progress percentage (determinate only) |
| `getVariant()` | `'determinate' \| 'indeterminate' \| 'buffer' \| 'query'` | Progress variant |
| `getColor()` | `string` | Progress color |
| `isIndeterminate()` | `boolean` | Whether variant is indeterminate |
| `isDeterminate()` | `boolean` | Whether variant is determinate |
| `hasBuffer()` | `boolean` | Whether variant is buffer |
| `getBufferValue()` | `number \| null` | Buffer value (0–100) |
| `getRole()` | `string` | ARIA role |
| `isAnimating()` | `boolean` | Whether currently animating |

## LinkHarness

**Selector:** `.MuiLink-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getText()` | `string` | Link text |
| `getHref()` | `string` | `href` attribute |
| `click()` | `Promise<void>` | Click the link |

## ListItemHarness

**Selector:** `.MuiListItem-root, .MuiListItemButton-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getText()` | `string` | Primary text |
| `getSecondaryText()` | `string \| null` | Secondary text |
| `isSelected()` | `boolean` | Whether the item is selected |
| `isDisabled()` | `boolean` | Whether the item is disabled |
| `click()` | `Promise<void>` | Click the item |

## MenuHarness

**Selector:** `.MuiMenu-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getItems()` | `MenuItemHarness[]` | All menu items |
| `getItemTexts()` | `string[]` | Menu item texts |
| `getItem(index)` | `MenuItemHarness` | Menu item at index |

## MenuItemHarness

**Selector:** `.MuiMenuItem-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getByText(text, container?)` | `MenuItemHarness` | **Static** — find by text or regex |
| `getText()` | `string` | Menu item text |
| `click()` | `Promise<void>` | Click the menu item |
| `isDisabled()` | `boolean` | Whether the item is disabled |
| `isSelected()` | `boolean` | Whether the item is selected |
| `isVisible()` | `boolean` | Whether the item is visible |
| `getRole()` | `string` | ARIA role |
| `getValue()` | `string \| null` | Item value |
| `hasIcon()` | `boolean` | Whether the item has an icon |
| `getPrimaryText()` | `string` | Primary text |
| `getSecondaryText()` | `string \| null` | Secondary text |
| `hasSecondaryText()` | `boolean` | Whether secondary text exists |
| `icon` | `IconHarness` | **Getter** — nested icon |

## PaginationHarness

**Selector:** `.MuiPagination-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getPageCount()` | `number` | Total page count |
| `getCurrentPage()` | `number` | Currently selected page |
| `goToPage(page)` | `Promise<void>` | Navigate to specific page |
| `goToNext()` | `Promise<void>` | Go to next page |
| `goToPrevious()` | `Promise<void>` | Go to previous page |

## PaperHarness

**Selector:** `.MuiPaper-root` · **Extends:** DomHarness

Minimal harness — provides only the `.MuiPaper-root` selector. Use it for scoping queries:

```ts
const card = PaperHarness.first();
const title = TypographyHarness.first(card.root);
```

## PopoverHarness

**Selector:** `.MuiPopover-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getPaper()` | `PaperHarness` | The popover paper element |

## RadioGroupHarness

**Selector:** `[role="radiogroup"]` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getSelectedValue()` | `string \| null` | Currently selected radio value |
| `getOptions()` | `{ label, value, disabled }[]` | All radio options |
| `select(value)` | `Promise<void>` | Select a radio by value |

## SelectHarness

**Selector:** `.MuiSelect-select` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getByName(name, container?)` | `SelectHarness` | **Static** — find by name or regex |
| `getByLabel(label, container?)` | `SelectHarness` | **Static** — find by label or regex |
| `open()` | `Promise<void>` | Open the dropdown |
| `close()` | `Promise<void>` | Close the dropdown |
| `selectByText(text)` | `Promise<void>` | Select an option by display text |
| `selectByValue(value)` | `Promise<void>` | Select an option by data-value |
| `getOptions()` | `Promise<string[]>` | All option labels |
| `getValue()` | `string` | Currently displayed value |
| `getDisplayValue()` | `string` | Displayed value text |
| `getName()` | `string` | Input name attribute |
| `getLabel()` | `string` | Associated label text |
| `isDisabled()` | `boolean` | Whether the select is disabled |
| `isOpen()` | `boolean` | Whether the dropdown is open |
| `hasError()` | `boolean` | Whether the field has an error |
| `getHelperText()` | `string \| null` | Helper text |
| `click()` | `Promise<void>` | Click the select |

## SkeletonHarness

**Selector:** `.MuiSkeleton-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getVariant()` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | Skeleton variant |
| `isAnimating()` | `boolean` | Whether the skeleton is animating |

## SliderHarness

**Selector:** `.MuiSlider-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getValue()` | `number` | Current slider value |
| `getMin()` | `number` | Minimum value |
| `getMax()` | `number` | Maximum value |
| `isDisabled()` | `boolean` | Whether the slider is disabled |

## SnackbarHarness

**Selector:** `.MuiSnackbar-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getText()` | `string` | Snackbar message text |
| `getSeverity()` | `string` | Alert severity (delegates to inner alert) |
| `alert` | `AlertHarness` | **Getter** — nested alert |

## SwitchHarness

**Selector:** `.MuiSwitch-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `isChecked()` | `boolean` | Whether the switch is on |
| `isDisabled()` | `boolean` | Whether the switch is disabled |
| `getColor()` | `string` | Switch color |
| `getSize()` | `'small' \| 'medium'` | Switch size |
| `toggle()` | `Promise<void>` | Toggle switch state |
| `getLabel()` | `string` | Associated label text |

## TabHarness

**Selector:** `.MuiTab-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getLabel()` | `string` | Tab label text |
| `isSelected()` | `boolean` | Whether the tab is selected |
| `isDisabled()` | `boolean` | Whether the tab is disabled |
| `click()` | `Promise<void>` | Click the tab |

## TableCellHarness

**Selector:** `.MuiTableCell-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getText()` | `string` | Cell text content |

## TableContainerHarness

**Selector:** `.MuiTableContainer-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getRows()` | `TableRowHarness[]` | All table rows |
| `getRowCount()` | `number` | Number of rows |

## TableRowHarness

**Selector:** `.MuiTableRow-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getCells()` | `TableCellHarness[]` | All cells in the row |
| `getCellTexts()` | `string[]` | Text content of each cell |

## TabsHarness

**Selector:** `.MuiTabs-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getTabs()` | `TabHarness[]` | All tab harnesses |
| `getTabLabels()` | `string[]` | Labels of all tabs |
| `getSelectedIndex()` | `number` | Index of the selected tab |
| `getTab(index)` | `TabHarness` | Tab at a specific index |

## TextFieldHarness

**Selector:** `.MuiInputBase-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getByName(name, container?)` | `TextFieldHarness` | **Static** — find by name or regex |
| `type(value)` | `Promise<void>` | Type into the input |
| `clear()` | `Promise<void>` | Clear the input |
| `getValue()` | `string` | Current input value |
| `getName()` | `string` | Input name attribute |
| `getPlaceholder()` | `string` | Placeholder text |
| `getType()` | `string` | Input type attribute |

## ToggleButtonHarness

**Selector:** `.MuiToggleButton-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `isSelected()` | `boolean` | Whether the button is selected |
| `isDisabled()` | `boolean` | Whether the button is disabled |
| `getValue()` | `string` | Button value attribute |
| `getText()` | `string` | Button text content |
| `click()` | `Promise<void>` | Click the button |

## TooltipHarness

**Selector:** `.MuiTooltip-popper` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getTitle()` | `string \| null` | Tooltip text |
| `getPlacement()` | `'top' \| 'bottom' \| 'left' \| 'right' \| null` | Tooltip placement |
| `isVisible()` | `boolean` | Whether the tooltip is visible |
| `hasArrow()` | `boolean` | Whether the tooltip has an arrow |

## TypographyHarness

**Selector:** `.MuiTypography-root` · **Extends:** DomHarness

| Method | Returns | Description |
|---|---|---|
| `getByText(text, container?)` | `TypographyHarness` | **Static** — find by text or regex |
| `getText()` | `string` | Text content |
| `getVariant()` | `string` | Typography variant (h1–h6, body1, etc.) |
| `getColor()` | `string` | Typography color |
| `getAlign()` | `string` | Text alignment |
| `getComponent()` | `string` | HTML tag name |
| `hasGutterBottom()` | `boolean` | Whether gutter bottom is applied |
| `hasNoWrap()` | `boolean` | Whether text wrapping is disabled |
