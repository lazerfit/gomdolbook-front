import { vi, expect, describe, it } from "vitest";
import { customRender } from "@/utils/CustomRender.tsx";
import BookDetailSaveButtons from "../BookDetailSaveButton.tsx";
import { screen } from "@testing-library/react";

const saveReadingLogMock = vi.fn();

describe("button test", () => {
  beforeEach(() => {
    customRender(
      <BookDetailSaveButtons
        saveFn={(status) => {
          saveReadingLogMock(status);
        }}
      >
        버튼
      </BookDetailSaveButtons>,
    );
  });

  it("렌더링이 된다.", async () => {
    expect(await screen.findByText("버튼"));
  });
});
