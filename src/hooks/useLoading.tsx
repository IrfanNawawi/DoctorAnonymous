import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/loadingSlice';

export const useLoading = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading?.isLoading ?? false);

  const showLoading = () => dispatch(setLoading(true));
  const hideLoading = () => dispatch(setLoading(false));

  return { isLoading, showLoading, hideLoading };
};
