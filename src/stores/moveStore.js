import { defineStore } from 'pinia';
import { ref } from 'vue';
import defaultMoves from '../data/moves';

export const useMoveStore = defineStore('moveStore', () => {

    const visible = ref(false);
    const editImage = ref(false)
    const createVisible = ref(false)

    const selectedMove = ref({});

    const moves = ref(defaultMoves);


    const openClose = () => {
        createVisible.value = false
        visible.value = !visible.value
    }

    const openCloseChangeImage = () => {
        editImage.value = !editImage.value
    }

    const openCloseCreate = () => {
        visible.value = false
        createVisible.value = !createVisible.value
    }

    const setMoves = (newMoves) => {
        moves.value = newMoves;
    };

    const removeMoveById = (id) => {
        setMoves(moves.value.filter((move) => move.id !== id));
    };

    const addMove = (move) => {
        setMoves([...moves.value, move]);
    };

    const editMove = (move) => {
        const movesMinusChanged = moves.value.filter((m) => m.id !== move.id);

        setMoves([...movesMinusChanged, move]);
    };

    const setSelectedMove = (move) => {
        selectedMove.value = move;
    };

    return {
        moves,
        visible,
        editImage,
        selectedMove,
        createVisible,

        addMove,
        editMove,
        openClose,
        removeMoveById,
        setSelectedMove,
        openCloseCreate,
        openCloseChangeImage,
    };
});
