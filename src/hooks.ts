import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';


import { AppDispatch, RootState } from './store/index';

export const useAppDispatch:()=>AppDispatch=useDispatch
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector