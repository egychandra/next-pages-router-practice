import ProductPage from "@/pages/product";
import { render, screen } from "@testing-library/react";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        query: {},
        push: jest.fn(),
        isReady: true
      };
    },
  };
});

describe("Product Page", () => {
  it("Should render product page correctly", () => {
    const page = render(<ProductPage />);
    expect(page).toMatchSnapshot();
  })
})