import React from "react";
import Grid, { GridProps } from "@ferlab/ui//layout/Grid";
import GridCard from "@ferlab/ui/view/GridCard";
import "antd/dist/antd.css";
// @ts-ignore
import somegraph from "../assets/somegraph.png";

export default {
  title: "@ferlab/Layout/Grid",
  component: Grid,
  argTypes: {
    backgroundColor: {
      control: "color",
    },
    children: {
      control: "object",
    },
  },
};

export const GridWithCard = (props: GridProps) => (
  <Grid {...props}>{props.children}</Grid>
);
GridWithCard.bind({});
GridWithCard.args = {
  children: (
    <>
      <GridCard title="Primary">
        <h2>Testing content</h2>
        <p>Lorem ipsum iquem vasi.</p>
      </GridCard>
      <GridCard title="Loading Card" loading={true}>
        Loading
      </GridCard>
      <GridCard title="Some Graph">
        <img src={somegraph} width="440" height="320" alt="fake-picture" />
      </GridCard>
      <GridCard>
        <br />
        <img src={somegraph} width="460" height="380" alt="fake-picture" />
      </GridCard>
    </>
  ),
};
