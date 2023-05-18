import * as jwt from "jsonwebtoken";

export class jwtHelper {
	//秘密鍵
	static jweSecret = "secret123";
	static createToken() {
		const token = jwt.sign({ foo: "bar" }, this.jweSecret, {
			expiresIn: "30d",
		});
		return token;
	}
	static verifyToken(token: string) {
		try {
			const decoded = jwt.verify(token, this.jweSecret);
			return decoded;
		} catch (err) {
			console.log(err);
		}
	}
}