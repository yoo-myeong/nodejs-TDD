describe("calculate", () => {
  test("2+2 calculate", () => {
    expect(2 + 2).toBe(4);
  });

  test("2+2 is not five", () => {
    expect(2 + 2).not.toBe(5);
  });
});
