export class Password {
  static async hashPassword(password: string): Promise<string> {
    return await Bun.password.hash(password);
  }

  static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await Bun.password.verify(password, hashedPassword);
  }
}
