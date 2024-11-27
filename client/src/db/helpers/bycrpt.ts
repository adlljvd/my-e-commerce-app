import bcrypt from "bcryptjs";

function hash(plainPass: string): string {
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(plainPass, salt);
  return hashedPass;
}

function compare(plainPass: string, hashedPass: string): boolean {
  return bcrypt.compareSync(plainPass, hashedPass);
}

export { hash, compare };
