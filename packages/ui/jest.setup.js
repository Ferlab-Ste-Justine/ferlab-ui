Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation((query) => ({
        // deprecated
        addEventListener: jest.fn(),

        addListener: jest.fn(),

        dispatchEvent: jest.fn(),

        matches: false,

        media: query,

        onchange: null,

        removeEventListener: jest.fn(),
        // deprecated
        removeListener: jest.fn(),
    })),
    writable: true,
});

jest.mock(
    'react-router-dom',
    () => ({
        BrowserRouter: ({ children }) => children,
        Link: ({ children }) => children,
    }),
    { virtual: true },
);
