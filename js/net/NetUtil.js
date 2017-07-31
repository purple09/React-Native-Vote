export default {
    get(url) {
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