

import moment from 'moment';

const urlcnn = 'https://search.api.cnn.io/content';
const urlnytime = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const urlnytimearticle='https://api.nytimes.com/svc/archive/v1/';
const keynyt = 'BVOKzyrsk8DQzIs9ScuBk0vcB69WOv4z';
const urleverything='https://newsapi.org/v2/everything';
const keteverything='3e0552a424594a258f30447aea908080';
const domainncc='ncc.com';
const domainnytimes='nytimes.com';


function objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
}


export function get(api, params,type) {
    const queryString = objToQueryString(params);
    let urlget =''
    
    if(type=='1')
    {
        
        urlget=urleverything+'?domains=nytimes.com&'+queryString+'&apiKey='+keteverything
    }
    else
    {
        urlget=(urlcnn + '?' + queryString)
    }

    //const urlget=urlcnn+api+'?'+queryString;
    console.log('GET ' + urlget);
    return fetch(urlget, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json().then((data) => {
            let res = {
                data: data,
                error: false,
            };
            return res;

        }))
        .catch((err) => {
            console.log('There is an error occurred while requesting api', err, api)
            let res = {
                data: [],
                error: true,
            };
            return res

        });
}

export function post(api, params) {

    //let  xxxPlatform  = { xxxPlatform:Platform.OS +'' };
    //let a = params;
    //params = [ ...a, { xxxPlatform} ];

    console.log('POST ' + api + ' data', params);

    const requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'text/plain', 'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    };
    return fetch(url + api, requestOptions)
        .then((response) => response.json().then((data) => {
            let res = {
                data: data,
                error: false,
            };
            return res;

        })
        )
        .catch((err) => {
            console.log('There is an error occurred while requesting api', err, api)
            let res = {
                data: [],
                error: true,
            };
            return res

        });

}



function encode(input) {
    // Create Base64 Object
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    let str = input;
    let output = '';

    for (
        let block = 0, charCode, i = 0, map = chars;
        str.charAt(i | 0) || ((map = '='), i % 1);
        output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
        charCode = str.charCodeAt((i += 3 / 4));

        if (charCode > 0xff) {
            throw new Error(
                '\'btoa\' failed: The string to be encoded contains characters outside of the Latin1 range.',
            );
        }

        block = (block << 8) | charCode;
    }

    return output;
}