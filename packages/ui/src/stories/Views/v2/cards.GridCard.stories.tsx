import React from "react";
import "antd/dist/antd.css";
import GridCard from "@ferlab/ui/view/v2/GridCard";

export default {
    title: "@ferlab/Views/GridCard V2",
    component: GridCard,
    argTypes: {
        label: {
            description: "overwritten description",
            table: {
                type: {
                    summary: "something short",
                    detail: "something really really long",
                },
            },
            control: {
                type: null,
            },
        },
    },
};

const content = (
    <>
        <h2>Testing content</h2>
        <p>Lorem ipsum iquem vasi.</p>
    </>
);

export const DefaultCard = () => <GridCard content={content} />;

export const CardWithHeaderOnly = () => (
    <GridCard title="Card Title" content={content} />
);

export const CardWithFooterOnly = () => (
    <GridCard footer="Card Footer" content={content} />
);

export const CardWithHeaderAndFooter = () => (
    <GridCard title="Card Title" footer="Card Footer" content={content} />
);

export const LoadingCardSpinner = () => (
    <GridCard
        title="Loading Card"
        loading={true}
        loadingType="spinner"
        content={content}
    />
);

export const LoadingCardSkeleton = () => (
    <GridCard title="Loading Card" loading={true} content={content} />
);
