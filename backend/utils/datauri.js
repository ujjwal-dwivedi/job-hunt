import DataUriParser from "datauri/parser.js"

import path from "path";

const getDataUri = (file) => {
    // Safely handle missing/undefined files. Return null when there's nothing to convert.
    if (!file || !file.originalname || !file.buffer) return null;

    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

export default getDataUri;