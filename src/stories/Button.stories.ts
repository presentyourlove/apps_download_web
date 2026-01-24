import type { Meta, StoryObj } from '@storybook/html';

interface ButtonProps {
  label: string;
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  icon?: boolean;
}

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  tags: ['autodocs'],
  render: ({ label, primary, size, icon }) => {
    const btn = document.createElement('button');
    btn.innerText = label;

    // Base class
    btn.className = 'btn-text';

    // Size variants (simulated via inline style for demo, or add specific classes if they exist)
    if (size === 'small') btn.style.fontSize = '0.8rem';
    if (size === 'large') btn.style.fontSize = '1.2rem';

    // Icon variant
    if (icon) {
      btn.className = 'btn-icon';
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
        </svg>
      `;
      btn.setAttribute('aria-label', label);
    }

    return btn;
  },
  args: {
    label: 'Button',
    primary: false,
    size: 'medium',
    icon: false,
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    label: 'Get Updates',
  },
};

export const IconButton: Story = {
  args: {
    icon: true,
    label: 'Toggle Theme',
  },
};
