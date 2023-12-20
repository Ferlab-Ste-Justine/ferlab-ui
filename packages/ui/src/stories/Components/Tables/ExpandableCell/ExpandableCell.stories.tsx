import React from "react";
import { Meta } from "@storybook/react";
import ExpandableCell, {
    IExpandableCellProps,
} from "@ferlab/ui/components/tables/ExpandableCell";

export default {
    title: "@ferlab/Components/Tables/ExpandableCell",
    component: ExpandableCell,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const ExpandableCellStory = ({
    title,
    ...props
}: {
    title: string;
    props: IExpandableCellProps<any>;
}) => (
    <>
        <h3>{title}</h3>
        <div
            style={{
                padding: "10px",
                border: "1px solid lightgray",
                width: "300px",
            }}
        >
            <ExpandableCell {...props} />
        </div>
    </>
);

export const Basic = ExpandableCellStory.bind({});
Basic.args = {
    title: "Basic",
    dataSource: ["Olivier", "Evans", "Francis", "Claudia", "Adrian"],
    renderItem: (name: string, index: number) => <div key={index}>{name}</div>,
};

export const BasicTranslated = ExpandableCellStory.bind({});
BasicTranslated.args = {
    title: "Basic Translated",
    dataSource: ["Olivier", "Evans", "Francis", "Claudia", "Adrian"],
    renderItem: (name: string, index: number) => <div key={index}>{name}</div>,
    dictionnary: {
        "see.less": "Voir moins",
        "see.more": "Voir plus"
    }
};