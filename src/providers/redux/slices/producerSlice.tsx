import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook } from 'react-redux';
import { ProducerModel } from '../../models/ProducerModel';

interface interFaceRedux extends TypedUseSelectorHook<ProducerModel[]> {
    listProducer: ProducerModel[]
}

const initialState: ProducerModel[] = []

export const slice = createSlice({
    name: 'listProducer',
    initialState,
    reducers: {
        setList(state, action: PayloadAction<ProducerModel[]>): ProducerModel[] {
            return action.payload
        },
        addToList(state, action: PayloadAction<ProducerModel>): ProducerModel[] {
            return [...state, action.payload]
        },
        removeToList(state, action: PayloadAction<number>): ProducerModel[] {
            const index = state.map((producer: ProducerModel) => producer.id).indexOf(action.payload)
            state.splice(index, 1)
            return state
        }
    }
})

export const { setList, addToList, removeToList } = slice.actions
export const selectList = (state: interFaceRedux) => state.listProducer
export default slice.reducer