/**
 * To save and retrieve data from the server.
 * 
 * @param {*} url 
 * @param {*} type
 * @param {*} object
 * @returns 
 */
export async function saveOrGetData(url, type, object) {
    var baseURL = "http://localhost:8080/todo/" + url;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: type,
        redirect: 'follow'
    }

    if (type == "POST") {
        var jsonObject = JSON.stringify(object);
        requestOptions = {
            method: type,
            headers: myHeaders,
            body: jsonObject,
            redirect: 'follow'
        };
    }
    const response = await fetch(baseURL, requestOptions);
    if (type == 'GET') {
        return await response.json();
    }
}