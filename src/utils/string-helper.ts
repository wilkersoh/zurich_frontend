/* eslint-disable @typescript-eslint/no-namespace */

export namespace StringHelper {
  export const maskEmail = (email: string) => {
    const [localPart, domain] = email.split("@");
    return "*".repeat(localPart.length) + "@" + domain;
  };
}
