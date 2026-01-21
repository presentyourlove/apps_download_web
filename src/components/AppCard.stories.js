import AppCard from './AppCard.astro';

export default {
    component: AppCard,
    title: 'Components/AppCard',
    argTypes: {
        id: { control: 'text' },
        name: { control: 'text' },
        displayName: { control: 'text' },
    },
};

export const Default = {
    args: {
        id: 'financeapp',
        name: 'FinanceApp',
        displayName: '智慧理財助手',
    },
};

export const SubTrack = {
    args: {
        id: 'subtrack',
        name: 'SubTrack',
        displayName: '訂閱管理',
    },
};
