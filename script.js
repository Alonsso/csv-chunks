const axios = require('axios');
const fs = require('fs');
const CsvSplitter = require('csv-splitter');
const FormData = require('form-data');

const spltCsvs = async () => {
    //CsvSplitter.split("./csv/listDecentraland.csv", 5000, "./output/decentraland");
    CsvSplitter.split("./csv/listSandbox.csv", 5000, "./output/sandbox");
}

(async () => {
    await spltCsvs().then(async () => {
        const files = await fs.promises.readdir("./output/sandbox");
        for await (const file of files) {
            const formData = new FormData();
            formData.append('file', fs.createReadStream("./output/sandbox/"+file));
            const res = await axios.post('http://localhost:3003/service/upload-csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    collection: '0x5CC5B05a8A13E3fBDB0BB9FcCd98D38e50F90c38'
                }
            });
            console.log(res);
        };
    });
})();