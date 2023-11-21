import * as crypto from "crypto";
export class SecurityUtil {

    /**
     * permet de hasher le password avec l'algorithme SHA512
     * @param password
     */
    static toSHA512(password: string){
        const hash: crypto.Hash = crypto.createHash('sha512');
        hash.update(password);
        return hash.digest('hex');
    }
}