import {
  addToComparisonPools,
  removeFromComparisonPools,
  showSignupModal,
} from '@/slices/userSlice';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const AddToComparison = ({ item, big }) => {
  const comparisonPools = useSelector((state) => state.user.comparisonPools);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const isComparedAdded = useMemo(() => {
    const pool = comparisonPools?.find((i) => i.id == item.id);
    if (pool) {
      return true;
    } else {
      return false;
    }
  }, [comparisonPools]);

  const addToCompare = () => {
    if (token) {
      if (isComparedAdded) {
        dispatch(removeFromComparisonPools(item));
      } else {
        if (comparisonPools.length === 3) {
          toast.error('You have already selected 3 pools for comparison');
        } else {
          dispatch(addToComparisonPools(item));
        }
      }
    } else {
      dispatch(showSignupModal());
    }
  };

  return (
    <a
      onClick={addToCompare}
      className={`${big ? 'icon mr10' : ''} ${
        isComparedAdded ? 'comparison-icon-active' : ''
      }`}
      style={{ cursor: 'pointer' }}
    >
      <span className="flaticon-new-tab" />
    </a>
  );
};

export default AddToComparison;
