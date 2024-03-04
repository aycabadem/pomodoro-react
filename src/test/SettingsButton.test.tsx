import { render, screen, fireEvent } from "@testing-library/react";

import SettingsButton from "../components/buttons/SettingsButton";

import "@testing-library/jest-dom";

describe("Timer Component", () => {
  test("Renders correctly", () => {
    render(<SettingsButton onClick={() => {}} />);
    expect(screen.getByTestId("settings-button")).toBeInTheDocument();
  });

  test("settings button corretly with button", () => {
    const mockCallback = jest.fn();
    render(<SettingsButton onClick={mockCallback} />);
    fireEvent.click(screen.getByText("Settings"));
    expect(mockCallback.mock.calls).toHaveLength(1);
  });
});
