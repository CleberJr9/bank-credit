import { hashingProtocol } from "./hashing.service";
import *as bcrypt from 'bcryptjs'


export class bcryptService extends hashingProtocol{
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
      return bcrypt.hash(password,salt);
  }
  async compare(password: string, passwordHash: string): Promise<boolean> {
      return bcrypt.compare(password,passwordHash)
  }

}