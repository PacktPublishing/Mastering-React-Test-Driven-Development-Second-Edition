import React from "react";
import {
  initializeReactContainer,
  render,
  element,
  propsMatching,
} from "../reactTestExtensions";
import { ToggleRouterButton } from "../../src/CustomerSearch/ToggleRouterButton";
import { RouterButton } from "../../src/CustomerSearch/RouterButton";
import { SearchButtons } from "../../src/CustomerSearch/SearchButtons";

const tenCustomers = Array.from(
  "0123456789",
  (id) => ({ id })
);

jest.mock(
  "../../src/CustomerSearch/RouterButton",
  () => ({
    RouterButton: jest.fn(({ id, children }) => (
      <div id={id}>{children}</div>
    )),
  })
);
jest.mock(
  "../../src/CustomerSearch/ToggleRouterButton",
  () => ({
    ToggleRouterButton: jest.fn(
      ({ id, children }) => (
        <div id={id}>{children}</div>
      )
    ),
  })
);

describe("SearchButtons", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  const testProps = {
    lastRowIds: ["123"],
    searchTerm: "term",
    customers: tenCustomers,
  };

  describe("previous button", () => {
    const previousPageButtonProps = () =>
      propsMatching(RouterButton, {
        id: "previous-page",
      });

    it("renders", () => {
      render(<SearchButtons {...testProps} />);
      expect(previousPageButtonProps()).toMatchObject(
        {
          disabled: false,
        }
      );
      expect(element("#previous-page")).toContainText(
        "Previous"
      );
    });

    it("removes last appended row ID from lastRowIds in queryParams prop", () => {
      render(
        <SearchButtons
          {...testProps}
          lastRowIds={["123", "234"]}
        />
      );
      expect(previousPageButtonProps()).toMatchObject(
        {
          queryParams: expect.objectContaining({
            lastRowIds: ["123"],
          }),
        }
      );
    });

    it("includes limit and search term in queryParams prop", () => {
      render(
        <SearchButtons
          {...testProps}
          limit={20}
          searchTerm="name"
        />
      );
      expect(previousPageButtonProps()).toMatchObject(
        {
          queryParams: {
            limit: 20,
            searchTerm: "name",
          },
        }
      );
    });

    it("is disabled if there are no lastRowIds", () => {
      render(
        <SearchButtons
          {...testProps}
          lastRowIds={[]}
        />
      );
      expect(previousPageButtonProps()).toMatchObject(
        {
          disabled: true,
        }
      );
    });
  });

  describe("next button", () => {
    const nextPageButtonProps = () =>
      propsMatching(RouterButton, {
        id: "next-page",
      });

    it("renders", () => {
      render(<SearchButtons {...testProps} />);
      expect(nextPageButtonProps()).toMatchObject({
        disabled: false,
      });
      expect(element("#next-page")).toContainText(
        "Next"
      );
    });

    it("appends next last row ID to lastRowIds in queryParams prop", () => {
      render(<SearchButtons {...testProps} />);
      expect(nextPageButtonProps()).toMatchObject({
        queryParams: expect.objectContaining({
          lastRowIds: ["123", "9"],
        }),
      });
    });

    it("includes limit and search term in queryParams prop", () => {
      render(
        <SearchButtons
          {...testProps}
          limit={20}
          searchTerm="name"
        />
      );
      expect(nextPageButtonProps()).toMatchObject({
        queryParams: expect.objectContaining({
          limit: 20,
          searchTerm: "name",
        }),
      });
    });

    it("is disabled if there are fewer records than the page limit shown", () => {
      render(
        <SearchButtons
          {...testProps}
          customers={[]}
        />
      );
      expect(nextPageButtonProps()).toMatchObject({
        disabled: true,
      });
    });
  });

  describe("limit toggle buttons", () => {
    it("has a button with a label of 10 that is initially toggled", () => {
      render(<SearchButtons {...testProps} />);
      const buttonProps = propsMatching(
        ToggleRouterButton,
        {
          id: "limit-10",
        }
      );
      expect(buttonProps).toMatchObject({
        toggled: true,
        queryParams: {
          limit: 10,
          lastRowIds: ["123"],
          searchTerm: "term",
        },
      });
      expect(element("#limit-10")).toContainText(
        "10"
      );
    });

    [20, 50, 100].forEach((limitSize) => {
      const buttonId = `limit-${limitSize}`;

      const buttonProps = () =>
        propsMatching(ToggleRouterButton, {
          id: buttonId,
        });

      it(`has a button with a label of ${limitSize} that is initially not toggled`, () => {
        render(<SearchButtons {...testProps} />);
        expect(buttonProps()).toMatchObject({
          toggled: false,
          queryParams: {
            limit: limitSize,
            lastRowIds: ["123"],
            searchTerm: "term",
          },
        });
        expect(element(`#${buttonId}`)).toContainText(
          limitSize.toString()
        );
      });

      it(`has toggled button with label limit-${limitSize} when limit prop is ${limitSize}`, () => {
        render(
          <SearchButtons
            {...testProps}
            limit={limitSize}
          />
        );
        expect(buttonProps()).toMatchObject({
          toggled: true,
        });
      });
    });
  });
});
