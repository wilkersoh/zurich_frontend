import { StringHelper } from "@/utils/string-helper";

describe("StringHelper", () => {
  it("maskEmail", () => {
    expect(StringHelper.maskEmail("test@example.com")).toBe("****@example.com");
  });
});
