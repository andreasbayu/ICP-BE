import * as bcrypt from 'bcrypt';

class Hash {
  static saltOrRounds = 12;

  public static async encrypt(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.saltOrRounds);
  }

  public static async compare(
    plainText: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(plainText, hash);
  }
}

export { Hash };
