import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppState} from '@reducer/reducer';
import {AxiosInstance} from 'axios';
import {Action} from 'redux';

declare type AppThunk<T> = ThunkAction<T, AppState, AxiosInstance, Action>;

declare type AppDispatch = ThunkDispatch<AppState, AxiosInstance, Action>;
