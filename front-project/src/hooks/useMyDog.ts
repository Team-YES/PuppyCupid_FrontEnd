import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMyDog } from "@/reducers/dogSlice";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export const useMyDog = () => {
  const dispatch = useAppDispatch();
  const dog = useSelector((state: RootState) => state.dog.dog);
  const loading = useSelector((state: RootState) => state.dog.loading);
  const error = useSelector((state: RootState) => state.dog.error);

  useEffect(() => {
    dispatch(fetchMyDog());
  }, [dispatch]);

  return { dog, loading, error };
};
