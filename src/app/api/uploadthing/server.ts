import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();
export const uploadRouter = {};
// ...
f({})
    .middleware(({ req }) => {
        //           ^? req: NextRequest
        return {}
    })