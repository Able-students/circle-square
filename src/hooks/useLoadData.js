import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import mainActions from "../store/actions/mainActions";

const useLoadData = () => {
    const dispatch = useDispatch()
    const { list } = useSelector((state) => state.mainReducer)
    useEffect(() => {
        dispatch(mainActions.loadJsonList())
    }, [])
    return list
}

export default useLoadData;