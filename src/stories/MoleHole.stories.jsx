import MoleHole from '../components/MoleHole';

export default {
    title: 'Гра/Лунка Крота',
    component: MoleHole,
    tags: ['autodocs'],
    argTypes: {
        onWhack: { action: 'whacked' },
    },
};

export const Empty = {
    args: {
        isMoleUp: false,
    },
};

export const WithMole = {
    args: {
        isMoleUp: true,
    },
};
