/**get with cookie
 * 
 * Params:
 *   url [String]
 *   params [Object]
 * Return:
 *   [Promise]: return [Response]
 */
function get(url, params={}) {
  const urlO = new URL(url);

  for (const [k, v] of Object.entries(params)) {
    urlO.searchParams.append(k, v);
  }
  console.log('get: %o', { urlO });
  return fetch(urlO.href, {
    mode: 'cors',
    credentials: 'include',
  });
}


/**JSON post with cookie
 * 
 * Params:
 *   url [String]
 *   body [Object]:
 * Return:
 *   [Promise]: return [Response]
 */
function post(url, body={}) {
  console.log('post: %o', { url, body });
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    mode: 'cors',
    credentials: 'include',
  });
}


/**Form post with cookie
 * 
 * Params:
 *   url [String]
 *   body [Object]:
 * Return:
 *   [Promise]: return [Response]
 */
function postForm(url, body={}) {
  const formData = new FormData();
  for (const [k, v] of Object.entries(body)) {
    formData.append(k, v);
  }

  console.log('postForm: %o', { url, formData });
  return fetch(url, {
    method: 'POST',
    body: formData,
    mode: 'cors',
    credentials: 'include',
  });
}


/**
 * count array item nums
 * 
 * Params:
 *   array [Array]
 * Return:
 *   statistics [Object]: {
 *     <item>: <count> [Number]
 *   }
 */
function countArray(array) {
  const rv = {}
  for (const item of array) {
    rv[item] = rv[item] === undefined ? 1 : rv[item] + 1;
  }
  return rv;
}


export {
  get,
  post,
  postForm,
  countArray,
};
