 
const createTransitionState = () => {
  let _isTransiting = false;

  return {
    isTransiting: () => _isTransiting,
    start: () => {
      _isTransiting = true;
    },
    stop: () => {
      _isTransiting = false;
    },
  };
};

export default createTransitionState();