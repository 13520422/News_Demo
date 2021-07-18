
const Types = {
  // worker
  FETCH_DATA: 'home@FETCH_DATA',
  UPDATE_DATA: 'home@UPDATE_DATA',
  CLEAR_DATA: 'home@CLEAR_DATA',
};

const Actions = {
  //worker
  fetchData: (data) => ({ 
    type: Types.FETCH_DATA, 
    payload: data,
  }),
  updateData: (data) => ({
    type: Types.UPDATE_DATA,
    payload: data,
  }),
};

export { Types, Actions };