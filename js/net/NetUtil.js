export default {
    get(url) {
        console.log(`发起请求${url}`)
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => resolve(response.json())
                )
                .catch((error) => {
                    console.log(`error===${error}`);
                    reject(error);
                });
        });
    }
}