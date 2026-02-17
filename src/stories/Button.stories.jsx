import Button from '../components/Button';

export default {
    title: 'UI/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        onClick: { action: 'clicked' },
    },
};

export const Primary = {
    args: {
        children: 'Натисни мене',
        style: { backgroundColor: '#4CAF50' }, // Green
    },
};

export const Secondary = {
    args: {
        children: 'Скасувати',
        style: { backgroundColor: '#f44336' }, // Red
    },
};

export const Disabled = {
    args: {
        children: 'Неактивна',
        disabled: true,
    },
};
