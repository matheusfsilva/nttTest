import { configureStore } from '@reduxjs/toolkit';
import sliceProducer from './slices/producerSlice';

export default configureStore({
    reducer: {
        listProducer: sliceProducer
    },
})