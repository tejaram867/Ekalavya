/**
 * Fluid Dropdown Component - Vanilla JS
 * Animated dropdown with smooth transitions
 */

export class FluidDropdown {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = options.items || [];
        this.selectedItem = this.options[0] || null;
        this.isOpen = false;
        this.hoveredIndex = null;
        
        this.render();
        this.attachEventListeners();
    }

    render() {
        if (!this.container) return;

        const dropdownHTML = `
            <div class="fluid-dropdown-wrapper relative w-full max-w-md">
                <button 
                    class="fluid-dropdown-trigger w-full justify-between bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 ease-in-out border border-transparent focus:border-neutral-700 h-12 px-4 rounded-3xl inline-flex items-center font-medium text-sm"
                    aria-expanded="false"
                    aria-haspopup="true"
                >
                    <span class="flex items-center gap-2">
                        <i data-lucide="${this.selectedItem?.icon || 'layers'}" class="w-4 h-4" style="color: ${this.selectedItem?.color || '#A06CD5'}"></i>
                        <span>${this.selectedItem?.label || 'Select'}</span>
                    </span>
                    <i data-lucide="chevron-down" class="w-4 h-4 fluid-dropdown-chevron transition-transform duration-200"></i>
                </button>

                <div class="fluid-dropdown-menu absolute left-0 right-0 top-full mt-2 z-50 hidden">
                    <div class="w-full rounded-3xl border border-neutral-800 bg-neutral-900 p-1 shadow-lg">
                        <div class="py-2 relative">
                            <div class="fluid-dropdown-highlight absolute inset-x-1 bg-neutral-800 rounded-2xl h-10 transition-all duration-300 ease-out" style="transform: translateY(0px);"></div>
                            ${this.renderItems()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = dropdownHTML;
    }

    renderItems() {
        return this.options.map((item, index) => `
            ${index === 1 ? '<div class="mx-4 my-2.5 border-t border-neutral-700"></div>' : ''}
            <button
                class="fluid-dropdown-item relative flex w-full items-center px-4 py-2.5 text-sm rounded-2xl transition-colors duration-150 focus:outline-none ${
                    this.selectedItem?.id === item.id ? 'text-neutral-200' : 'text-neutral-400'
                }"
                data-id="${item.id}"
                data-index="${index}"
            >
                <i data-lucide="${item.icon}" class="w-4 h-4 mr-2" style="color: ${item.color}"></i>
                ${item.label}
            </button>
        `).join('');
    }

    attachEventListeners() {
        const trigger = this.container.querySelector('.fluid-dropdown-trigger');
        const menu = this.container.querySelector('.fluid-dropdown-menu');
        const chevron = this.container.querySelector('.fluid-dropdown-chevron');
        const highlight = this.container.querySelector('.fluid-dropdown-highlight');

        // Toggle dropdown
        trigger?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        // Item selection
        this.container.querySelectorAll('.fluid-dropdown-item').forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = item.dataset.id;
                this.selectItem(itemId);
            });

            // Hover effects
            item.addEventListener('mouseenter', () => {
                this.hoveredIndex = index;
                this.updateHighlight(index);
            });

            item.addEventListener('mouseleave', () => {
                this.hoveredIndex = null;
                const selectedIndex = this.options.findIndex(opt => opt.id === this.selectedItem?.id);
                this.updateHighlight(selectedIndex);
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target) && this.isOpen) {
                this.closeDropdown();
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeDropdown();
            }
        });
    }

    toggleDropdown() {
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        const menu = this.container.querySelector('.fluid-dropdown-menu');
        const chevron = this.container.querySelector('.fluid-dropdown-chevron');
        const trigger = this.container.querySelector('.fluid-dropdown-trigger');

        this.isOpen = true;
        menu?.classList.remove('hidden');
        chevron?.style.setProperty('transform', 'rotate(180deg)');
        trigger?.classList.add('bg-neutral-800', 'text-neutral-200');
        trigger?.setAttribute('aria-expanded', 'true');

        // Initialize highlight position
        const selectedIndex = this.options.findIndex(opt => opt.id === this.selectedItem?.id);
        this.updateHighlight(selectedIndex);
    }

    closeDropdown() {
        const menu = this.container.querySelector('.fluid-dropdown-menu');
        const chevron = this.container.querySelector('.fluid-dropdown-chevron');
        const trigger = this.container.querySelector('.fluid-dropdown-trigger');

        this.isOpen = false;
        menu?.classList.add('hidden');
        chevron?.style.setProperty('transform', 'rotate(0deg)');
        trigger?.classList.remove('bg-neutral-800', 'text-neutral-200');
        trigger?.setAttribute('aria-expanded', 'false');
    }

    updateHighlight(index) {
        const highlight = this.container.querySelector('.fluid-dropdown-highlight');
        if (!highlight || index < 0) return;

        // Calculate position accounting for separator
        const separatorOffset = index > 0 ? 20 : 0;
        const yPosition = index * 40 + separatorOffset;

        highlight.style.transform = `translateY(${yPosition}px)`;
    }

    selectItem(itemId) {
        const item = this.options.find(opt => opt.id === itemId);
        if (!item) return;

        this.selectedItem = item;
        this.closeDropdown();

        // Update trigger button
        const trigger = this.container.querySelector('.fluid-dropdown-trigger span');
        if (trigger) {
            trigger.innerHTML = `
                <i data-lucide="${item.icon}" class="w-4 h-4" style="color: ${item.color}"></i>
                <span>${item.label}</span>
            `;
            // Refresh icons
            if (window.lucide) window.lucide.createIcons();
        }

        // Trigger change event
        if (this.options.onChange) {
            this.options.onChange(item);
        }

        // Dispatch custom event
        this.container.dispatchEvent(new CustomEvent('dropdown-change', {
            detail: { selectedItem: item }
        }));
    }

    getValue() {
        return this.selectedItem;
    }

    setValue(itemId) {
        this.selectItem(itemId);
    }
}
