import MaintenancePage, {
    TMaintenancePage,
} from "@ferlab/ui/core/pages/MaintenancePage";
import { Meta } from "@storybook/react";
import React from "react";

export default {
    title: "@ferlab/Pages/MaintenancePage",
    component: MaintenancePage,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const MaintenancePageStory = ({
    storyTitle,
    ...props
}: {
    storyTitle: string;
    props: TMaintenancePage;
}) => (
    <>
        <h3>{storyTitle}</h3>
        <MaintenancePage {...props} />
    </>
);

export const Basic = MaintenancePageStory.bind({});
Basic.args = {
    title: "We are currently down for maintenance",
    subtitle:
        "We apologize for any inconvenience and appreciate your understanding while we work to bring the portal back online.",
};
