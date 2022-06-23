import { primary } from "../../providers/styles/colors"

export const iconSx = {
    right: '5px',
    color: primary,
    fontSize: '22px',
    position: 'absolute',
    userSelect: 'none',
    display: 'inline-block',
    pointerEvents: 'none',
}

const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 8;

export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            border: '1px solid',
            borderColor: '#dee2e6',
            marginTop: '10px',
            boxShadow: 'none'
        },
    },
};
