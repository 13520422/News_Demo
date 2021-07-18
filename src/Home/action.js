import { get } from "../utils/Networks";

export function GetNewsList(params,type) {
    return () => {
      console.log('GetNewsList', params);
      return get('GetNewsList', params,type)
        .then(({ data, error, }) => {
            //console.log('GetNewsList data', data);
          if (!error) {
            // alert(data)
            return data;
          } else {
            console.log('GetNewsList fail');
            return false;
          }
        })
        .catch((e) => {
            console.log('GetNewsList catch', e);
          return false;
        });
    };

  }