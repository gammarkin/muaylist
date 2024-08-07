import { defineStore } from 'pinia';
import defaultMoves from '../data/moves';

export const useMoveStore = defineStore({
    id: 'moveStore',
    state: () => ({
        moves: defaultMoves,
        visible: false,
        editImage: false,
        createVisible: false,
        selectedMove: {},
    }),
    getters: {
        getMoves: (state) => state.moves,
        isVisible: (state) => state.visible,
        isEditImage: (state) => state.editImage,
        isCreateVisible: (state) => state.createVisible,
        getSelectedMove: (state) => state.selectedMove,
    },
    actions: {
        openClose() {
            this.createVisible = false;
            this.visible = !this.visible;
        },
        openCloseChangeImage() {
            this.editImage = !this.editImage;
        },
        openCloseCreate() {
            this.visible = false;
            this.createVisible = !this.createVisible;
        },
        setMoves(newMoves) {
            this.moves = newMoves;
        },
        removeMoveById(id) {
            this.setMoves(this.moves.filter((move) => move.id !== id));
        },
        addMove(move) {
            this.setMoves([...this.moves, move]);
        },
        editMove(move) {
            const index = this.moves.findIndex((m) => m.id === move.id);
            if (index !== -1) {
                this.moves[index] = move;
            } else {
                this.addMove(move);
            }
        },
        setSelectedMove(move) {
            this.selectedMove = move;
        },
    },
});
