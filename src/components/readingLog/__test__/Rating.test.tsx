import { beforeEach, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { server } from "@/test-utils/setupHttp.js";
import { customRender } from "@/test-utils/CustomRender.tsx";
import Rating from "../Rating.tsx";
import * as MS from "@/test-utils/mockServerResponses.ts";

vi.mock("@react-keycloak/web");
vi.mock("react-dom");

const mockRefetch = vi.fn();

let rating = 5;

const render = () => {
  return customRender(
    <Rating isbn="isbn" initialRating={rating} refetch={mockRefetch} />,
  );
};

describe("rating = 5", () => {
  beforeEach(() => {
    render();
  });

  it("star 5개가 렌더링 된다.", async () => {
    const stars = await screen.findAllByTestId("filled-star");
    expect(stars.length).toBe(5);
  });
});

describe("rating = 0", () => {
  beforeEach(() => {
    rating = 0;
    MS.MOCK_SERVER_UPDATE_RATING(server);
    render();
  });

  it("star reg star가 5개 렌더링 된다.", async () => {
    const stars = await screen.findAllByTestId("reg-star");
    expect(stars.length).toBe(5);
  });

  it("star 5번 째 reg star 클릭하면 mockRefetch가 호출된다.", async () => {
    const stars = await screen.findAllByTestId("reg-star");
    const star = stars[4];
    fireEvent.click(star);

    const filledStars = await screen.findAllByTestId("filled-star");
    expect(filledStars.length).toBe(5);
    expect(mockRefetch).toBeCalledTimes(1);

    screen.debug();
  });
});
