import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from "redux-thunk"
import {TokenReducer, ITokenState} from '../reducers/IRefreshToken';
import {IconReducer, IUserIconState} from "../reducers/IUserIconState";
import {PropertyReducer, IPropertyState} from "../reducers/IProperty";
import {ILoginState, LoginReducer} from '../reducers/ILoginState';
import {CropImgReducer, ICropImgState} from "../reducers/ICropImgState";

const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export type IState = {
    authInfo: ILoginState
    property: IPropertyState
    icon: IUserIconState
    token: ITokenState
    cropImg: ICropImgState
}

const store = createStore(
    combineReducers<IState>({
        authInfo: LoginReducer,
        property: PropertyReducer,
        icon: IconReducer,
        token: TokenReducer,
        cropImg: CropImgReducer,
   }),
    storeEnhancers(applyMiddleware(thunk))
)

export default store
