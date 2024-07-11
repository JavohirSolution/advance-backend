import { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

class FileService {
    save(file: UploadedFile) {
        try {
            const filename = uuidv4() + ".jpg";
            const currentDir = __dirname;
            const staticDir = path.join(currentDir, "..", "static");
            const filePath = path.join(staticDir, filename);

            if (!fs.existsSync(staticDir)) {
                fs.mkdirSync(staticDir, { recursive: true });
            }

            file.mv(filePath, (err: any) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            });

            return filename
        } catch (error) {
            console.log(error)
        }
    }
}


export default new FileService()