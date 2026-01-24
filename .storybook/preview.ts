import type { Preview } from '@storybook/html';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0f172a', // Matches --bg-color
        },
        {
          name: 'light',
          value: '#f8fafc', // Matches light mode bg
        },
      ],
    },
  },
};

export default preview;
