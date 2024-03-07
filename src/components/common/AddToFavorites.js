import { addToFavorites, showSignupModal } from '@/slices/userSlice';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AddToFavorites = ({ item }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const favorites = useSelector((state) => state.user.favorites);

  const isFavAdded = useMemo(() => {
    const fav = favorites?.find((i) => i.name == item.title);
    if (fav) {
      return true;
    } else {
      return false;
    }
  }, [favorites]);

  const addFav = () => {
    if (token) {
      if (isFavAdded) {
      } else {
        dispatch(addToFavorites({ token, item }));
      }
    } else {
      dispatch(showSignupModal());
    }
  };

  return (
    <a onClick={addFav} className={isFavAdded ? 'comparison-icon-active' : ''}>
      <span className="flaticon-like" />
    </a>
  );
};

export default AddToFavorites;
